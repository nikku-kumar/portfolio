package com.nikkukumar.portfolio.project;
import java.util.List; import org.springframework.data.jpa.repository.JpaRepository;
public interface ProjectRepository extends JpaRepository<Project,Long>{List<Project> findAllByOrderByDisplayOrderAsc();}
