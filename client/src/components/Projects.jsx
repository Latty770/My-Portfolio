export default function Projects({ projects = [], companyUrl }) {
  const withImages = projects.filter((project) => project.image);
  const rest = projects.filter((project) => !project.image);

  return (
    <section id="work" className="section projects">
      <div className="container">
        <div className="section-rule">
          <p className="section-label">Work</p>
          <span className="section-line" aria-hidden="true" />
        </div>
        <div className="work-intro">
          <h2 className="section-title">Platforms in production</h2>
          <p className="section-lead">
            Screens from Zerion products used by SACCOs and hospitality teams.
            {companyUrl ? (
              <>
                {' '}
                <a className="text-link" href={companyUrl} target="_blank" rel="noreferrer">
                  Company website
                </a>
              </>
            ) : null}
          </p>
        </div>
      </div>

      <div className="work-stack">
        {withImages.map((project) => (
          <article className="work-shot shot-card" key={project.title}>
            <div className="work-frame">
              <img
                src={project.image}
                alt={project.imageAlt || project.title}
                loading="lazy"
              />
            </div>
            <div className="work-caption">
              <div>
                <p className="work-kind">{project.kind}</p>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
              </div>
              <p className="work-stack-list">{(project.stack || []).join(' / ')}</p>
            </div>
          </article>
        ))}
      </div>

      {rest.length ? (
        <div className="container">
          <div className="project-list">
            {rest.map((project) => (
              <article className="project-row" key={project.title}>
                <p className="work-kind">{project.kind || 'Work'}</p>
                <div>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                </div>
                <p className="work-stack-list">{(project.stack || []).join(' / ')}</p>
              </article>
            ))}
          </div>
          {companyUrl ? (
            <div className="work-cta">
              <a className="btn btn-primary" href={companyUrl} target="_blank" rel="noreferrer">
                Explore Zerion
              </a>
            </div>
          ) : null}
        </div>
      ) : null}
    </section>
  );
}
