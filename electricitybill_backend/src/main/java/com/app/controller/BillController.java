package com.app.controller;


import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.app.entities.Bill;
import com.app.entities.BillGenerator;
import com.app.entities.Consumer;
import com.app.service.BillService;
import com.app.service.ConsumerService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class BillController {
	
	@Autowired
	BillService bservice;
	
	@Autowired
	ConsumerService cservice;

	@CrossOrigin(origins = "*")
	@PostMapping("/addNewBill")
	public Bill generateBill(@RequestBody BillGenerator b) //zservice.getZone(Integer.parseInt(cr.getZone_id()));
	{	Consumer c= cservice.getConsumerbyId(b.getConsumer_id());
		//Date d1=new SimpleDateFormat("yyyy-MM-dd").parse(b.getBill_date());
		//Date d2=new SimpleDateFormat("yyyy-MM-dd").parse(b.getDue_date());
		Bill bill=new Bill(c, b.getUnits(), b.getCurrent_billAmt(), b.getDues(), b.getFine(),b.getTotal_billAmt(), b.getTax(),b.getBill_date(), b.getDue_date(), b.getStatus());	
		return bservice.generateBill(bill);
	}
	
	@CrossOrigin(origins = "*")
	@GetMapping("/fetchPendingBill/{id}")
	public Bill fetchBill(@PathVariable ("id") int consumer_id) {
		return bservice.fetchBill(consumer_id);
	}
	
	@CrossOrigin(origins = "*")
	@PostMapping("/carryforwardPendingBill/{id}")
	public int carryForwardBill(@PathVariable ("id") int bill_id) {
		return bservice.carryForwardBill(bill_id);
	}
	
	@GetMapping("/getBill/{id}")
	public List<Bill> getBill(@PathVariable ("id") int consumer_id)
	{
		return bservice.getBill(consumer_id);
	}
	
}
