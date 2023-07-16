import React from 'react';
import { useEffect } from 'react';
import { useState, useContext } from 'react';
import profile from './homephotos/profile1.png';
import Offcanvas from './offcanvas';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Navbar from './navbar';
import { AppContext } from './passabiaddress';


function Divtransaction() {
  //from passadi address page i am getting all this variables by the hook concept called use context

  const { finalcontract, searchbar, loadingspinner, waitingimg } = useContext(
    AppContext
  );


  const [divContent, setDivContent] = useState(loadingspinner);

  const [division2, setdivid] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    //here i need a async function in useeffect 
    const onloaduseeffect = async () => {



      let division = sessionStorage.getItem('alldivids');

      setdivid(division);
      //if null that means user log out if he try to acess that 
      //page we need to navigate him to pagenotfound

      if (division == 0) {
        window.location.href = '/Pagenotfound';
      }

      try {
        let divid = sessionStorage.getItem('alldivids');

        await axios.post("https://onlybachend.onrender.com/divtransactionget", {
          divid
        }).then(res => {
          var arr = res.data.data267;
          //here arr2 is used to store index values using date(date and time) because its different for every order
          var arr2 = [arr.length];
          for (var i = 0; i < arr.length; i++) {
            arr2[i] = arr[i].date.toLowerCase();
          }

          var filteredTransactions = arr.filter(transaction =>
            transaction.date.toLowerCase().includes(searchbar.toLowerCase()) ||
            transaction.id.toLowerCase().includes(searchbar.toLowerCase()) ||
            transaction.gas.toLowerCase().includes(searchbar.toLowerCase())
          );
          //declaring empty string after i willsend all the data (cards ) to it
          var str = ``;
          console.log(filteredTransactions);
          for (var i = filteredTransactions.length - 1; i >= 0; i--) {


            str = str + `  <div class="col-lg-11 ms-5 text-truncate overflow-auto me-5  p-5  mt-3  shadow">
                <div class="d-flex  flex-row ">
                <h2 class="display-6 fw-medium me-5 ">TRANSACTION NO : ${arr2.indexOf(filteredTransactions[i].date.toLowerCase()) + 1} </h2>
                <h5 class="ms-5 mt-3"> Time : ${filteredTransactions[i].date}</h5>
                </div>
           
            <h4 class="text-info mt-3">TRANSACTION ID : ${filteredTransactions[i].id}</h4>
            <h4 class="text-success mt-2">GAS USED : ${filteredTransactions[i].gas}</h4>
            <div class=" p-3 mt-4  bg-tertiary">
            <h5>Purpose : </h5>
            <h5 class="ms-5">${filteredTransactions[i].purpose}</h5>
            </div>
            <div class="d-flex mt-3 flex-row">
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
    sessionStorage.setItem('alldivids', '');
     //i am closing the modal through button with id 
    var button = document.getElementById('close');
    button.click();
    navigate("/Logindiv");
  };






  return (<>
    <Navbar title={`Transactions`} modaltitle={"#exampleModal"} />
            {/* here active no in navbar is which link need to be active while open this component */}

    <Offcanvas category={'divisions'} activeno={4} />


    {/* modal-profile */}
    <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
    {/* <!--offcanvas--> */}



    {/* <!--table--> */}

    <div id="fullbody" className="container ">
      <div dangerouslySetInnerHTML={{ __html: divContent }} />
    </div>


  </>);
}
export default Divtransaction;
