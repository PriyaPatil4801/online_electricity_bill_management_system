package com.app.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.entities.Payment;
import com.app.repository.PaymentRepository;

@Service
public class PaymentService {

	@Autowired
	PaymentRepository prepo;
	
	
	public Payment makepayment(Payment p)
	{
		 return prepo.save(p);
		 
	}
	
	public List<Payment> getPayment(int consumer_id)
	{
		return prepo.getPayment(consumer_id);
	}
}
