import { useEffect } from 'react';
import { useState, useContext } from 'react';
import profile from './homephotos/profile1.png';
import { useNavigate } from "react-router-dom";
import { AppContext } from './passabiaddress';
import axios from 'axios';
import Toaster from './Toaster';

function Diveachnewreq() {
  //from passadi address page i am getting all this variables by the hook concept called use context
  const { finalweb3, finalcontract, loadingspinner, waitingimg } = useContext(
    AppContext
  );
//after completion of transacttion i want to rerender the page to show toaster
const[rerenderafterconfirm,setrerenderafterconfirm]=useState(4);
const [toastercolor,settoastercolor]=useState('');
const [toastermsg,settoastermsg]=useState('');
const[toasterlink,settoasterlink]=useState('');
const[rendernum,setrendernum]=useState(0);


  const [divContent, setDivContent] = useState(loadingspinner);

  const [searchQuery, setSearchQuery] = useState('');

  const navigate = useNavigate();

  const [divid, setdivid] = useState(null);
  let unitids = sessionStorage.getItem('newvenid');
  let divisionids = sessionStorage.getItem('alldivids');
  console.log(unitids, divisionids);
  const [products2, setproducts2] = useState([]);
  const [quantity2, setquantity2] = useState([]);
  const [ldate2, setldate2] = useState([]);

  useEffect(() => {
    const onload1 = async () => {
      if (finalcontract) {
        let unitids = sessionStorage.getItem('newvenid');
        let division = sessionStorage.getItem('alldivids');
        setdivid(division);
        if (division == 0 && unitids == 0) {
          window.location.href = '/Pagenotfound';
        }

        //all the products and quantity will get by giving unit id and divid
        const arr3s = await finalcontract.methods.showproducts(division, unitids).call();
        var pro = arr3s[0];
        setproducts2(pro);
        var qua = arr3s[1];
        setquantity2(qua);
        var ldate = arr3s[2];
        setldate2(ldate);

    //here we give division id then it will give(that whish unit is raised that request and his order) by that division here venid is useless

        const arr33s = await finalcontract.methods.published(division,/*use less */ unitids).call();
        var pven = arr33s[0];
        var pord = arr33s[1];

       //previsoly published request are storing in previndexofventoord
        var previndexofventoord = [];
        for (let i = 0; i < pven.length; i++) {
          if (pven[i] == unitids) {
            previndexofventoord.push(pord[i]);
          }
        }
      

        var fbody = ``;
        // for (var i = 0; i < pro.length; i++) {
        for (var i = pro.length - 1; i >= 0; i--) {

          if (!previndexofventoord.includes(String(i))) {
          
            var tabledata = '';
            console.log(i);
            const allproducts = pro[i];
            const allquantity = qua[i];
            const date = ldate[i];
            console.log(allproducts);
            console.log(allquantity);
            console.log(date);
            /* */
            console.log(searchQuery);
            var searchproducts = '';
            for (let p = 0; p < allproducts.length; p++) {
              searchproducts = searchproducts + `${allproducts[p]}`;
            }
            //making all the things to string and then searching (includes)
            if (`  ${date}  ${i + 1} ${searchproducts} ${date} `.toLowerCase().includes(searchQuery.toLowerCase())) {

              var tabledata = `<div class="container p-5   mb-5  shadow rounded-3">
                           
                            <div class="row">
                            <div class="d-flex col justify-content-start">
                            <h2 class="display-6 fw-medium">REQUEST NO : ${i + 1} </h2>
                            </div>
                            <div class="d-flex  me-5 col justify-content-end">
                            <div>
                           
                            <h5 class="text-info mt-1 "> Last Date : ${date}</h5>
                            </div>
                            </div>
                      
                            <div class="table-responsive">

                       <table class="table mt-1">
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
                                        <div class="container">
                                     
                                            <div class="row">
                                              <div class="col">
                                                <button onclick="rea(${i})" class="btn btn-outline-primary">publish</button>
                                              </div>
                                            
                                   
                                            
                                            
                                        </div>
                                        </div>

                                        
                                      
                                      </div>
                                    </div>`;




              fbody = fbody + tabledata;
            }
          }
          // }

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
  }, [finalcontract, searchQuery,rerenderafterconfirm]);

  const logout = () => {
    sessionStorage.setItem('alldivids', '');
    sessionStorage.setItem('newvenid', "");
    var button = document.getElementById('close');
    button.click();
    navigate("/Logindiv");
  };
  const back = () => {
    navigate("/Divnewreq");
  }



  window.rea = async (rn) => {


    console.log(rn);



    finalweb3.eth.getAccounts().then(function (accounts) {
      var acc = accounts[0];
//here i am publishing all the requests that came from units to all my units
      return finalcontract.methods.publish(divisionids, unitids, rn, products2[rn], quantity2[rn], ldate2[rn]).send({ from: acc });

    }).then(async function (tx) {
      console.log(tx);
      console.log(" REQUEST SENT SUCCESSFULLY");
      const date = new Date().toLocaleString();
      console.log("Current Date and Time:", date);

      var purpose = 'the new request accepted';
      var gas = tx.gasUsed;
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
      // alert(" REQUEST NOT SENT SUCCESSFULLY");
    })


  }


  return (
    <>
      <section className="navbar navbar-expand-lg bg-body-tertiary fixed-top" >
        <div className="container-fluid" style={{ width: "100%" }}>
          <button type="button" class='ms-1 fs-4 border-0 bg-transparent p-2' onClick={back}><i class="fa-solid fa-arrow-left"></i></button>
          <h1 >
            <h1 className="mt-2 ms-3" id="unitname">DIVISION ID-{divisionids}</h1>
          </h1>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 navfont">

              <li className="nav-item">
                <form className="d-flex" role="search">
                  <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                  <button className="btn btn-outline-success" type="submit">Search</button>
                </form>
              </li>
              <li className="nav-item-22">
                <div className="profile-23">
                  <i className="fa-sharp fa-solid fa-bell"></i>
                </div>
              </li>


              <li className="nav-item">

                <button type="button" className="btn " data-bs-toggle="modal" data-bs-target="#exampleModal2">
                  <div className="profile-23">
                    <a><img src={profile} alt="" /></a>
                  </div>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </section>
      {/* modal-profile */}
      <div className="modal fade" id="exampleModal2" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header py-3">
              <h1 className="modal-title fs-5" id="exampleModalLabel">DIVISION ID-{divisionids}</h1>
              <button type="button" className="btn-close" id="close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="">
              <div className="modal-body  mt-3  d-flex">
                <div className="ms-3">
                  <img className="bd-placeholder-img  mt-3 rounded-circle border-white" width="125" height="120" src={profile} />

                </div>
                <div className="ms-5 mt-3">
                  <h3 className=" mt-3 fw-normal">DIVISION ID-{divisionids}</h3>
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

      <div className="container mt-5">
        <br />

        <div className="mt-5" dangerouslySetInnerHTML={{ __html: divContent }} />
      </div>


      <Toaster toastercolor={toastercolor} toastermsg={toastermsg} toasterlink={toasterlink} rendernum={rendernum}/>


    </>
  );
}

export default Diveachnewreq;  
