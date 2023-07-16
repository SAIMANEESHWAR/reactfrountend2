import Offcanvas from './offcanvas';
import { useEffect } from 'react';
import { useState, useContext } from 'react';
import profile from './homephotos/profile1.png';
import { useNavigate } from "react-router-dom";
import { AppContext } from './passabiaddress';
import Navbar from './navbar';
import axios from 'axios';
import Toaster from './Toaster';

function Divascreq() {

 //from passadi address page i am getting all this variables by the hook concept called use context
  const { finalweb3, finalcontract, searchbar, loadingspinner, waitingimg } = useContext(
    AppContext
  );
  const [toastercolor,settoastercolor]=useState('');
    const [toastermsg,settoastermsg]=useState('');
    const[toasterlink,settoasterlink]=useState('');
    const[rerenderafterconfirm,setrerenderafterconfirm]=useState(4);
    const[rendernum,setrendernum]=useState(0);


  const [divContent, setDivContent] = useState(loadingspinner);

  const navigate = useNavigate();

  const [division2, setdivision2] = useState(null);

  const [whichdiv2, setwhichdiv2] = useState([]);
  const [whichunit2, setwhichunit2] = useState([]);
  const [whichord2, setwhichord2] = useState([]);


  useEffect(() => {
    const onload1 = async () => {
      if (finalcontract) {
        let division = sessionStorage.getItem('alldivids');
        if (division == 0) {
          window.location.href = '/Pagenotfound';
        }
        setdivision2(division);
        console.log(searchbar);
        const arr33s = await finalcontract.methods.ascforwardreturn().call();
        var whichdiv = arr33s[0];
        setwhichdiv2(whichdiv);
        var whichunit = arr33s[1];
        setwhichunit2(whichunit);

        var whichord = arr33s[2]
        setwhichord2(whichord);


        const anodivtounitsreturn = await finalcontract.methods.anodivtounitsreturn(division).call();
        console.log(anodivtounitsreturn);

        const kin2 = await window.contract.methods.returnmanifacturer().call();
        var reqwenttomanufaturer = kin2[0];



        var fbody = ``;

        for (var i = whichdiv.length - 1; i >= 0; i--) {


          if (!anodivtounitsreturn.includes(String(i)) && division != whichdiv[i]) {

            var str3 = `${whichdiv[i]} ${whichunit[i]} ${whichord[i]}`;

            if (!reqwenttomanufaturer.includes(String(str3))) {/**/

              //   if (!buycon.includes(String(i))) {
              const arr3s = await window.contract.methods.showproducts(whichdiv[i], whichunit[i]).call();
              var pro = arr3s[0];
              var qua = arr3s[1];
              var ldate = arr3s[2];
              var tabledata = '';
              console.log(i);
              const data1 = pro[whichord[i]];
              const data2 = qua[whichord[i]];
              const date = ldate[whichord[i]];

              const anodivconformed = await window.contract.methods.published2(whichdiv[i], whichunit[i]).call();
              var anodivconformed2 = anodivconformed[1];
              if (!anodivconformed2.includes(String(whichord[i]))) {
                /* */
                console.log(searchbar);
                var searchproducts = '';
                for (let p = 0; p < data1.length; p++) {
                  searchproducts = searchproducts + `${data1[p]}`;
                }
                //making all the things to string and then searching (includes)
                if (` ${whichunit[i]}  ${date}  ${parseInt(whichord[i]) + 1} ${searchproducts} ${whichdiv[i]} ${date} `.toLowerCase().includes(searchbar.toLowerCase())) {


                  var tabledata = `<div class="container p-5 mt-4  mb-4 shadow rounded-3">
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
                           <h5 class="text-info">REQUEST NO : ${parseInt(whichord[i]) + 1} </h5>
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
                  tabledata = tabledata + `</tbody>
                                     </table>
                                        </div>

                                     <div class="mt-4" id="tp${i}"></div>
                                     <!--button-->
                                     <div class="container">
                            
                                         <div class="row">
                                           
                                           <div class="col">
                                             <button onclick="rea(${i})" class="btn btn-outline-primary">Send To Units</button>
                                           </div>
                                         
                                     </div>
                                     </div>

                                     
                                   
                                   </div>
                                 </div>`;




                  fbody = fbody + tabledata;
                }
              }
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
    }
    onload1();
  }, [finalcontract, searchbar]);
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

      return finalcontract.methods.anodivtounits(whichdiv2[rn], division2, whichunit2[rn], whichord2[rn], rn).send({ from: acc });

    }).then(async function (tx) {
      console.log(tx);
      console.log(" REQUEST SENT SUCCESSFULLY");
      var purpose = 'the new request accepted';
      const date = new Date().toLocaleString();
      console.log("Current Date and Time:", date);
      var gas = tx.gasUsed;
      var divid = division2;
      var id = tx.transactionHash;
      var from = tx.from;
      var to = tx.to;
      var block = tx.blockNumber;
      await axios.post("https://onlybachend.onrender.com/divtransaction", {
        divid, gas, id, from, to, block, purpose, date
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
        settoastermsg('problem in connecting mongo');
      })
      window.location.reload();
    }).catch(function (tx) {
      console.log(tx);
      setrendernum(rendernum+1);
      settoasterlink('fa-solid fa-circle-xmark fa-flip');
      settoastercolor('text-bg-danger');
      settoastermsg('REQUEST NOT SENT SUCCESSFULLY');
    })


  }


  return (
    <>
      <Navbar title={`Asc Requests`} modaltitle={"#exampleModal2"} />
      <Offcanvas category={'divisions'} activeno={2} />


      {/* modal-profile */}
      <div className="modal fade" id="exampleModal2" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header py-3">
              <h1 className="modal-title fs-5" id="exampleModalLabel">DIVISION ID-{division2}</h1>
              <button type="button" className="btn-close" id="close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="">
              <div className="modal-body  mt-3  d-flex">
                <div className="ms-3">
                  <img className="bd-placeholder-img  mt-3 rounded-circle border-white" width="125" height="120" src={profile} />

                </div>
                <div className="ms-5 mt-3">
                  <h3 className=" mt-3 fw-normal">DIVISION ID-{division2}</h3>
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

      <section className="mt-5">
        <div id="fullbody" className="container mt-5">

          <div dangerouslySetInnerHTML={{ __html: divContent }} />
        </div>
      </section>
      <Toaster toastercolor={toastercolor} toastermsg={toastermsg} toasterlink={toasterlink} rendernum={rendernum}/>

    </>
  );
}
export default Divascreq