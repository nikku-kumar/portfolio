package com.nikkukumar.portfolio.project;
import java.util.List; import org.springframework.stereotype.Service; import org.springframework.transaction.annotation.Transactional;
@Service public class ProjectService { private final ProjectRepository repository; public ProjectService(ProjectRepository repository){this.repository=repository;} @Transactional(readOnly=true) public List<ProjectDto> getAll(){return repository.findAllByOrderByDisplayOrderAsc().stream().map(p->new ProjectDto(p.getName(),List.copyOf(p.getTechnologies()),List.copyOf(p.getHighlights()))).toList();} }
