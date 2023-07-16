import React from 'react';
import Abiaddress from './abiaddress.js';
import { useContext } from 'react';

import { useEffect } from 'react';
import { useState } from 'react';
// import { ABI, address } from "./components/Abi.js";

import { NavLink, Link } from "react-router-dom";

// import { useState,useEffect } from 'react';
import Web3 from 'web3';
import ABIandAccount from './Abi.js';
// script//

function Units2() {
    let {abi,address} = useContext(Abiaddress);
    useEffect(()=>{
        //console.log(t);
    });
    return (
        <>
            <div>
                <h2>hiii bro</h2>
                <h5>
                    {address}
                </h5>
            </div>
            



        </>
    );
}

export default Units2;  