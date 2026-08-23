package com.nikkukumar.portfolio.project;
import java.util.List; import org.springframework.web.bind.annotation.*;
@RestController @RequestMapping("/api/projects") public class ProjectController {
 private final ProjectService service; public ProjectController(ProjectService service){this.service=service;}
 @GetMapping public List<ProjectDto> get(){return service.getAll();}
}
