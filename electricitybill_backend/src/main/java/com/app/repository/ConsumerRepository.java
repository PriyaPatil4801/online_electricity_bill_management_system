package com.app.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.app.entities.Consumer;

@Transactional
@Repository
public interface ConsumerRepository extends JpaRepository<Consumer, Integer> {

	@Query("select c from Consumer c where zone_id=:z")
	public List<Consumer> getbyZone(@Param("z") int zone_id);
	
	@Query("Select a from Consumer a where user_id=:i")
	public Consumer getConsumerbyuserid(@Param("i") int user_id);
}
