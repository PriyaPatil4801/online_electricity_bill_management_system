import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import image from '../images/logo.gif';

function AddZone() {
    let w=200;
    let h=200;
    let navigate=useNavigate();
    
    const [hide, toggleHide]=useState(true);
    const [zone, setZone] = useState({
        
        zone_name:''
       
    });
    //toast notification show method
    const showSnackBar = () =>{
        var x = document.getElementById("snackbar");
        x.className = "show";
        setTimeout(()=>{ x.className = x.className.replace("show", ""); }, 3000);
    }
    const onInputChange = e => {
        setZone({ ...zone, [e.target.name]: e.target.value })
    }
    const {zone_name} = zone;
    const reloadPage = () => {
        setZone({
            zone_name:''
        });
    }
    //log out
    const handleLogOut = e => {
        e.preventDefault();
        localStorage.clear();
        navigate("/");
    }
    //this method will trigger on form submit
    const FormHandle = e => {
        e.preventDefault();
        console.log(JSON.stringify(zone))
        addDataToServer(zone)
    }
    //post api call to add new zone to database
    const addDataToServer = (data) => {
        axios.post("http://localhost:8080/addzone", data).then(
            (response) => {
                console.log(response);
                alert("Added Successfully");
                
            }, (error) => {
                console.log(error);
                alert("Failed to add please try again");
            }
        );
    }
    //react hook to handle component side effect. checking the user authorization before component load and only then showing content.
    useEffect(()=>{
        let user=JSON.parse(localStorage.getItem("loggedinuser"));
        if(user && user.user_id){
            toggleHide(false);
        }else{
            showSnackBar();
            setTimeout(()=>{navigate("/");},3000);  
        }
        
    },[]);
    return (
        <div>
            <div className="w3-black">
                <nav className="w3-sidebar w3-bar-block w3-small  w3-center">
                    <img src={image} className="logo" onClick={() => {navigate("/AdminHome");}}/>
                    <a href="" className="w3-bar-item w3-button w3-padding-large w3-hover-black" onClick={() => {navigate("/AdminProfile");}}>
                        <i className="fa fa-user w3-xlarge"></i>
                        <p>Profile</p>
                    </a>
                    <a href="" className="w3-bar-item w3-button w3-padding-large w3-hover-black" onClick={() => {navigate("/ViewConsumer");}} >
                        <i className="fa fa-eye w3-xlarge"></i>
                        <p>View Consumer</p>
                    </a>
                    <a href="" className="w3-bar-item w3-button w3-padding-large w3-hover-black" onClick={() => {navigate("/ViewSubAdmin");}}>
                        <i className="fa fa-eye w3-xlarge"></i>
                        <p>View Sub Admins</p>
                    </a>
                    <a href="" className="w3-bar-item w3-button w3-padding-large w3-hover-black" onClick={() => {navigate("/AddZone");}}>
                        <i className="fas fa-clipboard w3-xlarge"></i>
                        <p>Add Zone</p>
                    </a>
                    <a href="" className="w3-bar-item w3-button w3-padding-large w3-hover-black" onClick={() => {navigate("/AddUser");}}>
                        <i className="fas fa-id-badge w3-xlarge"></i>
                        <p>Add User</p>
                    </a>
                    <a href="" className="w3-bar-item w3-button w3-padding-large w3-hover-black" onClick={() => {navigate("/GenerateBills");}}>
                        <i className="fas fa-cart-plus w3-xlarge"></i>
                        <p>Generate Bills</p>
                    </a>
                    <a href="" className="w3-bar-item w3-button w3-padding-large w3-hover-black" onClick={() => {navigate("/BillandPaymentReport");}}>
                        <i className="fas fa-clipboard w3-xlarge"></i>
                        <p>Bill-Payment Report</p>
                    </a>
                </nav>
                <div className="w3-padding-small" id="main">
                    <div className="w3-panel w3-black">
                        <p><span className="h3 mb-0 text-gray-800">Admin Panel</span><span  className="support"> For Support:  <i
								className="fas fa-phone-square ml-4 fa-sm fa-fw mr-2 "></i>+91 9011100528 <i className="fa fa-envelope mr-2 ml-4" aria-hidden="true"></i>
								 onlinebilelectricity@gmail.com <button  type="button" className="btn btn-primary" onClick={(e) =>handleLogOut(e)}>Log Out</button></span> 
                        </p>
                        
                    </div> 
                </div>
            </div>
            <div className='PageContent'>
                <div className='AddZone' hidden={hide}>
                    <div className='row'>
                        <div className="col-12 col-lg-10 col-xl-10 offset-xl-1 top-padding">
                            
                            <div className="container PageContainer">
                                <div className="row">
                                    <label className="display-4 text-center">Add Zone</label>
                                </div>
                                <form onSubmit={e => FormHandle(e)} id="contact-form">
                                    <div className="row">
                                    <div className="col-25">
                                        <label className="display-6 text-center">Zone Name</label>
                                    </div>
                                    <div className="col-75">
                                        <input className="display-6" type="text" id="zone_name" name="zone_name" placeholder="Enter new zone" value={zone_name} onChange={(e) => onInputChange(e)}/>
                                    </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-50">
                                            <button  type="submit" className="loginButton buttondecoration">Add Zone </button>
                                        </div>
                                        <div className="col-50">
                                            <button  type="button" className="registerButton buttondecoration" onClick={reloadPage}>Cancel</button>
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
export default AddZone;