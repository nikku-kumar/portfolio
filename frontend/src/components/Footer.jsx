export default function Footer({profile}){
  return <footer className="site-footer"><div className="container footer-inner"><p><span className="footer-brand">NK<i>.</i></span> Designed and built by Nikku Kumar</p><p>© {new Date().getFullYear()} / Bangalore, India</p><div><a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a><a href={profile.github} target="_blank" rel="noreferrer">GitHub</a><a href="#home">Back to top ↑</a></div></div></footer>;
}
