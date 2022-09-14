package com.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.entities.Admin;
import com.app.service.AdminService;


@RestController
public class AdminController {

	@Autowired
	AdminService aservice;
	
	@GetMapping("/allAdmin")
	public List<Admin> getAll()
	{
		return aservice.getAll();//no view resolver is needed so no need of view
	}
	

}
