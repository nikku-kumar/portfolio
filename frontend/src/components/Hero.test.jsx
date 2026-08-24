import {fireEvent,render,screen} from '@testing-library/react';
import {expect,test} from 'vitest';
import Hero from './Hero';

const profile={
  name:'Nikku Kumar',
  location:'Bangalore, India',
  summary:'Java backend developer.',
  profileImage:'/uploads/profile.jfif',
  resume:'/uploads/Nikku-Kumar-Resume.pdf',
  github:'https://github.com/nikku-kumar',
  linkedin:'https://www.linkedin.com/in/nikku-kumar-30b3a3235/',
};

test('presents the verified profile, resume, and social destinations',()=>{
  render(<Hero profile={profile} metrics={[]}/>);
  expect(screen.getByRole('img',{name:'Nikku Kumar profile'})).toHaveAttribute('src','/uploads/profile.jfif');
  expect(screen.getByRole('link',{name:/download resume/i})).toHaveAttribute('href','/uploads/Nikku-Kumar-Resume.pdf');
  expect(screen.getByRole('link',{name:'GitHub'})).toHaveAttribute('href',profile.github);
  expect(screen.getByRole('link',{name:'LinkedIn'})).toHaveAttribute('href',profile.linkedin);
});

test('shows a deliberate fallback when the profile image fails',()=>{
  render(<Hero profile={profile} metrics={[]}/>);
  const image=screen.getByRole('img',{name:'Nikku Kumar profile'});
  fireEvent.error(image);
  expect(image.closest('.profile-portrait')).toHaveClass('is-empty');
});
