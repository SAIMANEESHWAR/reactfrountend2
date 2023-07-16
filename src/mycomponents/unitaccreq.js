import React from 'react';
import Offcanvas from './offcanvas';
import { useEffect } from 'react';
import { useState, useContext } from 'react';
import profile from './homephotos/profile1.png';
import { useNavigate } from "react-router-dom";
import Navbar from './navbar';
import { AppContext } from './passabiaddress';



function Unitaccreq() {
    //from passadi address page i am getting all this variables by the hook concept called use context

    const { finalcontract, searchbar, loadingspinner, waitingimg } = useContext(
        AppContext
    );


    const [divContent, setDivContent] = useState(loadingspinner);

    const [unitid, setmyid] = useState(null);
    const [divisionid, setdivid] = useState(null);
    const navigate = useNavigate();

    const [accid2, setaccid2] = useState([]);

    const [accord2, setaccord2] = useState([]);

    const [accdivid2, setaccdivid2] = useState([]);



    useEffect(() => {
        //here i need to run a function of async 
        const onloaduseeffect = async () => {
            if (finalcontract) {

                var unitsessionstrorage = sessionStorage.getItem('venids');
                var divisionsessionstrorage = sessionStorage.getItem('divids');

                setmyid(unitsessionstrorage);

                setdivid(divisionsessionstrorage);
                //if there is no data then it will allocate to page not found
                if (unitsessionstrorage == 0 && divisionsessionstrorage == 0) {
                    window.location.href = '/Pagenotfound';
                }
                //the orders that are accepted by unit
                const numven = await window.contract.methods.myaccepted(divisionsessionstrorage, unitsessionstrorage).call();
                var accid = numven[0];
                setaccid2(accid);
                var accord = numven[1];
                setaccord2(accord);
                var accdivid = numven[2];
                setaccdivid2(accdivid);



                var str = ``;
                // for(var i=0;i<accid.length;i++){
                for (var i = accid.length - 1; i >= 0; i--) {
                    if (` ${parseInt(i) + 1} ${accid[i]} ${parseInt(accord[i]) + 1}`.toLowerCase().includes(searchbar.toLowerCase())) {


                        str = str + `  <div class="col-lg-3 col-sm p-5  mb-4  mt-3  shadow">
                                        <h2 class=" mt-3 fw-normal">ACCEPTED ID-${parseInt(i) + 1}</h2>
                                            <h5 class="text-success">
                                            ACCEPTED TO : ${accid[i]}
                                            </h5>
                                            <h5 class="text-info">
                                            ORDER NO : ${parseInt(accord[i]) + 1}
                                            <br>
                                            </h5>
                                        <button onclick="eachreqmodal(${i})" class="btn btn-outline-primary mt-2" data-bs-toggle="modal" data-bs-target="#exampleModaldata"
                                                        >View details </button></p>
                                    </div>`;



                    }


                }

                console.log(str.length);
                if (str.length == 0) {
                    str = str + waitingimg;
                }

                var newContent = str;
                setDivContent(newContent);
            }
        }

        onloaduseeffect();
    }, [finalcontract, searchbar]);

    
    const logout = () => {
        sessionStorage.setItem('divids', '');
        sessionStorage.setItem('venids', '');
        var button = document.getElementById('close');
        button.click();
        navigate("/");
    };

    const [date2, setdate2] = useState(null);
    const [tableContent, settableContent] = useState('');
    window.eachreqmodal = async (cn) => {
        var accepteddivid = accdivid2[cn];
        const acceptedunitid = accid2[cn];
        const acceptedorderid = accord2[cn];
    /**/     if (accepteddivid == undefined) {
            accepteddivid = divisionid;
        }
        //here it takes divid and unitid and gives all the products and quatity
        const numven2 = await window.contract.methods.showproducts(accepteddivid, acceptedunitid).call();
        console.log(numven2);
        var p = numven2[0];
        var q = numven2[1];
        var ld = numven2[2];
        const product = p[acceptedorderid];
        console.log(product);
        const quan = q[acceptedorderid];
        const date = ld[acceptedorderid];
        setdate2(date);
        var tabledata = "";

        for (let i = 0; i < product.length; i++) {

            tabledata = tabledata + ` <tr>
                                        <td>${product[i]}</td>
                                        <td>${quan[i]}</td>
                                        
                                        </tr> `;

        }
        settableContent(tabledata);
    }

    return (
        <>
            <Navbar title={`Accepted Orders`} modaltitle={"#exampleModal2"} />
            <Offcanvas category={"units"} activeno={3} />

            {/* modal-profile */}
            <div className="modal fade" id="exampleModal2" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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

            <div className="modal fade" id="exampleModaldata" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">ACCEPTED BY:</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">PRODUCTNAME</th>
                                    <th scope="col">QUANTITY</th>


                                </tr>
                            </thead>
                            <tbody dangerouslySetInnerHTML={{ __html: tableContent }} />
                            {/* <tbody id="tablebody"></tbody> */}
                        </table>
                        <div id="reqid" className="modal-footer">
                            <h4>last date : {date2}</h4>

                        </div>
                    </div>
                </div>
            </div>


            {/* <!--table--> */}

            <div id="fullbody" className=" container">
                <div className="row  " dangerouslySetInnerHTML={{ __html: divContent }} />
            </div>


        </>);
}
export default Unitaccreq;