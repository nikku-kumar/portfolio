export default function Hero({profile,metrics}){
  return <section id="home" className="hero container">
    <div className="hero-copy-column">
      <p className="availability"><span/>Available for Java backend opportunities</p>
      <p className="eyebrow"><span>{profile.name}</span><small aria-hidden="true"> / {profile.location}</small></p>
      <h1>Java backend engineer <em>building systems</em> that hold up.</h1>
      <p className="hero-copy">{profile.summary}</p>
      <div className="actions">
        <a className="button primary" href="#projects">Explore my work <span aria-hidden="true">↘</span></a>
        <a className="button secondary" href={profile.resume} download="Nikku-Kumar-Resume.pdf">Download resume <span aria-hidden="true">↓</span></a>
      </div>
    </div>
    <aside className="profile-panel" aria-label={`${profile.name} profile overview`}>
      <div className="profile-portrait">
        <img
          src={profile.profileImage}
          alt={`${profile.name} profile`}
          width="480"
          height="560"
          loading="eager"
          decoding="async"
          onError={(event)=>event.currentTarget.closest('.profile-portrait')?.classList.add('is-empty')}
        />
        <span className="profile-status"><i aria-hidden="true"/>Open to opportunities</span>
      </div>
      <div className="profile-meta">
        <div><span>Role</span><strong>{profile.role}</strong></div>
        <div><span>Base</span><strong>{profile.location}</strong></div>
      </div>
      <div className="profile-links" aria-label="Professional profiles">
        <a href={profile.github} target="_blank" rel="noreferrer">GitHub <span aria-hidden="true">↗</span></a>
        <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn <span aria-hidden="true">↗</span></a>
      </div>
      <div className="code-card" aria-hidden="true">
        <div className="code-card-bar"><span><i/><i/><i/></span><b>DeveloperProfile.java</b><small>JAVA 17</small></div>
        <pre><code><span className="code-purple">public class</span> <span className="code-blue">DeveloperProfile</span> {'{'}{`\n`}  <span className="code-purple">private final</span> String role ={`\n`}    <span className="code-green">"Java Backend Engineer"</span>;{`\n\n`}  <span className="code-purple">private final</span> String[] stack = {'{'}{`\n`}    <span className="code-green">"Java"</span>, <span className="code-green">"Spring Boot"</span>,{`\n`}    <span className="code-green">"REST APIs"</span>, <span className="code-green">"PostgreSQL"</span>{`\n`}  {'}'};{`\n\n`}  <span className="code-purple">public</span> String build() {'{'}{`\n`}    <span className="code-purple">return</span> <span className="code-green">"Reliable systems"</span>;{`\n`}  {'}'}{`\n`}{'}'}</code></pre>
        <div className="code-card-status"><span>● SYSTEM ONLINE</span><small>{profile.location}</small></div>
      </div>
    </aside>
    <ul className="hero-metrics">{metrics.map(metric=><li key={metric.label}><strong>{metric.value}</strong><span>{metric.label}</span></li>)}</ul>
  </section>;
}
