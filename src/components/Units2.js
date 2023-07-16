import React from 'react';
import Units from './Units.js';

import { useEffect } from 'react';
import { useState } from 'react';
// import { ABI, address } from "./components/Abi.js";

import { NavLink, Link, Outlet, useNavigate } from "react-router-dom";

// import { useState,useEffect } from 'react';
import Web3 from 'web3';
import ABIandAccount from './Abi.js';
import Abiaddress from './abiaddress.js';
// script//


// script//

function Units2() {
    const [data, setdata] = useState({
        abi1: [
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "_id",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "_myvenid",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "_myid",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "_venid",
                        "type": "uint256"
                    },
                    {
                        "internalType": "string",
                        "name": "_status",
                        "type": "string"
                    },
                    {
                        "internalType": "uint256",
                        "name": "_ord",
                        "type": "uint256"
                    },
                    {
                        "internalType": "string",
                        "name": "inunitidordno",
                        "type": "string"
                    }
                ],
                "name": "anodivtounitconfirmfunction",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "_id",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "_myid",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "_venid",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "_ord",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "_i",
                        "type": "uint256"
                    }
                ],
                "name": "anodivtounits",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "_id",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "_venid",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "_ord",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "_i",
                        "type": "uint256"
                    }
                ],
                "name": "asc",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "_id",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "_venid",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "_ord",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "_i",
                        "type": "uint256"
                    }
                ],
                "name": "ascforward",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "_id",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "myasc",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "_venid",
                        "type": "uint256"
                    },
                    {
                        "internalType": "string",
                        "name": "_status",
                        "type": "string"
                    },
                    {
                        "internalType": "uint256",
                        "name": "_ord",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "_i",
                        "type": "uint256"
                    }
                ],
                "name": "ascstatus",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "_id",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "_myvenid",
                        "type": "uint256"
                    },
                    {
                        "internalType": "string",
                        "name": "_status",
                        "type": "string"
                    },
                    {
                        "internalType": "uint256",
                        "name": "_venid",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "_ord",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "_i",
                        "type": "uint256"
                    }
                ],
                "name": "conforming",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "string",
                        "name": "_maniiddivord",
                        "type": "string"
                    },
                    {
                        "internalType": "uint256",
                        "name": "_id",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "_venid",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "_ordno",
                        "type": "uint256"
                    }
                ],
                "name": "manifacturer",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "_id",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "_venid",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "_ordno",
                        "type": "uint256"
                    },
                    {
                        "internalType": "string[]",
                        "name": "_p",
                        "type": "string[]"
                    },
                    {
                        "internalType": "uint256[]",
                        "name": "_q",
                        "type": "uint256[]"
                    },
                    {
                        "internalType": "string",
                        "name": "_l",
                        "type": "string"
                    }
                ],
                "name": "publish",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "_id",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "_venid",
                        "type": "uint256"
                    },
                    {
                        "internalType": "string[]",
                        "name": "_p",
                        "type": "string[]"
                    },
                    {
                        "internalType": "uint256[]",
                        "name": "_q",
                        "type": "uint256[]"
                    },
                    {
                        "internalType": "string",
                        "name": "_l",
                        "type": "string"
                    }
                ],
                "name": "unit",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "anodivtounitconfirmreturn",
                "outputs": [
                    {
                        "internalType": "string[]",
                        "name": "",
                        "type": "string[]"
                    },
                    {
                        "internalType": "uint256[]",
                        "name": "",
                        "type": "uint256[]"
                    },
                    {
                        "internalType": "uint256[]",
                        "name": "",
                        "type": "uint256[]"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "_id",
                        "type": "uint256"
                    }
                ],
                "name": "anodivtounitsreturn",
                "outputs": [
                    {
                        "internalType": "uint256[]",
                        "name": "",
                        "type": "uint256[]"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "ascaccreturn",
                "outputs": [
                    {
                        "internalType": "uint256[]",
                        "name": "",
                        "type": "uint256[]"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "ascalreadyforwreturn",
                "outputs": [
                    {
                        "internalType": "uint256[]",
                        "name": "",
                        "type": "uint256[]"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "ascforwardreturn",
                "outputs": [
                    {
                        "internalType": "uint256[]",
                        "name": "",
                        "type": "uint256[]"
                    },
                    {
                        "internalType": "uint256[]",
                        "name": "",
                        "type": "uint256[]"
                    },
                    {
                        "internalType": "uint256[]",
                        "name": "",
                        "type": "uint256[]"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "_id",
                        "type": "uint256"
                    }
                ],
                "name": "ifdivsenttoasc",
                "outputs": [
                    {
                        "internalType": "uint256[]",
                        "name": "",
                        "type": "uint256[]"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "_id",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "_venid",
                        "type": "uint256"
                    }
                ],
                "name": "myaccepted",
                "outputs": [
                    {
                        "internalType": "uint256[]",
                        "name": "",
                        "type": "uint256[]"
                    },
                    {
                        "internalType": "uint256[]",
                        "name": "",
                        "type": "uint256[]"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "_id",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "_venid",
                        "type": "uint256"
                    }
                ],
                "name": "published",
                "outputs": [
                    {
                        "internalType": "uint256[]",
                        "name": "",
                        "type": "uint256[]"
                    },
                    {
                        "internalType": "uint256[]",
                        "name": "",
                        "type": "uint256[]"
                    },
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "_id",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "_venid",
                        "type": "uint256"
                    }
                ],
                "name": "published2",
                "outputs": [
                    {
                        "internalType": "string[]",
                        "name": "",
                        "type": "string[]"
                    },
                    {
                        "internalType": "uint256[]",
                        "name": "",
                        "type": "uint256[]"
                    },
                    {
                        "internalType": "uint256[]",
                        "name": "",
                        "type": "uint256[]"
                    },
                    {
                        "internalType": "uint256[]",
                        "name": "",
                        "type": "uint256[]"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "_id",
                        "type": "uint256"
                    }
                ],
                "name": "returnanodivtounits",
                "outputs": [
                    {
                        "internalType": "uint256[]",
                        "name": "",
                        "type": "uint256[]"
                    },
                    {
                        "internalType": "uint256[]",
                        "name": "",
                        "type": "uint256[]"
                    },
                    {
                        "internalType": "uint256[]",
                        "name": "",
                        "type": "uint256[]"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "returnasc",
                "outputs": [
                    {
                        "internalType": "uint256[]",
                        "name": "",
                        "type": "uint256[]"
                    },
                    {
                        "internalType": "uint256[]",
                        "name": "",
                        "type": "uint256[]"
                    },
                    {
                        "internalType": "uint256[]",
                        "name": "",
                        "type": "uint256[]"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "returnmanifacturer",
                "outputs": [
                    {
                        "internalType": "string[]",
                        "name": "",
                        "type": "string[]"
                    },
                    {
                        "internalType": "uint256[]",
                        "name": "",
                        "type": "uint256[]"
                    },
                    {
                        "internalType": "uint256[]",
                        "name": "",
                        "type": "uint256[]"
                    },
                    {
                        "internalType": "uint256[]",
                        "name": "",
                        "type": "uint256[]"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "_id",
                        "type": "uint256"
                    }
                ],
                "name": "returnpql",
                "outputs": [
                    {
                        "internalType": "string[][]",
                        "name": "",
                        "type": "string[][]"
                    },
                    {
                        "internalType": "uint256[][]",
                        "name": "",
                        "type": "uint256[][]"
                    },
                    {
                        "internalType": "string[]",
                        "name": "",
                        "type": "string[]"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "_id",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "_venid",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "_ordno",
                        "type": "uint256"
                    }
                ],
                "name": "returnrangebar",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "_id",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "_venid",
                        "type": "uint256"
                    }
                ],
                "name": "showproducts",
                "outputs": [
                    {
                        "internalType": "string[][]",
                        "name": "",
                        "type": "string[][]"
                    },
                    {
                        "internalType": "uint256[][]",
                        "name": "",
                        "type": "uint256[][]"
                    },
                    {
                        "internalType": "string[]",
                        "name": "",
                        "type": "string[]"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "_id",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "_venid",
                        "type": "uint256"
                    }
                ],
                "name": "unitorderno",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            }
        ],
        address1: "0x3D7432771CEc626c1eF6bB7148be4612C27A5c58"
    });
    let Navigate = useNavigate();
    let [ABI,setABI] = useState([]);
    let [Address,setaddress]= useState("");
    useEffect(() => {
        setABI(data.abi1);
        setaddress(data.address1);
    }, []);


    // const [myid, setmyid] = useState(1000);
    // // divid = 1;
    // const [divid, setdivid] = useState(1);
    // let [account, setAccount] = useState("");
    // // var cartnum = 1;
    // let [cartnum, setcartnum] = useState(1);

    // let abiandaccount= ABIandAccount();
    // let [ABI, setABI] = useState(abiandaccount[0]);
    // let [address, setaddress] = useState("");




    // let m=abiandaccount[0];

    // setABI(m);

    // setaddress(abiandaccount[1]);
    // console.log(ABI);
    // console.log(address);

    return (
        <>
            <h1>helloworld</h1>
            {/* <Link to="/Units">Go to units page Page</Link> */}
            <button onClick={()=>{
                Navigate("/Units");
            }}>
                Go to
            </button>


            <div >
                <Abiaddress.Provider value={{
                    abi : ABI,
                    address: Address
                }}>
                    <Outlet />
                </Abiaddress.Provider>
            </div>





        </>
    );
}

export default Units2;  