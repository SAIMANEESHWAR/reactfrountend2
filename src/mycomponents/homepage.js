import React from 'react';

import workflow from './homephotos/saiwork.png';


import { useEffect } from 'react';
import { useState } from 'react';


import { NavLink, Link, Outlet, useNavigate } from "react-router-dom";

import Web3 from 'web3';


function Homepage() {

    return (
        <>
             
  <div className="p-5 text-center mt-5 bg-body-tertiary rounded-3 mt-5">
    <svg className="bi mt-4 mb-3 " style={{color: 'var(--bs-indigo)'}} width="100" height="100"></svg>
    <h1 className="text-body-emphasis">SCM</h1>
    <h5 className="text-body-emphasis">SUPPLY CHAIN MANAGEMENT</h5>
    <p className="col-lg-8 mx-auto fs-5 text-muted">
        The website which creates a relation between asc units divisions .
    </p>
    <div className="d-inline-flex gap-2 mb-5">
      <Link to="/Loginunits" className="d-inline-flex align-items-center btn btn-primary btn-lg px-4 rounded-pill" type="button">
        I AM  ADST  (UNIT-HEAD)
        <svg className="bi ms-2" width="24" height="24"></svg>
      </Link>
      <Link to="/Logindiv" className="btn btn-outline-secondary btn-lg px-4 rounded-pill" >
        I AM DDST (DIVISION-HEAD)</Link>
        <Link to="/Loginasc" className="d-inline-flex align-items-center btn btn-primary btn-lg px-4 rounded-pill" type="button">
            I AM  DGST  (ASC-HEAD OF ALL)
            <svg className="bi ms-2" width="24" height="24"></svg>
          </Link>  
      {/* <!-- Button trigger modal --> */}
<button type="button" className="d-inline-flex align-items-center btn btn-primary btn-lg px-4 rounded-pill" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
  W0RK FL0W
</button>

      
    </div>
  </div>


  
{/* <!-- Modal --> */}
<div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div className="modal-dialog modal-lg">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="staticBackdropLabel">WORK FLOW</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        <img src={workflow} className="img-fluid" height="500px" width="100%" alt="..."/>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>

      </div>
    </div>
  </div>
</div>  

        </>
    );
}

export default Homepage;  