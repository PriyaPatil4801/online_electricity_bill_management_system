package com.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.app.entities.Bill;

@Transactional
@Repository
public interface BillRepository extends JpaRepository<Bill, Integer>  {

	//@Query("insert into Bill values()")
	//public Bill generateBill(@Param("c") int consumer_id);
}
