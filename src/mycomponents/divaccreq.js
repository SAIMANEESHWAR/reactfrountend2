import { useEffect } from 'react';
import { useState, useContext } from 'react';
import Offcanvas from './offcanvas';
import profile from './homephotos/profile1.png';
import Navbar from './navbar';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { AppContext } from './passabiaddress';
import Toaster from './Toaster';

function Divaccreq() {
  //from passadi address page i am getting all this variables by the hook concept called use context

  const { finalweb3, finalcontract, searchbar, loadingspinner, waitingimg } = useContext(
    AppContext
  );

  //after completion of transacttion i want to rerender the page to show toaster
  const [rerenderafterconfirm, setrerenderafterconfirm] = useState(4);
  const [toastercolor, settoastercolor] = useState('text-bg-danger');
  const [toastermsg, settoastermsg] = useState('error');
  const [toasterlink, settoasterlink] = useState('fa-solid fa-circle-xmark fa-flip');
  const[rendernum,setrendernum]=useState(0);

  const [divContent, setDivContent] = useState(loadingspinner);
  const [divisionid2, setdivisionid2] = useState(null);
  const navigate = useNavigate();


  const [pven2, setpven2] = useState([]);
  const [pord2, setpord2] = useState([]);

  let divisionidsession = sessionStorage.getItem('alldivids');
  if (divisionidsession == 0) {
    window.location.href = '/Pagenotfound';
  }
  useEffect(() => {
    const onload1 = async () => {

      if (finalcontract) {


        let divisionidsession = sessionStorage.getItem('alldivids');
        setdivisionid2(divisionidsession);

        var useless = 0;
        //here we give division id then it will give all the published request by that division
        const arr33s = await finalcontract.methods.published(divisionidsession, useless).call();
        var pven = arr33s[0];
        setpven2(pven);
        var pord = arr33s[1];
        setpord2(pord);
        // if division sent the request to asc that should get
        const alreadtsel = await finalcontract.methods.ifdivsenttoasc(divisionidsession).call();
        var fbody = ``;

        //all divisions published requests making a loop
        for (var i = pven.length - 1; i >= 0; i--) {

          //here we give division id then it will give(that whish unit is raised that request and his order) by that division here venid is useless
          var arr333s = await finalcontract.methods.published2(divisionidsession, pven[i]).call();
          console.log(arr333s);
          var status = arr333s[0];
          var ordno = arr333s[1];
          var accby = arr333s[2];


          //here i am taking input divisionid and pven[i](means div published requests )
          const arr3s = await finalcontract.methods.showproducts(divisionidsession, pven[i]).call();
          var pro = arr3s[0];
          var qua = arr3s[1];
          var ldate = arr3s[2];



          var tabledata = '';
          //here this is for search bar bcause i am making all products in string then i am searching from that string

          const data1 = pro[pord[i]];
          const data2 = qua[pord[i]];
          const date = ldate[pord[i]];

          console.log(searchbar);
          var searchproducts = '';
          for (let p = 0; p < data1.length; p++) {
            searchproducts = searchproducts + `${data1[p]}`;
          }
          //making all the things to string and then searching (includes)
          if (` ${parseInt(pord[i]) + 1} ${date}  ${pven[i]} ${searchproducts} ${date} `.toLowerCase().includes(searchbar.toLowerCase())) {

            var statusbar = await finalcontract.methods.returnrangebar(divisionidsession, pven[i], parseInt(pord[i])).call();
            console.log(statusbar, "->", i);
            var statusbarstring = ``;
            var statusbararray = ["ASC", "OTHERDIVISIONS", "OTHERUNITS", "MANIFACTURER"]
            for (var m = 0; m < statusbar - 2; m++) {
              statusbarstring = statusbarstring + `
                          <div class="progress " role="progressbar" aria-label="Segment one" aria-valuenow="15" aria-valuemin="0" aria-valuemax="100" style="width: 25%">
                          <div class="progress-bar min-vh-40">${statusbararray[m]}</div>
                          </div>`;

            }


            tabledata = `<div class="container p-5 mt-4  mb-1 shadow rounded-3">
                            <div class="">
                            <div class="row">
                            <div class="d-flex col justify-content-start">
                            <h2 class="display-6 fw-medium">FROM UNIT ID : ${pven[i]}</h2>
                            </div>
                            <div class="d-flex  me-5 col justify-content-end">
                           
                           
                            <h5 class="text-info mt-1 "> Last Date : ${date}</h5>
                            </div>
                            </div>
                            </div>


                              <h5 class="text-info">REQUEST NO : ${parseInt(pord[i]) + 1} </h5>
                              <div class="table-responsive">

                              <table class="table mt-4 table-tertiary ">
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
            var ee = '';
            var ifnotaccepted = '';
            if (alreadtsel.includes(String(i))) {
              //if it goes to asc then this will be threre
              //here i am cheaking that wheather order is accepted or not 
              if (ordno.includes(String(pord[i]))) {

                var index = ordno.indexOf(pord[i]);
                //if so (if order is accpted by asc then statur is green in color)
                if (accby[index] == 123123) {
                  ee = `${accby[index]}`;
                  ifnotaccepted = 'Accepted By :';
                  var statusbarstring = ``;
                  //accpted by asc then statur is green in color
                  for (var m = 0; m < statusbar - 2; m++) {
                    statusbarstring = statusbarstring + `
                          <div class="progress " role="progressbar" aria-label="Segment one" aria-valuenow="15" aria-valuemin="0" aria-valuemax="100" style="width: 25%">
                          <div class="progress-bar bg-success">${statusbararray[m]}</div>
                          </div>`;

                  }


                }
                else {
                  //asc not accepted but any other divisions units accepted 
                  ee = accby[index];
                  ifnotaccepted = 'Accepted By :';
                  var statusbarstring = ``;
                  for (var m = 0; m < statusbar - 2; m++) {
                    statusbarstring = statusbarstring + `
                          <div class="progress " role="progressbar" aria-label="Segment one" aria-valuenow="15" aria-valuemin="0" aria-valuemax="100" style="width: 25%">
                          <div class="progress-bar bg-success">${statusbararray[m]}</div>
                          </div>`;

                  }
                }

              }
              else {
                //went to asc but no one is accepted
                ee = "";
              }
              tabledata = tabledata + `</tbody>
                                        </table>
                                        </div>
                                          <div class="row">
                                                <div class="d-flex flex-row mb-1">
                                                <div class="card bg-body-tertiary w-100 mt-2">
                                                <div class="card-body">
                                                  <h5 class="card-title">Order Status  : </h5>
                                                  <div class="progress-stacked "  id="s3${i}">
                                                    ${statusbarstring}
                                                  </div>
                                                </div>
                                              </div>
											</div>
                      <div class="row">
											<div class="d-flex col justify-content-end">
												<div class="p-2 text-success"><h4>${ifnotaccepted}</h4></div>
												<div class="p-2 text-success"><h4 id="ss2">  ${ee}</h4> </div>
												
											</div>
                      </div>
                                            
                                            
                                            
                                        </div>
                                

                                        
                                      
                                      </div>
                                    </div>`;
            }
            //it doesnt even went to asc

            else if (!ordno.includes(String(pord[i]))) {
              //still pending
              tabledata = tabledata + `</tbody>
                                        </table>
                                        </div>
                                            <div class="row">
                                              <div class="col">
                                                <button onclick="rea(${i})" class="btn btn-outline-primary">send to ASC</button>
                                              </div>
                                     
                                        </div>

                                        
                                      
                                      </div>
                                    </div>`;
            }
            else {
              var s = 0;
              //accepted by my division unit
              for (var k = 0; k < ordno.length; k++) {
                if (ordno[k] == pord[i]) { s = k; }

              }
              tabledata = tabledata + `</tbody>
                                        </table>
                                        </div>
                                              <div class="d-flex flex-row mb-1">
                                                <div class="p-2 text-success"><h4>Accepted By :</h4></div>
                                                <div class="p-2 text-success"><h4> ${accby[s]}</h4> </div>
                                            
                                            
                                            
                                        </div>
                                        </div>

                                        
                                      
                                      </div>
                                    </div>`;

            }



            fbody = fbody + tabledata;
          }
        }

        console.log(fbody.length);
        if (fbody.length == 0) {
          fbody = fbody + waitingimg;
        }
        var newContent = fbody; // Replace with your desired content
        setDivContent(newContent);
      }
    }

    onload1();
  }, [finalcontract, searchbar, rerenderafterconfirm]);

  //loging out
  const logout = () => {
    sessionStorage.setItem('alldivids', '');
    sessionStorage.setItem('newvenid', "");
    var button = document.getElementById('close');
    button.click();
    navigate("/Logindiv");
  };



  window.rea = async (rn) => {


    console.log(rn);



    finalweb3.eth.getAccounts().then(function (accounts) {
      var acc = accounts[0];
      //request will send to asc 
      return finalcontract.methods.asc(divisionidsession, pven2[rn], pord2[rn], rn).send({ from: acc });

    }).then(async function (tx) {
      console.log(tx);
      console.log(" REQUEST SENT SUCCESSFULLY");
      var purpose = 'the accepted request ';
      const date = new Date().toLocaleString();
      console.log("Current Date and Time:", date);
      var gas = tx.gasUsed;
      var divid = divisionid2;
      var id = tx.transactionHash;
      var from = tx.from;
      var to = tx.to;
      var block = tx.blockNumber;
      await axios.post("https://onlybachend.onrender.com/divtransaction", {
        divid, gas, id, from, to, block, purpose, date
      }).then(res => {
        console.log(res.data);
        setrerenderafterconfirm(rerenderafterconfirm + 1);
        setrendernum(rendernum+1);
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
        settoastermsg('problem in connecting mongo');
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

  return (
    <>

      <Navbar title={`My History`} modaltitle={"#exampleModal2"} />
      <Offcanvas category={'divisions'} activeno={1} />


      {/* modal-profile */}
      <div className="modal fade" id="exampleModal2" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header py-3">
              <h1 className="modal-title fs-5" id="exampleModalLabel">DIVISION ID-{divisionidsession}</h1>
              <button type="button" className="btn-close" id="close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="">
              <div className="modal-body  mt-3  d-flex">
                <div className="ms-3">
                  <img className="bd-placeholder-img  mt-3 rounded-circle border-white" width="125" height="120" src={profile} />

                </div>
                <div className="ms-5 mt-3">
                  <h3 className=" mt-3 fw-normal">DIVISION ID-{divisionidsession}</h3>
                  <p>

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


      <div className="container p-5">
        <div dangerouslySetInnerHTML={{ __html: divContent }} />


      </div>

      <Toaster toastercolor={toastercolor} toastermsg={toastermsg} toasterlink={toasterlink} rendernum={rendernum}/>


    </>
  );
}

export default Divaccreq;









