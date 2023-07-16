import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';


import EmailForm from './email/emailform';
import Homepage from './mycomponents/homepage';
import Loginunits from './mycomponents/loginunits';
import './Dash.css';
import Unitorder from './mycomponents/units';
// import AppProvider from './mycomponents/passabiaddress';
import Unitoldreq from './mycomponents/unitsoldreq';
// import Usereducer from './components2/usereducer';
import Divnewreq from './mycomponents/divnewreq';
// import MyComponent from './components2/dangerbutton';
import Diveachnewreq from './mycomponents/diveachnewreq';
import Divaccreq from './mycomponents/divaccreq';
import Logindiv from './mycomponents/logindiv';
import Loginasc from './mycomponents/loginasc';
import Aschomearr from './mycomponents/aschomearr';
import Ascaccepted from './mycomponents/ascaccepted';
import Ascforward from './mycomponents/ascforward';
import Divascreq from './mycomponents/divascreq';
import Divascpublished from './mycomponents/divascpublished';
import Unitnewreq from './mycomponents/unitnewreq';
import Unitotherdiv from './mycomponents/unitotherdiv';
import Unitaccreq from './mycomponents/unitaccreq';
import Manufacturer from './mycomponents/Manifacturer';
import Registration from './mycomponents/ascregister';
import Nestedunit from './mycomponents/nestedunit';
import Nesteddivision from './mycomponents/nesteddiv';
import Pagenotfound from './mycomponents/pagenotfound';
import Transaction from './mycomponents/unittransacton';
import Divtransaction from './mycomponents/divtransaction';
import Asctransaction from './mycomponents/asctransaction';





// import LoginForm from './mongo/logingpt';
// import RegistrationForm from './mongo/registration';
// import Dashboard from './pages/dashboard/Dashboard';
// import Login from './pages/login/Login';
// import Header1 from './pages/Header1';
// import Body from './pages/Body';
// import Footer from './pages/footer';
// import Units2 from './components/Units2';
// import Units from './components/Units';
// import Props from './components2/props';
// import Props2 from './components2/props2';
function App() {


  return (


    <BrowserRouter>
      <Routes>

        {/* <Route path='/' element={<Units2 />}>
            <Route path='/Units' element={<Units/>}/>
        </Route> */}
        {/* <Route path='/'  element={<Props />}></Route>
        <Route path='/Props2'  element={<Props2 />}></Route> */}
        {/* <Route path='/Usereducer'  element={<Usereducer />}></Route> */}
        {/* <Route path='/MyComponent'  element={<MyComponent />}></Route> */}

        {/* <Route path='/'  element={<LoginForm />}></Route>
        <Route path='/RegistrationForm'  element={<RegistrationForm />}></Route>
      */}

        <Route path='/' element={<Loginunits />}></Route>
        {/* <Route path='/' element={<Homepage />}></Route> */}
        <Route path='/Unitorder' element={<Unitorder />}></Route>
        <Route path='/Unitoldreq' element={<Unitoldreq />}></Route>
        <Route path='/Divnewreq' element={<Divnewreq />}></Route>
        <Route path='Divnewreq/Diveachnewreq' element={<Diveachnewreq />}></Route>
        <Route path='/Divaccreq' element={<Divaccreq />}></Route>
        <Route path='/Logindiv' element={<Logindiv />}></Route>
        <Route path='/Loginasc' element={<Loginasc />}></Route>
        <Route path='/Aschomearr' element={<Aschomearr />}></Route>
        <Route path='/Ascaccepted' element={<Ascaccepted />}></Route>
        <Route path='/Ascforward' element={<Ascforward />}></Route>
        <Route path='/Divascreq' element={<Divascreq />}></Route>
        <Route path='/Divascpublished' element={<Divascpublished />}></Route>
        <Route path='/Unitnewreq' element={<Unitnewreq />}></Route>
        <Route path='/Unitotherdiv' element={<Unitotherdiv />}></Route>
        <Route path='/Unitaccreq' element={<Unitaccreq />}></Route>
        <Route path='/Manifacturer' element={<Manufacturer />}></Route>
        <Route path='/Registration' element={<Registration />}>
            <Route path="Nesteddivision" element={<Nesteddivision />} />
            <Route path="Nestedunit" element={<Nestedunit />} />
        </Route>
        <Route path='/Pagenotfound' element={<Pagenotfound />}></Route>
        <Route path='/Transaction' element={<Transaction />}></Route>
        <Route path='/Divtransaction' element={<Divtransaction />}></Route>
        <Route path='/Asctransaction' element={<Asctransaction />}></Route>
      

      {/* email */}
      
      <Route path='/EmailForm' element={<EmailForm />}></Route>


      </Routes>

    </BrowserRouter>

  );
}

export default App;




