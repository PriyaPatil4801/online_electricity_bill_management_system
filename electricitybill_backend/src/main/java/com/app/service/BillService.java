package com.app.service;

import java.util.List;

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
	
	public Bill fetchBill(int consumer_id)
	{
		 return brepo.fetchBill(consumer_id);
		 
	}
	
	public int carryForwardBill(int bill_id)
	{
		 return brepo.carryForwardBill(bill_id);
		 
	}
	
	public List<Bill> getBill(int consumer_id)
	{
		return brepo.getBill(consumer_id);
	}
	
	public Bill getBillbyId(int id)
	{
		return brepo.findById(id).get();
	}
	
	public int updateStatusToPaid(int bill_id)
	{
		 return brepo.updateStatusToPaid(bill_id);
		 
	}
	
}
