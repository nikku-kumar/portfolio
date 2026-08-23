package com.nikkukumar.portfolio.contact;
import java.util.Map; import jakarta.validation.Valid; import org.springframework.http.*; import org.springframework.web.bind.annotation.*;
@RestController @RequestMapping("/api/contact") public class ContactController {
 private final ContactService service; public ContactController(ContactService service){this.service=service;}
 @PostMapping public ResponseEntity<Map<String,String>> submit(@Valid @RequestBody ContactRequest request){service.save(request);return ResponseEntity.status(HttpStatus.CREATED).body(Map.of("message","Thanks! Your message has been received."));}
}
