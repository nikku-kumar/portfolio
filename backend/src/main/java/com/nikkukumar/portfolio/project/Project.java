package com.nikkukumar.portfolio.project;
import java.util.*; import jakarta.persistence.*;
@Entity @Table(name="portfolio_projects") public class Project {
 @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Long id; private int displayOrder; private String name;
 @ElementCollection @CollectionTable(name="project_technologies") @Column(name="technology") private List<String> technologies=new ArrayList<>();
 @ElementCollection @CollectionTable(name="project_highlights") @Column(name="highlight",length=1000) private List<String> highlights=new ArrayList<>();
 protected Project(){} public Project(int order,String name,List<String> technologies,List<String> highlights){this.displayOrder=order;this.name=name;this.technologies=technologies;this.highlights=highlights;}
 public int getDisplayOrder(){return displayOrder;} public String getName(){return name;} public List<String> getTechnologies(){return technologies;} public List<String> getHighlights(){return highlights;}
}
