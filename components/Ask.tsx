"use client";

import { useEffect, useRef, useState } from "react";
import { readSse } from "@/lib/sse";
import type { Citation, RunTrace } from "@/lib/types";
import { profile } from "@/content/profile";
import { useMode } from "./ModeProvider";

const API = (process.env.NEXT_PUBLIC_API_URL ?? "").replace(/\/$/, "");

const suggestions = [
  "What has Manish built with AI agents?",
  "What was the biggest cloud migration he led?",
  "Is he open to relocation?",
];

type Msg = { role: "user" | "assistant"; text: string; citations?: Citation[]; failed?: boolean };
type Status = "checking" | "online" | "offline";

const fmt = (n: number | null | undefined, unit = "", digits = 0) =>
  n === null || n === undefined ? "—" : `${n.toLocaleString(undefined, { maximumFractionDigits: digits })}${unit}`;

export function Ask() {
  const { mode } = useMode();
  const [status, setStatus] = useState<Status>(API ? "checking" : "offline");
  const [messages, setMessages] = useState<Msg[]>([]);
  const [trace, setTrace] = useState<RunTrace | null>(null);
  const [route, setRoute] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const convId = useRef<string | null>(null);
  const abort = useRef<AbortController | null>(null);
  const logRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!API) return;
    const ctl = new AbortController();
    const t = setTimeout(() => ctl.abort(), 4000);
    fetch(`${API}/healthz`, { signal: ctl.signal })
      .then((r) => setStatus(r.ok ? "online" : "offline"))
      .catch(() => setStatus("offline"))
      .finally(() => clearTimeout(t));
    return () => ctl.abort();
  }, []);

  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight });
  }, [messages]);

  async function ask(question: string) {
    const q = question.trim();
    if (!q || busy || status !== "online") return;
    setInput("");
    setBusy(true);
    setTrace(null);
    setRoute([]);
    setMessages((m) => [...m, { role: "user", text: q }, { role: "assistant", text: "" }]);
    const update = (fn: (m: Msg) => Msg) =>
      setMessages((all) => [...all.slice(0, -1), fn(all[all.length - 1])]);

    abort.current = new AbortController();
    try {
      const res = await fetch(`${API}/v1/chat/stream`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "text/event-stream" },
        body: JSON.stringify({ question: q, conversation_id: convId.current, mode }),
        signal: abort.current.signal,
      });
      if (res.status === 429) throw new Error("Too many questions in a short time. Try again in a minute.");
      if (res.status === 503) throw new Error("The assistant has reached today's usage limit. Email works any time.");
      if (!res.ok) throw new Error("The assistant couldn't answer that. Try again, or get in touch directly.");

      for await (const ev of readSse(res, abort.current.signal)) {
        const d = ev.data as Record<string, unknown>;
        switch (ev.event) {
          case "run.created":
            if (typeof d.conversation_id === "string") convId.current = d.conversation_id;
            break;
          case "route.selected":
            if (Array.isArray(d.path)) setRoute(d.path as string[]);
            break;
          case "message.delta":
            update((m) => ({ ...m, text: m.text + String(d.text ?? "") }));
            break;
          case "message.retracted":
            update((m) => ({ ...m, text: "" }));
            break;
          case "citations":
            update((m) => ({ ...m, citations: (d.items as Citation[]) ?? [] }));
            break;
          case "run.completed":
            setTrace((d.trace as RunTrace) ?? null);
            break;
          case "error":
            throw new Error("The answer was interrupted. Try asking again.");
        }
      }
    } catch (e) {
      if ((e as Error).name !== "AbortError") {
        update((m) => ({ ...m, text: (e as Error).message, failed: true }));
      }
    } finally {
      setBusy(false);
    }
  }

  const callHref = profile.bookingUrl || `mailto:${profile.email}`;

  return (
    <section className="section" id="ask" aria-labelledby="ask-title">
      <div className="wrap">
        <div className="section-head">
          <h2 id="ask-title">Ask about my work</h2>
          <p>
            The assistant answers only from my own files, cites where each fact came from, and says so when it
            doesn&rsquo;t know. Switch to Architect view to see how every answer was produced.
          </p>
        </div>

        <div className="ask-grid">
          <div className="chat">
            <div className="chat-head">
              <span className={`live ${status}`} aria-hidden="true" />
              <span>
                {status === "online" ? "Assistant online" : status === "checking" ? "Connecting…" : "Assistant offline"}
              </span>
            </div>

            <div className="chat-log" ref={logRef} aria-live="polite">
              {messages.length === 0 && status !== "offline" && (
                <p className="dim">Ask about projects, architecture decisions or experience.</p>
              )}
              {status === "offline" && messages.length === 0 && (
                <div className="offline">
                  <p>The assistant is offline right now. Everything it knows is on this page, and email reaches me directly.</p>
                  <a className="btn" href={`mailto:${profile.email}`}>Email me</a>
                </div>
              )}
              {messages.map((m, i) =>
                m.role === "user" ? (
                  <p key={i} className="bubble user">{m.text}</p>
                ) : (
                  <div key={i} className={`bubble bot${m.failed ? " failed" : ""}`}>
                    <p>{m.text || (busy && i === messages.length - 1 ? <span className="caret" aria-label="Writing" /> : "")}</p>
                    {m.citations && m.citations.length > 0 && (
                      <ul className="chips cites" aria-label="Sources">
                        {m.citations.map((c) => <li key={c.id}>{c.label}</li>)}
                      </ul>
                    )}
                  </div>
                )
              )}
            </div>

            {status === "online" && (
              <div className="suggest">
                {suggestions.map((s) => (
                  <button key={s} type="button" disabled={busy} onClick={() => ask(s)}>{s}</button>
                ))}
              </div>
            )}

            <form
              className="chat-input"
              onSubmit={(e) => {
                e.preventDefault();
                ask(input);
              }}
            >
              <label htmlFor="ask-input" className="sr-only">Your question</label>
              <input
                id="ask-input"
                value={input}
                maxLength={500}
                onChange={(e) => setInput(e.target.value)}
                placeholder={status === "online" ? "Ask a question" : "Assistant offline"}
                disabled={status !== "online" || busy}
                autoComplete="off"
              />
              <button type="submit" className="send" aria-label="Send question" disabled={status !== "online" || busy || !input.trim()}>
                <svg width="18" height="18" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" /></svg>
              </button>
            </form>
          </div>

          {mode === "architect" ? (
            <aside className="trace" aria-label="How the last answer was produced">
              <div className="panel-row">
                <h3 className="panel-kicker">Run trace, last answer</h3>
                {trace?.gpu_state && trace.gpu_state !== "n/a" && <span className="pill ok">GPU {trace.gpu_state}</span>}
              </div>
              <div>
                <p className="dim small">Request path</p>
                <ol className="route">
                  {(route.length ? route : ["input guard", "router", "skill", "model", "grounded?", "policy gate"]).map((r) => (
                    <li key={r} className={route.length ? "hit" : ""}>{r.replace(/_/g, " ")}</li>
                  ))}
                </ol>
              </div>
              <dl className="metrics">
                <div><dt>Model</dt><dd>{trace?.model ?? "—"}</dd></div>
                <div><dt>Served by</dt><dd>{trace?.provider ? `${trace.provider}${trace.fallback_used ? " (fallback)" : ""}` : "—"}</dd></div>
                <div><dt>Tokens in / cached</dt><dd>{fmt(trace?.tokens?.input)} / {fmt(trace?.tokens?.cached_input)}</dd></div>
                <div><dt>Tokens out</dt><dd>{fmt(trace?.tokens?.output)}</dd></div>
                <div><dt>Time to first token</dt><dd>{fmt(trace?.latency_ms?.ttft, " ms")}</dd></div>
                <div><dt>Total</dt><dd>{fmt(trace?.latency_ms?.total, " ms")}</dd></div>
                <div><dt>Throughput</dt><dd>{fmt(trace?.tokens_per_second, " tok/s", 1)}</dd></div>
                <div><dt>Cost of this answer</dt><dd>{trace?.cost_usd?.this_answer != null ? `$${trace.cost_usd.this_answer.toFixed(5)}` : "—"}</dd></div>
                <div><dt>Groundedness</dt><dd>{trace?.groundedness?.score != null ? `${Math.round(trace.groundedness.score * 100)}%` : "—"}</dd></div>
                <div><dt>Policy gate</dt><dd>{trace?.policy_decision ?? "—"}</dd></div>
              </dl>
              {trace?.checks && trace.checks.length > 0 && (
                <ul className="checks">
                  {trace.checks.map((c) => (
                    <li key={c.name} className={c.passed ? "pass" : "fail"}>
                      {c.passed ? "Passed" : "Failed"}: {c.name.replace(/_/g, " ")}
                    </li>
                  ))}
                </ul>
              )}
              {!trace && <p className="dim small">Ask a question to see real numbers from the live system.</p>}
            </aside>
          ) : (
            <aside className="panel ask-side">
              <p className="serif-lg">The chat is itself a project: my own API, guardrails and monitoring, running live.</p>
              <p>Architect view shows the route each answer took, the tokens it used, how fast it streamed and what it cost.</p>
              <div className="ask-side-foot">
                <p>Prefer talking to a person?</p>
                <a className="btn primary" href={callHref} {...(profile.bookingUrl ? { target: "_blank", rel: "noopener" } : {})}>
                  {profile.bookingUrl ? "Book a 20-minute call" : "Email me"}
                </a>
              </div>
            </aside>
          )}
        </div>
      </div>
    </section>
  );
}
