import React from 'react';

import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
// import { ABI, address } from "./components/Abi.js";

import { NavLink, Link, Outlet, useNavigate } from "react-router-dom";

// import { useState,useEffect } from 'react';
import Web3 from 'web3';


function Props2(props) {
   
    const location=useLocation();
    console.log(location.state);
    return (
        <>
            <h1>helloworld</h1>
            {/* <h2>{props.state}</h2> */}


          





        </>
    );
}

export default Props2;  