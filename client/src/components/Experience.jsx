export default function Experience({ experience = [] }) {
  return (
    <section id="experience" className="section experience">
      <div className="container">
        <div className="section-rule">
          <p className="section-label">Experience</p>
          <span className="section-line" aria-hidden="true" />
        </div>
        <h2 className="section-title">Where the work was done</h2>

        <div className="exp-table">
          {experience.map((job) => (
            <article className="exp-row timeline-item" key={`${job.org}-${job.role}-${job.period}`}>
              <p className="exp-period">{job.period}</p>
              <div className="exp-body">
                <h3>{job.role}</h3>
                <p className="exp-org">{job.org}</p>
                <p>{job.summary}</p>
                {job.highlights?.length ? (
                  <ul>
                    {job.highlights.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
