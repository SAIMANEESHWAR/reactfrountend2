
import { useEffect } from 'react';
import { useState, useContext } from 'react';

import profile from './homephotos/profile1.png';
import iam from './homephotos/iamwaiting.jpg';
import Offcanvas from './offcanvas';

import { NavLink, Link, Outlet, useNavigate } from "react-router-dom";
import Navbar from './navbar';
import Web3 from 'web3';
import { AppContext } from './passabiaddress';




function Ascaccepted() {
    const {finalcontract ,searchbar, loadingspinner, waitingimg} = useContext(
        AppContext
    );

   
    const [divContent, setDivContent] = useState(loadingspinner);
    const[tableContent,settableContent]=useState('');

    const navigate = useNavigate();

    // const [contract33,setContract33]=useState(null);
    // setContract33(finalcontract);

    const [whichdiv2, setwhichdiv] = useState([]);
    const [whichunit2, setwhichunit] = useState([]);
    const [whichord2, setwhichord] = useState([]);
    const [numven2, setnumven] = useState([]);
    useEffect(() => {
       
        const onload1 = async () => {
             if(finalcontract){

                let ascid=sessionStorage.getItem('ascid');
                console.log(ascid);
                if(ascid==0){
                    navigate("/Pagenotfound");
                }

           var numven=await finalcontract.methods.ascaccreturn().call();
           setnumven(numven);
        

            const arr33s = await finalcontract.methods.returnasc().call();
              var whichdiv=arr33s[0];
              setwhichdiv(whichdiv);
              var whichunit=arr33s[1];
              setwhichunit(whichunit);
              var whichord=arr33s[2];
              setwhichord(whichord);

            
    
            
            var str=``;
            // for(var i=0;i<numven.length;i++){
                for(var i=numven.length-1;i>=0;i--){
    
                /*taken the i values from ascarr so directly doing*/
                console.log(i);
                 /* */
                 console.log(searchbar);
                 
                 //making all the things to string and then searching (includes)
                 if(` ${whichunit[numven[i]]} ${whichord[numven[i]]+1}  ${parseInt(i)+1} ${parseInt(whichord[numven[i]])+1} `.toLowerCase().includes(searchbar.toLowerCase())){
                   
               
                str=str+`  <div class="col-lg-3 col-sm  p-5  mt-3  shadow">
            <h2 class=" mt-3 mb-2 fw-normal">ACCEPTED ORDER-${parseInt(i)+1}</h2>
           

                                                <div class="d-flex flex-row text-success">
                                                  <div class=""><h4>Accepted To :  </h4></div>
                                                  <div class="ms-1"><h4 >  ${whichdiv[numven[i]]}</h4> </div>
                                                  <div   class="p-1"><i class="fa-solid fa-arrow-right"></i></div>
                                                  <div class=""><h4 >${whichunit[numven[i]]}</h4> </div>
                                                  </div>
                
                <h5 class="text-info">
                ORDER NO : ${parseInt(whichord[numven[i]])+1}
                <br>
                
                
                </h5>
          
            <button onclick="eachreqmodal(${i})" class="btn btn-outline-primary mt-3" data-bs-toggle="modal" data-bs-target="#exampleModal"
                            >View Details </button></p>
          </div>`;
    
    
        
    
                 }
             
            }
            
    
    
    
            console.log(str.length);
                if(str.length==0){
                    str=str+waitingimg;
                    }
            
           
             var newContent = str; // Replace with your desired content
            setDivContent(newContent);
        
        }
     
    }
    onload1();
    },[finalcontract,searchbar]);

    const[date2,setdate2 ]=useState(null);

    const logout=()=>{
        sessionStorage.setItem('ascid','');
        var button = document.getElementById('close');
        button.click();
      navigate("/Loginasc");
    };
    

    window.eachreqmodal = async (cn) => {
        const arr3s = await finalcontract.methods.showproducts(whichdiv2[numven2[cn]],whichunit2[numven2[cn]]).call();
               var pro=arr3s[0];
               var qua=arr3s[1];
               var ldate=arr3s[2];
               var tabledata='';
               
                const data1 = pro[whichord2[numven2[cn]]];
                const data2 = qua[whichord2[numven2[cn]]];
                const date = ldate[whichord2[numven2[cn]]];
                setdate2(date);

    let s = "form<br>";
    var tabledata = "";
    
    for (let i = 0; i < data1.length; i++) {
    
        tabledata = tabledata + ` <tr>
    <td>${data1[i]}</td>
    <td>${data2[i]}</td>
    
    </tr> `;
     
    }
    console.log(tabledata);
    settableContent(tabledata);
    // document.getElementById("tablebody").innerHTML = tabledata;
    
    }
    
    
        
        



    return(<>
                  <Navbar title={`Accepted Requests`} modaltitle={"#exampleModal2"} />
                  <Offcanvas category={'asc'} activeno={1}/>

        
     {/* modal-profile */}
     <div className="modal fade" id="exampleModal2" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog modal-dialog-centered">
    <div className="modal-content">
      <div className="modal-header py-3">
        <h1 className="modal-title fs-5" id="exampleModalLabel">ASC ID-123123</h1>
        <button type="button" className="btn-close" id="close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="">
      <div className="modal-body  mt-3  d-flex">
        <div className="ms-3">
        <img className="bd-placeholder-img  mt-3 rounded-circle border-white" width="125" height="120" src={profile}/>

        </div>
        <div className="ms-5 mt-3">
        <h3 className=" mt-3 fw-normal">ASC ID-123123</h3>
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
{/* <!--modal--> */}
<div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div className="modal-dialog">
        <div className="modal-content">
            <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">ACCEPTED BY:</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">PRODUCTNAME</th>
                        <th scope="col">QUANTITY</th>
                        

                    </tr>
                </thead>
                <tbody dangerouslySetInnerHTML={{ __html: tableContent }} />
                {/* <tbody id="tablebody">
                    
                </tbody> */}
            </table>
            <div id="reqid" className="modal-footer">
            <h3>last date : {date2}</h3>
                
            </div>
        </div>
    </div>
</div>

    {/* <!--new order-->  */}
    <section className="mt-5">
  <div id="fullbody" className="container mt-5">
    
        <div class="row" dangerouslySetInnerHTML={{ __html: divContent }} />
  </div>
</section>
    
    
    
    </>
    );
}

export default Ascaccepted;
