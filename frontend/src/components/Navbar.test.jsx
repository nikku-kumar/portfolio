import {act,fireEvent,render,screen} from '@testing-library/react';
import {afterEach,beforeEach,expect,test,vi} from 'vitest';
import Navbar from './Navbar';

let observerCallback;

beforeEach(()=>{
  observerCallback=undefined;
  vi.stubGlobal('IntersectionObserver',class{
    constructor(callback){observerCallback=callback;}
    observe=vi.fn();
    disconnect=vi.fn();
  });
});

afterEach(()=>{
  vi.unstubAllGlobals();
  Object.defineProperty(window,'scrollY',{configurable:true,value:0});
});

test('exposes all section destinations',()=>{
  render(<Navbar/>);
  for(const [name,href] of [['About','#about'],['Expertise','#expertise'],['Experience','#experience'],['Projects','#projects'],['Education','#education'],['Contact','#contact']]){
    expect(screen.getByRole('link',{name})).toHaveAttribute('href',href);
  }
});

test('toggles and closes the mobile navigation',()=>{
  render(<Navbar/>);
  const toggle=screen.getByRole('button',{name:/open navigation/i});
  expect(toggle).toHaveAttribute('aria-expanded','false');
  fireEvent.click(toggle);
  expect(toggle).toHaveAttribute('aria-expanded','true');
  fireEvent.click(screen.getByRole('link',{name:'Projects'}));
  expect(toggle).toHaveAttribute('aria-expanded','false');
});

test('marks the visible destination as current',()=>{
  render(<Navbar/>);
  act(()=>observerCallback([{isIntersecting:true,target:{id:'projects'}}]));
  expect(screen.getByRole('link',{name:'Projects'})).toHaveAttribute('aria-current','page');
});

test('closes the mobile navigation with Escape',()=>{
  render(<Navbar/>);
  const toggle=screen.getByRole('button',{name:/open navigation/i});
  fireEvent.click(toggle);
  fireEvent.keyDown(document,{key:'Escape'});
  expect(toggle).toHaveAttribute('aria-expanded','false');
});

test('separates the sticky header after scrolling',()=>{
  render(<Navbar/>);
  Object.defineProperty(window,'scrollY',{configurable:true,value:24});
  fireEvent.scroll(window);
  expect(document.querySelector('.site-header')).toHaveAttribute('data-scrolled','true');
});
