import React from 'react';
import { useEffect } from 'react';
import { useState, useContext } from 'react';
import profile from './homephotos/profile1.png';
import Offcanvas from './offcanvas';
import axios from 'axios';
import {  useNavigate } from "react-router-dom";
import { AppContext } from './passabiaddress';
import Navbar from './navbar';
import Toaster from './Toaster';



function Unitnewreq() {
      //from passadi address page i am getting all this variables by the hook concept called use context

  const { finalweb3, finalcontract, searchbar, loadingspinner,waitingimg } = useContext(
    AppContext
  );
  const [toastercolor,settoastercolor]=useState('');
    const [toastermsg,settoastermsg]=useState('');
    const[toasterlink,settoasterlink]=useState('');
    const[rendernum,setrendernum]=useState(0);



  const [divContent, setDivContent] = useState(loadingspinner);
  const [unitid, setmyid] = useState(null);
  const [divisionid, setdivid] = useState(null);
  const [publshedunits, setpublshedunits] = useState(null);
  const [publshedorders, setpublshedorders] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const onloadsai = async () => {
      if (finalcontract) {
        let unitsessionstrorage = sessionStorage.getItem('venids');
        let divisionsessionstrorage = sessionStorage.getItem('divids');
        setmyid(unitsessionstrorage);
        setdivid(divisionsessionstrorage);
        if (unitsessionstrorage == 0 && divisionsessionstrorage == 0) {
          window.location.href = '/Pagenotfound';
        }
        const arr3s = await finalcontract.methods.returnpql(divisionsessionstrorage).call();
        var pro = arr3s[0];
        var qua = arr3s[1];
        var ldate = arr3s[2];
        const arr33s = await finalcontract.methods.published(divisionsessionstrorage, unitsessionstrorage).call();
        var publishedunits2 = arr33s[0];
        setpublshedunits(publishedunits2);
        var publishedorders2 = arr33s[1];
        setpublshedorders(publishedorders2);
        const arr333s = await finalcontract.methods.published2(divisionsessionstrorage, unitsessionstrorage).call();
        var prevacc = arr333s[3];
        const arr3as = await finalcontract.methods.returnasc().call();
        var wdiv = arr3as[0];
        var wunit = arr3as[1];
        var word = arr3as[2];
        console.log(wdiv);
        console.log(wunit);
        console.log(word);
       
        var fbody = ``;
        var arr = [pro.length];
        for (var i = 0; i < pro.length; i++) {
          arr[i] = '';
        }

        for (var i = 0; i < pro.length; i++) {

          if (!prevacc.includes(String(i))) {

            if (unitsessionstrorage != publishedunits2[i]) {


              tabledata = '';

              const data1 = pro[i];
              const data2 = qua[i];
              const date = ldate[i];

              // condition for filter
              console.log(searchbar);
              var searchproducts = '';
              for (let p = 0; p < data1.length; p++) {
                searchproducts = searchproducts + `${data1[p]}`;
              }
              //making all the things to string and then searching (includes)
              if (`${parseInt(publishedorders2[i]) + 1}  ${searchproducts} ${date} ${publishedunits2[i]}`.toLowerCase().includes(searchbar.toLowerCase())) {


                var tabledata = `<div class="container p-5 mt-4  mb-4 shadow rounded-3">
                                    <div class="container-fluid">
                                        <div class="row">
                                          <div class="d-flex col justify-content-start">
                                            <h2 class="display-6 fw-medium">REQUEST NO : ${parseInt(publishedorders2[i]) + 1}</h2>
                                          </div>
                                          <div class="d-flex  me-5 col justify-content-end">
                                            <div>
                                                <h5 class="text-success">From Unit Id : ${publishedunits2[i]}</h5>
                                                 <h5 class="text-info mt-1 "> Last Date : ${date}</h5>
                                            </div>
                                          </div>
                                        </div>
                                        <div class="table-responsive">

                                        <table class="table mt-1">
                                            <thead>
                                              <tr>
                                                
                                                <th scope="col">PRODUCTNAME</th>
                                                <th scope="col">QUANTITY</th>
                                                
                                                <th class="ms-5" scope="col" id="fourhead${i}"></th>
                                        
                                              </tr>
                                            </thead>
                                            <tbody id="tablebody">`;
                for (let j = 0; j < data1.length; j++) {

                  tabledata = tabledata + ` <tr>
                                                <td><label class="form-check-label" for="flexCheckChecked">${data1[j]}</td>
                                                <td><label class="form-check-label" for="flexCheckChecked">${data2[j]}</td>
                                              </tr> `;
                }
                tabledata = tabledata + `</tbody>
                                        </table>
                                        </div>
                                        <div class="container">
                                        
                                            <div class="row">
                                              <div class="col">
                                                <button onclick="rea(${i})" class="btn btn-outline-primary" >Accept</button>
                                              </div>
                                            </div>
                                        </div>
                                      </div>
                                    </div>`;




                fbody = fbody + tabledata;
                arr[i] = tabledata;
              }
            }
          }
        }
        console.log(arr.length);
        console.log(arr);





        var del = [];
        var matchunitdivorder2 = ``;
        var matchunitdivorder='';

        for (var m = 0; m < wunit.length; m++) {
          for (var i = 0; i < pro.length; i++) {
            if (!prevacc.includes(String(i))) {
              matchunitdivorder = `${wdiv[m]}${wunit[m]}${word[m]}`;
              matchunitdivorder2 = `${divisionsessionstrorage}${publishedunits2[i]}${publishedorders2[i]}`;

              if (unitsessionstrorage != publishedunits2[i]) {

                if (matchunitdivorder == matchunitdivorder2) {

                  del.push(String(i));
                }
              }
            }
          }
        }
        console.log(del);

        var mystr = '';
        console.log(pro.length);
        for (var i = 0; i < pro.length; i++) {

          if (!prevacc.includes(String(i))) {

            if (unitsessionstrorage != publishedunits2[i]) {
              if (!del.includes(String(i))) {
                mystr = mystr + arr[i];
                console.log(i);
              }
            }
          }



        }

        console.log(mystr.length);
        if (mystr.length == 0) {
          mystr =waitingimg;
        }
        var newContent = mystr;// Replace with your desired content
        setDivContent(newContent);





      }
    }

    onloadsai();
  }, [finalcontract, searchbar]);

  const logout = () => {
    sessionStorage.setItem('divids', '');
    sessionStorage.setItem('venids', '');
    var button = document.getElementById('close');
    button.click();
    navigate("/");
  };


  window.rea = async (rn) => {
    console.log(rn);
    finalweb3.eth.getAccounts().then(function (accounts) {
    var acc = accounts[0];
    //if unit have that particular products then he will accept
    return finalcontract.methods.conforming(divisionid, unitid, "ACCEPTED", publshedunits[rn], publshedorders[rn], rn).send({ from: acc });

    }).then(async function (tx) {
      console.log(tx);
      console.log(" REQUEST SENT SUCCESSFULLY");
      var gas = tx.gasUsed;
      var myid = unitid;
      var divid = divisionid
      const date = new Date().toLocaleString();
      console.log("Current Date and Time:", date);
      var purpose = "unit order from order page";
      var id = tx.transactionHash;
      var from = tx.from;
      var to = tx.to;
      var block = tx.blockNumber;
      console.log(gas, id, from, to, block);
      console.log(" THE ORDER WAS SUCESSFULLY COMPLETED");
      /* */
      await axios.post("https://onlybachend.onrender.com/sai", {
        myid, divid, gas, id, from, to, block, purpose, date
      }).then(res => {
        console.log(res.data);
        setrendernum(rendernum+1);
        settoasterlink('fa-solid fa-circle-check fa-flip');
        settoastercolor('text-bg-success');
          settoastermsg('  successfully Completed');
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
                settoastermsg('THE ORDER WAS NOT SUCESSFULLY COMPLETED');
                 var button = document.getElementById('toasterclickwithid');
                button.click();
    })


  }



  return (<>
    <Navbar title={`New Requests`} modaltitle={"#exampleModal"} />
    <Offcanvas category={'units'} activeno={0}/>
   
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
    <div id="fullbody" className="container ">
      <div dangerouslySetInnerHTML={{ __html: divContent }} />
    </div>

    <Toaster toastercolor={toastercolor} toastermsg={toastermsg} toasterlink={toasterlink} rendernum={rendernum}/>

  </>);
}
export default Unitnewreq;