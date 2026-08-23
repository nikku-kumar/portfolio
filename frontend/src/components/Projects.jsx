export default function Projects({items}){
  return <section id="projects" className="section projects-section"><div className="container">
    <div className="section-heading split-heading"><div><p className="eyebrow"><span>04</span> Selected work</p><h2>Selected systems, built with <em>a point of view.</em></h2></div><p>Projects presented through the engineering decisions they demonstrate—not just a list of technologies.</p></div>
    <div className="project-list">{items.map(project=><article className="project-card" key={project.name}><div className="project-number">PROJECT / {project.number}</div><div className="project-title"><h3>{project.name}</h3><p>{project.summary}</p></div><dl className="project-details"><div><dt>Problem</dt><dd>{project.problem}</dd></div><div><dt>Architecture</dt><dd>{project.architecture}</dd></div><div><dt>Impact</dt><dd>{project.impact}</dd></div></dl><div className="tags">{project.technologies.map(technology=><span key={technology}>{technology}</span>)}</div></article>)}</div>
  </div></section>;
}
