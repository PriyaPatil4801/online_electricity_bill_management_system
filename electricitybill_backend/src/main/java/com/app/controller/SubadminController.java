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

import com.app.entities.Consumer;
import com.app.entities.Subadmin;
import com.app.entities.SubadminRegister;
import com.app.entities.User;
import com.app.entities.Zone;
import com.app.service.SubadminService;
import com.app.service.UserService;
import com.app.service.ZoneService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class SubadminController {

	@Autowired
	SubadminService sservice;
	
	@Autowired
	UserService uservice;
	
	@Autowired
	ZoneService zservice;
	
	@GetMapping("/allSubadmin")
	public List<Subadmin> getAll()
	{
		return sservice.getAll();//no view resolver is needed so no need of view
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
		Zone zoneid =zservice.getZone(Integer.parseInt(sr.getZone_id()));
		Subadmin c= new Subadmin(inserted,sr.getName(),sr.getMobile_no(),sr.getAddress(),sr.getCity(),sr.getEmail(),sr.getState(),zoneid);
		System.out.println(c);
		return sservice.registerSubadmin(c);
	}
	
	@GetMapping("/deleteSubadmin/{pid}")
	public int delete(@PathVariable ("pid") int  id)
	{
		return sservice.delete(id);
		 
	}
	
	@GetMapping("/getSubAdminsByZone/{zid}")
	public List<Subadmin> getbyZone(@PathVariable ("zid") int zone_id)
	{
		return sservice.getbyZone(zone_id);
	}
	
	@PostMapping("/updateSubadmin/{id}")
	public Subadmin updateSubadmin(@RequestBody Subadmin a,@PathVariable ("id") int id )
	{
		sservice.update(a,id);
		return a;
	}
	
	@GetMapping("/getSubAdmin/{id}")
	public Subadmin getSubAdminbyuserid(@PathVariable ("id") int user_id)
	{
		return sservice.getSubadminbyuserid(user_id);
	}
	
	
}
