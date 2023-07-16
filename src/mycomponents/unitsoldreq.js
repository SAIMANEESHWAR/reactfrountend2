import React from 'react';
import { useEffect } from 'react';
import { useState, useContext } from 'react';
import profile from './homephotos/profile1.png';
import Navbar from './navbar';
import { useNavigate } from "react-router-dom";
import { AppContext } from './passabiaddress';
import Offcanvas from './offcanvas';



function Unitoldreq() {

  //from passadi address page i am getting all this variables by the hook concept called use context
  const { finalcontract, searchbar, loadingspinner, waitingimg } = useContext(
    AppContext
  );

  const [divContent, setDivContent] = useState(loadingspinner);
  const [unitid, setunitid] = useState(0);
  const [divisionid, setdivid] = useState(0);
  const navigate = useNavigate();



  useEffect(() => {
    //here i need to run a function of async 
    const onloaduseeffect = async () => {
      if (finalcontract) {
        var tabledata = "";
        let unitidsessionstorage = sessionStorage.getItem('venids');
        let dividsessionstorage = sessionStorage.getItem('divids');
        console.log("oldreq", searchbar);
        setunitid(unitidsessionstorage);
        setdivid(dividsessionstorage);
        if (unitidsessionstorage == 0 && dividsessionstorage == 0) {
          window.location.href = '/Pagenotfound';
        }

        //here i am sending divisionid and unitid so that i can get all the products that they ordered
        const arr3s = await finalcontract.methods.showproducts(dividsessionstorage, unitidsessionstorage).call();
        var pro = arr3s[0];
        var qua = arr3s[1];
        var ldate = arr3s[2];

      // //here units request kaa--> (who accepted my request and what order he is accepted)
        const arr33s = await finalcontract.methods.published2(dividsessionstorage, unitidsessionstorage).call();
        console.log(arr33s);
        var status = arr33s[0];
        var ordernumber = arr33s[1];
        var orderacceptedby = arr33s[2];
        console.log(ordernumber);


        var fbody = ``;

        var searchqueryarray = [];

        // for (var i = 0; i < pro.length; i++) {
        for (var i = pro.length - 1; i >= 0; i--) {
          //here i am getting or tracking my order if it is one then it is at division if 3 then asc
          var statusbar = await finalcontract.methods.returnrangebar(dividsessionstorage, unitidsessionstorage, i).call();

          var tabledata = '';
          console.log(i);
          const allproducts = pro[i];
          const allquantity = qua[i];
          const date = ldate[i];
          console.log(allproducts);
          console.log(allquantity);
          console.log(date);



          var statusat = ``;
          //making the status bar 
          var statusatarray = ["DIVISIONS", "UNITS", "ASC", "OTHERDIVISIONS", "OTHERUNITS", "MANUFACTURER"]
          for (var m = 0; m < statusbar; m++) {
            statusat = statusat + `
                  <div class="progress " role="progressbar" aria-label="Segment one" aria-valuenow="15" aria-valuemin="0" aria-valuemax="100" style="width: 16.6%">
                  <div class="progress-bar min-vh-40">${statusatarray[m]}</div>
                  </div>`;

          }

          console.log(searchbar);
          var searchproducts = '';
          for (let p = 0; p < allproducts.length; p++) {
            searchproducts = searchproducts + `${allproducts[p]}`;
          }
          //making all the things to string and then searching (includes)
          if (`${i + 1}  ${searchproducts} ${date} `.toLowerCase().includes(searchbar.toLowerCase())) {

            searchqueryarray.push(i);
            tabledata = `<div class="container p-5   mb-4 bg-tertiary shadow rounded-3">
                                  
                                  <div class="container-fluid ">
                                    <div class="row">
                                      <div class="d-flex col justify-content-start">
                                          <h3 class="display-5 fw-medium ">REQUEST NO : ${i + 1} </h3>
                                      </div>
                                      <div class="d-flex col justify-content-end">
                                         <div class="d-flex flex-row mb-1  ">
                                         <div class="p-2"><h4 class="text-success " id="s1${i}"></h4></div>
                                         <div class="p-2 text-success "><h4   id="s2${i}"></h4> </div>
                                      </div>
                                      </div>
                                    </div>
                                    <h4 class="text-info">Last Date : ${date}</h4>
                                    <div class="table-responsive">
                                    <table class="table  mt-4 table-tertiary">
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
      
                                             
                                            
                                              <div >
                                                  
                                                  <div class="card bg-body-tertiary w-100 mb-3">
                                                    <div class="card-body">
                                                      <h5 class="card-title">Order Status  : </h5>
                                                      <div class="progress-stacked "  id="s3${i}">
                                                        ${statusat}
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
      
                                              
                                            
                                            </div>
                                          </div>`;




            fbody = fbody + tabledata;
          }

        }
//if there is no data i will pass the enpty image showing that there is no data
        console.log(fbody.length);
        if (fbody.length == 0) {
          fbody = waitingimg;
        }
        var newContent = fbody; // Replace with your desired content
        //setting all the content in to divcontent  to display and sening it to dangerouslySetInnerHTML
        setDivContent(newContent);


        for (var i = pro.length - 1; i >= 0; i--) {
          if (searchqueryarray.includes(i)) {
            //here i am searching that order (i) is in accepted orders or not if it includes then i cheack who accepted
            if (ordernumber.includes(String(i))) {
              var indexoforderno = ordernumber.indexOf(String(i));
              //here i am getting status bar length (where order is )
              var statusbar2 = await finalcontract.methods.returnrangebar(dividsessionstorage, unitidsessionstorage, i).call();
              var ifstatusaccepted = ``;
              var ifstatusacceptedarray = ["division", "myunits", "asc", "anodivisions", "anodivunits", "manufacturer"]
              for (var m = 0; m < statusbar2; m++) {
                ifstatusaccepted = ifstatusaccepted + `
                <div class="progress" role="progressbar" aria-label="Segment one" aria-valuenow="15" aria-valuemin="0" aria-valuemax="100" style="width: 16.6%">
                <div class="progress-bar bg-success">${statusatarray[m]}</div>
                </div>`;

              }

              console.log(i);
              document.getElementById(`s1${i}`).innerHTML = "Accepted By : ";
              document.getElementById(`s2${i}`).innerHTML = orderacceptedby[indexoforderno];
              console.log(orderacceptedby, ordernumber, indexoforderno);
              document.getElementById(`s3${i}`).innerHTML = ifstatusaccepted;
            }
          }
        }
      }
    }

    onloaduseeffect();
  }, [finalcontract, searchbar]);

  //here logout is user is logging out so we need to clear the data
  const logout = () => {
    sessionStorage.setItem('divids', '');
    sessionStorage.setItem('venids', '');
   //i am closing the modal through button with id
    var button = document.getElementById('close');
    button.click();
    navigate("/");
  };

  return (
    <>
      <div>
        <Navbar title={`My History`} modaltitle={"#exampleModal"} />
        {/* here active no in navbar is which link need to be active while open this component */}
        <Offcanvas category={'units'} activeno={2} />
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
        <div className="container ">
          <div dangerouslySetInnerHTML={{ __html: divContent }} />
        </div>


      </div>

    </>



  );
}

export default Unitoldreq; 