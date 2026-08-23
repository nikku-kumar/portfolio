export default function Projects({items}){
  return <section id="projects" className="section container"><p className="eyebrow">Selected work</p><h2>Selected systems</h2><div className="project-grid">{items.map(project=><article className="project-card" key={project.name}><h3>{project.name}</h3><div className="tags">{project.technologies.map(technology=><span key={technology}>{technology}</span>)}</div><p>{project.impact}</p></article>)}</div></section>;
}
