import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import image from '../images/logo.gif';


function SubAdminGenerateBills() {
    const [hide, toggleHide]=useState(true);
    const [zones,setZones] =useState([]);
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
    })
    const onInputChange = e => {
        setZone({ ...zone, [e.target.name]: e.target.value })
    }
    const onUnitsChange = e =>{
        setBillForm({...billform,[e.target.name]: e.target.value});
        console.log(billform);

    }
    const onDateChange = e =>{
        var date = new Date(e.target.value);
        var dueDate= new Date(date.setMonth(date.getMonth()+1)).toISOString().split("T")[0];
        setBillForm({...billform,[e.target.name]: e.target.value,
        due_date:dueDate});
    }
    const {consumer_id,name,units,current_billAmt,dues,fine,total_billAmt,tax,bill_date,due_date,status}=billform;
    const {zone_id} = zone;
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
    const getDataFromServer = (data) => {
        console.log("*******"+data.zone_id);
        axios.get("http://localhost:8080/getConsumersByZone/"+data.zone_id).then(
            (response) => {
                console.log(response);
                setConsumers( response.data);
                
            }, (error) => {
                console.log(error);
                alert("Something went wrong while fetching consumers. Please try again after sometime.");
            }
        );
    }
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
    const calculateBill = e=>{
        console.log(billform);
        let units = parseInt(billform.units);
        setTimeout(()=>{
            let bill,tax,dues,fine,totalBill;
            console.log(pendingBill.bill_id);
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
            }else{
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
            setBillForm({...billform, 
                current_billAmt:bill,
                tax:tax,
                dues:dues,
                fine:fine,
                total_billAmt:totalBill,
                status:"Pending"
            });
        },1);

    }
    const fetchPendingBill = (consumerid) =>{
        axios.get(`http://localhost:8080/fetchPendingBill/${consumerid}`).then(
            (response) => {
                console.log(response);
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
                console.log(JSON.stringify(pendingBill));
            }, (error) => {
                console.log(error);
                alert("Something went wrong while fetching consumers. Please try again after sometime.");
            }
        );
    }
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
                            
                        }, (error) => {
                            console.log(error);
                            alert("Something went wrong while generating bill. Please try again after sometime.");
                        }
                    );
        }
        
    }
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
    const showSnackBar = () =>{
        var x = document.getElementById("snackbar");
        x.className = "show";
        setTimeout(()=>{ x.className = x.className.replace("show", ""); }, 3000);
    }
    const getAvailableZones = () => {
        let user=JSON.parse(localStorage.getItem("loggedinuser"));
        axios.get(`http://localhost:8080/getSubAdmin/${user?.user_id}`).then(
            (response) => {
                console.log(response);
                setZones(response.data.zone);
                
                
            }, (error) => {
                console.log(error);
                alert("Something went wrong while fetching available zones.");
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
            <div className='ViewConsumer' hidden={hide}>
                <div className='row'>
                    <div className="col-12 col-lg-10 col-xl-10 offset-xl-1 top-padding">
                        
                        <div className="container PageContainer">
                            <div className="row">
                                <label className="display-4 text-center center">Generate Bills</label>
                            </div>
                            <form onSubmit={e => FormHandle(e)} id="contact-form">
                                <div className="row">
                                    <div className="col-75">
                                        <select  className="display-6" aria-label=".form-select-lg example" name="zone_id" value={zone_id} onChange={(e) => onInputChange(e)} onBlur={validateInput} >
                                            <option value="0">Open this select menu</option>
                                            <option value={zones.zone_id}>{zones.zone_name}</option>
                                                    
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
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {consumers.map((val, key) => {
                                            return (
                                                <tr key={key}>
                                                    <td>{val.consumer_id}</td>
                                                    <td>{val.name}</td>
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
                                                    <input className="display-6 text-center" type="date" id="due_date" name="due_date" placeholder="select date" value={due_date} disabled />
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
export default SubAdminGenerateBills;