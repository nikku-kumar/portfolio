import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import ExperienceTimeline from './components/ExperienceTimeline';
import Projects from './components/Projects';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';
import {portfolioData} from './data/portfolioData';
import {useScrollReveal} from './hooks/useScrollReveal';

export default function App(){
  useScrollReveal();
  const {profile,metrics,principles,skillGroups,experience,projects,education}=portfolioData;
  return <div className="site-shell" data-theme="backend-systems">
    <Navbar/>
    <main>
      <Hero profile={profile} metrics={metrics}/>
      <About profile={profile} principles={principles}/>
      <Skills groups={skillGroups}/>
      <ExperienceTimeline items={experience}/>
      <Projects items={projects}/>
      <Education items={education}/>
      <Contact profile={profile}/>
    </main>
    <Footer profile={profile}/>
  </div>;
}
