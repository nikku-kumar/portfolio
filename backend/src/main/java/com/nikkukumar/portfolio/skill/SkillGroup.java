package com.nikkukumar.portfolio.skill;
import java.util.*; import jakarta.persistence.*;
@Entity public class SkillGroup {
  @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Long id; private int displayOrder; private String category;
  @ElementCollection @CollectionTable(name="skill_items") @Column(name="skill") private List<String> skills=new ArrayList<>();
  protected SkillGroup(){} public SkillGroup(int displayOrder,String category,List<String> skills){this.displayOrder=displayOrder;this.category=category;this.skills=skills;}
  public int getDisplayOrder(){return displayOrder;} public String getCategory(){return category;} public List<String> getSkills(){return skills;}
}
