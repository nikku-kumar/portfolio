export default function Skills({groups}){
  return <section id="expertise" className="section expertise-section"><div className="container">
    <div className="section-heading"><p className="eyebrow"><span>02</span> Technical focus</p><h2>Engineering <em>expertise</em></h2><p>Six connected disciplines behind backend services that stay understandable, testable, and ready for production.</p></div>
    <div className="skills-grid">{groups.map(group=><article className="skill-card" key={group.category}><div className="skill-top"><span className="skill-icon">{group.icon}</span><span className="skill-arrow" aria-hidden="true">↗</span></div><h3>{group.category}</h3><p>{group.description}</p><div className="tags">{group.skills.map(skill=><span key={skill}>{skill}</span>)}</div></article>)}</div>
  </div></section>;
}
