package com.app.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.app.entities.Subadmin;

@Transactional
@Repository
public interface SubadminRepository extends JpaRepository<Subadmin, Integer> {

	@Query("select c from Subadmin c where zone_id1=:z")
	public List<Subadmin> getbyZone(@Param("z") int zone_id);
}
