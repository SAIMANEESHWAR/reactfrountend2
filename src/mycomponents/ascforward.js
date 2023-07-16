
import { useEffect } from 'react';
import { useState, useContext } from 'react';
import profile from './homephotos/profile1.png';
import axios from 'axios';
import Offcanvas from './offcanvas';
import { useNavigate } from "react-router-dom";
import Navbar from './navbar';
import { AppContext } from './passabiaddress';
import Toaster from './Toaster';





function Ascforward() {
  const { finalweb3, finalcontract, searchbar, loadingspinner, waitingimg } = useContext(
    AppContext
  );


  const [toastercolor,settoastercolor]=useState('');
  const [toastermsg,settoastermsg]=useState('');
  const[toasterlink,settoasterlink]=useState('');
  const[rendernum,setrendernum]=useState(0);
  const [divContent, setDivContent] = useState(loadingspinner);

  const navigate = useNavigate();

  // const [contract33,setContract33]=useState(null);
  // setContract33(finalcontract);

  const [pdiv2, setpdiv] = useState([]);
  const [punit2, setpunit] = useState([]);
  const [pord2, setpord] = useState([]);

  useEffect(() => {
    if (finalcontract) {
      const onload1 = async () => {

        let ascid = sessionStorage.getItem('ascid');
        console.log(ascid);
        if (ascid == 0) {
          navigate("/Pagenotfound");
        }

//the request that are forwarded by asc
        const arr33s = await finalcontract.methods.ascforwardreturn().call();
        var pdiv = arr33s[0];
        setpdiv(pdiv);
        var punit = arr33s[1];
        setpunit(punit);
        var pord = arr33s[2];
        setpord(pord);
//the units that are confirmed by other divisions 
        const kin = await finalcontract.methods.anodivtounitconfirmreturn().call();
        var anodivtounitconfirm = kin[0];
        var anodivtounitconfirmid = kin[1];
        var anodivtounitconfirmuintid = kin[2];
//(i value ) the request the are sent to manufacturer
        const kin2 = await finalcontract.methods.returnmanifacturer().call();
        var strmani = kin2[0];
        // manidiv=kin2[1];
        // maniunit=kin2[2];



        var fbody = ``;

        // for (var i = 0; i < pdiv.length; i++) {
        for (var i = pdiv.length - 1; i >= 0; i--) {


          var str3 = `${pdiv[i]} ${punit[i]} ${pord[i]}`

          if (!strmani.includes(String(str3))) {

            // var arr333s = await window.contract.methods.published2(pdiv[i], punit[i]).call();
            // console.log(arr333s);
            // status = arr333s[0];
            // ordno = arr333s[1];
            // accby = arr333s[2];

            //  if (!previndexofventoord.includes(String(i)) ) {
            //   if (!buycon.includes(String(i))) {
            const arr3s = await window.contract.methods.showproducts(pdiv[i], punit[i]).call();
            var pro = arr3s[0];
            var qua = arr3s[1];
            var ldate = arr3s[2];
            var tabledata = '';
            console.log(i);
            const data1 = pro[pord[i]];
            const data2 = qua[pord[i]];
            const date = ldate[pord[i]];
            /* */
            console.log(searchbar);
            var searchproducts = '';
            for (let p = 0; p < data1.length; p++) {
              searchproducts = searchproducts + `${data1[p]}`;
            }
            //making all the things to string and then searching (includes)
            if (` ${parseInt(pord[i]) + 1} ${date}  ${pdiv[i]} ${searchproducts} ${punit[i]} `.toLowerCase().includes(searchbar.toLowerCase())) {


              var tabledata = `<div class="container p-5 mt-4  mb-4 shadow rounded-3">
                            <div class="container-fluid">




                            <div class="row">
                            <div class="d-flex col justify-content-start">
                            <h2 class="display-6 fw-medium">FROM UNIT ID :  ${punit[i]}</h2>
                            </div>
                            <div class="d-flex  me-5 col justify-content-end">
                            <div>
                            <h5 class="text-success">From Division Id : ${pdiv[i]}</h5>
                            <h5 class="text-info mt-1 "> Last Date : ${date}</h5>
                            </div>
                            </div>
                            </div>
                              <h5 class="text-info">REQUEST NO : ${parseInt(pord[i]) + 1} </h5>
                              <div class="table-responsive">

                              <table class="table mt-4">
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



              if (!anodivtounitconfirm.includes(str3)) {



                tabledata = tabledata + `</tbody>
                                        </table>
                                        </div>
                                            <div class="row mt-4">
                                            <div class="col">
                                            <button onclick="rea(${i})" class="btn btn-lg btn-outline-primary">send to manifacturer</button>
                                            </div>
                                          <div class="d-flex col flex-row justify-content-end text-success">
                                          <div class="p-2"><h4> Status At :</h4></div>
                                          <div class="p-2"><h4 id="ss1">Division</h4> </div>
                                          </div>
											
                        
                                            
                                            </div> 
                                      </div>
                                    </div>`;
              }
              else {
                var s = 0;
                for (var lm = 0; lm < anodivtounitconfirm.length; lm++) {
                  if (anodivtounitconfirm[lm] == str3) {
                    s = lm;
                  }
                }
                tabledata = tabledata + `</tbody>
                                        </table>
                                        </div>
                                        <div class="d-flex flex-row justify-content-end mt-4 text-success">
                                        <div class=""><h4>Accepted To :  </h4></div>
                                        <div class="ms-1"><h4 > ${anodivtounitconfirmid[s]}</h4> </div>
                                        <div   class="p-1"><i class="fa-solid fa-arrow-right"></i></div>
                                        <div class=""><h4 >${anodivtounitconfirmuintid[s]}</h4> </div>
                                        </div>
                                        </div>
                                        </div>
                                    </div>`;
              }



              fbody = fbody + tabledata;
              //   }
            }
            // }
          }

        }


        console.log(fbody.length);
        if (fbody.length == 0) {
          fbody = fbody + waitingimg;
        }
        var newContent = fbody; // Replace with your desired content
        setDivContent(newContent);
      }
      onload1();
    }
  }, [finalcontract, searchbar,rendernum]);

  const logout = () => {
    sessionStorage.setItem('ascid', '');
    var button = document.getElementById('close');
    button.click();
    navigate("/Loginasc");
  };

  window.rea = async (rn) => {
    var manigo = `${pdiv2[rn]} ${punit2[rn]} ${pord2[rn]}`

    console.log(rn);
    finalweb3.eth.getAccounts().then(function (accounts) {
      var acc = accounts[0];
//sent request to manufacturer
      return finalcontract.methods.manifacturer(manigo, pdiv2[rn], punit2[rn], pord2[rn]).send({ from: acc });

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
        settoasterlink('fa-solid fa-circle-check fa-flip');
        settoastercolor('text-bg-success');
          settoastermsg('Ordered placed successfully');
           var button = document.getElementById('toasterclickwithid');
          button.click();


      }).catch(e => {
        console.log(e);
        setrendernum(rendernum+1);
                settoasterlink('fa-solid fa-circle-xmark fa-flip');
                        settoastercolor('text-bg-danger');
                          settoastermsg('Error in connecting Metamask');
                           var button = document.getElementById('toasterclickwithid');
                          button.click();
      })
     

    }).catch(function (tx) {
      console.log(tx);
      setrendernum(rendernum+1);
      settoasterlink('fa-solid fa-circle-xmark fa-flip');
      settoastercolor('text-bg-danger');
        settoastermsg('Some thing went Wrong');
         var button = document.getElementById('toasterclickwithid');
        button.click();
    })


  }


  return (<>
    <Navbar title={`Published Requests`} modaltitle={"#exampleModal2"} />
    <Offcanvas category={'asc'} activeno={2}/>
   
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

    <section className="mt-5">
      <div id="fullbody" className="container mt-5">

        <div dangerouslySetInnerHTML={{ __html: divContent }} />
      </div>
    </section>
    <Toaster toastercolor={toastercolor} toastermsg={toastermsg} toasterlink={toasterlink} rendernum={rendernum}/>

  </>);
}
export default Ascforward;
