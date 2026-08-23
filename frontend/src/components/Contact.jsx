export default function Contact({profile}){
  const emailHref=`mailto:${profile.email}?subject=Java%20backend%20opportunity`;
  return <section id="contact" className="section contact-section"><div className="container contact-inner">
    <div><p className="eyebrow"><span>06</span> Contact</p><h2>Let’s build something <em>dependable.</em></h2><p>I’m open to Java backend roles, thoughtful collaborations, and conversations about systems that need to scale with clarity.</p></div>
    <div className="contact-actions"><p><span className="status-dot"/>Available for opportunities</p><a className="contact-primary" href={emailHref}>Start a conversation <span aria-hidden="true">↗</span></a><div><a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a><a href={profile.github} target="_blank" rel="noreferrer">GitHub ↗</a></div></div>
  </div></section>;
}
