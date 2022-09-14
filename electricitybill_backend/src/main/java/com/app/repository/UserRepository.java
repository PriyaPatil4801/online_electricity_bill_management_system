package com.app.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.app.entities.User;

@Transactional
@Repository
public interface UserRepository extends JpaRepository<User, Integer>{
	@Query("select u from User u where email=:e and password=:p")
	Optional<User> Login(@Param("e") String email,@Param("p") String password);
}
