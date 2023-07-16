import { useEffect } from 'react';
import { useState, useContext } from 'react';
import profile from './homephotos/profile1.png';
import Navbar from './navbar';
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from './passabiaddress';
import Offcanvas from './offcanvas';


function Divascpublished() {
  //from passadi address page i am getting all this variables by the hook concept called use context

  const { finalcontract, searchbar, loadingspinner, waitingimg } = useContext(
    AppContext
  );
  const [divContent, setDivContent] = useState(loadingspinner);
  const navigate = useNavigate();

  const [divisionid2, setdivisionid2] = useState(null);

  useEffect(() => {
    const onloaduseeffect = async () => {
      if (finalcontract) {
        let division = sessionStorage.getItem('alldivids');
        console.log(searchbar);
        setdivisionid2(division);
        if (division == 0) {
          window.location.href = '/Pagenotfound';
        }

        const arr33s = await finalcontract.methods.returnanodivtounits(division).call();
        var anodiv = arr33s[0];
        var anounit = arr33s[1];
        var anoord = arr33s[2]

        const kin = await finalcontract.methods.anodivtounitconfirmreturn().call();
        var anodivtounitconfirm = kin[0];
        var anodivtounitconfirmid = kin[1];
        var anodivtounitconfirmuintid = kin[2];
        console.log(anodiv, anounit, anoord);

        const kin2 = await finalcontract.methods.returnmanifacturer().call();
        var strmani = kin2[0];
        var fbody = ``;
        // for (var i = 0; i < anodiv.length; i++) {
        for (var i = anodiv.length - 1; i >= 0; i--) {

          const arr3s = await finalcontract.methods.showproducts(anodiv[i], anounit[i]).call();
          var pro = arr3s[0];
          var qua = arr3s[1];
          var ldate = arr3s[2];
          var tabledata = '';
          console.log(i);
          const allproducts = pro[anoord[i]];
          const allquantity = qua[anoord[i]];
          const date = ldate[anoord[i]];

          /* */
          console.log(searchbar);
          var searchproducts = '';
          for (let p = 0; p < allproducts.length; p++) {
            searchproducts = searchproducts + `${allproducts[p]}`;
          }
          //making all the things to string and then searching (includes)
          if (`  ${anodiv[i]} ${parseInt(anoord[i]) + 1}  ${anounit[i]} ${searchproducts} ${date} `.toLowerCase().includes(searchbar.toLowerCase())) {


            tabledata = `<div class="container p-5 mt-2  mb-4 shadow rounded-3">
                         <div class="container-fluid ">
              

                         <div class="row">
                         <div class="d-flex col justify-content-start">
                         <h2 class="display-6 fw-medium">FROM UNIT ID : ${anounit[i]}</h2>
                         </div>
                         <div class="d-flex  me-5 col justify-content-end">
                         <div>
                         <h5 class="text-success">FROM DIVISION ID : ${anodiv[i]}</h5>
                         <h5 class="text-info mt-1 "> Last Date : ${date}</h5>
                         </div>
                         </div>
                         </div>
                           <h5 class="text-info">REQUEST NO : ${parseInt(anoord[i]) + 1}</h5>
                          <table class="table mt-2">
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
            var str3 = `${anodiv[i]} ${anounit[i]} ${anoord[i]}`;
            if (strmani.includes(str3)) {
              tabledata = tabledata + `</tbody>
                                     </table>
                                  

                                         <div class="row">
                                           <div class="d-flex  me-5 col justify-content-start">
                                           <div class="p-2 text-success"><h4> Status At :</h4> </div>
                                           <div class="p-2 text-success"><h4>MANIFACTURER</h4> </div>
                                              </div>
                                     </div>
  
                                   
                                   </div>
                                 </div>`;
            }
            else if (!anodivtounitconfirm.includes(str3)) {


              tabledata = tabledata + `</tbody>
                                     </table>

                                         <div class="row">
                                           
                                           
                                           
                                             <div class="d-flex  me-5 col justify-content-end text-warning">
                                           <div class="p-2 "><h4></h4> </div>
                                           <div class="p-2 "><h4> Pending</h4> </div>
                                            </div>
                                            </div>
                                        </div>
                                 </div>`;
            }
            else {
              var s = 0;
              for (var m = 0; m < anodivtounitconfirm.length; m++) {
                if (anodivtounitconfirm[m] == str3) {
                  s = m;
                }
              }


              tabledata = tabledata + `</tbody>
                                     </table>

                                                
                                                    <div class="row">
                                                  <div class="d-flex flex-row text-success">
                                                  <div class="p-2"><h4>Accepted By : </h4></div>
                                                  <div class="p-2"><h4 > ${anodivtounitconfirmid[s]} </h4> </div>
                                                  <div   class="p-2 mt-1"><i class="fa-solid fa-arrow-right"></i></div>
                                                  <div class="p-2"><h4 >  ${anodivtounitconfirmuintid[s]}</h4> </div>
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
    onloaduseeffect();
  }, [finalcontract, searchbar]);
  const logout = () => {
    sessionStorage.setItem('alldivids', '');
    sessionStorage.setItem('newvenid', "");
    var button = document.getElementById('close');
    button.click();
    navigate("/Logindiv");
  };

  return (<>
    <Navbar title={`History of Asc`} modaltitle={"#exampleModal2"} />
    <Offcanvas category={'divisions'} activeno={3} />
    {/* modal-profile */}
    <div className="modal fade" id="exampleModal2" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header py-3">
            <h1 className="modal-title fs-5" id="exampleModalLabel">DIVISION ID-{divisionid2}</h1>
            <button type="button" className="btn-close" id="close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="">
            <div className="modal-body  mt-3  d-flex">
              <div className="ms-3">
                <img className="bd-placeholder-img  mt-3 rounded-circle border-white" width="125" height="120" src={profile} />

              </div>
              <div className="ms-5 mt-3">
                <h3 className=" mt-3 fw-normal">DIVISION ID-{divisionid2}</h3>
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
    <section className="mt-5">
      <div id="fullbody" className="container mt-5">

        <div dangerouslySetInnerHTML={{ __html: divContent }} />
      </div>
    </section>



  </>);
}
export default Divascpublished;