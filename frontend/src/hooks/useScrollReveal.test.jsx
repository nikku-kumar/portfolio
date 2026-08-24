import {act,render} from '@testing-library/react';
import {afterEach,expect,test,vi} from 'vitest';
import {useScrollReveal} from './useScrollReveal';

function Harness(){
  useScrollReveal();
  return <section data-reveal>Evidence</section>;
}

afterEach(()=>vi.unstubAllGlobals());

test('reveals observed content and stops observing it',()=>{
  let callback;
  const unobserve=vi.fn();
  vi.stubGlobal('IntersectionObserver',class{
    constructor(next){callback=next;}
    observe=vi.fn();
    unobserve=unobserve;
    disconnect=vi.fn();
  });
  const {container}=render(<Harness/>);
  const section=container.querySelector('[data-reveal]');
  act(()=>callback([{isIntersecting:true,target:section}]));
  expect(section).toHaveClass('is-visible');
  expect(unobserve).toHaveBeenCalledWith(section);
});

test('leaves content visible when IntersectionObserver is unavailable',()=>{
  vi.stubGlobal('IntersectionObserver',undefined);
  const {container}=render(<Harness/>);
  expect(container.querySelector('[data-reveal]')).toHaveClass('is-visible');
});

test('disconnects the observer when the reveal owner unmounts',()=>{
  const disconnect=vi.fn();
  vi.stubGlobal('IntersectionObserver',class{
    observe=vi.fn();
    unobserve=vi.fn();
    disconnect=disconnect;
  });
  const {unmount}=render(<Harness/>);
  unmount();
  expect(disconnect).toHaveBeenCalledOnce();
  expect(document.documentElement).not.toHaveClass('js');
});
