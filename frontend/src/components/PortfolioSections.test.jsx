import {render,screen,within} from '@testing-library/react';
import {expect,test} from 'vitest';
import App from '../App';

test('renders curated expertise and verified experience evidence',()=>{
  render(<App/>);
  const expertise=document.querySelector('#expertise');
  expect(within(expertise).getByRole('heading',{name:'Core Java'})).toBeInTheDocument();
  expect(within(expertise).getByRole('heading',{name:'Spring Ecosystem'})).toBeInTheDocument();
  expect(screen.getByText(/8\+ business modules/i)).toBeInTheDocument();
  expect(screen.getByText(/CRB, IPRS, and Flexcube/i)).toBeInTheDocument();
});

test('presents projects as case studies',()=>{
  render(<App/>);
  const projects=document.querySelector('#projects');
  expect(within(projects).getByRole('heading',{name:'Spring Boot REST API Project'})).toBeInTheDocument();
  expect(within(projects).getAllByText('Problem')).toHaveLength(2);
  expect(within(projects).getAllByText('Architecture')).toHaveLength(2);
  expect(within(projects).getAllByText('Impact')).toHaveLength(2);
});

test('uses a direct email action that works on static hosting',()=>{
  render(<App/>);
  expect(screen.getByRole('link',{name:/start a conversation/i})).toHaveAttribute('href','mailto:nikku.india05@gmail.com?subject=Java%20backend%20opportunity');
  expect(screen.queryByRole('button',{name:/send message/i})).not.toBeInTheDocument();
});
