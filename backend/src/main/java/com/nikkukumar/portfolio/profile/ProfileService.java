package com.nikkukumar.portfolio.profile;
import org.springframework.stereotype.Service;
@Service public class ProfileService {
  private final ProfileRepository repository;
  public ProfileService(ProfileRepository repository){this.repository=repository;}
  public ProfileDto get(){ Profile p=repository.findAll().stream().findFirst().orElseThrow(); return new ProfileDto(p.getName(),p.getTitle(),p.getLocation(),p.getEmail(),p.getPhone(),p.getLinkedin(),p.getGithub(),p.getSummary()); }
}
