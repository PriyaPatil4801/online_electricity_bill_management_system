package com.app.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.app.entities.Admin;
import com.app.entities.User;
import com.app.service.AdminService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class AdminController {

	@Autowired
	AdminService aservice;
	
	@GetMapping("/getAdmin/{id}")
	public Admin getAdminbyuserid(@PathVariable ("id") int user_id)
	{
		return aservice.getAdminbyuserid(user_id);
	}
	
	@GetMapping("/getAdminbyid/{id}")
	public Admin getAdmin(@PathVariable ("id") int admin_id)
	{
		return aservice.getAdmin(admin_id);
	}
	
	@PostMapping("/updateAdmin/{id}")
	public Admin updateAdmin(@RequestBody Admin st,@PathVariable ("id") int id )
	{
		aservice.saveAdmin(st);
		return st;
	}
	
	
	
}
