import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import image from '../images/logo.gif';


function SubAdminHome() {
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
        zone_id1:''
    });
    const handleLogOut = e => {
        e.preventDefault();
        localStorage.clear();
        navigate("/");
    }
    const getDataFromServer = ( ) => {
        let user=JSON.parse(localStorage.getItem("loggedinuser"));
        axios.get(`http://localhost:8080/getSubAdmin/${user?.user_id}`).then(
            (response) => {
                console.log(response);
                
                setSubAdmin({...subAdmin,  
                            user_id1: response.data.user_id1,
                            admin_id: response.data.admin_id,
                            name: response.data.name,
                            mobile_no: response.data.mobile_no,
                            address:  response.data.address,
                            city: response.data.city,
                            email: response.data.email,
                            state: response.data.state,
                            zone_id1: response.data.zone_id1 });
                localStorage.setItem("subAdminID",JSON.stringify(response.data.consumer_id));
            }, (error) => {
                console.log(error);
               alert("Something went wrong while fetching Admin user data.");
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
                             onlineelectricitybill@gmail.com <button  type="button" className="btn btn-primary" onClick={(e) =>handleLogOut(e)}>Log Out</button></span> 
                    </p>
                    
                </div> 
            </div>
        </div>
            <div className='PageContent'>
                <div hidden={hide}>
                    <div className='row'>
                        <div className="col-12 col-lg-12 col-xl-12">
                            <div class="jumbotron">
                                <div class="container">
                                    <h1 class="display-3">Hello, {subAdmin.name}!</h1>
                                    <p>Welcome to <b>Online Electricity Bill Management System</b>! Your one stop solution to manage your home eletricity bills.  </p>
                                    <p><a class="btn btn-primary btn-lg" href="/SubAdminGenerateBills" role="button">Generate Bills »</a></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="snackbar">You are not logged in! Redirecting to login page!!</div>
            </div>
        </div>
    )
}
export default SubAdminHome;