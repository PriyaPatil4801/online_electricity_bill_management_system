import React, { useState } from 'react'
import axios from 'axios';

function RegisterSubadmin() {
    const [user, setUser] = useState({
        email: '',  
        password:'',
        name: '',
        mobile_no:'',
        address: '',
        city:'',
        state:'',
        zone_id:''
        
        
    });
    
    const onInputChange = e => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }
    const {email,password,name,mobile_no,address,city,state,zone_id} = user;
    
    const FormHandle = e => {
        e.preventDefault();
        console.log(JSON.stringify(user))
        addDataToServer(user)
    }
    const addDataToServer = (data) => {
        axios.post("http://localhost:8080/regSubadmin", data).then(
            (response) => {
                console.log(response);
                alert("Added Successfully");
            }, (error) => {
                console.log(error);
                alert("Failed to add please try again");
            }
        );
    }
    return (
        <div>
            <div className="container">
                <div className="w-100 mx-auto shadow p-5 mt-2 bg-light">
                    <div class="jumbotron">
                        <h1 class="display-4 text-center text-primary"><b>Subadmin Registration</b></h1>
                        <div>
                            <form onSubmit={e => FormHandle(e)} id="contact-form">

                            
                            <div class="form-group">
                                    <label for="email">Email</label>
                                    <input type="email" class="form-control" name="email"  placeholder="abc@gmail.com" value={email} onChange={(e) => onInputChange(e)} />
                                </div>

                            <div class="form-group">
                                    <label for="password">password</label>
                                    <input type="text" class="form-control" name="password"  placeholder="Enter password" value={password} onChange={(e) => onInputChange(e)} />
                                </div>

                                <div class="form-group">
                                    <label for="name"> Name</label>
                                    <input type="text" class="form-control" name="name"  placeholder="Enter name" value={name} onChange={(e) => onInputChange(e)} />
                                </div>

                                <div class="form-group">
                                    <label for="mobile_no">Mobile no</label>
                                    <input type="text" class="form-control" name="mobile_no"  placeholder="Enter Mobile no " value={mobile_no} onChange={(e) => onInputChange(e)} />
                                </div>

                                <div class="form-group">
                                    <label for="address">Address</label>
                                    <input type="text" class="form-control" name="address"  placeholder="Enter address" value={address} onChange={(e) => onInputChange(e)} />
                                </div>

                                <div class="form-group">
                                    <label for="city">City</label>
                                    <input type="text" class="form-control" name="city"  placeholder="Enter city" value={city} onChange={(e) => onInputChange(e)} />
                                </div>

                                <div class="form-group">
                                    <label for="state">State</label>
                                    <input type="text" class="form-control" name="state"  placeholder="Enter state" value={state} onChange={(e) => onInputChange(e)} />
                                </div>

                                <div class="form-group">
                                    <label for="zone_id">Zone id</label>
                                    <input type="text" class="form-control" name="zone_id"  placeholder="Enter zone_id" value={zone_id} onChange={(e) => onInputChange(e)} />
                                </div>

                               
                                                                 
                                <div className="container text-center">
                                    <button type="submit" class="btn btn-outline-secondary my-2 text-center mr-2" className="btn btn-primary">Register</button>
                                
                               <button type="clear" class="btn btn-outline-secondary my-2 text-center mr-2" >Clear<a href="/RegisterSubadmin.js"></a></button>   
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default RegisterSubadmin;