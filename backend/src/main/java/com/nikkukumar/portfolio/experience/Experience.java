package com.nikkukumar.portfolio.experience;
import java.util.*; import jakarta.persistence.*;
@Entity public class Experience {
  @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Long id; private int displayOrder; private String role; private String company; private String location; private String period;
  @ElementCollection @CollectionTable(name="experience_highlights") @Column(name="highlight",length=1000) private List<String> highlights=new ArrayList<>();
  protected Experience(){} public Experience(int displayOrder,String role,String company,String location,String period,List<String> highlights){this.displayOrder=displayOrder;this.role=role;this.company=company;this.location=location;this.period=period;this.highlights=highlights;}
  public int getDisplayOrder(){return displayOrder;} public String getRole(){return role;} public String getCompany(){return company;} public String getLocation(){return location;} public String getPeriod(){return period;} public List<String> getHighlights(){return highlights;}
}
