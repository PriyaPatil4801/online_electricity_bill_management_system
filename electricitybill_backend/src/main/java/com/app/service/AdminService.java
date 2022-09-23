package com.app.service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.entities.Admin;
import com.app.entities.User;
import com.app.repository.AdminRepository;

@Service
public class AdminService {

	@Autowired
	AdminRepository arepo;
		
	public Admin getAdminbyuserid(int aid)
	{
		return arepo.getAdminbyuserid(aid);
	}
	
	public Admin getAdmin(int sid)
	{
		Admin c = null;
		 Optional<Admin> oc= arepo.findById(sid);
		 try
		 {
			 c = oc.get();
		 }
		 catch(NoSuchElementException e) {
			 c = null;
		 }
		 return c;
	}
	
	
	public Admin update(Admin a, int id)
	{
		arepo.save(a);
		return a;
	}
	
	public Admin saveAdmin(Admin a)
	{
		return arepo.save(a);
	}

}
