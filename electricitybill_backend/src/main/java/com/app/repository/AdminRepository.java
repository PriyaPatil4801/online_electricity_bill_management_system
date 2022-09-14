package com.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.app.entities.Admin;

@Transactional
@Repository
public interface AdminRepository extends JpaRepository<Admin, Integer> {

}
