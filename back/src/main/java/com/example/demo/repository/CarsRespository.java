package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.demo.entity.Car;

public interface CarsRespository extends JpaRepository<Car, Long> {
  // get total cars by etat
  @Query("SELECT COUNT(c) FROM Car c WHERE c.etat = :etat")
  long countByEtat(String etat);

}
