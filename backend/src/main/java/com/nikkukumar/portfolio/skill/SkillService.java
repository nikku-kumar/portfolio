package com.nikkukumar.portfolio.skill;
import java.util.List; import org.springframework.stereotype.Service; import org.springframework.transaction.annotation.Transactional;
@Service public class SkillService { private final SkillRepository repository; public SkillService(SkillRepository repository){this.repository=repository;} @Transactional(readOnly=true) public List<SkillDto> getAll(){return repository.findAllByOrderByDisplayOrderAsc().stream().map(s->new SkillDto(s.getCategory(),List.copyOf(s.getSkills()))).toList();} }
