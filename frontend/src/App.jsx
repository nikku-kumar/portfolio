import {useEffect,useState} from 'react'; import {getPortfolio} from './api/portfolioApi'; import './reel.css';
import Navbar from './components/Navbar'; import Hero from './components/Hero'; import About from './components/About'; import Skills from './components/Skills'; import ExperienceTimeline from './components/ExperienceTimeline'; import Projects from './components/Projects'; import Education from './components/Education'; import ContactForm from './components/ContactForm'; import Footer from './components/Footer';

const chapters = [
	{label:'Introduction', title:'A developer who ships useful things', duration:5000},
	{label:'Profile', title:'The person behind the work', duration:5000},
	{label:'Toolkit', title:'Tools for thoughtful engineering', duration:5000},
	{label:'Experience', title:'Built through real-world problems', duration:5000},
	{label:'Selected work', title:'Projects with a point of view', duration:5000},
	{label:'Education', title:'Always learning, always curious', duration:5000},
	{label:'Contact', title:'Let’s make something reliable', duration:7000},
];

export default function App(){
	const [data,setData]=useState(null); const [error,setError]=useState('');
	const [current,setCurrent]=useState(0); const [playing,setPlaying]=useState(false);
	useEffect(()=>{getPortfolio().then(setData).catch(e=>setError(e.message))},[]);
	useEffect(()=>{if(!playing)return undefined;const timer=setTimeout(()=>setCurrent(index=>(index+1)%chapters.length),chapters[current].duration);return()=>clearTimeout(timer)},[current,playing]);
	if(error)return <main className="state"><h1>Portfolio unavailable</h1><p>{error}</p><p>Start the Spring Boot API on port 8080 and refresh.</p></main>;
	if(!data)return <main className="state"><p>Loading portfolio...</p></main>;
	const chapter=chapters[current];
	const goTo=(index)=>{setCurrent((index+chapters.length)%chapters.length);setPlaying(false)};
	return <div className={`portfolio-reel chapter-${current}`}>
		<Navbar onNavigate={goTo}/>
		<div className="reel-meta container"><span>{chapter.label}</span><strong>{String(current+1).padStart(2,'0')} <small>/ {String(chapters.length).padStart(2,'0')}</small></strong></div>
		<main className="reel-content" aria-live="polite">
			{current===0&&<Hero profile={data.profile}/>} {current===1&&<About profile={data.profile}/>} {current===2&&<Skills groups={data.skills}/>} {current===3&&<ExperienceTimeline items={data.experience}/>} {current===4&&<Projects items={data.projects}/>} {current===5&&<Education items={data.education}/>} {current===6&&<ContactForm/>}
		</main>
		<div className="reel-controls container"><div className="progress-track"><span style={{width:`${((current+1)/chapters.length)*100}%`}}/></div><div className="control-row"><button className="icon-button" onClick={()=>goTo(current-1)} aria-label="Previous chapter">&#8592;</button><button className="play-button" onClick={()=>setPlaying(value=>!value)} aria-label={playing?'Pause sequence':'Play sequence'}>{playing?'||':'>'} <span>{playing?'PAUSE':'PLAY SEQUENCE'}</span></button><button className="icon-button" onClick={()=>goTo(current+1)} aria-label="Next chapter">&#8594;</button></div><div className="sequence-note"><span>{chapter.title}</span><span>{(chapter.duration/1000).toFixed(1)} sec</span></div></div>
		<Footer profile={data.profile}/>
	</div>
}
