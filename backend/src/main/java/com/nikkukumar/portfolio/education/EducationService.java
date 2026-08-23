package com.nikkukumar.portfolio.education;
import java.util.List; import org.springframework.stereotype.Service;
@Service public class EducationService { private final EducationRepository repository; public EducationService(EducationRepository repository){this.repository=repository;} public List<EducationDto> getAll(){return repository.findAllByOrderByDisplayOrderAsc().stream().map(e->new EducationDto(e.getDegree(),e.getInstitution(),e.getPeriod())).toList();} }
