import {render,screen} from '@testing-library/react';
import {expect,test} from 'vitest';
import App from './App';

test('presents Nikku as a Java backend engineer without requesting an API',()=>{
  render(<App/>);
  expect(screen.getByRole('heading',{level:1,name:/Java backend engineer/i})).toBeInTheDocument();
  expect(screen.getByText('Nikku Kumar')).toBeInTheDocument();
  expect(screen.queryByText(/portfolio unavailable/i)).not.toBeInTheDocument();
});

test('renders a natural scrolling portfolio instead of reel controls',()=>{
  render(<App/>);
  expect(screen.getByRole('main')).toBeInTheDocument();
  expect(screen.getByRole('heading',{name:/Engineering expertise/i})).toBeInTheDocument();
  expect(screen.getByRole('heading',{name:/Selected systems/i})).toBeInTheDocument();
  expect(screen.queryByRole('button',{name:/play sequence/i})).not.toBeInTheDocument();
});

test('shows verified professional impact',()=>{
  render(<App/>);
  for(const metric of ['30+','70%','25%','15+']){
    expect(screen.getByText(metric)).toBeInTheDocument();
  }
});
