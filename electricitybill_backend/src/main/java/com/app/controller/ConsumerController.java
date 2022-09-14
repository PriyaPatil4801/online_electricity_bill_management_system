package com.app.controller;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.app.entities.Consumer;
import com.app.entities.ConsumerRegister;
import com.app.entities.User;

import com.app.service.ConsumerService;
import com.app.service.UserService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class ConsumerController {

	@Autowired
	ConsumerService cservice;
	
	@Autowired
	UserService uservice;
	
	
	@PostMapping("/regConsumer")
	public Consumer registerConsumer(@RequestBody ConsumerRegister cr)
	{
		System.out.println(cr);
		User u= new User(cr.getEmail(),cr.getPassword(),"consumer");
		User inserted =uservice.register(u);
		System.out.println(u);
		//Zone z= new Zone(cr.getZone_id().getZone_name());
		//Zone inserted1 =zservice.register(z);
		//System.out.println(z);
		Consumer c= new Consumer(inserted,cr.getName(),cr.getMobile_no(),cr.getAddress(),cr.getCity(),cr.getEmail(),cr.getState(),cr.getZone_id());
		System.out.println(c);
		return cservice.registerConsumer(c);
		
		
	}
}
