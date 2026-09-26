"use client";

import { useState } from "react";
import { bucketLabels, bucketNotes, caseStudies, repos, type Bucket } from "@/content/work";
import { profile } from "@/content/profile";
import { useMode } from "./ModeProvider";

const filters: ("all" | Bucket)[] = ["all", "agent", "pipeline", "not-genai"];

export function Work() {
  const { mode } = useMode();
  const [filter, setFilter] = useState<"all" | Bucket>("all");
  const shown = filter === "all" ? caseStudies : caseStudies.filter((c) => c.bucket === filter);

  return (
    <section className="section" id="work" aria-labelledby="work-title">
      <div className="wrap">
        <div className="section-head">
          <h2 id="work-title">Selected work</h2>
          <p>
            Each project is sorted by what it actually is, not what it was called. Knowing which problems
            don&rsquo;t need a language model is part of the job.
          </p>
        </div>

        <div className="filters" role="group" aria-label="Filter work by type">
          {filters.map((f) => (
            <button key={f} type="button" aria-pressed={filter === f} onClick={() => setFilter(f)}>
              {f === "all" ? "All work" : bucketLabels[f]}
              <span className="count">{f === "all" ? caseStudies.length : caseStudies.filter((c) => c.bucket === f).length}</span>
            </button>
          ))}
        </div>
        {filter !== "all" && <p className="filter-note">{bucketNotes[filter]}</p>}

        <ul className="studies">
          {shown.map((c) => (
            <li key={c.id} className={`study b-${c.bucket}`}>
              <div className="study-meta">
                <span className={`bucket b-${c.bucket}`}>{bucketLabels[c.bucket]}</span>
                <span className="dim">{c.org}</span>
              </div>
              <h3>{c.title}</h3>
              <p className="study-outcome">{c.outcome}</p>
              {mode === "architect" && (
                <>
                  <p className="study-detail">{c.detail}</p>
                  <ul className="chips">
                    {c.stack.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>
                </>
              )}
            </li>
          ))}
        </ul>

        <div className="repos">
          <div className="repos-head">
            <h3>From the GitHub workbench</h3>
            <a className="text-link" href={profile.github} target="_blank" rel="noopener">All repositories</a>
          </div>
          <ul>
            {repos.map((r) => (
              <li key={r.name}>
                {r.href ? (
                  <a href={r.href} target="_blank" rel="noopener" className="repo-name">{r.name}</a>
                ) : (
                  <span className="repo-name">{r.name}</span>
                )}
                <span className="repo-note">{r.note ?? ""}</span>
                <span className="repo-meta mono">
                  {r.lang !== "—" && <span>{r.lang}</span>}
                  <span className={r.visibility === "public" ? "vis public" : "vis"}>
                    {r.visibility === "public" ? "Public" : "Private, walkthrough on request"}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
