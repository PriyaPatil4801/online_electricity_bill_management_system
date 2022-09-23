package com.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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
	
	@CrossOrigin(origins ="*")
	@PostMapping("/addzone")
	public Zone add(@RequestBody Zone z)
	{
		Zone zone= new Zone(z.getZone_name());
		return zservice.add(zone);
	}
	
	@CrossOrigin(origins ="*")
	@GetMapping("/delete/{pid}")
	public int delete(@PathVariable ("pid") int  id)
	{
		return zservice.delete(id);
		 
	}
	
}
