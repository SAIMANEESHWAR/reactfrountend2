import React from 'react';
import { useEffect } from 'react';
import { useState, useContext } from 'react';
import Offcanvas from './offcanvas';
import profile from './homephotos/profile1.png';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Navbar from './navbar';
import { AppContext } from './passabiaddress';




function Unitotherdiv() {
    //from passadi address page i am getting all this variables by the hook concept called use context

  const { finalweb3, finalcontract, searchbar, loadingspinner, waitingimg } = useContext(
    AppContext
  );


  const [divContent, setDivContent] = useState(loadingspinner);
  const [unitid, setmyid] = useState(0);
  const [divisionid, setdivid] = useState(0);
  const navigate = useNavigate();


  const [whichdiv2, setwhichdiv] = useState([]);
  const [whichunit2, setwhichunit] = useState([]);
  const [whichord2, setwhichord] = useState([]);




  useEffect(() => {
          //here i need to run a function of async 
    const onloaduseeffect = async () => {
      if (finalcontract) {


        console.log(searchbar);


        var unitsessionstrorage = sessionStorage.getItem('venids');
        var divisionsessionstrorage = sessionStorage.getItem('divids');

        setmyid(unitsessionstrorage);

        setdivid(divisionsessionstrorage);
         //if both are null that means user log out if he try to acess that 
            //page we need to navigate him to pagenotfound
        if (unitsessionstrorage == 0 && divisionsessionstrorage == 0) {
          window.location.href = '/Pagenotfound';
        }
        console.log(divisionsessionstrorage, unitsessionstrorage);



        const arr33s = await finalcontract.methods.returnanodivtounits(divisionsessionstrorage).call();
        var whichdiv = arr33s[0];
        setwhichdiv(whichdiv);
        var whichunit = arr33s[1];
        setwhichunit(whichunit);
        var whichord = arr33s[2]
        setwhichord(whichord);
        console.log(whichdiv, whichord, whichunit)

        const conformed = await finalcontract.methods.anodivtounitconfirmreturn().call();
        var anodivtounitconfirm = conformed[0];
        var anodivtounitconfirmid = conformed[1];
        var anodivtounitconfirmuintid = conformed[2];

        const returnedtomanufacturer = await finalcontract.methods.returnmanifacturer().call();
        var strmani = returnedtomanufacturer[0];


        var fbody = ``;
        for (var i = 0; i < whichdiv.length; i++) {
          var str3 = `${whichdiv[i]} ${whichunit[i]} ${whichord[i]}`
          if (!strmani.includes(String(str3))) {
            if (!anodivtounitconfirm.includes(str3)) {
              //   if (!buycon.includes(String(i))) {
              const arr3s = await finalcontract.methods.showproducts(whichdiv[i], whichunit[i]).call();
              var pro = arr3s[0];
              var qua = arr3s[1];
              var ldate = arr3s[2];
              var tabledata = '';
              console.log(i);
              const allproducts = pro[whichord[i]];
              const allquantity = qua[whichord[i]];
              const date = ldate[whichord[i]];

              //search method
              var searchproducts = '';
              for (let p = 0; p < allproducts.length; p++) {
                searchproducts = searchproducts + `${allproducts[p]}`;
              }
              //making all the things to string and then searching (includes)
              if (`${whichunit[i]}  ${searchproducts}  ${parseInt(whichord[i]) + 1} ${whichdiv[i]}  ${date} `.toLowerCase().includes(searchbar.toLowerCase())) {


                tabledata = `<div class="container p-5 mt-4  text-truncate mb-4 shadow rounded-3">
                            <div class="container-fluid ">
                      
                            
                             <div class="row">
                               <div class="d-flex col justify-content-start">
                               <h2 class="display-6 fw-medium">FROM UNIT ID : ${whichunit[i]}</h2>
                               </div>
                               <div class="d-flex  me-5 col justify-content-end">
                               <div>
                               <h5 class="text-success">FROM DIVISION ID : ${whichdiv[i]}</h5>
                               <h5 class="text-info mt-1 "> Last Date: ${date}</h5>
                               </div>
                               </div>
                               </div>
                         
                            
                             
           
                              <h5 >REQUEST NO : ${parseInt(whichord[i]) + 1} </h5>
                              <div class="table-responsive">

                              <table class="table mt-2">
                                <thead>
                                  <tr>
                                    <th scope="col">PRODUCTNAME</th>
                                    <th scope="col">QUANTITY</th>
                                    
                                    
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

                                        <div class="mt-4" id="tp${i}"></div>
                                        <!--button-->
                                        <div >
                                          
                                            <div class="row">
                                              
                                              <div class="col">
                                                <button onclick="letsconfirm(${i})" class="btn btn-outline-primary" ">Confirm</button>
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
        //if there is no data yhen i will render img to it 
        if (fbody.length == 0) {
          fbody = waitingimg;
        }




// sending the fbody content (in the form of html) to setdanegaresoulyinnerhtml (converts html string to react)
        var newContent = fbody; 
        setDivContent(newContent);
      }
    }
    onloaduseeffect();
  }, [finalcontract, searchbar]);
//here if user logout then need to clar the data  
  const logout = () => {
    sessionStorage.setItem('divids', '');
    sessionStorage.setItem('venids', '');
    var button = document.getElementById('close');
    button.click();
    navigate("/");
  };

  window.letsconfirm = async (id) => {


    console.log(id);



    finalweb3.eth.getAccounts().then(function (accounts) {
      var acc = accounts[0];
      var inunitidordno = `${whichdiv2[id]} ${whichunit2[id]} ${whichord2[id]}`
      return finalcontract.methods.anodivtounitconfirmfunction(whichdiv2[id], unitid, divisionid, whichunit2[id], "ACTIVE", whichord2[id], inunitidordno).send({ from: acc });

    }).then(async function (tx) {
      console.log(tx);
      console.log(" REQUEST SENT SUCCESSFULLY");
      const date = new Date().toLocaleString();
      console.log("Current Date and Time:", date);
      var purpose = "unit order from order page";
      var gas = tx.gasUsed;
      var id = tx.transactionHash;
      var from = tx.from;
      var to = tx.to;
      var block = tx.blockNumber;
      console.log(gas, id, from, to, block);
      console.log(" THE ORDER WAS SUCESSFULLY COMPLETED");
      /* */
      await axios.post("https://onlybachend.onrender.com/sai", {
        unitid, divisionid, gas, id, from, to, block, purpose, date
      }).then(res => {
        console.log(res.data);
        window.location.reload();


      }).catch(e => {
        console.log(e);
        alert("erong ....");
      })
      window.location.reload();

    }).catch(function (tx) {
      console.log(tx);
      alert(" REQUEST NOT SENT SUCCESSFULLY");
    })


  }


  return (<>


    <Navbar title={`Other Division Requests`} modaltitle={"#exampleModal"} />
    <Offcanvas category={'units'} activeno={4} />
    {/* modal-profile */}
    <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header py-3">
            <h1 className="modal-title fs-5" id="exampleModalLabel">DIVISION ID-{divisionid}</h1>
            <button type="button" className="btn-close" id="close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="">
            <div className="modal-body  mt-3  d-flex">
              <div className="ms-3">
                <img className="bd-placeholder-img  mt-3 rounded-circle border-white" width="125" height="120" src={profile} />

              </div>
              <div className="ms-5 mt-3">
                <h3 className=" mt-3 fw-normal">UNIT ID-{unitid}</h3>
                <p>
                  No.Requests :
                  <br />
                  Contact Link :

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


  </>);
}
export default Unitotherdiv