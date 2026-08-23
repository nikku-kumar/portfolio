package com.nikkukumar.portfolio.profile;
import org.springframework.web.bind.annotation.*;
@RestController @RequestMapping("/api/profile") public class ProfileController {
  private final ProfileService service; public ProfileController(ProfileService service){this.service=service;}
  @GetMapping public ProfileDto get(){return service.get();}
}
