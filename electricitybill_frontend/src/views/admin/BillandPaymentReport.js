import { render } from "@testing-library/react";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import image from '../images/logo.gif';


function BillandPaymentReport() {
     // let w=200;
    // let h=200;
    const [hide, toggleHide]=useState(true);
    const [zones, setZones]=useState([]);
    const [consumers,setConsumers] =useState([]);
    const [consumerBills, setConsumerBills]= useState([]);
    let navigate=useNavigate();
    const [zone, setZone] = useState({
        
        zone_id:''
       
    });
    const [error, setError] = useState({
        zone_id:'',
    })
    const onInputChange = e => {
        setZone({ ...zone, [e.target.name]: e.target.value })
    }
    const {zone_id} = zone;
    // const reloadPage = () => {
    //     setZone({
    //         zone_id:''
    //     });
    // }
    //toast notification
    const showSnackBar = () =>{
        var x = document.getElementById("snackbar");
        x.className = "show";
        setTimeout(()=>{ x.className = x.className.replace("show", ""); }, 3000);
    }
    //log out
    const handleLogOut = e => {
        e.preventDefault();
        localStorage.clear();
        navigate("/");
    }
    const FormHandle = e => {
        e.preventDefault();
        console.log(JSON.stringify(zone))
        getDataFromServer(zone)
    }
    //get api to fetch list of all consumers based on zone id.
    const getDataFromServer = (data) => {
        console.log("*******"+data.zone_id);
        axios.get("http://localhost:8080/getConsumersByZone/"+data.zone_id).then(
            (response) => {
                console.log(response);
                setConsumers( response.data);
                console.log(consumers);
                //alert("Added Successfully");
                
            }, (error) => {
                console.log(error);
                alert("Something went wrong while fetching consumers. Please try again after sometime.");
            }
        );
    }
    //get api to fetch all available zones.
    const getAvailableZones =() =>{
        axios.get("http://localhost:8080/getAvailableZones/").then(
            (response) => {
                console.log(response);
                setZones( response.data);
                //consumers = JSON.parse(response);
                //alert("Added Successfully");
                
            }, (error) => {
                console.log(error);
                alert("Something went wrong while fetching zones. Please try again after sometime.");
            }
        );
    }
    //form validation
    const validateInput = e => {
        let { name, value } = e.target;
        let isValid = true;
        setError(prev => {
            const stateObj = { ...prev, [name]: "" };
        
            switch (name) {
            case "zone_id":
                if (!value || value === "0") {
                stateObj[name] = "Please select zone.";
                isValid = false;
                }
                break;
                
            default:
                break;
            }
        
            return stateObj;
        });
    }
    //get api call to fetch all bill records of consumer
    const viewBillPaymentReport=(e) =>{
        let id = e.target.id;
        let consumerID = parseInt(consumers[id].consumer_id);
        axios.get(`http://localhost:8080/fetchConsumerBills/${consumerID}`).then(
            (response) => {
                console.log(response);
                setConsumerBills( response.data);
                console.log(consumerBills);
                //alert("Added Successfully");
                
            }, (error) => {
                console.log(error);
                alert("Something went wrong while fetching payment history. Please try again after sometime.");
            }
        );
    }
    //react hook to handle component side effect. checking the user authorization before component load and only then showing content.
    useEffect(()=>{
        let user=JSON.parse(localStorage.getItem("loggedinuser"));
        if(user && user.user_id){
            toggleHide(false);
            getAvailableZones();
        }else{
            showSnackBar();
            setTimeout(()=>{navigate("/");},3000);  
        }
        
    },[]);
    return(
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
            <div className='ViewConsumer' hidden={hide}>
                <div className='row'>
                    <div className="col-12 col-lg-10 col-xl-10 offset-xl-1 top-padding">
                        
                        <div className="container PageContainer">
                            <div className="row">
                                <label className="display-4 text-center">Bill Payment Report</label>
                            </div>
                            <form onSubmit={e => FormHandle(e)} id="contact-form">
                                <div className="row">
                                    <div className="col-75">
                                        <select  className="display-6" aria-label=".form-select-lg example" name="zone_id" value={zone_id} onChange={(e) => onInputChange(e)} onBlur={validateInput} >
                                            <option value="0">Open this select menu</option>
                                            {zones.map((val,key) => {
                                                    return (
                                                        <option value={val.zone_id}>{val.zone_name}</option>
                                                    )
                                            })}
                                            {/* <option value="1">Katraj</option>
                                            <option value="2">Kothrud</option>
                                            <option value="3">Hadapsar</option>
                                            <option value="4">Nigdi</option> */}
                                        </select>
                                        {error.zone_id && <span className='err'>{error.zone_id}</span>}
                                    </div>
                                    <div className="col-25">
                                        <button  type="submit" className="loginButton buttondecoration-special">Select Zone </button>
                                    </div>
                                    
                                </div>
                            </form>
                            <div className="row">
                                <div className="col-12 col-lg-10 col-xl-10 offset-xl-1 top-padding">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Consumer ID</th>
                                                <th>Name</th>
                                                <th>View Report</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {consumers.map((val,key) => {
                                            return (
                                                <tr key={key}>
                                                    <td>{val.consumer_id}</td>
                                                    <td>{val.name}</td>
                                                    <td><button  id={key} className="tablebutton" data-toggle="modal" data-target="#billPaymentReport" onClick={viewBillPaymentReport}>Select</button></td>
                                                </tr>
                                            )
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                                <div className="modal fade" id="billPaymentReport" data-backdrop="static" data-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                    <div className="modal-dialog modal-xl">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h5 className="modal-title" id="staticBackdropLabel">Payment Details</h5>
                                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                                </button>
                                            </div>
                                            <div className="modal-body">
                                                <div className="container-fluid">
                                                    <div className="row">
                                                        <div className="col-12 col-lg-10 col-xl-10 offset-xl-1">
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
                                                                    {consumerBills.map((val,key) => {
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
                                            <div className="modal-footer">
                                                <button type="button" id="closeModal" className="loginButton buttondecoration greybutton" data-dismiss="modal">Close</button>
                                            </div>
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
export default BillandPaymentReport;