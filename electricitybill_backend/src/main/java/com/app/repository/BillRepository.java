package com.app.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
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
	
	@Query("select b from Bill b where consumer_id=:c and status='pending'")
	public Bill fetchBill(@Param("c") int consumer_id);
	
	@Modifying
	@Query("update Bill b set  b.status='carryforward' where b.bill_id=:c and b.status='pending'")
	public int carryForwardBill(@Param("c") int bill_id);
	
	@Query("select b from Bill b where consumer_id=:c")
	public List<Bill> getBill(@Param("c") int consumer_id);
	
	@Modifying
	@Query("update Bill b set  b.status='paid' where b.bill_id=:c and b.status='pending'")
	public int updateStatusToPaid(@Param("c") int bill_id);
	
	
}
