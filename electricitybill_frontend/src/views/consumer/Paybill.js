import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import image from '../images/logo.gif';
import yayimage from '../images/yay.gif';

function PayBill() {
    let navigate=useNavigate();
    const [hide, toggleHide]=useState(true);
    const [isValidCardDetails, setIsValidCardDetails] = useState(true);
    const [todaysDate, setTodaysDate] = useState('');
    const [isPendingBill, setIsPendingBill] = useState(true); //change to false after testing
    const [paymentDetails, setPaymentDetails] = useState({
        consumer_id1:'',
        bill_id:'',
        name:'',
        payment_date:'',
        total_billAmt:'',
        card_type:'',
        card_no:'',
        cvv:'',
        exp_date:'',
    }) //fine is not required in payment details
    const [error, setError] = useState({
        card_type:'',
        card_no:'',
        cvv:'',
        exp_date:'',
    })
    const { card_type, card_no, cvv, exp_date}=paymentDetails;
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
    const {bill_id,consumer_id,name,units,current_billAmt,dues,fine,total_billAmt,tax,bill_date,due_date,status}=pendingBill;
    const handleLogOut = e => {
        e.preventDefault();
        localStorage.clear();
        navigate("/");
    }
    const fetchPendingBill = () =>{
        let userID=JSON.parse(localStorage.getItem("consumerID"));
        axios.get(`http://localhost:8080/fetchPendingBill/${userID}`).then(
            (response) => {
                console.log(response);
                if(response.data.length=== 0){
                    setIsPendingBill(false);
                }else{
                    setPendingBill({...pendingBill,
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
                        status:response.data.status
                    });
                }
                
            }, (error) => {
                console.log(error);
                alert("Something went wrong while fetching Bill. Please try again after sometime.");
            }
        );
    }
    const onInputChange = (e) => {
        setPaymentDetails({...paymentDetails, [e.target.name]: e.target.value})
        
    }
    const updatePaymentDetails =()=>{
        setPaymentDetails({...paymentDetails, 
            consumer_id1:pendingBill.consumer_id,
            bill_id: pendingBill.bill_id,
            name:pendingBill.name,
            payment_date: todaysDate,
            total_billAmt: pendingBill.total_billAmt,
        });
        console.log(paymentDetails);
    }
    //validate if card details are valid and meets requirements.
    const checkValidCardDetails =() =>{
        setIsValidCardDetails(true);
        for(const prop in paymentDetails){
            if(prop =="card_type"||prop=="card_no"||prop=="cvv"||prop=="exp_date"){
                if(paymentDetails[prop]==''||error[prop]!=''){
                    setIsValidCardDetails(false);
                }
            }      
        }  
    }
    const updateIsValidCardDetailsToDefault = ()=>{
        setIsValidCardDetails(true);
    }
    const MakePayment = (e) =>{
        checkValidCardDetails();
        if(isValidCardDetails){
            console.log(paymentDetails);
            axios.post("http://localhost:8080/makePayment", paymentDetails).then(
                (response) => {
                    console.log(response);
                    document.getElementById('closeModal').click();
                    setIsPendingBill(false);
                    alert("Payment successfully!");
                    
                }, (error) => {
                    console.log(error);
                    alert("Payment failed! Please try again.");
                }
            );
            
            
        }
    }
    //form validation
    const validateInput = e => {
        let { name, value } = e.target;
        setError(prev => {
          const stateObj = { ...prev, [name]: "" };
     
          switch (name) {
            case "card_no":
              if (!value) {
                stateObj[name] = "Card no can't be empty.";
              }else if(value.length<16){
                stateObj[name] = "Please enter valid card no.";
              }
              break;
            
            case "card_type":
            if (!value || value==="0") {
                stateObj[name] = "Please select card type.";
            }
            break;

            case "cvv":
                if (!value) {
                stateObj[name] = "CVV can't be empty.";
                }else if(value.length<3){
                    stateObj[name] = "Please enter valid CVV.";
                }
                break;

            case "exp_date":
                if (!value) {
                stateObj[name] = "Please select exp_date.";
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
    //react hook to handle component side effect. checking the user authorization before component load and only then showing content.
    useEffect(()=>{
        let user=JSON.parse(localStorage.getItem("loggedinuser"));
        if(user && user.user_id){
            toggleHide(false);
            fetchPendingBill();
            
            console.log(pendingBill.bill_id);
            let date = new Date().toISOString().slice(0,10);
            setTodaysDate(date);
        }else{
            showSnackBar();
            setTimeout(()=>{navigate("/");},3000);  
        }
        
    },[]);
    return(
        <div>
            <div className="w3-black">
                <nav className="w3-sidebar w3-bar-block w3-small  w3-center">
                    <img src={image} className="logo" alt="" onClick={() => {navigate("/consumerHome");}}/>
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
                <div className='ViewConsumer' hidden={hide}>
                    <div className='row'>
                        <div className="col-12 col-lg-10 col-xl-10 offset-xl-1 top-padding">
                            
                            <div className="container PageContainer">
                                <div className="row">
                                    <label className="display-4 text-center center">Pending Bill</label>
                                </div>
                                <div className="showPendingBill" hidden={!isPendingBill}>
                                    <div className="row">
                                        <div className="col-12 col-lg-10 col-xl-10 offset-xl-1 top-padding">
                                            <table>
                                                <thead>
                                                    <tr>
                                                        <th>Bill ID</th>
                                                        <th>Bill Date</th>
                                                        <th>Name</th>
                                                        <th>Units</th>
                                                        <th>Bill Amount</th>
                                                        <th>Tax</th>
                                                        <th>Dues</th>
                                                        <th>Fine</th>
                                                        <th>Total Bill</th>
                                                        <th>Due Date</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        
                                                        <td>{bill_id}</td>
                                                        <td>{bill_date}</td>
                                                        <td>{name}</td>
                                                        <td>{units}</td>
                                                        <td>{current_billAmt}</td>
                                                        <td>{tax}</td>
                                                        <td>{dues}</td>
                                                        <td>{fine}</td>
                                                        <td>{total_billAmt}</td>
                                                        <td>{due_date}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12 col-lg-10 col-xl-10 offset-xl-1 top-padding">
                                            <button type="button" className="loginButton buttondecoration" data-toggle="modal" data-target="#staticBackdrop" onClick={updatePaymentDetails}>
                                                Pay Now
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="noPendingBill" hidden={isPendingBill}>
                                    <div className="row">
                                        <div className="col-12 col-lg-10 col-xl-10 offset-xl-1 top-padding nopendingbilldiv">
                                            <img src={yayimage} className="nopendingbillimg" alt=""/>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12 col-lg-10 col-xl-10 offset-xl-1 nopendingbilldiv">
                                            <label className="display-4 text-center"><h1>Congrats!! No Pending Bill!!</h1></label>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal fade" id="staticBackdrop" data-backdrop="static" data-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                    <div className="modal-dialog modal-dialog-centered">
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
                                                        <div className="col-30">
                                                            <label className="display-6 text-center">Bill Id : </label>
                                                        </div>
                                                        <div className="col-70">
                                                            <input className="display-6 " type="text" name="bill_id" value={pendingBill.bill_id} disabled/>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-30">
                                                            <label className="display-6 text-center">Consumer Id : </label>
                                                        </div>
                                                        <div className="col-70">
                                                            <input className="display-6 " type="text" name="consumer_id" value={pendingBill.consumer_id} disabled/>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-30">
                                                            <label className="display-6 text-center">Name : </label>
                                                        </div>
                                                        <div className="col-70">
                                                            <input className="display-6 " type="text" name="name" value={pendingBill.name} disabled/>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-30">
                                                            <label className="display-6">Payment Date: </label>
                                                        </div>
                                                        <div className="col-70">
                                                            <input className="display-6 " type="text" name="consumer_id" value={todaysDate} disabled/>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-30">
                                                            <label className="display-6 text-center">Total bill : </label>
                                                        </div>
                                                        <div className="col-70">
                                                            <input className="display-6 " type="text" name="consumer_id" value={pendingBill.total_billAmt} disabled/>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-30">
                                                            <label className="display-6 text-center">Card Type : </label>
                                                        </div>
                                                        <div className="col-70">
                                                        <select className="display-6" aria-label=".form-select-lg example" name="card_type" value={card_type} onChange={(e) => onInputChange(e)} onBlur={validateInput} >
                                                            <option value="0">Open this select Card Type</option>
                                                            <option value="VISA">VISA</option>
                                                            <option value="RUPAY">RUPAY</option>
                                                            <option value="MASTERCARD">MASTERCARD</option>
                                                        </select>
                                                        {error.card_type && <span className='err'>{error.card_type}</span>}
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-30">
                                                            <label className="display-6 text-center">Card no. : </label>
                                                        </div>
                                                        <div className="col-70">
                                                            <input className="display-6 " type="tel" name="card_no" maxLength="16" value={card_no} onChange={(e) => onInputChange(e)} onBlur={validateInput}/>
                                                            {error.card_no && <span className='err'>{error.card_no}</span>}
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-30">
                                                            <label className="display-6 text-center">CVV : </label>
                                                        </div>
                                                        <div className="col-70">
                                                            <input className="display-6 " type="tel" name="cvv" maxLength="4" value={cvv} onChange={(e) => onInputChange(e)} onBlur={validateInput}/>
                                                            {error.cvv && <span className='err'>{error.cvv}</span>}
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-30">
                                                            <label className="display-6 text-center">Expiry date : </label>
                                                        </div>
                                                        <div className="col-70">
                                                            <input className="display-6 " type="date" name="exp_date" value={exp_date} onChange={(e) => onInputChange(e)} onBlur={validateInput}/>
                                                            {error.exp_date && <span className='err'>{error.exp_date}</span>}
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <label className="display-6 text-center err" hidden={isValidCardDetails}>Please enter valid card details first!! </label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" id="closeModal" className="loginButton buttondecoration greybutton" data-dismiss="modal" onClick={updateIsValidCardDetailsToDefault}>Cancel</button>
                                                <button type="button" className="loginButton buttondecoration" onClick={MakePayment}>Pay</button>
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
export default PayBill;