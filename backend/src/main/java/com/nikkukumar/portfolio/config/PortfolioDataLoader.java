package com.nikkukumar.portfolio.config;

import java.util.List;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import com.nikkukumar.portfolio.profile.*; import com.nikkukumar.portfolio.skill.*; import com.nikkukumar.portfolio.experience.*; import com.nikkukumar.portfolio.project.*; import com.nikkukumar.portfolio.education.*;

@Configuration public class PortfolioDataLoader {
 @Bean CommandLineRunner seed(ProfileRepository profiles,SkillRepository skills,ExperienceRepository experiences,ProjectRepository projects,EducationRepository education){return args->{
  if(profiles.count()>0)return;
  profiles.save(new Profile("Nikku Kumar","Java Backend Developer | Spring Boot | Microservices | REST APIs","Bangalore, India","nikku.india05@gmail.com","8207676149","https://www.linkedin.com/in/nikku-kumar-30b3a3235/","https://github.com/nikku-kumar","Java Backend Developer with 2+ years of experience delivering backend services, REST APIs, workflow automation, and database-driven enterprise applications. Delivered 30+ APIs, cut API latency by 25%, automated manual workflows by 70%, and resolved 15+ production issues."));
  skills.saveAll(List.of(
   new SkillGroup(1,"Languages",List.of("Java","SQL")), new SkillGroup(2,"Backend",List.of("Spring Boot","Spring MVC","Spring Data JPA","Hibernate","JDBC","REST APIs","Microservices")),
   new SkillGroup(3,"Databases",List.of("PostgreSQL","MySQL","SQL optimization","Joins","Indexing","Schema design")), new SkillGroup(4,"Testing",List.of("JUnit","Mockito","Postman","API testing","Unit testing")),
   new SkillGroup(5,"Tools",List.of("Git","Maven","Docker","Jenkins","DBeaver","Spring Tool Suite","WebLogic")), new SkillGroup(6,"Integration",List.of("Kafka fundamentals","API integration","Third-party system integration")),
   new SkillGroup(7,"Core Skills",List.of("OOP","Data Structures","Algorithms","LLD","REST Architecture","Exception handling","Request validation")), new SkillGroup(8,"Domain Exposure",List.of("Workflow Automation","Customer Onboarding","Approval Systems","Loan Processing","Banking & Fintech"))));
  experiences.saveAll(List.of(
   new Experience(1,"Associate Software Developer – Java Backend","Rumango Software Consultancy","Bangalore","Nov 2024 – Present",List.of("Delivered backend features for 2 enterprise platforms using Java, Spring Boot, REST APIs, JPA/Hibernate, JDBC, and SQL.","Engineered 30+ REST APIs with validation, centralized error handling, repository integration, and Postman testing.","Automated customer onboarding and internal workflows, reducing manual effort by 70%.","Optimized SQL queries and service-layer logic, improving response performance by 25%.","Resolved 15+ production issues and integrated CRB, IPRS, and Flexcube external systems.","Orchestrated approval workflows across 8+ business modules.")),
   new Experience(2,"Java Full Stack Developer Intern","Tap Academy Pvt. Ltd.","Bengaluru","Nov 2023 – Oct 2024",List.of("Completed an 11-month internship covering Core Java, OOP, JDBC, Servlets, JSP, Spring Boot, and MySQL.","Built REST APIs using controller, service, and repository layers.","Designed MySQL schemas and queries for CRUD, joins, and filtering.","Handled API testing, request validation, and database operations."))));
  projects.saveAll(List.of(new Project(1,"Spring Boot REST API Project",List.of("Java","Spring Boot","JPA","MySQL","REST APIs"),List.of("Built four CRUD REST APIs with layered architecture, input validation, global error handling, and Postman test cases.")),new Project(2,"Blog Application with User Roles",List.of("Java","Spring Boot","JSP","Servlets","MySQL"),List.of("Implemented Admin and Viewer access, authentication, content management, and database-backed user flows."))));
  education.save(new Education(1,"B.Tech in Computer Science","Katihar Engineering College","2019 – 2023"));
 };}
}
