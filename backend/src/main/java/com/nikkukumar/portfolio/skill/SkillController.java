package com.nikkukumar.portfolio.skill;
import java.util.List; import org.springframework.web.bind.annotation.*;
@RestController @RequestMapping("/api/skills") public class SkillController {
  private final SkillService service; public SkillController(SkillService service){this.service=service;}
  @GetMapping public List<SkillDto> get(){return service.getAll();}
}
