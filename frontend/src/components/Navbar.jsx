import {useEffect,useState} from 'react';

const links=[['About','#about'],['Expertise','#expertise'],['Experience','#experience'],['Projects','#projects'],['Education','#education'],['Contact','#contact']];

export default function Navbar(){
  const [menuOpen,setMenuOpen]=useState(false);
  const [activeSection,setActiveSection]=useState('home');
  const [scrolled,setScrolled]=useState(false);

  useEffect(()=>{
    if(!window.IntersectionObserver)return undefined;
    const observer=new IntersectionObserver((entries)=>{
      const visibleEntry=entries.find(entry=>entry.isIntersecting);
      if(visibleEntry)setActiveSection(visibleEntry.target.id);
    },{rootMargin:'-30% 0px -55% 0px'});
    document.querySelectorAll('main section[id]').forEach(section=>observer.observe(section));
    return ()=>observer.disconnect();
  },[]);

  useEffect(()=>{
    const handleScroll=()=>setScrolled(window.scrollY>12);
    handleScroll();
    window.addEventListener('scroll',handleScroll,{passive:true});
    return ()=>window.removeEventListener('scroll',handleScroll);
  },[]);

  useEffect(()=>{
    const handleKeyDown=(event)=>{
      if(event.key==='Escape')setMenuOpen(false);
    };
    document.addEventListener('keydown',handleKeyDown);
    return ()=>document.removeEventListener('keydown',handleKeyDown);
  },[]);

  return <header className="site-header" data-scrolled={scrolled}>
    <nav className="nav container" aria-label="Primary">
      <a className="brand" href="#home" aria-label="Nikku Kumar — home"><span>NK</span><i>.</i></a>
      <button className="nav-toggle" type="button" aria-label={menuOpen?'Close navigation':'Open navigation'} aria-expanded={menuOpen} aria-controls="primary-navigation" onClick={()=>setMenuOpen(value=>!value)}><span/><span/></button>
      <div className="nav-links" id="primary-navigation" data-open={menuOpen}>
        {links.map(([label,href])=><a key={href} href={href} aria-current={href===`#${activeSection}`?'page':undefined} onClick={()=>setMenuOpen(false)}>{label}</a>)}
      </div>
      <a className="nav-cta" href="#contact">Let’s talk <span aria-hidden="true">↗</span></a>
    </nav>
  </header>;
}
