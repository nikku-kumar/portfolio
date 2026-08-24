import {useEffect} from 'react';

export function useScrollReveal(selector='[data-reveal]'){
  useEffect(()=>{
    const root=document.documentElement;
    const elements=[...document.querySelectorAll(selector)];
    root.classList.add('js');

    if(typeof window.IntersectionObserver!=='function'){
      elements.forEach(element=>element.classList.add('is-visible'));
      return ()=>root.classList.remove('js');
    }

    const observer=new IntersectionObserver((entries)=>{
      entries.forEach(entry=>{
        if(!entry.isIntersecting)return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    },{threshold:.12,rootMargin:'0px 0px -8% 0px'});

    elements.forEach(element=>observer.observe(element));
    return ()=>{
      observer.disconnect();
      root.classList.remove('js');
    };
  },[selector]);
}
