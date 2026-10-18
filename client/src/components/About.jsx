export default function About({ profile }) {
  const paragraphs = Array.isArray(profile?.about)
    ? profile.about
    : [profile?.about].filter(Boolean);

  return (
    <section id="about" className="section about">
      <div className="container">
        <div className="section-rule">
          <p className="section-label">About</p>
          <span className="section-line" aria-hidden="true" />
        </div>
        <div className="about-block">
          <h2 className="section-title">Building systems that hold under real operations.</h2>
          <div className="about-copy">
            {paragraphs.map((text) => (
              <p key={text.slice(0, 32)}>{text}</p>
            ))}
            {profile?.companyUrl ? (
              <a className="text-link" href={profile.companyUrl} target="_blank" rel="noreferrer">
                Visit ZERION TECH SYSTEMS
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
