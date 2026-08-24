export default function Education({items}){
  return <section id="education" className="section education-section" data-reveal><div className="container">
    <div className="section-heading"><p className="eyebrow"><span>05</span> Education</p><h2>Foundation for <em>practical engineering.</em></h2></div>
    {items.map(item=><article className="education-card" key={item.degree}><span className="education-mark" aria-hidden="true">CS</span><div><p className="period">{item.period}</p><h3>{item.degree}</h3><p>{item.institution}</p></div><span className="education-arrow" aria-hidden="true">↗</span></article>)}
  </div></section>;
}
