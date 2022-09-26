import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import image from '../images/logo.gif';

function ConsumerHome() {
    let navigate=useNavigate();
    const [hide, toggleHide]=useState(true);
    const [consumer, setConsumer] = useState({  
        user_id: 1,
        consumer_id: 1,
        name:'',
        mobile_no:'',
        address: '',
        city:'',
        email: '',
        state:'',
        zone_id:''
    });
    const handleLogOut = e => {
        e.preventDefault();
        localStorage.clear();
        navigate("/");
    }
    const showSnackBar = () =>{
        var x = document.getElementById("snackbar");
        x.className = "show";
        setTimeout(()=>{ x.className = x.className.replace("show", ""); }, 3000);
    }
    const getDataFromServer = ( ) => {
        let user=JSON.parse(localStorage.getItem("loggedinuser"));
        axios.get(`http://localhost:8080/getConsumer/${user?.user_id}`).then(
            (response) => {
                console.log(response);
                
                setConsumer({...consumer,  
                            user_id: response.data.user_id,
                            consumer_id: response.data.consumer_id,
                            name: response.data.name,
                            mobile_no: response.data.mobile_no,
                            address: response.data.address,
                            city: response.data.city,
                            email: response.data.email,
                            state: response.data.state,
                            zone_id:response.data.zone_id
                         });
                localStorage.setItem("consumerID",JSON.stringify(response.data.consumer_id));
                
            }, (error) => {
                console.log(error);
               alert("Something went wrong while fetching consumer user data.");
             }
         );
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
                    <img src={image} className="logo" onClick={() => {navigate("/consumerHome");}}/>
                    <a href="" className="w3-bar-item w3-button w3-padding-large w3-hover-black" onClick={() => {navigate("/ConsumerProfile");}}>
                        <i className="fa fa-user w3-xlarge"></i>
                        <p>Profile</p>
                    </a>
                  
                    <a href="" className="w3-bar-item w3-button w3-padding-large w3-hover-black" onClick={() => {navigate("/PayBill");}}>
                        <i className="fas fa-cart-plus w3-xlarge"></i>
                        <p>Bill</p>
                    </a>
                    <a href="" className="w3-bar-item w3-button w3-padding-large w3-hover-black" onClick={() => {navigate("/PaymentHistory");}}>
                        <i className="fas fa-clipboard w3-xlarge"></i>
                        <p>Payment History</p>
                    </a>
                </nav>
                <div className="w3-padding-small" id="main">
                    <div className="w3-panel w3-black">
                        <p><span className="h3 mb-0 text-gray-800">Consumer Panel</span><span  className="support"> For Support:  <i
								className="fas fa-phone-square ml-4 fa-sm fa-fw mr-2 "></i>+91 9011100528 <i className="fa fa-envelope mr-2 ml-4" aria-hidden="true"></i>
								 onlineelectricitybill@gmail.com <button  type="button" className="btn btn-primary" onClick={(e) =>handleLogOut(e)}>Log Out</button></span> 
                        </p>
                       
                    </div> 
                </div>
            </div>
            <div className='PageContent'>
                <div className='ConsumerHome' hidden={hide}>
                    <div className='row'>
                        <div className="col-12 col-lg-12 col-xl-12">
                            <div class="jumbotron">
                                <div class="container">
                                    <h1 class="display-3">Hello, {consumer.name}!</h1>
                                    <p>Welcome to <b>Online Electricity Bill Management System</b>! Your one stop solution to manage your home eletricity bills.  </p>
                                    <p><a class="btn btn-primary btn-lg" href="/PayBill" role="button">Pay Now »</a></p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        <div className="col-12 col-lg-12 col-xl-12">
                            <div class="jumbotron jumbotron-white">
                                <div class="container">
                                    <div className='row'>
                                        <div className="col-8 col-lg-8 col-xl-8">
                                            <h1 class="display-6">How it Works?</h1>
                                            <p>1. Our zonal sub admins will collect your electricity unit consumption every month on 15th.</p>
                                            <p>2. He will generate the bill on the same day.</p>
                                            <p>3. You have to pay this bill before 15th of next month through our portal.</p>
                                            <p>4. Portal is available 24x7 so you can pay bills anytime at your leisure.</p>
                                            <p>5. If you fail to pay your bill with in due date, bill amount will be carried forward to next month's bills.</p>
                                            <p>6. In this case, minimal fine of Rs. 50 will be added into the next months bills as late charge.</p>
                                        </div>
                                        <div className="col-4 col-lg-4 col-xl-4">
                                        <h1 class="display-6">Our rates per unit</h1>
                                            <table>
                                                <thead>
                                                    <tr>
                                                        <th>Units</th>
                                                        <th>Rate/Unit</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>0-100</td>
                                                        <td>Rs. 3.00</td>
                                                    </tr>
                                                    <tr>
                                                        <td>101-300</td>
                                                        <td>Rs. 7.00</td>
                                                    </tr>
                                                    <tr>
                                                        <td>&gt;300</td>
                                                        <td>Rs. 11.00</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
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
export default ConsumerHome;