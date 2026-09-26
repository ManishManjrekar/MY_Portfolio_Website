import { profile } from "@/content/profile";

export function Beyond() {
  return (
    <section className="section beyond" aria-labelledby="beyond-title">
      <div className="wrap beyond-inner">
        <h2 id="beyond-title">Beyond work</h2>
        <p className="serif-lg">
          Silver medal at the National Games 2002 in sepak takraw, a net sport played with the feet, knees,
          chest and head, never the hands.
        </p>
        <p className="dim">Speaks English, Hindi and Telugu.</p>
      </div>
    </section>
  );
}

export function Contact() {
  const call = profile.bookingUrl || `mailto:${profile.email}`;
  return (
    <footer className="contact" id="contact" aria-labelledby="contact-title">
      <div className="wrap contact-inner">
        <div>
          <h2 id="contact-title">Let&rsquo;s talk about what you&rsquo;re building.</h2>
          <p>{profile.availability}</p>
        </div>
        <div className="contact-actions">
          <a className="btn primary" href={call} {...(profile.bookingUrl ? { target: "_blank", rel: "noopener" } : {})}>
            {profile.bookingUrl ? "Book a call" : "Email me"}
          </a>
          <a className="btn" href={profile.resumeUrl} download>Download résumé</a>
        </div>
        <ul className="contact-links">
          <li><a href={`mailto:${profile.email}`}>{profile.email}</a></li>
          <li><a href={profile.linkedin} target="_blank" rel="noopener">LinkedIn</a></li>
          <li><a href={profile.github} target="_blank" rel="noopener">GitHub</a></li>
          <li><a href={profile.architectureUrl} target="_blank" rel="noopener">GenAI reference architecture</a></li>
        </ul>
        <p className="dim small">© {new Date().getFullYear()} {profile.shortName}</p>
      </div>
    </footer>
  );
}
