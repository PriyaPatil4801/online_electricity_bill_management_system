import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import image from '../images/logo.gif';

function PaymentHistory() {
    let navigate=useNavigate();
    const [hide, toggleHide]=useState(true);
    const [paidBills,setPaidBills] =useState([]);
    const handleLogOut = e => {
        e.preventDefault();
        localStorage.clear();
        navigate("/");
    }
    const getDataFromServer = ( ) => {
        let userID=JSON.parse(localStorage.getItem("consumerID"));
        axios.get(`http://localhost:8080/fetchPaidBills/${userID}`).then(
            (response) => {
                console.log(response);
                setPaidBills( response.data);
                console.log(paidBills);
                //alert("Added Successfully");
                
            }, (error) => {
                console.log(error);
                alert("Something went wrong while fetching payment history. Please try again after sometime.");
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
                <div className='PaymentHistory'hidden={hide}>
                    <div className='row'>
                        <div className="col-12 col-lg-10 col-xl-10 offset-xl-1 top-padding">
                            
                            <div className="container PageContainer">
                                <div className="row">
                                    <label className="display-4 text-center">Payment History</label>
                                </div>
                                <div className="row">
                                    <div className="col-12 col-lg-10 col-xl-10 offset-xl-1 top-padding">
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>Bill ID</th>
                                                    <th>Bill Date</th>
                                                    <th>Units</th>
                                                    <th>Bill Amount</th>
                                                    <th>Tax</th>
                                                    <th>Dues</th>
                                                    <th>Fine</th>
                                                    <th>Total Bill</th>
                                                    <th>Due Date</th>
                                                    <th>Payment Date</th>
                                                    <th>Payment ID</th>
                                                    <th>Status</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {paidBills.map((val,key) => {
                                                return (
                                                    <tr key={key}>
                                                        <td>{val.bill_id}</td>
                                                        <td>{val.bill_date}</td>
                                                        <td>{val.units}</td>
                                                        <td>{val.current_billAmt}</td>
                                                        <td>{val.tax}</td>
                                                        <td>{val.dues}</td>
                                                        <td>{val.fine}</td>
                                                        <td>{val.total_billAmt}</td>
                                                        <td>{val.due_date}</td>
                                                        <td>{val.payment_date}</td>
                                                        <td>{val.payment_no}</td>
                                                        <td>{val.status}</td>
                                                    </tr>
                                                    )
                                                })}
                                            </tbody>
                                        </table>
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
export default PaymentHistory;