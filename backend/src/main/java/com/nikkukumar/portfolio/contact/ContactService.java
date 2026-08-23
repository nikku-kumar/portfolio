package com.nikkukumar.portfolio.contact;
import org.springframework.stereotype.Service;
@Service public class ContactService {
 private final ContactRepository repository; public ContactService(ContactRepository repository){this.repository=repository;}
 public void save(ContactRequest r){repository.save(new ContactMessage(r.name().trim(),r.email().trim(),r.subject().trim(),r.message().trim()));}
}
