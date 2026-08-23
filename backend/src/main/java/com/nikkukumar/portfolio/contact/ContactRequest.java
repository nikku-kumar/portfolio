package com.nikkukumar.portfolio.contact;
import jakarta.validation.constraints.*;
public record ContactRequest(
 @NotBlank @Size(max=100) String name,
 @NotBlank @Email @Size(max=150) String email,
 @NotBlank @Size(max=150) String subject,
 @NotBlank @Size(min=10,max=2000) String message) {}
