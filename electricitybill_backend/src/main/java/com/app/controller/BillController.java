package com.app.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.app.entities.Bill;
import com.app.service.BillService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class BillController {
	
	@Autowired
	BillService bservice;

	@PostMapping("/generatebill")
	public Bill generateBill(@RequestBody Bill b)
	{
		
		Bill bill=new Bill(b.getConsumer_id(), b.getUnits(), b.getCurrent_billAmt(), b.getDues(), b.getFine(),b.getTotal_billAmt(), b.getTax(),b.getBill_date(), b.getDue_date(), b.getStatus());
		/*if (b.getUnits() <= 100)
			b.setCurrent_billAmt(0);
		else if (b.getUnits() < 250)
			b.setCurrent_billAmt((b.getUnits() - 100) * 8);
		else
			b.setCurrent_billAmt((b.getUnits() - 100) * 13);
		b.setTax(b.getCurrent_billAmt() * 0.10);
		b.setTotal_billAmt(b.getCurrent_billAmt() + b.getDues() + b.getFine() + b.getTax());
		System.out.println(b);*/
		
		return bservice.generateBill(bill);
	}
}
