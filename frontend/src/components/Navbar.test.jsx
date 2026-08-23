import {fireEvent,render,screen} from '@testing-library/react';
import {expect,test} from 'vitest';
import Navbar from './Navbar';

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
