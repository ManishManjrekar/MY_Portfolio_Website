import { career, certifications, education, skills } from "@/content/career";

export function Career() {
  const roles = [...career].reverse();
  return (
    <section className="section" id="career" aria-labelledby="career-title">
      <div className="wrap">
        <div className="section-head">
          <h2 id="career-title">Career</h2>
          <p>Seventeen years moving from delivery governance to cloud at scale to agentic AI, each role building on the last.</p>
        </div>
        <ol className="timeline">
          {roles.map((r) => (
            <li key={r.org}>
              <div className="tl-when mono">{r.period}</div>
              <div className="tl-body">
                <h3>{r.org}</h3>
                <p className="tl-title">{r.title}</p>
                <ul>{r.points.map((p) => <li key={p}>{p}</li>)}</ul>
              </div>
            </li>
          ))}
        </ol>

        <div className="creds">
          <div>
            <h3>Certifications</h3>
            <ul className="plain">{certifications.map((c) => <li key={c}>{c}</li>)}</ul>
            <h3>Education</h3>
            <ul className="plain">{education.map((c) => <li key={c}>{c}</li>)}</ul>
          </div>
          <div>
            <h3>Toolbox</h3>
            <dl className="skills">
              {skills.map((s) => (
                <div key={s.group}>
                  <dt>{s.group}</dt>
                  <dd><ul className="chips">{s.items.map((i) => <li key={i}>{i}</li>)}</ul></dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
