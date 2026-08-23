export default function Skills({groups}){
  return <section id="expertise" className="section container"><p className="eyebrow">Toolkit</p><h2>Engineering expertise</h2><div className="skills-grid">{groups.map(group=><article className="skill-card" key={group.category}><h3>{group.category}</h3><div className="tags">{group.skills.map(skill=><span key={skill}>{skill}</span>)}</div></article>)}</div></section>;
}
