export default function ExperienceTimeline({items}){
  return <section id="experience" className="section experience-section" data-reveal><div className="container">
    <div className="section-heading"><p className="eyebrow"><span>03</span> Career</p><h2>Experience shaped by <em>real systems.</em></h2><p>Hands-on delivery across enterprise APIs, database workflows, integrations, optimization, and production support.</p></div>
    <ol className="timeline">{items.map((item,index)=><li key={item.role+item.company}><span className="timeline-index">0{index+1}</span><article><div className="role-header"><div><time className="period">{item.period}</time><h3>{item.role}</h3><p className="company">{item.company} <span>·</span> {item.location}</p></div><span className="role-type">{index===0?'Current role':'Foundation'}</span></div><ul>{item.highlights.map(highlight=><li key={highlight}>{highlight}</li>)}</ul></article></li>)}</ol>
  </div></section>;
}
