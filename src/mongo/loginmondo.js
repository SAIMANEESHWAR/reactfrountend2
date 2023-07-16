// mongodb login

import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import context from '../Components/Context';
import axios from "axios";
import Homepage from '../mycomponents/homepage';
// import placeholderImage from '../Components/img/processflow.jpeg';

const MongoLogin = () => {
    const [item, setItem] = useState([]);
    const [userInput, setUserInput] = useState('');
    const [password, setPassword] = useState('');
    // const [loginError, setLoginError] = useState('');
    const navigate = useNavigate();
  
    // const contract = useContext(context);
  
    const handleInputChange = (e) => {
      setUserInput(e.target.value);
    };
  
    const handlePasswordChange = (e) => {
      setPassword(e.target.value);
    };

    useEffect(() => {
        axios.get("http://localhost:5000/getregister").then((arr) => {
          setItem(arr.data);
          console.log(arr.data);
        });
        
    }, []);
  
    const handleSubmit = async (e) => {
        e.preventDefault();
        let flag = 0;
        
        for (let i = 0; i < item.length; i++) {
            if (userInput === item[i].name && password === item[i].password) {
             
              flag = 1;
              navigate('/Homepage');
              break;
            }
          }
          if (flag === 0) {
            alert(
              "OOPS ! nouser found , check the details correctly "
            );
          }
    };

return (
  <section className="vh-100 login-section">
    <div className="container">
      
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card login-card">
            <div className="card-body">
              <h3 className="card-title text-center">Login</h3>
              <form method='POST' onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="user_id">User ID</label>
                  <input
                    type="text"
                    className="form-control"
                    id="user_id"
                    placeholder="Enter User ID here"
                    value={userInput}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="inputPassword">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="inputPassword"
                    placeholder="Password"
                    value={password}
                    onChange={handlePasswordChange}
                  />
                </div>
                <button className="btn btn-primary btn-login" type="submit">
                  Login
                </button>
                {/* <div className="login-error">{loginError}</div> */}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);
};

export default MongoLogin;