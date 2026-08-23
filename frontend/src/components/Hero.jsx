export default function Hero({profile,metrics}){
  return <section id="home" className="hero container">
    <p className="eyebrow">{profile.name}</p>
    <h1>Java backend engineer building systems that hold up.</h1>
    <p className="hero-copy">{profile.summary}</p>
    <div className="actions"><a className="button primary" href="#projects">Explore my work</a><a className="button secondary" href={profile.github} target="_blank" rel="noreferrer">View GitHub</a></div>
    <ul className="hero-metrics">{metrics.map(metric=><li key={metric.label}><strong>{metric.value}</strong><span>{metric.label}</span></li>)}</ul>
  </section>;
}
