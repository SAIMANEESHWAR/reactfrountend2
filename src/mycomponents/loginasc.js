import React from 'react';
import { useState, useContext } from 'react';
import laptopimg from "./homephotos/image_3.jpg"
import { useNavigate } from "react-router-dom";
import { AppContext } from './passabiaddress';
import Toaster from './Toaster';

function Loginasc() {

    const navigate = useNavigate();
    const { account2 } = useContext(
        AppContext
    );
const[rendernum,setrendernum]=useState(0);
    const [toastercolor,settoastercolor]=useState('');
    const [toastermsg,settoastermsg]=useState('');
    const[toasterlink,settoasterlink]=useState('');
    const sub = async () => {

        let f1 = document.getElementById("f1").value;
        let f2 = document.getElementById("f2").value;
         if (f1 == 123123) {
            if (String(f2) == "123123") {
                console.log("success");
                sessionStorage.setItem('ascid', f1);
                var button = document.getElementById('myButton');
                button.click();
                navigate('/Aschomearr');

            }
            else{
                settoasterlink('fa-solid fa-circle-xmark fa-flip');
                settoastercolor('text-bg-danger');
                  settoastermsg('entered details were not correct');
                  setrendernum(rendernum+1);
                   var button = document.getElementById('toasterclickwithid');
                  button.click();
            }
        }
        else{
            settoasterlink('fa-solid fa-circle-xmark fa-flip');
            settoastercolor('text-bg-danger');
              settoastermsg('Entered details were not correct');
               var button = document.getElementById('toasterclickwithid');
              button.click();
        }

    }


    const unitnavigate = async (e) => {
        navigate('/');
    }
    const divisionsnavigate = async(e) => {
        navigate('/Logindiv');
    }
  
  
    return (
        <>
            <section className="navbar navbar-expand-lg bg-body-tertiary fixed-top" data-aos="fade-down">
                <div className="container-fluid" style={{ width: "100%" }}>
                    < div className='d-flex flex-row mb-3'>
                        <h1 className="mt-2">Home page</h1>
                    </div>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                        aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0 navfont">

                        <li className="nav-item">
                                <button type="button" className="btn btn-outline-success" onClick={ unitnavigate }>Units </button>
                            </li>
                            <li className="nav-item ms-3">
                                <button type="button" className="btn btn-outline-success" onClick={divisionsnavigate }>Divisions </button>
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
                data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">SIGN IN FORM</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="p-4 p-md-5 border rounded-3 bg-body-tertiary">
                            <div className="form-floating mb-3">
                                <input className="form-control" id="f1" placeholder="DIVISION ID" />
                                <label for="floatingInput">ASC ID</label>
                            </div>

                            <div className="form-floating mb-3">
                                <input type="password" className="form-control" id="f2" placeholder="Password" />
                                <label for="floatingPassword">Password</label>
                            </div>
                            <div className="checkbox mb-3">

                            </div>
                            <button className="w-100 btn btn-lg btn-primary" onClick={sub} >Sign in</button>
                            <hr className="my-4" />
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" id='myButton' data-bs-dismiss="modal">Close</button>

                        </div>
                    </div>
                </div>
            </div>


            <section style={{ backgroundImage: `url(${laptopimg})`, backgroundSize: "cover" }}>
                <div className="container-fluid  " style={{ marginTop: '100px' }}>
                    <div className="row p-4 pe-3 pb-0 pe-lg-0 pt-lg-5 align-items-center rounded-3   mt-5" >
                        <div className="col-lg-7 p-3 p-lg-5  pt-lg-3" style={{ marginTop: '310px' }}>
                            <div className='justify-content-center align-middle'>
                                <h1 className="display-4 fw-bold mt-3  lh-1 mb-3 text-info-emphasis">SUPPLY CHAIN </h1>
                                <h1 className="display-4 fw-bold lh-1 mt-3 fs-1 text-success-emphasis ms-4">MANAGE - MENT</h1>
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
            <Toaster toastercolor={toastercolor} toastermsg={toastermsg} toasterlink={toasterlink} rendernum={rendernum} />
        </>
    );
}

export default Loginasc;  