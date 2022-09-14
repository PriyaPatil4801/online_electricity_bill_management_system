package com.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.app.entities.Subadmin;

@Transactional
@Repository
public interface SubadminRepository extends JpaRepository<Subadmin, Integer> {

}
