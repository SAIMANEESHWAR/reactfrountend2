import React from 'react';


import { useEffect, useRef } from 'react';
import { useState, useContext } from 'react';
import axios from 'axios';

import Toaster from './Toaster';
import { NavLink, Link, Outlet, useNavigate } from "react-router-dom";

import Web3 from 'web3';
import { AppContext } from './passabiaddress';
import ReactDOM from 'react-dom';


import laptopimg from "./homephotos/image_3.jpg"



function Loginunits() {
    const modalRef = useRef(null);
    const navigate = useNavigate();
    const { account2 } = useContext(
        AppContext
    );
    const [logincontract, setlogincontract] = useState('');
    const[rendernum,setrendernum]=useState(0);
    // useEffect(() => {
    //     const onload1 = async () => {
    //     if (window.ethereum !== "undefined") {
    //         const { ethereum } = window; 
    //         console.log("connected");
    //         const acconts = await ethereum.request({ method: "eth_requestAccounts" });

    //        let accont = acconts[0];

    //     } else {
    //         console.log("not connected");

    //     }
    //     window.web3 = await new Web3(window.ethereum);
    //     setlogincontract(await new window.web3.eth.Contract(variable1,variable2) );
    // }

    // onload1();
    // }, []);

    const [toastercolor,settoastercolor]=useState('');
    const [toastermsg,settoastermsg]=useState('');
    const[toasterlink,settoasterlink]=useState('');

    const [divid, setf1] = useState('');
    const [unitid, setf2] = useState('');
    const [password, setf3] = useState('');

    const handleInputChange1 = (event) => {
        setf1(event.target.value);
    };
    const handleInputChange2 = (event) => {
        setf2(event.target.value);
    };
    const handleInputChange3 = (event) => {
        setf3(event.target.value);
    };


    const sub = async (e) => {

        console.log("i came here1");

        e.preventDefault();


        try {
            await axios.post("https://onlybachend.onrender.com/Loginunits", {
                divid, unitid, password
            }).then(res => {
                console.log(res.data);
                if (res.data != "not exist") {
                    // account2 is current active metamask account  
                    if (res.data.checkeddata.metamaskaccount.toLowerCase() == account2.toLowerCase()) {
                        console.log("po");
                        sessionStorage.setItem('divids', divid);
                        sessionStorage.setItem('venids', unitid);
                        var button = document.getElementById('myButton');
                        button.click();
                        navigate("/Unitorder");
                    }
                    else {
                       
                        settoasterlink('fa-solid fa-circle-xmark fa-flip');
                        settoastercolor('text-bg-danger');
                          settoastermsg('connect to proper meta mask account');
                          setrendernum(rendernum+1);
                           var button = document.getElementById('toasterclickwithid');
                          button.click();
                    }
                }
                else if (res.data == "not exist") {
                   
                    settoasterlink('fa-solid fa-circle-xmark fa-flip');
                    settoastercolor('text-bg-danger');
                      settoastermsg('entered details were not correct');
                      setrendernum(rendernum+1);
                       var button = document.getElementById('toasterclickwithid');
                      button.click();
                }
            }).catch(e => {
                console.log(e);
              
                settoasterlink('fa-solid fa-circle-xmark fa-flip');
                        settoastercolor('text-bg-danger');
                          settoastermsg('Some thing went wrong');
                          setrendernum(rendernum+1);
                           var button = document.getElementById('toasterclickwithid');
                          button.click();
                // sessionStorage.setItem('divids', divid);
                // sessionStorage.setItem('venids', unitid);
                // var button = document.getElementById('myButton');
                // button.click();
                // navigate("/Unitorder");
            })


        } catch (error) {
            console.error('Error:', error);
            settoasterlink('fa-solid fa-circle-xmark fa-flip');
            settoastercolor('text-bg-danger');
              settoastermsg('error in connecting mongo');
              setrendernum(rendernum+1);
               var button = document.getElementById('toasterclickwithid');
              button.click();
           
        }


        /* */




        //     const didpass=await logincontract.methods.adddivreturns().call();
        //        let alldivid=didpass[0];
        //         // alldivpass=didpass[1];


        //         var r=0;
        //         console.log("i came here2");
        //         console.log(alldivid);
        //         if(alldivid.includes(String(f1))){
        //             const { ethereum } = window;
        //             const arr = await logincontract.methods.giveunits(f1).call();
        //             let ids=arr[0];
        //             let pass=arr[1];
        //             console.log(ids,pass);

        //             for(var i=0;i<ids.length;i++){
        //                 if(ids[i]==f2){
        //                     if(pass[i]==String(f3)){
        //                         sessionStorage.setItem('divids',f1);
        //                         sessionStorage.setItem('venids',f2);
        //                         console.log("success");
        //                         r=1;
        //                         // closeModal();
        //                         navigate('/Unitorder');
        //                         window.location.reload();
        //                     }
        //                 }
        //             }
        //         }
        //             if(r==0){
        //                 console.log("wrong password or wrong id");
        //             }
    };
    
    const divisionsnavigate = async (e) => {
        navigate('/Logindiv');
    }
    const ascnavigate = async(e) => {
        navigate('/Loginasc');
    }


    return (
        <>



            <section className="navbar navbar-expand-lg bg-body-tertiary fixed-top" data-aos="fade-down">
                <div className="container-fluid" style={{ width: '100%' }}>

                    <div className='d-flex flex-row mb-3'>
                        <div className="mt-2"><h1>Home page</h1></div>
                    </div>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                        aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0 navfont">

                            <li className="nav-item">
                                <button type="button" className="btn btn-outline-success" onClick={ divisionsnavigate }>Divisions </button>
                            </li>
                            <li className="nav-item ms-3">
                                <button type="button" className="btn btn-outline-success" onClick={ascnavigate }>Asc </button>
                            </li>
                            <li className="nav-item ms-3">
                                <button type="button" className="btn btn-outline-success" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                                    <div className="profile-23">
                                        <a>login</a>
                                    </div>
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* <!-- Modal -1--> */}
            <div className="modal fade col-md-10 mx-auto col-lg-5" id="staticBackdrop" data-bs-backdrop="static"
                data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true" >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">SIGN IN FORM</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="p-4 p-md-5 border rounded-3 bg-body-tertiary">
                            <div className="form-floating mb-3">
                                <input className="form-control" id="f1" placeholder="DIVISION ID" onChange={handleInputChange1} />
                                <label for="floatingInput">DIVISION ID</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input className="form-control" id="f2" placeholder="UNIT ID" onChange={handleInputChange2} />
                                <label for="floatingInput">UNIT ID</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input type="password" className="form-control" id="f3" placeholder="Password" onChange={handleInputChange3} />
                                <label for="floatingPassword">Password</label>
                            </div>
                            <div className="checkbox mb-3">

                            </div>
                            <button className="w-100 btn btn-lg btn-primary" onClick={sub} >Sign in</button>
                            <hr className="my-4" />
                            <small className="text-body-secondary"></small>
                        </div>
                        <div className="modal-footer">
                            <button type="button" id="myButton" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>

                        </div>
                    </div>
                </div>
            </div>



            <section style={{ backgroundImage: `url(${laptopimg})`, backgroundSize: "cover", top: "0", left: "0", width: "100%", height: "100%" }}>
                <div className="container-fluid  " style={{ marginTop: '100px' }}>
                    <div className="row p-4 pe-3 pb-0 pe-lg-0 pt-lg-5 align-items-center rounded-3   mt-5" >
                        <div className="col-lg-7 p-3 p-lg-5  pt-lg-3" style={{ marginTop: '310px' }}>
                            <div className='justify-content-center align-middle'>
                                <h1 className="display-4 fw-bold mt-3  lh-1 mb-3 text-info-emphasis">SUPPLY CHAIN </h1>
                                <h1 className="display-4 fw-bold lh-1 mt-3 fs-1 text-success-emphasis ms-4">MANAGEMENT</h1>
                                <p className="lead mb-5 ms-5 mt-3 fst-italic text-success">Place to Supply Goods</p>
                            </div>
                            <div className="d-grid gap-2 mt-3 ms-5 d-md-flex justify-content-md-center mb-4 mb-lg-3">

                            </div>
                        </div>
                        {/* <div className="p-3 col-md-10 mx-auto col-lg-4 p-md-5 border rounded-3 bg-body-tertiary mb-5 me-5  ">
              <div className='offset-lg-1  overflow-hidden shadow-lg mb-3'>
             
                    <img src={laptopimg} className="img-fluid " alt="..."/>
              </div>
                  </div> */}

                    </div>
                </div>
            </section>

            <Toaster toastercolor={toastercolor} toastermsg={toastermsg} toasterlink={toasterlink} rendernum={rendernum}/>

        </>
    );
}

export default Loginunits;  