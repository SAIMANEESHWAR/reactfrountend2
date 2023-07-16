import React from 'react';
import { useEffect } from 'react';
import { useState, useContext } from 'react';
import profile from './homephotos/profile1.png';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { AppContext } from './passabiaddress';
import Navbar from './navbar';
import girlwaitingimg from './homephotos/Girlwaiting2.png';
import Offcanvas from './offcanvas';
import Toaster from './Toaster';



function Unitorder() {


    const [toastercolor,settoastercolor]=useState('');
    const [toastermsg,settoastermsg]=useState('');
    const[toasterlink,settoasterlink]=useState('');
    const[rendernum,setrendernum]=useState(0);

    const [unitid, setunitid] = useState(null);
    const [divisionid, setdivisionid] = useState(null);
    const [ordernumber, setordernumber] = useState(null);
    const navigate = useNavigate();
    const { finalweb3, finalcontract } = useContext(
        AppContext
    );


    useEffect(() => {
        const onloaduseeffect = async () => {
            if (finalcontract) {
                    // Get the current date
var today = new Date();

// Format the date for the input value (YYYY-MM-DD)
var formattedDate = today.toISOString().split("T")[0];

// Set the minimum date for the input
document.getElementById("lastdate").min = formattedDate;
                let unitidfromsession = sessionStorage.getItem('venids');
                let dividfromsession = sessionStorage.getItem('divids');
                setunitid(unitidfromsession);
                setdivisionid(dividfromsession);
                //if both are null that means user log out if he try to acess that 
                //page we need to navigate him to pagenotfound
                if (unitidfromsession == 0 && dividfromsession == 0) {
                    window.location.href = '/Pagenotfound';
                }
                console.log(divisionid, unitid);
                console.log(finalcontract.methods.unitorderno(dividfromsession, unitidfromsession).call());
                var orderr = await finalcontract.methods.unitorderno(dividfromsession, unitidfromsession).call();
                setordernumber(orderr);
                
            }
        }

        onloaduseeffect();
    }, [finalcontract,rendernum]);
    //products
    const [f1, setf1] = useState('');
    //quantity
    const [f2, setf2] = useState(0);
    //last date
    const [f3, setf3] = useState('');


    const InputChangedate = (event) => {
        setf3(event.target.value);
        console.log(event.target.value);
    };
    const InputChangequantity = (event) => {
        setf2(event.target.value);
    };
    const InputChangeproducts = (event) => {
        setf1(event.target.value);
    };


    const logout = () => {
        sessionStorage.setItem('divids', '');
        sessionStorage.setItem('venids', '');
        //i am closing the modal through button with id 
        var button = document.getElementById('close');
        button.click();
        navigate("/");
    };


    const [productsarray, setproductsarray] = useState([]);
    const [quantityarray, setquantityarray] = useState([]);
    const [cartnum, setcartnum] = useState(0);




    const addtocart = async () => {


        let inputproduct = document.getElementById("f1").value;
        console.log(inputproduct);
        let lastdate = document.getElementById("lastdate").value;
        //commented one is if u not using form tag and if one tag is not slected it will make borderL

        if (inputproduct != '' && f2 != 0 && f3 != '') {

            setproductsarray(preval => [...preval, inputproduct]);
            setquantityarray(preval2 => [...preval2, parseInt(f2)]);

            setcartnum(productsarray.length + 1);

            //here input is filled so i am removing the red border
            document.getElementById("f1").classList.remove('border-danger');
            document.getElementById("f2").classList.remove('border-danger');
            document.getElementById("lastdate").classList.remove('border-danger');
            // document.getElementById("f1").value='';
            // document.getElementById("f2").value=0;
            // document.getElementById("f3").value='';
        }
        else {
            //if input not filled then i am adding border danger
            if (inputproduct == '') {
                document.getElementById("f1").classList.add('border-danger');
            }
            else {
                document.getElementById("f1").classList.remove('border-danger');
            }
            if (f2 == 0) {
                document.getElementById("f2").classList.add('border-danger');
            }
            else {
                document.getElementById("f2").classList.remove('border-danger');
            }
            if (lastdate == '') {
                document.getElementById("lastdate").classList.add('border-danger');
            }
            else {
                document.getElementById("lastdate").classList.remove('border-danger');
            }

        }

    }






    const [tabledata2, settabledata2] = useState('');


    const order = () => {


        const allproductsarray = productsarray;
        const allquantityarray = quantityarray;


        var tabledata = ``;
        for (let i = 0; i < allproductsarray.length; i++) {

            tabledata = tabledata + ` <tr>
            <td>${allproductsarray[i]}</td>
            <td>${allquantityarray[i]}</td>
            <td><button type="button" class="border-0 bg-transparent" onclick="removeitemfromindex(${i})"  ><i class="fa-solid fa-trash"></i></button></td>
            </tr> `;

        }
        if (tabledata.length == 0) {
            tabledata = tabledata + `<div class="justify-content-center ms-5 d-flex"><div><img src="${girlwaitingimg}" class="img-fluid w-100 ms-3 " ></img></div></div>`;
        }

        settabledata2(tabledata);
        setcartnum(productsarray.length);
    }
    console.log(tabledata2);


    window.removeitemfromindex = async (index) => {
        const deletedElement = productsarray.splice(index, 1);
        const deletedElement2 = quantityarray.splice(index, 1);
        order();
    }

    const submitrequest = async () => {
        //here iam checking that whether he added items to cart or not
        if (productsarray.length != 0) {
            finalweb3.eth.getAccounts().then(function (accounts) {
                var activeaccount = accounts[0];
                let f3 = document.getElementById("lastdate").value;
                //here i am sending all the products and quantity and last date from particular div->unit
                return finalcontract.methods.unit(divisionid, unitid, productsarray, quantityarray, f3).send({ from: activeaccount });

            }).then(async function (tx) {

                const date = new Date().toLocaleString();
                console.log("Current Date and Time:", date);
                var purpose = "This Transaction Was Made To Order Some Items From Order Form Page";
                var gas = tx.gasUsed;
                var id = tx.transactionHash;
                var from = tx.from;
                var to = tx.to;
                var block = tx.blockNumber;
                console.log(gas, id, from, to, block);
                console.log(" THE ORDER WAS SUCESSFULLY COMPLETED");
                /* */
                var myid=unitid;
                var divid=divisionid;
                console.log(unitid,divisionid);
                await axios.post("https://onlybachend.onrender.com/sai", {
                    myid, divid, gas, id, from, to, block, purpose, date
                }).then(res => {
                    console.log("then");
                    setrendernum(rendernum+1);
                    settoasterlink('fa-solid fa-circle-check fa-flip');
                    settoastercolor('text-bg-success');
                      settoastermsg('Ordered placed successfully');
                       var button = document.getElementById('toasterclickwithid');
                      button.click();
                //   window.location.reload();
                setcartnum(0);
                setquantityarray([]);
                setproductsarray([]);
                document.getElementById('f1').value='';
                document.getElementById('f2').value=0;
                document.getElementById('lastdate').value='';

                var button2 = document.getElementById('modalproducts');
                      button2.click();

                }).catch(e => {
                    console.log("eee");
                    setrendernum(rendernum+1);
                    settoasterlink('fa-solid fa-circle-xmark fa-flip');
                    settoastercolor('text-bg-danger');
                      settoastermsg('Error in connecting Mongo');
                       var button = document.getElementById('toasterclickwithid');
                      button.click();
                })
                /* */
            }).catch(function (tx) {
                console.log(tx);
                setrendernum(rendernum+1);
                settoasterlink('fa-solid fa-circle-xmark fa-flip');
                        settoastercolor('text-bg-danger');
                          settoastermsg('THE ORDER WAS NOT SUCESSFULLY COMPLETED');
                           var button = document.getElementById('toasterclickwithid');
                          button.click();
            })
        }

        //if he didnt added items to carts
        else {
            setrendernum(rendernum+1);
            settoasterlink('fa-solid fa-circle-xmark fa-flip');
                        settoastercolor('text-bg-warning');
                          settoastermsg('Add items to cart');
                           var button = document.getElementById('toasterclickwithid');
                          button.click();
        }

    }


    return (
        <>
            <Navbar title={`Order Form`} modaltitle={"#exampleModal2"} />
            <Offcanvas category={"units"} activeno={1} />


            {/* modal-profile */}
            <div className="modal fade" id="exampleModal2" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header py-3">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">DIVISION ID-{divisionid}</h1>
                            <button type="button" className="btn-close" id="close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="">
                            <div className="modal-body  mt-3  d-flex">
                                <div className="ms-3">
                                    <img className="bd-placeholder-img  mt-3 rounded-circle border-white" width="125" height="120" src={profile} />

                                </div>
                                <div className="ms-5 mt-3">
                                    <h3 className=" mt-3 fw-normal">UNIT ID-{unitid}</h3>
                                    <p>
                                        No.Requests : {parseInt(ordernumber) + 1}
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

            {/* <!--start form--> */}
            <div className="container shadow-lg mt-5 p-5  bg-body-secondary rounded-3">
                <h2 id="ornum">ORDER NO-{parseInt(ordernumber) + 1} </h2>
                <div className="mt-4 mb-2 row g-3">
                    <div className="col-md-6 mb-2">
                        <label for="f1" className="form-label">Product Name</label>

                        {/* <select id="f1" className="form-select" required onChange={InputChangeproducts}>
                            <option selected>BULLET PROOF JACKETS</option>
                            <option>TANKERS</option>
                            <option>CARS</option>
                            <option>TOMATO</option>
                            <option>BULLETS</option>
                        </select> */}
                        <input type="text" id='f1' required className="form-control" list="items" placeholder="Select an item" />
                        <datalist id="items">
                            <option selected value="BULLET PROOF JACKETS" />
                            <option value="TANKERS" />
                            <option value="CARS" />
                            <option value="BULLETS" />
                        </datalist>

                    </div>
                    <div className="col-md-6">
                        <label for="f2" className="form-label">Quantity</label>
                        <input type="number" required className="form-control" id="f2" onChange={InputChangequantity} />

                    </div>
                </div>
            </div>



            <div className="container shadow-lg mt-1 p-5  bg-body-secondary rounded-3" >  <div className="col">
                <div className="col-md-6 container ">
                    <label for="inputCity" className="form-label">Last Date</label>
                    <input type="date" className="form-control" required id="lastdate" min="" onChange={InputChangedate} />

                </div>
            </div></div>

            <div className="container  ">
                <div className="  gap-2 mt-5 row align-items-center">
                    <div className="col">
                        <button type='submit' className="btn btn-primary position-relative" onClick={addtocart}>
                            <i className="fa-solid fa-cart-shopping"></i> Add To Cart <span id="cartnumber" className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-secondary">{cartnum}</span>
                        </button>

                        {productsarray.length > 0 ? (
                            <button onClick={order} className="ms-5 btn btn-primary" data-bs-toggle="modal"
                                data-bs-target="#exampleModal">
                                View Cart
                            </button>
                        ) : (
                           <br/>
                        )}

                    </div>
                </div>
            </div>





            {/* <!--model--> */}
            <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog ">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Order List</h1>
                            <button type="button" className="btn-close" id="modalproducts" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Product name</th>
                                    <th scope="col">Quantity</th>
                                    <th></th>
                                </tr>
                            </thead>

                            {/* <!-- body --> */}
                            <tbody dangerouslySetInnerHTML={{ __html: tabledata2 }} />


                        </table>
                        <div className="modal-footer">
                            <div >
                                <button onClick={submitrequest} className="btn btn-outline-primary">CONFIRM ORDER</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <Toaster toastercolor={toastercolor} toastermsg={toastermsg} toasterlink={toasterlink} rendernum={rendernum}/>

        </>
    );
}

export default Unitorder;  