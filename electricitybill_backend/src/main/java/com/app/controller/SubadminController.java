package com.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;


import com.app.entities.Subadmin;
import com.app.entities.SubadminRegister;
import com.app.entities.User;
import com.app.service.SubadminService;
import com.app.service.UserService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class SubadminController {

	@Autowired
	SubadminService cservice;
	
	@Autowired
	UserService uservice;
	
	@GetMapping("/allSubadmin")
	public List<Subadmin> getAll()
	{
		return cservice.getAll();//no view resolver is needed so no need of view
	}
	
	@PostMapping("/regSubadmin")
	public Subadmin registerSubadmin(@RequestBody SubadminRegister sr)
	{
		System.out.println(sr);
		User u= new User(sr.getEmail(),sr.getPassword(),"subadmin");
		User inserted =uservice.register(u);
		System.out.println(u);
		//Zone z= new Zone(cr.getZone_id().getZone_name());
		//Zone inserted1 =zservice.register(z);
		//System.out.println(z);
		Subadmin c= new Subadmin(inserted,sr.getName(),sr.getMobile_no(),sr.getAddress(),sr.getCity(),sr.getEmail(),sr.getState(),sr.getZone_id());
		System.out.println(c);
		return cservice.registerSubadmin(c);
		
		
	}
}
