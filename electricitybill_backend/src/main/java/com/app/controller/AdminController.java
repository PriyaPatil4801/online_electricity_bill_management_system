package com.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.app.entities.Admin;
import com.app.service.AdminService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class AdminController {

	@Autowired
	AdminService aservice;
	
	@CrossOrigin(origins = "*")
	@GetMapping("/getAdmin/{id}")
	public Admin getAdminbyuserid(@PathVariable ("id") int user_id)
	{
		return aservice.getAdminbyuserid(user_id);
	}
	
	@CrossOrigin(origins = "*")
	@GetMapping("/getAdminbyid/{id}")
	public Admin getAdmin(@PathVariable ("id") int admin_id)
	{
		return aservice.getAdmin(admin_id);
	}
	
	/*@PostMapping("/updateAdmin/{id}")
	public Admin updateAdmin(@RequestBody Admin a,@PathVariable ("id") int id )
	{
		aservice.saveAdmin(a);
		return a;
	}*/
	
	@CrossOrigin(origins = "*")
	@PostMapping("/updateAdmin/{id}")
	public Admin updateAdmin(@RequestBody Admin a,@PathVariable ("id") int id )
	{
		aservice.update(a,id);
		return a;
	}
	
	
	
}
