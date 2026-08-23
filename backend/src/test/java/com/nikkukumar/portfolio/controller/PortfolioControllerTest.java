package com.nikkukumar.portfolio.controller;

import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
class PortfolioControllerTest {
  @Autowired MockMvc mvc;

  @Test void returnsSeededProfile() throws Exception {
    mvc.perform(get("/api/profile")).andExpect(status().isOk())
      .andExpect(jsonPath("$.name").value("Nikku Kumar"))
      .andExpect(jsonPath("$.github").value("https://github.com/nikku-kumar"));
  }
  @Test void returnsGroupedSkills() throws Exception {
    mvc.perform(get("/api/skills")).andExpect(status().isOk())
      .andExpect(jsonPath("$[*].category", hasItem("Backend")));
  }
  @Test void returnsExperience() throws Exception {
    mvc.perform(get("/api/experience")).andExpect(status().isOk())
      .andExpect(jsonPath("$[0].company").value("Rumango Software Consultancy"));
  }
  @Test void returnsProjects() throws Exception {
    mvc.perform(get("/api/projects")).andExpect(status().isOk())
      .andExpect(jsonPath("$[0].name").value("Spring Boot REST API Project"));
  }
  @Test void returnsEducation() throws Exception {
    mvc.perform(get("/api/education")).andExpect(status().isOk())
      .andExpect(jsonPath("$[0].institution").value("Katihar Engineering College"));
  }
}
