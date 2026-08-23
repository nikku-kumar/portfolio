package com.nikkukumar.portfolio.profile;

import jakarta.persistence.*;

@Entity
public class Profile {
  @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id;
  private String name; private String title; private String location; private String email; private String phone;
  private String linkedin; private String github;
  @Column(length = 2000) private String summary;
  protected Profile() {}
  public Profile(String name, String title, String location, String email, String phone, String linkedin, String github, String summary) {
    this.name=name; this.title=title; this.location=location; this.email=email; this.phone=phone; this.linkedin=linkedin; this.github=github; this.summary=summary;
  }
  public String getName(){return name;} public String getTitle(){return title;} public String getLocation(){return location;}
  public String getEmail(){return email;} public String getPhone(){return phone;} public String getLinkedin(){return linkedin;}
  public String getGithub(){return github;} public String getSummary(){return summary;}
}
