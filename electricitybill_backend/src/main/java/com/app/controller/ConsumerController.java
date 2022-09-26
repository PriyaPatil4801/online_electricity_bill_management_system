package com.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.app.entities.Admin;
import com.app.entities.Consumer;
import com.app.entities.ConsumerRegister;
import com.app.entities.User;
import com.app.entities.Zone;
import com.app.service.ConsumerService;
import com.app.service.UserService;
import com.app.service.ZoneService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class ConsumerController {

	@Autowired
	ConsumerService cservice;
	
	@Autowired
	UserService uservice;
	
	@Autowired
	ZoneService zservice;
	
	@PostMapping("/regConsumer")
	public Consumer registerConsumer(@RequestBody ConsumerRegister cr)
	{
		System.out.println(cr);
		User u= new User(cr.getEmail(),cr.getPassword(),"consumer");
		User inserted =uservice.register(u);
		//System.out.println(u);
		//Zone z= new Zone(cr.getZone_id().getZone_name());
		Zone zoneid =zservice.getZone(Integer.parseInt(cr.getZone_id()));
		//System.out.println(z);
		Consumer c= new Consumer(inserted,cr.getName(),cr.getMobile_no(),cr.getAddress(),cr.getCity(),cr.getEmail(),cr.getState(),zoneid);
		//System.out.println(c);
		return cservice.registerConsumer(c);
			
	}
	@GetMapping("/deleteConsumer/{pid}")
	public int delete(@PathVariable ("pid") int  id)
	{
		return cservice.delete(id);
		 
	}
	
	@GetMapping("/getConsumersByZone/{zid}")
	public List<Consumer> getbyZone(@PathVariable ("zid") int zone_id)
	{
		return cservice.getbyZone(zone_id);
	}
	
	@CrossOrigin(origins = "*")
	@PostMapping("/updateConsumer/{id}")
	public Consumer updateAdmin(@RequestBody Consumer c,@PathVariable ("id") int id )
	{
		cservice.update(c,id);
		return c;
	}
	
	@GetMapping("/getConsumer/{id}")
	public Consumer getConsumerbyuserid(@PathVariable ("id") int user_id)
	{
		return cservice.getConsumerbyuserid(user_id);
	}
}
