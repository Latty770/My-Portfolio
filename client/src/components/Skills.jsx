export default function Skills({ skills = [] }) {
  return (
    <section id="skills" className="section skills">
      <div className="container">
        <div className="section-rule">
          <p className="section-label">Skills</p>
          <span className="section-line" aria-hidden="true" />
        </div>
        <h2 className="section-title">Technical range</h2>

        <div className="skills-strip">
          {skills.map((group) => (
            <div className="skill-band" key={group.group}>
              <h3>{group.group}</h3>
              <p>{(group.items || []).join(' · ')}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
