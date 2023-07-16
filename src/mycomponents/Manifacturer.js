
import { useEffect } from 'react';
import { useState, useContext } from 'react';
import profile from './homephotos/profile1.png';
import {  useNavigate } from "react-router-dom";
import Navbar from './navbar';
import { AppContext } from './passabiaddress';
import Offcanvas from './offcanvas';




function Manufacturer() {
    const {finalcontract ,searchbar, loadingspinner, waitingimg} = useContext(
        AppContext
    );



    const [divContent, setDivContent] = useState(loadingspinner);


    const navigate = useNavigate();
 
    // const [contract33,setContract33]=useState(null);
    // setContract33(finalcontract);

 

    useEffect(() => {
        if(finalcontract){
        const onload1 = async () => {

            let ascid=sessionStorage.getItem('ascid');
            console.log(ascid);
            if(ascid==0){
                navigate("/Pagenotfound");
            }


            
            const arr33s = await window.contract.methods.ascforwardreturn().call();
           var  pdiv = arr33s[0];
            var punit = arr33s[1];
           var pord = arr33s[2];
           

          const kin2 = await window.contract.methods.returnmanifacturer().call();
          var strmani=kin2[0];
         



           var fbody = ``;
           
            for (var i = 0; i < strmani.length; i++) {

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
         var searchproducts='';
         for(let p=0;p<data1.length;p++){
          searchproducts=searchproducts+`${data1[p]  }`;
         }
         //making all the things to string and then searching (includes)
         if(` ${pdiv[i]} ${date}  ${parseInt(pord[i]) + 1} ${searchproducts} ${punit[i]} ${date} `.toLowerCase().includes(searchbar.toLowerCase())){
           

                 tabledata = `<div class="container p-5 mt-4  mb-4 shadow rounded-3">
                            <div class="container-fluid ">


                            <div class="row">
                            <div class="d-flex col justify-content-start">
                            <h2 class="display-6 fw-medium">FROM UNIT ID :  ${punit[i]}</h2>
                            </div>
                            <div class="d-flex  me-5 col justify-content-end">
                            <div>
                            <h5 class="text-success">FROM DIV ID : ${pdiv[i]}</h5>
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

                    tabledata = tabledata + `</tbody>
                                        </table>
                                        </div>
                                            <div class="row">
                        <div class="d-flex flex-row mb-3">
                        </div>
                        </div>
                                      </div>
                                    </div>`;
                                
                                
                


                fbody = fbody + tabledata;
         }

            }


            console.log(fbody.length);
			if(fbody.length==0){
                fbody=fbody+waitingimg;
				}
           
            





            var newContent = fbody; // Replace with your desired content
            setDivContent(newContent);
        }
        onload1();
    }
    },[finalcontract,searchbar]);
    const logout=()=>{
        sessionStorage.setItem('ascid','');
        var button = document.getElementById('close');
        button.click();
      navigate("/Loginasc");
    };
    

    
return(<>
                  <Navbar title={`Manufacturer`} modaltitle={"#exampleModal2"} />
                  <Offcanvas category={'asc'} activeno={3}/>

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
        <img className="bd-placeholder-img  mt-3 rounded-circle border-white" width="125" height="120" src={profile}/>

        </div>
        <div className="ms-5 mt-3">
        <h3 className=" mt-3 fw-normal">ASC ID-123123</h3>
            <p>
            Contact Link : 
                <br/>
               
                
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
export default Manufacturer;
