import { useState, useContext } from 'react';
import axios from 'axios';
import Toaster from './Toaster';



function Nestedunit() {


    const [unitid, setunitid] = useState('');
    const [divid, setdivid] = useState('');
    const [password, setpassword] = useState('');
    const [metamaskaccount,setmetamaskaccount]=useState('');


    const [toastercolor,settoastercolor]=useState('');
    const [toastermsg,settoastermsg]=useState('');
    const[toasterlink,settoasterlink]=useState('');
    const[rendernum,setrendernum]=useState(0);
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        
       
    
        try {
          console.log(divid, password)
          await axios.post("https://onlybachend.onrender.com/Registration/Nestedunit", {
            divid,unitid, password,metamaskaccount
          }).then(res => {
            if (res.data == "exist") {
              setrendernum(rendernum+1);
              settoasterlink('fa-solid fa-circle-xmark fa-flip');
                      settoastercolor('text-bg-warning');
                        settoastermsg('Entered Id is Already Registered');
                         var button = document.getElementById('toasterclickwithid');
                        button.click();
            }
            else if (res.data == "not exist") {
          console.log("registered");
          setrendernum(rendernum+1);
          settoasterlink('fa-solid fa-circle-check fa-flip');
          settoastercolor('text-bg-success');
            settoastermsg('Ordered placed successfully');
             var button = document.getElementById('toasterclickwithid');
            button.click();
            }
          }).catch(e => {
            console.log(e);
            setrendernum(rendernum+1);
            settoasterlink('fa-solid fa-circle-xmark fa-flip');
            settoastercolor('text-bg-danger');
              settoastermsg('Error in connecting Mongo');
               var button = document.getElementById('toasterclickwithid');
              button.click();
          })
    
        } catch (error) {
          setrendernum(rendernum+1);
          settoasterlink('fa-solid fa-circle-xmark fa-flip');
          settoastercolor('text-bg-danger');
            settoastermsg('Some thing went wrong');
             var button = document.getElementById('toasterclickwithid');
            button.click();
        }
      };
    
    return(<>
     <section id="sai">
     <form onSubmit={handleSubmit} >
           <div className="row position-relative justify-content-center align-items-center"> 
           
                  <div className="p-4 col-5 mt-5 p-md-5 border rounded-3 bg-body-tertiary text-truncate">
                <h1> Units Registration</h1>
                       <div className="form-floating mb-3 mt-5 text-truncate">
                           <input  className="form-control" id="f1" placeholder="DIVISION ID" onChange={(e) => setdivid(e.target.value)} required  />
                           <label for="floatingInput">DIVISION ID</label>
                       </div>
                       <div className="form-floating mb-3 text-truncate">
                           <input  className="form-control" id="f2" placeholder="UNIT ID" onChange={(e) => setunitid(e.target.value)} required  />
                           <label for="floatingInput">UNIT ID</label>
                       </div>
                       <div className="form-floating mb-3 text-truncate">
                           <input  className="form-control" id="f2" placeholder="Meta Mask Account" onChange={(e) => setmetamaskaccount(e.target.value)} required  />
                           <label for="floatingInput">Meta Mask Account</label>
                       </div>
                    
                       <div className="form-floating mb-3 text-truncate">
                           <input type="password" className="form-control" id="f3" placeholder="Password" onChange={(e) => setpassword(e.target.value)} required />
                           <label for="floatingPassword">Password</label>
                       </div>
                       
                       <button className="w-100 btn btn-lg btn-primary" type="submit"   >Register</button>
                       <hr className="my-4"/>
                       <small className="text-body-secondary">By clicking Register ,it will add to database</small>
                   </div>
                   </div>
   </form>
           </section>
           <Toaster toastercolor={toastercolor} toastermsg={toastermsg} toasterlink={toasterlink} rendernum={rendernum}/>

   
    </>);
}
export default Nestedunit;