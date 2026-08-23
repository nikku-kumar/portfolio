package com.nikkukumar.portfolio.controller;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
class ContactControllerTest {
  @Autowired MockMvc mvc;

  @Test void storesValidMessage() throws Exception {
    mvc.perform(post("/api/contact").contentType(MediaType.APPLICATION_JSON)
      .content("{\"name\":\"Recruiter\",\"email\":\"recruiter@example.com\",\"subject\":\"Java role\",\"message\":\"Let us discuss an opportunity.\"}"))
      .andExpect(status().isCreated()).andExpect(jsonPath("$.message").value("Thanks! Your message has been received."));
  }
  @Test void rejectsInvalidMessageWithFieldErrors() throws Exception {
    mvc.perform(post("/api/contact").contentType(MediaType.APPLICATION_JSON)
      .content("{\"name\":\"\",\"email\":\"wrong\",\"subject\":\"\",\"message\":\"short\"}"))
      .andExpect(status().isBadRequest()).andExpect(jsonPath("$.errors.email").exists())
      .andExpect(jsonPath("$.errors.name").exists());
  }
}
