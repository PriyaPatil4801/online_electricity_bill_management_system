package com.app.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.entities.Bill;
import com.app.repository.BillRepository;

@Service
public class BillService {

	@Autowired
	BillRepository brepo;
	
	public Bill generateBill(Bill b)
	{
		 return brepo.save(b);
		 
	}
}
