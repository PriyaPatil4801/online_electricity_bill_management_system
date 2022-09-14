package com.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;


import com.app.entities.Zone;

@Transactional
@Repository
public interface ZoneRepository extends JpaRepository<Zone, Integer> {

	@Query("select z from Zone z where zone_name= :zn")
	public Zone register(@Param("zn") String zone_name);
}
