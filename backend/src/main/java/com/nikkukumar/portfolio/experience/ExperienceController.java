package com.nikkukumar.portfolio.experience;
import java.util.List; import org.springframework.web.bind.annotation.*;
@RestController @RequestMapping("/api/experience") public class ExperienceController {
 private final ExperienceService service; public ExperienceController(ExperienceService service){this.service=service;}
 @GetMapping public List<ExperienceDto> get(){return service.getAll();}
}
