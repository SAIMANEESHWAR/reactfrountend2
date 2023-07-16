import React from 'react';
import { useEffect } from 'react';
import { useState, useContext } from 'react';
import profile from './homephotos/profile1.png';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Offcanvas from './offcanvas';
import Navbar from './navbar';
import { AppContext } from './passabiaddress';


function Asctransaction() {
  //getting details from passabipage page by using usecontext hook
  const { finalcontract, searchbar, loadingspinner, waitingimg } = useContext(
    AppContext
  );
  const [divContent, setDivContent] = useState(loadingspinner);
  const navigate = useNavigate();
  useEffect(() => {
    const onloaduseeffect = async () => {
      let ascid = sessionStorage.getItem('ascid');
      console.log(ascid);
      if (ascid == 0) {
        navigate("/Pagenotfound");
      }
      try {
        let ascid = sessionStorage.getItem('ascid');
        await axios.post("https://onlybachend.onrender.com/asctransactionget", {
          ascid
        }).then(res => {
          var arr = res.data.data267;
          console.log(arr);
          var arr2 = [arr.length];
          for (var i = 0; i < arr.length; i++) {
            arr2[i] = arr[i].date.toLowerCase();
          }

          var filteredTransactions = arr.filter(transaction =>
            transaction.date.toLowerCase().includes(searchbar.toLowerCase()) ||
            transaction.id.toLowerCase().includes(searchbar.toLowerCase())
          );
          var str = ``;
          console.log(filteredTransactions);
          for (var i = filteredTransactions.length - 1; i >= 0; i--) {
                str = str + `  <div class="col-lg-11 ms-5 text-truncate overflow-auto me-5  p-5  mt-3  shadow">
            
                <div class="d-flex mt-2 flex-row ">
                <h2 class="display-6 fw-medium me-5 ">Transaction no : ${arr2.indexOf(filteredTransactions[i].date.toLowerCase()) + 1} </h2>
                <h5 class="ms-5 mt-1"> Time : ${filteredTransactions[i].date}</h5>
                </div>
            <h4 class="text-info mt-0">Transaction Id : ${filteredTransactions[i].id}</h4>
            <h4 class="text-success mt-1">Gas Used : ${filteredTransactions[i].gas}</h4>
            <div class=" p-3 mt-1  bg-tertiary">
            <h5>Purpose : </h5>
            <h5 class="ms-5">${filteredTransactions[i].purpose}</h5>
            </div>
            <div class="d-flex mt-2 flex-row">
            <h5 class="me-5 ms-2"> From : ${filteredTransactions[i].from}</h5>
            <h5 class="ms-5"> To : ${filteredTransactions[i].to}</h5>
            </div>
            
            
            </div>`;






          }

          console.log(str.length);
          if (str.length == 0) {
            str = str + waitingimg;
          }

          console.log(str);
          var newContent = str; // Replace with your desired content
          setDivContent(newContent);

        })


      } catch (e) {
        console.log(e);
      }

    }
    onloaduseeffect();
  }, [finalcontract, searchbar]);

  const logout = () => {
    sessionStorage.setItem('ascid', '');
    var button = document.getElementById('close');
    button.click();
    navigate("/Loginasc");
  };






  return (<>
    <Navbar title={`Transactions`} modaltitle={"#exampleModal"} />
    <Offcanvas category={'asc'} activeno={5} />



    {/* modal-profile */}
    <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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


  </>);
}
export default Asctransaction;
