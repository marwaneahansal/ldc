package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.example.demo.entity.Admin;
import com.example.demo.repository.AdminRepository;

@Component
public class AdminSeeder implements CommandLineRunner {
  @Autowired
  private AdminRepository adminRepository;
  @Autowired
  private PasswordEncoder passwordEncoder;
  
  @Override
  public void run(String... args) throws Exception {
    if (adminRepository.count() == 0) {
      System.out.println("Creating admin...");
      // Create admin
      Admin admin = new Admin();
      admin.setNom("Admin");
      admin.setPrenom("Admin");
      admin.setEmail("admin@admin.com");
      admin.setPassword(passwordEncoder.encode("admin"));
      admin.setAdresse("Address");
      admin.setNumero_tel("1234567890");
      adminRepository.save(admin);
      System.out.println("Admin created!!");
    }
  }
}
