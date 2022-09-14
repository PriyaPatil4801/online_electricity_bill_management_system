package com.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.app.entities.Consumer;

@Transactional
@Repository
public interface ConsumerRepository extends JpaRepository<Consumer, Integer> {

}
