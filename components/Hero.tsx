"use client";

import { impact, principles, profile } from "@/content/profile";
import { career } from "@/content/career";
import { useMode } from "./ModeProvider";

export function Hero() {
  const { mode } = useMode();
  return (
    <section className="hero" id="top">
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <p className="status">
            <span className="live" aria-hidden="true" />
            {profile.role}, {profile.location}
          </p>
          <h1>{profile.headline}</h1>
          <p className="lede">{mode === "recruiter" ? profile.summaryRecruiter : profile.summaryArchitect}</p>
          <div className="cta-row">
            <a className="btn primary" href="#work">See the work</a>
            <a className="btn" href={profile.resumeUrl} download>Download résumé</a>
            <a className="text-link" href={profile.architectureUrl} target="_blank" rel="noopener">
              Explore the GenAI reference architecture
            </a>
          </div>
        </div>

        <aside className="path" aria-label="Career path, 2014 to now">
          <p className="panel-label">Career as a request path</p>
          <ol>
            {career.map((r, i) => (
              <li key={r.org}>
                <div className={`node${i === career.length - 1 ? " current" : ""}`}>
                  <span className="mono dim">{String(i + 1).padStart(2, "0")}</span>
                  <span className="node-body">
                    <strong>{r.org.split(",")[0].replace(" Technology Solutions", "").replace(" India", "")}</strong>
                    <span>{r.title.split(",")[0]}</span>
                  </span>
                  <span className="mono dim">{r.start}</span>
                </div>
                {r.carried && (
                  <div className="hop">
                    <span className="rail"><span className="pulse" style={{ animationDelay: `${i * 0.8}s` }} /></span>
                    <span className="capsule">{r.carried}</span>
                  </div>
                )}
              </li>
            ))}
          </ol>
        </aside>
      </div>

      <div className="wrap">
        {mode === "recruiter" ? (
          <dl className="impact">
            {impact.map((s) => (
              <div key={s.label}>
                <dt>{s.label}</dt>
                <dd>{s.value}</dd>
              </div>
            ))}
          </dl>
        ) : (
          <ul className="principles">
            {principles.map((p) => (
              <li key={p.title}>
                <h2>{p.title}</h2>
                <p>{p.body}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
