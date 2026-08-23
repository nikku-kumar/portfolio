package com.nikkukumar.portfolio.skill;
import java.util.List; import org.springframework.data.jpa.repository.JpaRepository;
public interface SkillRepository extends JpaRepository<SkillGroup,Long>{List<SkillGroup> findAllByOrderByDisplayOrderAsc();}
