
import { useEffect } from 'react';
import { useContext } from 'react';
import profile from './homephotos/profile1.png';
import Offcanvas from './offcanvas';
import {  Link, Outlet, useNavigate } from "react-router-dom";
import { AppContext } from './passabiaddress';



function Registration() {
    const { finalcontract} = useContext(
        AppContext
    );

    const navigate = useNavigate();

    useEffect(() => {
       
            const onloaduseeffect = async () => {
                if (finalcontract) {
                let ascid = sessionStorage.getItem('ascid');
                console.log(ascid);
                if (ascid == 0) {
                    navigate("/Pagenotfound");
                }
            }
            onloaduseeffect();
        }
    }, [finalcontract]);

    const logout = () => {
        sessionStorage.setItem('ascid', '');
        var button = document.getElementById('close');
        button.click();
        navigate("/Loginasc");
    };


    return (<>
        <section className="navbar navbar-expand-lg bg-body-tertiary fixed-top" data-aos="fade-down">
            <div className="container-fluid" style={{ width: "100%" }}>
                < div className='d-flex flex-row mb-3'><button className="btn btn-white ms-2 me-2 mt-3" type="button" data-bs-toggle="offcanvas"
                    data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions">
                    <i className="fa-solid fa-bars  h3  "></i></button>
                    <h1 className="mt-2">Registration</h1>
                </div>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0 navfont">

                        <li className="nav-item">
                            <div className="d-flex" role="search">
                                {/* <button  onClick={regunit} ></button> */}
                                <Link className="btn btn-outline-success me-3" to="/Registration/Nestedunit">Units</Link>
                                <Link className="btn btn-outline-success me-3" to="/Registration/Nesteddivision">Divisions</Link>                            </div>
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
        <Offcanvas category={'asc'} activeno={4} />
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
                                <img className="bd-placeholder-img  mt-3 rounded-circle border-white" width="125" height="120" src={profile} />

                            </div>
                            <div className="ms-5 mt-3">
                                <h3 className=" mt-3 fw-normal">ASC ID-123123</h3>
                                <p>
                                    Contact Link :
                                    <br />


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


        <Outlet>

        </Outlet>


    </>
    );
}

export default Registration;
