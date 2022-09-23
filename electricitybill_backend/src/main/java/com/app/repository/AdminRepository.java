package com.app.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.app.entities.Admin;
import com.app.entities.User;

@Transactional
@Repository
public interface AdminRepository extends JpaRepository<Admin, Integer> {

	@Query("Select a from Admin a where user_id2=:i")
	public Admin getAdminbyuserid(@Param("i") int user_id);
}
