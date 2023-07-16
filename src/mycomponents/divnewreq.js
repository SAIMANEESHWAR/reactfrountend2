import React from 'react';
import { useEffect } from 'react';
import { useState,useContext } from 'react';
import profile from './homephotos/profile1.png';
import axios from 'axios';
import Offcanvas from './offcanvas';
import {useNavigate } from "react-router-dom";
import Navbar from './navbar';
import { AppContext } from './passabiaddress';


function Divnewreq() {

    //from passadi address page i am getting all this variables by the hook concept called use context

    const { searchbar, loadingspinner, waitingimg} = useContext(
        AppContext
      );


    const [divContent, setDivContent] = useState(loadingspinner);

  
    //creating navigate from the hook called usenavigate

    const navigate = useNavigate();

      const [logincontract, setlogincontract] = useState('');

    
   
    let div=sessionStorage.getItem('alldivids');
   
   console.log(div);
    useEffect(() => {
        const onload1 = async () => {
            let div=sessionStorage.getItem('alldivids');

            if(div==0){
                window.location.href = '/Pagenotfound';
            }

            try {
        
             
                await axios.post("https://onlybachend.onrender.com/Divnewreq",{
                  div
                }).then(res=>{
                 var arr=res.data.data267;
                 var numven=[];
                 for(var i=0;i<arr.length;i++){
                    numven.push(arr[i].unitid);
                 }
                 console.log(numven);
            var str=``;
            for(var i=0;i<numven.length;i++){
                if(`${parseInt(numven[i])}`.toLowerCase().includes(searchbar.toLowerCase())){
            
                str=str+`  <div class="col-sm p-4 m-4 mt-3  shadow">
            <h2 class=" mt-3 fw-normal">UNIT-${parseInt(numven[i])}</h2>
            <p>
                New Requests:
                <br>
                Recived Date: 
                
                </p>
            <p>
            <button onclick="eachreqmodal(${numven[i]})" class="btn btn-outline-primary" 
                            >View details </button></p>
          </div>`;
    
    
        
    
                }
             
            }
          
            console.log(str.length);
                if(str.length==0){
                    str=str+waitingimg;
                    }
            
            console.log(str);
             var newContent = str; // Replace with your desired content
            setDivContent(newContent);
              
        })
          
          
    } catch(e){
      console.log(e);
    }
        }

        onload1();
        }, [logincontract,searchbar]);
        const logout=()=>{
            sessionStorage.setItem('alldivids','');
            sessionStorage.setItem('newvenid', "");
            var button = document.getElementById('close');
            button.click();
          navigate("/Logindiv");
        };
    
        
        window.eachreqmodal = async (vid) => {


			sessionStorage.setItem('newvenid', vid);
			var venid = sessionStorage.getItem('newvenid');
            console.log(vid);
            navigate('./Diveachnewreq');
			// document.location.href="diveachnewreq.html";


}
  
    
    return (
        <>
                      <Navbar title={`Home`} modaltitle={"#exampleModal2"} />
                      <Offcanvas category={'divisions'} activeno={0}/>

     {/* modal-profile */}
     <div className="modal fade" id="exampleModal2" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog modal-dialog-centered">
    <div className="modal-content">
      <div className="modal-header py-3">
        <h1 className="modal-title fs-5" id="exampleModalLabel">DIVISION ID-{div}</h1>
        <button type="button" className="btn-close" id="close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="">
      <div className="modal-body  mt-3  d-flex">
        <div className="ms-3">
        <img className="bd-placeholder-img  mt-3 rounded-circle border-white" width="125" height="120" src={profile}/>

        </div>
        <div className="ms-5 mt-3">
        <h3 className=" mt-3 fw-normal">DIVISION ID-{div}</h3>
            <p>
            Contact Link : 
                <br/>
               
                
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


    {/* <!--new order--> */}
    <div  className="container">
        
    <div className="row ms-2 me-2" dangerouslySetInnerHTML={{ __html: divContent }} />
  
    </div>
        
        </>
    );
}

export default Divnewreq;  
