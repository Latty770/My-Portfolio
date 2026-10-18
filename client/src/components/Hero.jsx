export default function Hero({ profile }) {
  const name = profile?.name || 'Reagan Munene';

  return (
    <section id="home" className="hero">
      <div className="hero-atmosphere" aria-hidden="true" />

      <div className="container hero-grid">
        <div className="hero-brand">
          <p className="hero-kicker">{profile?.companyRole || 'Full-Stack Engineer & Founder'}</p>
          <h1 className="hero-name">{name}</h1>
        </div>

        <div className="hero-side">
          <p className="hero-headline">
            {profile?.tagline || 'I build software people actually run their businesses on.'}
          </p>
          <p className="hero-sub">
            Founder of {profile?.company || 'ZERION TECH SYSTEMS'}. Platforms for SACCOs,
            hospitality, and enterprise operations — designed, built, and shipped end to end.
          </p>
          <div className="hero-actions">
            <a href="#work" className="btn btn-primary">Selected work</a>
            {profile?.companyUrl ? (
              <a className="btn btn-ghost" href={profile.companyUrl} target="_blank" rel="noreferrer">
                Zerion website
              </a>
            ) : (
              <a href="#contact" className="btn btn-ghost">Contact</a>
            )}
          </div>
        </div>
      </div>

      <div className="hero-rail">
        <div className="container hero-rail-inner">
          <span><em>Based</em> {profile?.location || 'Kenya'}</span>
          <span><em>Studio</em> {profile?.company || 'ZERION TECH SYSTEMS'}</span>
          <span>
            <em>GitHub</em>
            <a href={profile?.github || 'https://github.com/Latty770'} target="_blank" rel="noreferrer">
              github.com/Latty770
            </a>
          </span>
          <span>
            <em>LinkedIn</em>
            <a
              href={profile?.linkedin || 'https://www.linkedin.com/in/reagan-munene'}
              target="_blank"
              rel="noreferrer"
            >
              linkedin.com/in/reagan-munene
            </a>
          </span>
        </div>
      </div>
    </section>
  );
}
