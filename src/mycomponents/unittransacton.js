import React from 'react';
import Offcanvas from './offcanvas';
import { useEffect } from 'react';
import { useState, useContext } from 'react';
import profile from './homephotos/profile1.png';
import axios from 'axios';
import Navbar from './navbar';
import { useNavigate } from "react-router-dom";
import { AppContext } from './passabiaddress';



function Transaction() {
    //from passadi address page i am getting all this variables by the hook concept called use context
    const { finalcontract, searchbar, loadingspinner, waitingimg } = useContext(
        AppContext
    );
    const [divContent, setDivContent] = useState(loadingspinner);
    const [ven2, setmyid] = useState(null);
    const [div2, setdivid] = useState(null);
    const [unit2, setunit2] = useState(null);
    const [ordno2, setordno2] = useState(null);
    //creating navigate from the hook called usenavigate
    const navigate = useNavigate();



    useEffect(() => {
        //here i need to run a function of async 
        const onloaduseeffect = async () => {
            //geting data of login details that are stored in session storage
            let unitidsessionstorage = sessionStorage.getItem('venids');
            let dividsessionstorage = sessionStorage.getItem('divids');
            setmyid(unitidsessionstorage);
            setdivid(dividsessionstorage);
            //if both are null that means user log out if he try to acess that 
            //page we need to navigate him to pagenotfound
            if (unitidsessionstorage == 0 && dividsessionstorage == 0) {
                window.location.href = '/Pagenotfound';
            }

            try {
                let unitid = sessionStorage.getItem('venids');
                let divid = sessionStorage.getItem('divids');

                await axios.post("https://onlybachend.onrender.com/transactionget", {
                    divid, unitid
                }).then(res => {
                    console.log(res);
                    //here the data is getting from mongo of transaction detaols
                    var arr = res.data.data267;
                    console.log(arr);
                    //with arr length i am taking the arr2 which stores the id  when i am filtering the index no is strating from 0 so i did this
                    var arr2 = [arr.length];
                    for (var i = 0; i < arr.length; i++) {
                        arr2[i] = arr[i].date.toLowerCase();
                    }

                    console.log(arr2);
                    //the input that u give in search bar based on it the arr will filter and
                    //i am stroing it in filteredTransactions so that i iterate this filtered array 
                    //while iterating
                    var filteredTransactions = arr.filter(transaction =>
                        transaction.date.toLowerCase().includes(searchbar.toLowerCase()) ||
                        transaction.id.toLowerCase().includes(searchbar.toLowerCase()) ||
                        transaction.gas.toLowerCase().includes(searchbar.toLowerCase())
                    );
                    var str = ``;
                    console.log(filteredTransactions);
                    //here i am iterating that filtered array only
                    for (var i = 0; i < filteredTransactions.length; i++) {

                        str = str + `  <div class="col-lg-11 ms-5 text-truncate overflow-auto me-5  p-5  mt-3  shadow">
                                            <div class="d-flex  flex-row ">
                                            <div class="row">
                                            <div class="d-flex col-sm justify-content-start">
                                            <h3 class="display-6 fw-medium">Transaction No : ${arr2.indexOf(filteredTransactions[i].date.toLowerCase()) + 1} </h3>
                                            </div>
                                            <div class="d-flex col-sm justify-content-end">
                                            <h5 class="mt-3 ms-5 text-success"> Time : ${filteredTransactions[i].date}</h5>
                                            </div>
                                            </div>
                                            </div>
                                        <h4 class="text-info mt-1">Transaction Id : ${filteredTransactions[i].id}</h4>
                                        <h4 class="text-success ">Gas Used : ${filteredTransactions[i].gas}</h4>
                                        <div class=" p-3 mt-2   w-100 bg-tertiary">
                                        <h5>Purpose : </h5>
                                        <h5 class="ms-3">${filteredTransactions[i].purpose}</h5>
                                        </div>
                                        <div class="d-flex mt-2 flex-row">
                                        <h5 class="me-5 ms-2"> From : ${filteredTransactions[i].from}</h5>
                                        <h5 class="ms-5"> To : ${filteredTransactions[i].to}</h5>
                                        </div>
                                        
                                        
                                        </div>`;
                    }
                    //no data found img will come it is present in waitingimg in passabiaddress file
                    console.log(str.length);
                    if (str.length == 0) {
                        str = str + waitingimg;
                    }
                    //here the data(in the form of html ) i get storing in divcontent so that i convert data 
                    //to react  with the help of dangerouslySetInnerHTML (which directly converts html string content to react) 
                    var newContent = str;
                    setDivContent(newContent);

                })


            } catch (e) {
                //consoling the error
                console.log(e);
            }

        }
        //calling at useeffect starting
        onloaduseeffect();
    }, [finalcontract, searchbar]);

    const logout = () => {
        //logout  i am setting unitid and divid to empty 
        sessionStorage.setItem('divids', '');
        sessionStorage.setItem('venids', '');
        //i am closing the modal through button with id 
        var button = document.getElementById('close');
        button.click();
        navigate("/");
    };






    return (<>
        <Navbar title={`Transactions`} modaltitle={"#exampleModal"} />
        {/* here active no in navbar is which link need to be active while open this component */}
        <Offcanvas category={'units'} activeno={5} />

        {/* modal-profile */}
        <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header py-3">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">DIVISION ID-{div2}</h1>
                        <button type="button" className="btn-close" id="close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="">
                        <div className="modal-body  mt-3  d-flex">
                            <div className="ms-3">
                                <img className="bd-placeholder-img  mt-3 rounded-circle border-white" width="125" height="120" src={profile} />

                            </div>
                            <div className="ms-5 mt-3">
                                <h3 className=" mt-3 fw-normal">UNIT ID-{ven2}</h3>
                                <p>
                                    No.Requests :
                                    <br />
                                    Contact Link :

                                </p>
                            </div>

                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={logout} >Log Out</button>
                    </div>
                </div>
            </div>
        </div>
        {/* <!--table--> */}

        <div id="fullbody" className="container ">
            <div dangerouslySetInnerHTML={{ __html: divContent }} />
        </div>


    </>);
}



export default Transaction;

