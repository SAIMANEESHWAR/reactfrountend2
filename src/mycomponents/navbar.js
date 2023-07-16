import react from 'react';
import profile from './homephotos/profile1.png';
import { useState } from 'react';

import { useContext } from 'react';

import { AppContext } from './passabiaddress';




const Navbar = (props) => {
    const { title, modaltitle } = props;
    //in navbar i am seatting the searchbar and then sending it to all the units components
    const { searchbar,setsearchbar} = useContext(
        AppContext
      );
    const [searchQuery, setSearchQuery] = useState('');
   
    setsearchbar(searchQuery);
  console.log("navbar",sessionStorage.getItem('searchQuery'));
    return(<>
        <section className="navbar navbar-expand-lg bg-body-tertiary fixed-top" >
                <div className="container-fluid" style={{ width: "100%" }}>

                <div className='d-flex flex-row mb-3'><button className="btn btn-white ms-2 me-2 mt-3" type="button" data-bs-toggle="offcanvas"
                        data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions"><i
                            className="fa-solid fa-bars  h3  "></i></button>
                        <h2 className="mt-3" >{title}</h2>
                    </div>
                    
                    <div className='d-flex flex-row justify-content-end'>
                   
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                        aria-label="Toggle navigation">
                       <i class="fa-solid fa-magnifying-glass"></i>
                    </button>
                    </div>

   
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0 navfont">

                            <li className="nav-item">
                                <form className="d-flex" role="search">
                                    <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                                    <button type="button" className="btn"   data-bs-toggle="modal" data-bs-target={modaltitle}>
                            <div className="profile-23">
                                        <a><img src={profile} alt="" /></a>
                                    </div>
                                </button>
                                </form>
                            </li>
                           


                            <li className="nav-item">
                            

                                
                            </li>
                        </ul>
                    </div>
                </div>
            </section>
        
        </>);
}
export default Navbar;