import React from 'react';


import { useEffect } from 'react';
import { useState } from 'react';


import { NavLink, Link, Outlet, useNavigate } from "react-router-dom";

import Web3 from 'web3';


function Props() {
    const [data, setdata] = useState({
        address1: "0x3D7432771CEc626c1eF6bB7148be4612C27A5c58",
        sai : "sai"
    });
    // let Navigate = useNavigate();
    let [abi,setABI] = useState("");
    let [Address,setaddress]= useState("");
    
    useEffect(() => {
        setABI(data.sai);
        setaddress(data.address1);
    }, []);


console.log(abi);
    return (
        <>
            <h1>helloworld</h1>
            <Link to="/Props2" state={{data:data.abi}}>Go to </Link>
            {/* <button onClick={()=>{
                Navigate("/Units");
            }}>
                Go to
            </button> */}


          





        </>
    );
}

export default Props;  