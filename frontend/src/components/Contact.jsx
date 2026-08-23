export default function Contact({profile}){
  return <section id="contact" className="section container"><p className="eyebrow">Contact</p><h2>Let’s build something dependable.</h2><a href={`mailto:${profile.email}`}>Email {profile.name}</a></section>;
}
