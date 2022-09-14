package com.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.app.entities.Zone;
import com.app.service.ZoneService;

@CrossOrigin(origins = "http://localhost:3000/*")
@RestController
public class ZoneController {

	@Autowired
	ZoneService zservice;
	
	@PostMapping("/addzone")
	public Zone add(@RequestBody Zone z)
	{
		return zservice.add(z);
	}
	
}
