import { useEffect } from 'react';
import { useState, useContext } from 'react';
import axios from 'axios';
import profile from './homephotos/profile1.png';
import Offcanvas from './offcanvas';
import { useNavigate } from "react-router-dom";
import Navbar from './navbar';
import { AppContext } from './passabiaddress';
import Toaster from './Toaster';


function Aschomearr() {

  const { finalweb3, finalcontract, searchbar, loadingspinner, waitingimg } = useContext(
    AppContext
  );
//after completion of transacttion i want to rerender the page to show toaster
const[rerenderafterconfirm,setrerenderafterconfirm]=useState(4);
const [toastercolor,settoastercolor]=useState('');
const [toastermsg,settoastermsg]=useState('');
const[toasterlink,settoasterlink]=useState('');
const[rendernum,setrendernum]=useState(0);


  const [divContent, setDivContent] = useState(loadingspinner);

  const navigate = useNavigate();
  const [whichdiv2, setwhichdiv] = useState([]);
  const [whichunit2, setwhichunit] = useState([]);
  const [whichord2, setwhichord] = useState([]);

  useEffect(() => {
    if (finalcontract) {
      const onloaduseeffect = async () => {

        let ascid = sessionStorage.getItem('ascid');
        console.log(ascid);
        if (ascid == 0) {
          navigate("/Pagenotfound");
        }
        //here we will get which divs reuest is it and which units request is that and its order
        var arr33s = await finalcontract.methods.returnasc().call();
        console.log(arr33s);
        var whichdiv = arr33s[0];
        setwhichdiv(whichdiv);
        var whichunit = arr33s[1];
        setwhichunit(whichunit);
        var whichord = arr33s[2];
        setwhichord(whichord);
        //the asc accepteeeeed requests(i value)
        var allreadyacc = await finalcontract.methods.ascaccreturn().call();
        //the request that are forwarded to diviisons(i value)
        var alreadyforw = await finalcontract.methods.ascalreadyforwreturn().call();
        var fbody = ``;
        for (var i = whichdiv.length - 1; i >= 0; i--) {
          //the i values would not include in this two 
          if (!alreadyforw.includes(String(i))) {
            if (!allreadyacc.includes(String(i))) {
              const arr3s = await finalcontract.methods.showproducts(whichdiv[i], whichunit[i]).call();
              var pro = arr3s[0];
              var qua = arr3s[1];
              var ldate = arr3s[2];
              var tabledata = '';
              console.log(i);
              const allproducts = pro[whichord[i]];
              const allquantity = qua[whichord[i]];
              const date = ldate[whichord[i]];
              console.log(searchbar);
              var searchproducts = '';
              for (let p = 0; p < allproducts.length; p++) {
                searchproducts = searchproducts + `${allproducts[p]}`;
              }
              //making all the things to string and then searching (includes)
              if (` ${whichunit[i]}  ${date}  ${parseInt(whichord[i]) + 1} ${searchproducts} ${whichdiv[i]} ${date} `.toLowerCase().includes(searchbar.toLowerCase())) {


                tabledata = `<div class="container p-5 mt-4  mb-4 shadow rounded-3">
                             <div class="container-fluid ">
                            <div class="row">
                             <div class="d-flex col justify-content-start">
                             <h2 class="display-6 fw-medium">FROM UNIT ID : ${whichunit[i]}</h2>
                             </div>
                             <div class="d-flex  me-5 col justify-content-end">
                             <div>
                             <h5 class="text-success">FROM DIVISION ID : ${whichdiv[i]}</h5>
                             <h5 class="text-info mt-1 "> Last Date : ${date}</h5>
                             </div>
                             </div>
                             </div>
                               <h5 class="text-info">REQUEST NO : ${parseInt(whichord[i]) + 1}</h5>
                               <div class="table-responsive">

                               <table class="table mt-2">
                                 <thead>
                                   <tr>
                                     <th scope="col">PRODUCTNAME</th>
                                     <th scope="col">QUANTITY</th>
                                     
                                     <th class="ms-5" scope="col" id="fourhead${i}"></th>
                                   </tr>
                                 </thead>
                                 <tbody id="tablebody">`;
                for (let j = 0; j < allproducts.length; j++) {

                  tabledata = tabledata + ` <tr>
                      
                     <td><label class="form-check-label" for="flexCheckChecked">${allproducts[j]}</td>
                         <td><label class="form-check-label" for="flexCheckChecked">${allquantity[j]}</td>
                         
                     </tr> `;
                }
                tabledata = tabledata + `</tbody>
                                         </table>
                                         </div>
                                            <div class="container text-truncate overflow-auto">
                                             <div class="d-flex flex-row  justify-content-start mt-3">
                                               <div class=" me-2">
                                                 <button onclick="rea(${i})" class="btn btn-outline-primary">Accept</button>
                                               </div>
                                               <div class="">
                                                 <button onclick="rea2(${i})" class="btn btn-outline-primary">Send to divisions</button>
                                               </div>
                                             </div>
                                             </div>
                                             </div>
                                     </div>`;




                fbody = fbody + tabledata;
              }
            }
          }

        }
        console.log(fbody.length);
        if (fbody.length == 0) {
          fbody = fbody + waitingimg;
        }


        var newContent = fbody; // Replace with your desired content
        setDivContent(newContent);
      }
      onloaduseeffect();
    }
  }, [finalcontract, searchbar,rerenderafterconfirm]);



  window.rea = async (rn) => {


    console.log(rn);
    console.log(whichdiv2[rn], whichunit2[rn]);


    var ascid = 123123;
    finalweb3.eth.getAccounts().then(function (accounts) {
      var acc = accounts[0];
      //here asc is accepting the request
      return finalcontract.methods.ascstatus(whichdiv2[rn], ascid, whichunit2[rn], "ACCEPTED", whichord2[rn], parseInt(rn)).send({ from: acc });
    }).then(async function (tx) {
      console.log(tx);
      console.log(" REQUEST SENT SUCCESSFULLY");
      var purpose = 'the new request accepted by asc';
      var gas = tx.gasUsed;
      var id = tx.transactionHash;
      var from = tx.from;
      var to = tx.to;
      var block = tx.blockNumber;
      const date = new Date().toLocaleString();
      console.log("Current Date and Time:", date);
      var ascid = 123123;
      await axios.post("https://onlybachend.onrender.com/asctransaction", {
        ascid, gas, id, from, to, block, purpose, date
      }).then(res => {
        console.log(res.data);
        setrendernum(rendernum+1);
        setrerenderafterconfirm(rerenderafterconfirm+1);
        settoasterlink('fa-solid fa-circle-check fa-flip');
        settoastercolor('text-bg-success');
          settoastermsg('Successfully completed');
           var button = document.getElementById('toasterclickwithid');
          button.click();
          
                    



      }).catch(e => {
        console.log(e);
        setrendernum(rendernum+1);
        settoasterlink('fa-solid fa-circle-xmark fa-flip');
                    settoastercolor('text-bg-danger');
                      settoastermsg('Error in connecting Mongo');
                       var button = document.getElementById('toasterclickwithid');
                      button.click();
      })



    }).catch(function (tx) {
      console.log(tx);
      setrendernum(rendernum+1);
      settoasterlink('fa-solid fa-circle-xmark fa-flip');
      settoastercolor('text-bg-danger');
        settoastermsg('REQUEST NOT SENT SUCCESSFULLY');
         var button = document.getElementById('toasterclickwithid');
        button.click();
    })


  }
  const logout = () => {
    sessionStorage.setItem('ascid', '');
    var button = document.getElementById('close');
    button.click();
    navigate("/Loginasc");
  };


  window.rea2 = async (rn) => {


    console.log(rn);



    finalweb3.eth.getAccounts().then(function (accounts) {
      var acc = accounts[0];
      //here asc is forwarding the request
      return finalcontract.methods.ascforward(whichdiv2[rn], whichunit2[rn], whichord2[rn], rn).send({ from: acc });

    }).then(async function (tx) {
      console.log(tx);
      console.log(" REQUEST SENT SUCCESSFULLY");
      var purpose = 'the new request accepted by asc';
      const date = new Date().toLocaleString();
      console.log("Current Date and Time:", date);
      var gas = tx.gasUsed;
      var id = tx.transactionHash;
      var from = tx.from;
      var to = tx.to;
      var block = tx.blockNumber;
      var ascid = 123123;
      await axios.post("https://onlybachend.onrender.com/asctransaction", {
        ascid, gas, id, from, to, block, purpose, date
      }).then(res => {
        console.log(res.data);
        setrendernum(rendernum+1);
        setrerenderafterconfirm(rerenderafterconfirm+1);
        settoasterlink('fa-solid fa-circle-check fa-flip');
        settoastercolor('text-bg-success');
          settoastermsg('Successfully completed');
           var button = document.getElementById('toasterclickwithid');
          button.click();
      



      }).catch(e => {
        console.log(e);
        setrendernum(rendernum+1);
        settoasterlink('fa-solid fa-circle-xmark fa-flip');
        settoastercolor('text-bg-danger');
          settoastermsg('Error in connecting Mongo');
           var button = document.getElementById('toasterclickwithid');
          button.click();
      })


    }).catch(function (tx) {
      setrendernum(rendernum+1);
      settoasterlink('fa-solid fa-circle-xmark fa-flip');
      settoastercolor('text-bg-danger');
        settoastermsg('REQUEST NOT SENT SUCCESSFULLY');
         var button = document.getElementById('toasterclickwithid');
        button.click();
    })


  }

  return (<>
    <Navbar title={`New Requests`} modaltitle={"#exampleModal2"} />
    <Offcanvas category={'asc'} activeno={0} />

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
                <img className="bd-placeholder-img  mt-3 rounded-circle border-white" width="125" height="120" src={profile} />

              </div>
              <div className="ms-5 mt-3">
                <h3 className=" mt-3 fw-normal">ASC ID-123123</h3>
                <p>
                  Contact Link :
                  <br />


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


    {/* <!--table--> */}

    <div id="fullbody" className="container">
      <div dangerouslySetInnerHTML={{ __html: divContent }} />
    </div>

    <Toaster toastercolor={toastercolor} toastermsg={toastermsg} toasterlink={toasterlink} rendernum={rendernum}/>

  </>
  );
}

export default Aschomearr;
