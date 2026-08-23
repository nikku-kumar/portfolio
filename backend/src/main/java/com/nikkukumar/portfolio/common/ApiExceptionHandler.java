package com.nikkukumar.portfolio.common;
import java.time.Instant; import java.util.*; import org.springframework.http.*; import org.springframework.web.bind.MethodArgumentNotValidException; import org.springframework.web.bind.annotation.*;
@RestControllerAdvice public class ApiExceptionHandler {
 @ExceptionHandler(MethodArgumentNotValidException.class) ResponseEntity<Map<String,Object>> validation(MethodArgumentNotValidException ex){
  Map<String,String> errors=new LinkedHashMap<>(); ex.getBindingResult().getFieldErrors().forEach(e->errors.putIfAbsent(e.getField(),e.getDefaultMessage()));
  return ResponseEntity.badRequest().body(Map.of("timestamp",Instant.now().toString(),"status",400,"message","Validation failed","errors",errors));
 }
 @ExceptionHandler(Exception.class) ResponseEntity<Map<String,Object>> unexpected(Exception ex){return ResponseEntity.status(500).body(Map.of("timestamp",Instant.now().toString(),"status",500,"message","An unexpected error occurred."));}
}
