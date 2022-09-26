import { render } from "@testing-library/react";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import image from '../images/logo.gif';


function GenerateBills() {
    let w=200;
    let h=200;
    //let consumersList =[];
    const [hide, toggleHide]=useState(true);
    const [zones, setZones]=useState([]);
    const [consumers,setConsumers] =useState([]);
    let navigate=useNavigate();
    const [pendingBill, setPendingBill] = useState({
        bill_id:'',
        consumer_id:'',
        name:'',
        units:0,
        current_billAmt:0,
        dues:0,
        fine:0,
        total_billAmt:0,
        tax:0,
        bill_date:'',
        due_date:'',
        status:''
    });
    const [billform, setBillForm] = useState({
        consumer_id:'',
        name:'',
        units:0,
        current_billAmt:0,
        dues:0,
        fine:0,
        total_billAmt:0,
        tax:0,
        bill_date:'',
        due_date:'',
        status:''
    });
    const [zone, setZone] = useState({
        
        zone_id:''
       
    });
    const [error, setError] = useState({
        zone_id:'',
    });
    const showSnackBar = () =>{
        var x = document.getElementById("snackbar");
        x.className = "show";
        setTimeout(()=>{ x.className = x.className.replace("show", ""); }, 3000);
    }
    const onInputChange = e => {
        setZone({ ...zone, [e.target.name]: e.target.value })
    }
    const onUnitsChange = e =>{
        let consumedUnits = e.target.value;
        setBillForm({...billform,[e.target.name]: e.target.value});
        console.log(billform);

    }
    const onDateChange = e =>{
        setBillForm({...billform,[e.target.name]: e.target.value});
    }
    const {consumer_id,name,units,current_billAmt,dues,fine,total_billAmt,tax,bill_date,due_date,status}=billform;
    const {zone_id} = zone;
    // const reloadPage = () => {
    //     setZone({
    //         zone_id:''
    //     });
    // }
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
    //get consumers by zone
    const getDataFromServer = (data) => {
        console.log("*******"+data.zone_id);
        axios.get("http://localhost:8080/getConsumersByZone/"+data.zone_id).then(
            (response) => {
                console.log(response);
                setConsumers( response.data);
               // consumersList = JSON.parse(response);
                //alert("Added Successfully");
                
            }, (error) => {
                console.log(error);
                alert("Something went wrong while fetching consumers. Please try again after sometime.");
            }
        );
    }
    //fetch all available zones
    const getAvailableZones = () => {
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
    //gebearte bill form with default values
    const generatebillform= e =>{
        console.log(e.target.id);
        let id = e.target.id;
        let consumerID=parseInt(consumers[id].consumer_id);
        fetchPendingBill(consumerID);
        setBillForm({
            consumer_id: consumers[id].consumer_id,
            name: consumers[id].name,
            units: 0,
            current_billAmt:0,
            dues:0,
            fine:0,
            total_billAmt:0,
            tax:0,
            bill_date:'',
            due_date:'',
            status:''
        });
    }
    //method to calculate total bill.
    const calculateBill = e=>{
        console.log(billform);
        let units = parseInt(billform.units);
        //fetchPendingBill(); //first fetch the pending bill if any.
        let bill,tax,dues,fine,totalBill;
        //if there is no pending bill calculate the bill based on current months units consumptions.
        if(pendingBill.bill_id ==='' && units > 0){
            if(units<=100){
                bill=units*3;
                dues=0;
                fine=0;
                tax=bill*0.05;
                totalBill=bill+tax;
            }else if(units>100 && units<=300){
                bill=(100*3)+(units-100)*7;
                dues=0;
                fine=0;
                tax=bill*0.05;
                totalBill=bill+tax;
            }else if(units>300){
                bill=(100*3)+(200*7)+(units-300)*11;
                dues=0;
                fine=0;
                tax=parseFloat((bill*0.05).toFixed(2));
                totalBill=bill+tax;
            }
        }else{ //if pending bill, add it to total amount along with fine Rs. 50
            if(units<=100){
                bill=units*3;
                dues=pendingBill.total_billAmt;
                fine=50;
                tax=bill*0.05;
                totalBill=bill+dues+fine+tax;
            }else if(units>100 && units<=300){
                bill=(100*3)+(units-100)*7;
                dues=pendingBill.total_billAmt;
                fine=50;
                tax=bill*0.05;
                totalBill=bill+dues+fine+tax;
            }else if(units>300){
                bill=(100*3)+(200*7)+(units-300)*11;
                dues=pendingBill.total_billAmt;
                fine=50;
                tax=bill*0.05;
                totalBill=bill+dues+fine+tax;
            }
        }
        //once calculations are done, update billform with values
        setBillForm({...billform, 
            current_billAmt:bill,
            tax:tax,
            dues:dues,
            fine:fine,
            total_billAmt:totalBill,
            status:"Pending"
        });

    }
    //fetch the pending bill of consumer if any.
    const fetchPendingBill = (consumerid) =>{
        //let id = parseInt(billform.consumer_id);
        axios.get(`http://localhost:8080/fetchPendingBill/${consumerid}`).then(
            (response) => {
                console.log(response);
                //let fetchedPendingBill = JSON.parse(response);
                if(response.data!=""){
                    setPendingBill({ ...pendingBill,
                        bill_id:response.data.bill_id,
                        consumer_id:response.data.consumer.consumer_id,
                        name:response.data.consumer.name,
                        units:response.data.units,
                        current_billAmt:response.data.current_billAmt,
                        dues:response.data.dues,
                        fine:response.data.fine,
                        total_billAmt:response.data.total_billAmt,
                        tax:response.data.tax,
                        bill_date:response.data.bill_date,
                        due_date:response.data.due_date,
                        status:response.data.status});
                }
                //alert("Added Successfully");
                
            }, (error) => {
                console.log(error);
                alert("Something went wrong while fetching consumers. Please try again after sometime.");
            }
        );
    }
    //Method to genrate new bills
    const GenerateBill = e =>{
        e.preventDefault();
        console.log(JSON.stringify(billform));
        let billId=parseInt(pendingBill.bill_id);
        if(billId){
            setPendingBill({...pendingBill,
                status:"Carry Forward"
            });
            //first carry forward previous month pending bill
            axios.post(`http://localhost:8080/carryforwardPendingBill/${billId}`, pendingBill).then(
                (response) => {
                    console.log(response);
                    //then create new bill for the current bill.
                    axios.post(`http://localhost:8080/addNewBill`, billform).then(
                        (response) => {
                            console.log(response);
                            alert("Bill Added Successfully!!");
                            setBillForm({
                                consumer_id:'',
                                name:'',
                                units:0,
                                current_billAmt:0,
                                dues:0,
                                fine:0,
                                total_billAmt:0,
                                tax:0,
                                bill_date:'',
                                due_date:'',
                                status:''
                            });
                            //alert("Added Successfully");
                            
                        }, (error) => {
                            console.log(error);
                            alert("Something went wrong while generating bill. Please try again after sometime.");
                        }
                    );
                    
                }, (error) => {
                    console.log(error);
                    alert("Something went wrong while generating bill. Please try again after sometime.");
                }
            );
        }else{
            axios.post(`http://localhost:8080/addNewBill`, billform).then(
                        (response) => {
                            console.log(response);
                            alert("Bill Added Successfully!!");
                            setBillForm({
                                consumer_id:'',
                                name:'',
                                units:0,
                                current_billAmt:0,
                                dues:0,
                                fine:0,
                                total_billAmt:0,
                                tax:0,
                                bill_date:'',
                                due_date:'',
                                status:''
                            });
                            //alert("Added Successfully");
                            
                        }, (error) => {
                            console.log(error);
                            alert("Something went wrong while generating bill. Please try again after sometime.");
                        }
                    );
        }
        
        
    }
    //Form Validation
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
            <div className='ViewConsumer'hidden={hide}>
                <div className='row'>
                    <div className="col-12 col-lg-10 col-xl-10 offset-xl-1 top-padding">
                        
                        <div className="container PageContainer">
                            <div className="row">
                                <label className="display-4 text-center">Generate Bills</label>
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
                                <div className="col-6 col-lg-5 col-xl-5 offset-xl-1 top-padding">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Consumer ID</th>
                                                <th>Name</th>
                                                <th>Select</th>
                                                {/* <th>Email ID</th>
                                                <th>Mobile No.</th>
                                                <th>Address</th>
                                                <th>City</th>
                                                <th>State</th> */}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {consumers.map((val, key) => {
                                            return (
                                                <tr key={key}>
                                                    <td>{val.consumer_id}</td>
                                                    <td>{val.name}</td>
                                                    {/* <td>{val.email}</td>
                                                    <td>{val.mobile_no}</td>
                                                    <td>{val.address}</td>
                                                    <td>{val.city}</td>
                                                    <td>{val.state}</td> */}
                                                    <td><button  id={key} className="tablebutton" onClick={generatebillform}>Select</button></td>
                                                </tr>
                                            )
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                                <div className="col-6 col-lg-5 col-xl-5 offset-xl-1 top-padding">
                                    <div className="container PageContainer">
                                        <form onSubmit={e => GenerateBill(e)} id="contact-form">
                                            <div className="row">
                                                <div className="col-25">
                                                    <label className="display-6 text-center">Consumer id : </label>
                                                </div>
                                                <div className="col-75">
                                                    <label className="display-6 text-center">{billform.consumer_id}</label>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-25">
                                                    <label className="display-6 text-center">Name : </label>
                                                </div>
                                                <div className="col-75">
                                                    <label className="display-6 text-center">{billform.name}</label>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-25">
                                                    <label className="display-6 text-center">Enter units : </label>
                                                </div>
                                                <div className="col-75">
                                                    <input className="display-6 text-center" type="number" id="units" name="units" placeholder="Enter units consumed" value={units} onChange={(e) =>onUnitsChange(e)} onBlur={(e) => calculateBill(e)}/>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-25">
                                                    <label className="display-6 text-center">Current Bill : </label>
                                                </div>
                                                <div className="col-75">
                                                    <label className="display-6 text-center">{billform.current_billAmt}</label>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-25">
                                                    <label className="display-6 text-center">Tax : </label>
                                                </div>
                                                <div className="col-75">
                                                    <label className="display-6 text-center">{billform.tax}</label>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-25">
                                                    <label className="display-6 text-center">dues : </label>
                                                </div>
                                                <div className="col-75">
                                                    <label className="display-6 text-center">{billform.dues}</label>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-25">
                                                    <label className="display-6 text-center">Fine : </label>
                                                </div>
                                                <div className="col-75">
                                                    <label className="display-6 text-center">{billform.fine}</label>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-25">
                                                    <label className="display-6 text-center">Final bill amount : </label>
                                                </div>
                                                <div className="col-75">
                                                    <label className="display-6 text-center">{billform.total_billAmt}</label>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-25">
                                                    <label className="display-6 text-center">Bill date : </label>
                                                </div>
                                                <div className="col-75">
                                                    <input className="display-6 text-center" type="date" id="bill_date" name="bill_date" placeholder="select date" value={bill_date} onChange={(e) =>onDateChange(e)} />
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-25">
                                                    <label className="display-6 text-center">Due date : </label>
                                                </div>
                                                <div className="col-75">
                                                    <input className="display-6 text-center" type="date" id="due_date" name="due_date" placeholder="select date" value={due_date} onChange={(e) =>onDateChange(e)} />
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-100">
                                                    <button  type="submit" className="loginButton buttondecoration">Generate bill </button>
                                                </div>
                                            </div>
                                        </form>
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
export default GenerateBills;