import react, { useEffect } from 'react';
import profile from './homephotos/profile1.png';
import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";


const Offcanvas = (props) => {
    const navigate = useNavigate();

    const {category,activeno } = props;
    const [activelink, setactivelink] = useState(activeno);
    const [linksarray, setlinktoarray] = useState([]);
    const [offcanvasicons, setoffcanvasicons] = useState([]);
  const [offcanvasarray, setoffcanvasarray] = useState([]);
  useEffect(() => {
      var unitarray=["New Requests"," Order Form","History"," Accepted Orders","Other Divisions Requests","Transactions"];
      var uniticons=["fa-solid fa-house","fa-solid fa-cart-shopping","fa-solid fa-clock-rotate-left","fa-solid fa-clipboard-check"," fa-solid fa-money-bill-transfer","fa-solid fa-money-check-dollar"];
      var unitlinkarray=["/Unitnewreq","/Unitorder","/Unitoldreq","/Unitaccreq","/Unitotherdiv","/Transaction"];
      
      var divisionarray=["Home"," History","Asc Requests","History of Asc","Transactions"] ;
      var divisionicons=["fa-solid fa-house","fa-solid fa-clock-rotate-left","fa-solid fa-paper-plane","fa-solid fa-clock-rotate-left","fa-solid fa-money-check-dollar"]
      var divisionlinkarray=["/Divnewreq","/Divaccreq","/Divascreq","/Divascpublished","/Divtransaction"]

      var ascarray=["Home","Accepted Requests","  Division Requests","Manufacturer","Registration","Transactions"];
      var asclinkarray=["/Aschomearr","/Ascaccepted","/Ascforward","/Manifacturer","/Registration/Nestedunit","/Asctransaction"];
      var ascicons=["fa-solid fa-house","fa-solid fa-clipboard-check","fa-solid fa-share-from-square","fa-solid fa-tractor","fa-solid fa-registered","fa-solid fa-clock-rotate-left"]
    if(category=="units"){
       
        setlinktoarray(unitlinkarray);
        setoffcanvasicons(uniticons);
        setoffcanvasarray(unitarray);
    }
    else if(category=="divisions"){
        setlinktoarray(divisionlinkarray);
        setoffcanvasicons(divisionicons);
        setoffcanvasarray(divisionarray);
    }
    else if(category=="asc"){
        setlinktoarray(asclinkarray);
        setoffcanvasicons(ascicons);
        setoffcanvasarray(ascarray);
    }
},[]);
const logoutforunits = () => {
    sessionStorage.setItem('divids', '');
    sessionStorage.setItem('venids', '');
    var button = document.getElementById('close');
    button.click();
    navigate("/");
  };
    
 console.log(activelink);
    return(<>
         <div className="p-5">
                <div className="offcanvas offcanvas-start" data-bs-scroll="true" tabindex="-1" id="offcanvasWithBothOptions"
                    aria-labelledby="offcanvasWithBothOptionsLabel d-flex flex-column flex-shrink-0 p-3 bg-body-tertiary"
                    style={{ width: "280px" }}>

                    <div className="offcanvas-header">
                    
                       <button className='border-0 bg-transparent' onClick={()=>{navigate('/')}}> <h1 className="offcanvas-title" id="offcanvasWithBothOptionsLabel">SCM</h1></button>
                        <button type="button" className="btn-close border" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>

                    <hr />
                    <ul className="nav nav-pills flex-column mb-auto me-3">
                        {offcanvasarray.map((item, index) =>
                       
                                index == activelink ? (
                                    <li className="nav-item ">
                                        <Link to={`#`} className="nav-link active " aria-current="page">
                                            <i className={ `${offcanvasicons[index]} me-2`}></i>{item}
                                        </Link>
                                    </li>
                                ) : (
                                    <li className="nav-item ">
                                        <Link to={`${linksarray[index]}`} className="nav-link " aria-current="page">
                                            <i className={ `${offcanvasicons[index]} me-2`}></i>{item}
                                        </Link>
                                    </li>
                                )
                                )}
                                <li className="nav-item ">
                                <button type="button" className="nav-link " onClick={logoutforunits} aria-current="page">
                                            <i className={ `fa-solid fa-right-from-bracket me-2`}></i>
                                            Log Out</button>
                                    </li>

                        </ul>
                    <hr />

                </div>
            </div>
        
        </>);
}
export default Offcanvas;