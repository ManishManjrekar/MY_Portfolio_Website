"use client";

import { lab, statusLabel } from "@/content/lab";
import { profile } from "@/content/profile";
import { useMode } from "./ModeProvider";

const archLinks = [
  { ref: "3.10", block: "Model server (vLLM)", project: "Project 2" },
  { ref: "3.2", block: "Compute: Kubernetes and GPU nodes", project: "Projects 2 and 4" },
  { ref: "5.1", block: "Response validation loop", project: "Project 1" },
  { ref: "6.3", block: "Metrics with Prometheus", project: "Project 3" },
  { ref: "6.4", block: "Cost tracking", project: "Project 5" },
  { ref: "6.6", block: "Tracing, logs and traces", project: "Project 3" },
];

export function Lab() {
  const { mode } = useMode();
  const built = lab.filter((p) => p.status === "built").length;
  return (
    <section className="section" id="lab" aria-labelledby="lab-title">
      <div className="wrap">
        <div className="section-head">
          <h2 id="lab-title">AI infrastructure lab</h2>
          <p>
            Five projects through the layer underneath GenAI apps: local inference, production serving,
            self-healing operations, GPU autoscaling and scale-to-zero. {built} of {lab.length} built so far;
            each is isolated so any one can be rebuilt without touching the others.
          </p>
        </div>

        <div className="track" aria-hidden="true"><span /></div>
        <ol className="lab">
          {lab.map((p) => (
            <li key={p.n} className={`lab-card s-${p.status}`}>
              <div className="lab-top">
                <span className="mono dim">Project {p.n}</span>
                <span className={`status-chip s-${p.status}`}>{statusLabel[p.status]}</span>
              </div>
              <h3>{p.title}</h3>
              {mode === "recruiter" ? (
                <dl className="lab-body">
                  <dt>Problem</dt>
                  <dd>{p.problem}</dd>
                  <dt>What it proves</dt>
                  <dd className="strong">{p.proves}</dd>
                </dl>
              ) : (
                <div className="lab-body">
                  <ul className="chips">{p.patterns.map((x) => <li key={x}>{x}</li>)}</ul>
                  <p>{p.design}</p>
                  <p className="dim small">Runs on {p.runs}</p>
                </div>
              )}
              <p className="lab-result mono">
                {p.result ?? (p.status === "built" ? "Measurements coming" : "Not measured yet")}
              </p>
            </li>
          ))}
        </ol>

        <div className="lab-bottom">
          <div className="panel">
            <div className="panel-row">
              <h3>Explained there, built here</h3>
              <a className="text-link" href={profile.architectureUrl} target="_blank" rel="noopener">Open the architecture</a>
            </div>
            <ul className="arch-map">
              {archLinks.map((l) => (
                <li key={l.ref}>
                  <span className="mono accent">{l.ref}</span>
                  <span>{l.block}</span>
                  <span className="pill">{l.project}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="panel accent-panel">
            <h3 className="panel-kicker">Design decision: laptop first</h3>
            <p className="serif-lg">Prove the control flow on kind before spending on a single GPU.</p>
            <p>
              Routing, autoscaling, queueing and scale-to-zero can all be exercised with CPU stand-ins. Real GPUs
              and models swap in once the mechanics hold.
            </p>
            <a className="btn primary" href="#contact">Request a walkthrough</a>
          </div>
        </div>
      </div>
    </section>
  );
}
