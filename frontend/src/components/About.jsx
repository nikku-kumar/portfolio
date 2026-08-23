export default function About({profile,principles}){
  return <section id="about" className="section about-section">
    <div className="container">
      <div className="section-heading split-heading"><div><p className="eyebrow"><span>01</span> About</p><h2>Engineering with intent, <em>not noise.</em></h2></div><p>{profile.summary} I care about how a system behaves after release: under real data, real workflows, and real operational pressure.</p></div>
      <div className="principles-grid">{principles.map(item=><article className="principle-card" key={item.number}><span>{item.number}</span><div className="principle-icon" aria-hidden="true">{item.number==='01'?'⌘':item.number==='02'?'↗':'◎'}</div><h3>{item.title}</h3><p>{item.description}</p></article>)}</div>
      <div className="about-meta"><span>Based in {profile.location}</span><a href={`mailto:${profile.email}`}>{profile.email} <i aria-hidden="true">↗</i></a></div>
    </div>
  </section>;
}
