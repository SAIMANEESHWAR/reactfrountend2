
import React, { useEffect } from 'react';
import { useState } from 'react';
function ABIandAccount(){
	let [abi,setabi]=useState(null);
	let [address,setaddress]=useState(null);
	const setData=  ()=>{
setabi();
		setaddress("0x3D7432771CEc626c1eF6bB7148be4612C27A5c58");
		console.log("ji");
}
useEffect(async()=>{
	 setData();
},[]);
	return [abi,address];
 }
 export default ABIandAccount;  
