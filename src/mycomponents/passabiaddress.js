import React, { createContext, useState } from 'react';
import Web3 from 'web3';
import girlwaitingimg from './homephotos/Girlwaiting2.png';
import { useEffect } from 'react';
// Create the context
export const AppContext = createContext();
// Create the context provider component
export const AppProvider = ({ children }) => {
    const [newrequest, setnewrequest] = useState(0);
 
	const [finalweb3, setweb333] = useState(null);
	const [finalcontract, setcontract333] = useState(null);
	// Define your variables and their initial values
	const [variable3, setVariable3] = useState([
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
	]);
	const [variable4, setVariable4] = useState('0xaD58B9038fed07B99387eCB9511d6B1426910B44');
	//0xe35dDAb0cE5FB8De7A871BCbC76c5517FA44fF1E
//0xB4778730E25504796798035Cb4718e2c65C419B8
	const [account2, setaccount] = useState('');
	const [reqaccount2, setreqaccount] = useState('');
	const [searchbar, setsearchbar] = useState('');
	const [loadingspinner, setloadingspinner] = useState(`<div id="fullbody" class="container">
														<div class="col-md-10 mx-auto col-lg-5 mt-5">
																<div class="p-4 mt-4 p-md-5 border rounded-3 bg-body-tertiary">
															        <div class="d-flex justify-content-center">
																        <div class="spinner-border" role="status">
																	        <span class="visually-hidden">Loading...</span>
																        </div>
																    </div>
															    </div>
															</div>
														</div>`);
	const [waitingimg, setwaiting] = useState(`<div class="row p-4 pe-3 pb-0 pe-lg-0 pt-lg-5 align-items-center rounded-3    mt-3  py-5">
										<div class="col-lg-6 text-center text-lg-center mt-4 ms-4  mb-3">
											<div class="text-lg-start ms-5">
												<h1 class="display-5 fw-bold lh-1 text-body-emphasis mb-3">NO DATA FOUND</h1>
												<p class="col-lg-10 fs-5">There are no new requests </p>
											</div>
										</div>
										<div class="col-lg-4 mx-auto    mt-3 col-lg-5">
										 <div class=" rounded-3 mb-5 me-5  bg-white">
											<img src=${girlwaitingimg} class="img-fluid w-100 " alt="...">
										 </div>
										</div>
									</div>`);
	useEffect(() => {
		const onload23 = async () => {

			try {


				// Your code here
				if (window.ethereum !== 'undefined') {
					const { ethereum } = window;
					console.log('connected');
					const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
					let account = accounts[0];
					let reqaccount = "0xF86d770B3fc79a7E05f2F9c13671a1389c8531b7";
					setaccount(account);
					setreqaccount(reqaccount);

					window.web3 = await new Web3(window.ethereum);
					window.contract = await new window.web3.eth.Contract(variable3, variable4);
					// Continue with the rest of your code
					setweb333(await new Web3(window.ethereum));
					let ss = await new window.web3.eth.Contract(variable3, variable4);

					setcontract333(ss);
				} else {
					console.log('not connected');
				}

			}
			catch (error) {
				console.log(error);
			}

		};

		onload23();
	}, []);

	// Create an object with the variables and their setter functions
	const contextValues = {
	finalweb3,finalcontract, account2,  searchbar, setsearchbar, loadingspinner,waitingimg,newrequest
	};

	return (
	<AppContext.Provider value={contextValues}>{children}</AppContext.Provider>
	);
};
