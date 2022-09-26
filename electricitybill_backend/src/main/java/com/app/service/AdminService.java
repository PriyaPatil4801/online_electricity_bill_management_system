package com.app.service;

import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.entities.Admin;
import com.app.entities.User;
import com.app.repository.AdminRepository;
import com.app.repository.UserRepository;

@Service
public class AdminService {

	@Autowired
	AdminRepository arepo;
	
	@Autowired
	UserRepository urepo;
		
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
	
	
	/*public Admin update(Admin a, int id)
	{
		arepo.save(a);
		return a;
	}
	
	public Admin saveAdmin(Admin a)
	{
		return arepo.save(a);
	}*/

	public Admin update(Admin a,int id)
	{
		//int id=a.getAdmin_id();
		User u=urepo.findById(id).get();
		Admin ad= arepo.findById(a.getAdmin_id()).get();
		ad.setUser(u);
		ad.setName(a.getName());
		ad.setAddress(a.getAddress());
		ad.setMobile_no(a.getMobile_no());
		ad.setCity(a.getCity());
		ad.setState(a.getState());
		ad.setEmail(u.getEmail());
		return arepo.save(ad);
	}
	
	
}
