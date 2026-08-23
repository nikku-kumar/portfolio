package com.nikkukumar.portfolio.education;
import jakarta.persistence.*;
@Entity public class Education {
 @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Long id; private int displayOrder; private String degree; private String institution; private String period;
 protected Education(){} public Education(int order,String degree,String institution,String period){this.displayOrder=order;this.degree=degree;this.institution=institution;this.period=period;}
 public int getDisplayOrder(){return displayOrder;} public String getDegree(){return degree;} public String getInstitution(){return institution;} public String getPeriod(){return period;}
}
