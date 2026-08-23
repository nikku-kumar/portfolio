import {useState} from 'react';

const links=[['About','#about'],['Expertise','#expertise'],['Experience','#experience'],['Projects','#projects'],['Education','#education'],['Contact','#contact']];

export default function Navbar(){
  const [menuOpen,setMenuOpen]=useState(false);
  return <header className="site-header">
    <nav className="nav container" aria-label="Primary">
      <a className="brand" href="#home" aria-label="Nikku Kumar — home"><span>NK</span><i>.</i></a>
      <button className="nav-toggle" type="button" aria-label={menuOpen?'Close navigation':'Open navigation'} aria-expanded={menuOpen} aria-controls="primary-navigation" onClick={()=>setMenuOpen(value=>!value)}><span/><span/></button>
      <div className="nav-links" id="primary-navigation" data-open={menuOpen}>
        {links.map(([label,href])=><a key={href} href={href} onClick={()=>setMenuOpen(false)}>{label}</a>)}
      </div>
      <a className="nav-cta" href="#contact">Let’s talk <span aria-hidden="true">↗</span></a>
    </nav>
  </header>;
}
