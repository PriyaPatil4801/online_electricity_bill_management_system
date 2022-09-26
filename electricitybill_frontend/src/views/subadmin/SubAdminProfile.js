import { render } from "@testing-library/react";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import image from '../images/logo.gif';


function SubAdminProfile() {
    let firstentry=true;
    let navigate=useNavigate();
    const [hide, toggleHide]=useState(true);
    
    const [subAdmin, setSubAdmin] = useState({  
        user_id1: '',
        subadmin_id: '',
        name:'',
        mobile_no:'',
        address: '',
        city:'',
        email: '',
        state:'',
        zone:''
    });
    const [updatedSubAdmin, setUpdatedSubAdmin] = useState({  
        user_id1: '',
        subadmin_id: '',
        name:'',
        mobile_no:'',
        address: '',
        city:'',
        email: '',
        state:'',
        zone:''
    });
    const [error, setError] = useState({
        name: '',
        mobile_no:'',
        address: '',
        city:'',
        email: '',
        state:''
      });
    const {name, mobile_no, address, city, email, state, zone} = updatedSubAdmin;
    const handleLogOut = e => {
        e.preventDefault();
        localStorage.clear();
        navigate("/");
    }

    
    const onInputChange = e => {
        setUpdatedSubAdmin({ ...updatedSubAdmin, [e.target.name]: e.target.value })
    }

    const validateInput = e => {
        let { name, value } = e.target;
        setError(prev => {
          const stateObj = { ...prev, [name]: "" };
     
          switch (name) {
            case "name":
              if (!value) {
                stateObj[name] = "Please enter name.";
              }
              break;
            
            case "mobile_no":
            if (!value) {
                stateObj[name] = "Please enter mobile no.";
            }else if(value.length!= 10){
                stateObj[name] = "Please enter valid mobile no.";
            }
            break;

            case "address":
                if (!value) {
                stateObj[name] = "Please enter address.";
                }
                break;

            case "city":
                if (!value) {
                stateObj[name] = "Please enter city.";
                }
                break;

            case "email":
                if (!value) {
                stateObj[name] = "Please enter email.";
                }
                break;

            case "state":
                if (!value) {
                stateObj[name] = "Please enter state.";
                }
                break;

            
            case "password":
              if (!value) {
                stateObj[name] = "Please enter Password.";
              } else if (subAdmin.confirmPassword && value !== subAdmin.confirmPassword) {
                stateObj["confirmPassword"] = "Password and Confirm Password does not match.";
              } else {
                stateObj["confirmPassword"] = subAdmin.confirmPassword ? "" : subAdmin.confirmPassword;
              }
              break;
     
            case "confirmPassword":
              if (!value) {
                stateObj[name] = "Please enter Confirm Password.";
              } else if (subAdmin.password && value !== subAdmin.password) {
                stateObj[name] = "Password and Confirm Password does not match.";
              }
              break;
     
            default:
              break;
          }
     
          return stateObj;
        });
    }
    
    const OpenInEditMode = () =>{
        setUpdatedSubAdmin({...subAdmin});
        document.getElementById("ReadOnly").className = "container PageContainer ShowHideContainer";
        document.getElementById("ReadWrite").className = "container PageContainer";
    }
    const ShowReadOnly = () =>{
        setUpdatedSubAdmin({...subAdmin});
        document.getElementById("ReadOnly").className = "container PageContainer";
        document.getElementById("ReadWrite").className = "container PageContainer ShowHideContainer";
    }
    const FormHandle = e => {
        e.preventDefault();
        console.log(JSON.stringify(subAdmin),JSON.stringify(updatedSubAdmin));
        
        addDataToServer(updatedSubAdmin);
        
        
    }
    const addDataToServer = (data) => {
        let user=JSON.parse(localStorage.getItem("loggedinuser"));
        axios.post(`http://localhost:8080/updateSubadmin/${user?.user_id}`, data).then(
            (response) => {
                console.log(response);
                alert("Profile Updated successfully!");
                setSubAdmin({...subAdmin, user_id1: response.data.user_id1,
                    subadmin_id: response.data.subadmin_id,
                    name: response.data.name,
                    mobile_no: response.data.mobile_no,
                    address:  response.data.address,
                    city: response.data.city,
                    email: response.data.email,
                    state: response.data.state,
                    zone:response.data.zone });
                ShowReadOnly();
                //navigate("/Login");
                
            }, (error) => {
                console.log(error);
                alert("error while updating profile. Please try again.");
                ShowReadOnly();
                //navigate("/SubAdminProfile");
            }
        );
    }

    const getDataFromServer = ( ) => {
  
        let user=JSON.parse(localStorage.getItem("loggedinuser"));
        axios.get(`http://localhost:8080/getSubAdmin/${user?.user_id}`).then(
            (response) => {
                console.log(response);
                
                setSubAdmin({...subAdmin,  
                            user_id1: response.data.user_id1,
                            subadmin_id: response.data.subadmin_id,
                            name: response.data.name,
                            mobile_no: response.data.mobile_no,
                            address:  response.data.address,
                            city: response.data.city,
                            email: response.data.email,
                            state: response.data.state,
                            zone:response.data.zone });
                
            }, (error) => {
                console.log(error);
                alert("Something went wrong while fetching Sub Admin user data.");
            }
        );
    }
    const showSnackBar = () =>{
        var x = document.getElementById("snackbar");
        x.className = "show";
        setTimeout(()=>{ x.className = x.className.replace("show", ""); }, 3000);
    }
    //react hook to handle component side effect. checking the user authorization before component load and only then showing content.
    useEffect(()=>{
        let user=JSON.parse(localStorage.getItem("loggedinuser"));
        if(user && user.user_id){
            toggleHide(false);
            getDataFromServer();
        }else{
            showSnackBar();
            setTimeout(()=>{navigate("/");},3000);  
        }
    },[]);
    return(
        <div>
           <div className="w3-black">
            <nav className="w3-sidebar w3-bar-block w3-small  w3-center">
                <img src={image} className="logo" onClick={() => {navigate("/SubAdminHome");}}/>
                <a href="" className="w3-bar-item w3-button w3-padding-large w3-hover-black" onClick={() => {navigate("/SubAdminProfile");}}>
                    <i className="fa fa-user w3-xlarge"></i>
                    <p>Profile</p>
                </a>
                <a href="" className="w3-bar-item w3-button w3-padding-large w3-hover-black" onClick={() => {navigate("/SubAdminViewConsumer");}} >
                    <i className="fa fa-eye w3-xlarge"></i>
                    <p>View Consumer</p>
                </a>
                {/* <a href="" className="w3-bar-item w3-button w3-padding-large w3-hover-black" onClick={() => {navigate("/ViewSubAdmin");}}>
                    <i className="fa fa-eye w3-xlarge"></i>
                    <p>View Sub Admins</p>
                </a> */}
                {/* <a href="" className="w3-bar-item w3-button w3-padding-large w3-hover-black" onClick={() => {navigate("/AddZone");}}>
                    <i className="fas fa-clipboard w3-xlarge"></i>
                    <p>Add Zone</p>
                </a> */}
                <a href="" className="w3-bar-item w3-button w3-padding-large w3-hover-black" onClick={() => {navigate("/SubAdminAddUser");}}>
                    <i className="fas fa-id-badge w3-xlarge"></i>
                    <p>Add User</p>
                </a>
                <a href="" className="w3-bar-item w3-button w3-padding-large w3-hover-black" onClick={() => {navigate("/SubAdminGenerateBills");}}>
                    <i className="fas fa-cart-plus w3-xlarge"></i>
                    <p>Generate Bills</p>
                </a>
                <a href="" className="w3-bar-item w3-button w3-padding-large w3-hover-black" onClick={() => {navigate("/SubAdminBillandPaymentReport");}}>
                    <i className="fas fa-clipboard w3-xlarge"></i>
                    <p>Bill-Payment Report</p>
                </a>
            </nav>
            <div className="w3-padding-small" id="main">
                <div className="w3-panel w3-black">
                    <p><span className="h3 mb-0 text-gray-800">Sub Admin Panel</span><span  className="support"> For Support:  <i
                            className="fas fa-phone-square ml-4 fa-sm fa-fw mr-2 "></i>+91 9011100528 <i className="fa fa-envelope mr-2 ml-4" aria-hidden="true"></i>
                             onlinebilelectricity@gmail.com <button  type="button" className="btn btn-primary" onClick={(e) =>handleLogOut(e)}>Log Out</button></span> 
                    </p>
                    
                </div> 
            </div>
        </div>
            <div className='PageContent'>
                <div className='AdminProfile' hidden={hide}>
                    <div className='row'>
                        <div className="col-12 col-lg-10 col-xl-10 offset-xl-1 top-padding">
                            <div className="container PageContainer" id="ReadOnly">
                                <div className="row">
                                    <label className="display-4 text-center">Sub Admin Profile</label>
                                </div>
                                
                                    <div className="row">
                                    <div className="col-25">
                                        <label  className="display-6 text-center" for="name">Name : </label>
                                    </div>
                                    <div className="col-75">
                                        <label className="display-6 text-center">{subAdmin.name}</label>
                                    </div>
                                    </div>
                                    <div className="row">
                                    <div className="col-25">
                                        <label  className="display-6 text-center" for="mobile_no">Mobile No : </label>
                                    </div>
                                    <div className="col-75">
                                        <label className="display-6 text-center">{subAdmin.mobile_no}</label>
                                    </div>
                                    </div>
                                    <div className="row">
                                    <div className="col-25">
                                        <label className="display-6 text-center" for="email">Email : </label>
                                    </div>
                                    <div className="col-75">
                                        <label className="display-6 text-center">{subAdmin.email}</label>
                                    </div>
                                    </div>
                                    <div className="row">
                                    <div className="col-25">
                                        <label className="display-6 text-center" >Address : </label>
                                    </div>
                                    <div className="col-75">
                                        <label className="display-6 text-center" >{subAdmin.address}</label>
                                    </div>
                                    </div>
                                    <div className="row">
                                    <div className="col-25">
                                        <label className="display-6 text-center">City : </label>
                                    </div>
                                    <div className="col-75">
                                        <label className="display-6 text-center" >{subAdmin.city}</label>
                                    </div>
                                    </div>
                                    <div className="row">
                                    <div className="col-25">
                                        <label className="display-6 text-center" >State : </label>
                                    </div>
                                    <div className="col-75">
                                        <label className="display-6 text-center">{subAdmin.state}</label>
                                    </div>
                                    </div>
                                    <div className="row">
                                    <div className="col-25">
                                        <label className="display-6 text-center" >Zone : </label>
                                    </div>
                                    <div className="col-75">
                                        <label className="display-6 text-center">{subAdmin.zone.zone_name}</label>
                                    </div>
                                    </div>
                                    
                                    <div className="row">
                                        <div className="col-50">
                                            <button  type="button" className="loginButton buttondecoration" onClick={OpenInEditMode}>Edit Profile </button>
                                        </div>
                                    </div>
                                
                            </div>
                            <div className="container PageContainer ShowHideContainer" id="ReadWrite">
                                <div className="row">
                                    <label className="display-4 text-center">Sub Admin Profile</label>
                                </div>
                                <form onSubmit={e => FormHandle(e)} id="contact-form">
                                    <div className="row">
                                    <div className="col-25">
                                        <label className="display-6 text-center" for="name">Name : </label>
                                    </div>
                                    <div className="col-75">
                                    <input className="display-6 " type="text" name="name"  placeholder="Enter name" value={name} onChange={(e) => onInputChange(e)} onBlur={validateInput} />
                                    {error.name && <span className='err'>{error.name}</span>}
                                    </div>
                                    </div>
                                    <div className="row">
                                    <div className="col-25">
                                        <label className="display-6 text-center" for="mobile_no">Mobile No : </label>
                                    </div>
                                    <div className="col-75">
                                        <input className="display-6" type="number" name="mobile_no"  placeholder="Enter Mobile no " value={mobile_no} onChange={(e) => onInputChange(e)} onBlur={validateInput} />
                                        {error.mobile_no && <span className='err'>{error.mobile_no}</span>}
                                    </div>
                                    </div>
                                    <div className="row">
                                    <div className="col-25">
                                        <label className="display-6 text-center" for="email">Email : </label>
                                    </div>
                                    <div className="col-75">
                                        <input className="display-6" type="email" name="email"  placeholder="abc@gmail.com" value={email} onChange={(e) => onInputChange(e)} onBlur={validateInput} disabled/>
                                        {error.email && <span className='err'>{error.email}</span>}
                                    </div>
                                    </div>
                                    <div className="row">
                                    <div className="col-25">
                                        <label className="display-6 text-center" for="address">Address : </label>
                                    </div>
                                    <div className="col-75">
                                        <input className="display-6 "type="text" name="address"  placeholder="Enter address" value={address} onChange={(e) => onInputChange(e)} onBlur={validateInput} />
                                        {error.address && <span className='err'>{error.address}</span>}
                                    </div>
                                    </div>
                                    <div className="row">
                                    <div className="col-25">
                                        <label className="display-6 text-center" for="city">City : </label>
                                    </div>
                                    <div className="col-75">
                                        <input className="display-6" type="text"  name="city"  placeholder="Enter city" value={city} onChange={(e) => onInputChange(e)} onBlur={validateInput} />
                                        {error.city && <span className='err'>{error.city}</span>}
                                    </div>
                                    </div>
                                    <div className="row">
                                    <div className="col-25">
                                        <label className="display-6 text-center" for="state">State : </label>
                                    </div>
                                    <div className="col-75">
                                        <input className="display-6" type="text" name="state"  placeholder="Enter state" value={state} onChange={(e) => onInputChange(e)} onBlur={validateInput} />
                                        {error.state && <span className='err'>{error.state}</span>}
                                    </div>
                                    </div>
                                    <div className="row">
                                    <div className="col-25">
                                        <label className="display-6 text-center" >Zone : </label>
                                    </div>
                                    <div className="col-75">
                                        <input className="display-6" type="text" name="zone"  value={zone.zone_name} disabled />
                                    </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-50">
                                            <button  type="submit" className="loginButton buttondecoration">Update </button>
                                        </div>
                                        
                                        <div className="col-50">
                                            <button  type="button" className="registerButton buttondecoration" onClick={ShowReadOnly}>Cancel</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            
                        </div>
                    </div>
                </div>
                <div id="snackbar">You are not logged in! Redirecting to login page!!</div>
            </div>
        </div>
    )
}
export default SubAdminProfile;