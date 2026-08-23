package com.nikkukumar.portfolio.contact;
import java.time.Instant; import jakarta.persistence.*;
@Entity public class ContactMessage {
 @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Long id; private String name; private String email; private String subject; @Column(length=4000) private String message; private Instant createdAt;
 protected ContactMessage(){} public ContactMessage(String name,String email,String subject,String message){this.name=name;this.email=email;this.subject=subject;this.message=message;this.createdAt=Instant.now();}
}
