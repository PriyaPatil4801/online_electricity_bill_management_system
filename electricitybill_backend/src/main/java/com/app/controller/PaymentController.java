package com.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.app.entities.Bill;
import com.app.entities.Consumer;
import com.app.entities.Payment;
import com.app.entities.PaymentGenerator;
import com.app.entities.Zone;
import com.app.service.BillService;
import com.app.service.ConsumerService;
import com.app.service.PaymentService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class PaymentController {

	@Autowired
	PaymentService pservice;
	
	@Autowired
	ConsumerService cservice;
	
	@Autowired
	BillService bservice;
	
	@CrossOrigin(origins = "*")
	@PostMapping("/makePayment")
	public Payment makepayment(@RequestBody PaymentGenerator p)
	{	
		Consumer c =cservice.getConsumerbyId(p.getConsumer_id1());
		Bill  b= bservice.getBillbyId(p.getBill_id());
		Payment pay=new Payment(c,b,p.getName(),p.getPayment_date(),p.getTotal_billAmt(),p.getCard_type(),p.getCard_no(),p.getCvv(),p.getExp_date() );	
		bservice.updateStatusToPaid(p.getBill_id());
		return pservice.makepayment(pay);
	}

	@GetMapping("/getPayment/{id}")
	public List<Payment> getPayment(@PathVariable ("id") int consumer_id)
	{
		return pservice.getPayment(consumer_id);
	}
}
