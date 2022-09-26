package com.app.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.app.entities.Payment;

@Transactional
@Repository
public interface PaymentRepository extends JpaRepository<Payment, Integer>{

	@Query("select p from Payment p where consumer_id=:c")
	public List<Payment> getPayment(@Param("c") int consumer_id);
}
