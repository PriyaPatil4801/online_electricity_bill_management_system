package com.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.app.entities.Consumer;
import com.app.entities.Subadmin;
import com.app.entities.Zone;
import com.app.service.ZoneService;
import com.app.service.ConsumerService;

@CrossOrigin(origins = "http://localhost:3000/*")
@RestController
public class ZoneController {

	@Autowired
	ZoneService zservice;
	
	@Autowired
	ConsumerService cservice;
	
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
	
	@CrossOrigin(origins ="*")
	@GetMapping("/getAvailableZones")
	public List<Zone> getAll()
	{
		return zservice.getAll();//no view resolver is needed so no need of view
	}
	
	/*@GetMapping("/getZonebyConsumerId/{id}")
	public Zone getZonebyConsumerId(@PathVariable ("id") int Consumer_id)
	{
		Consumer c=cservice.getConsumerbyId(Consumer_id);
		
		int zone_id=c.getZone().getZone_id();
		return zservice.getZone(zone_id);
	}*/
	
}
