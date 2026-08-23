package com.nikkukumar.portfolio.education;
import java.util.List; import org.springframework.web.bind.annotation.*;
@RestController @RequestMapping("/api/education") public class EducationController {
 private final EducationService service; public EducationController(EducationService service){this.service=service;}
 @GetMapping public List<EducationDto> get(){return service.getAll();}
}
