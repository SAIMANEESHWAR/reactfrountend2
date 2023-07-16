import React, { useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Homepage from '../mycomponents/homepage';
import axios from 'axios';

const LoginForm = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
const navigate=useNavigate();
  const submitt = async (e) => {
    e.preventDefault();

   
console.log("ji");
    try {
      // const response = await fetch('/login', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(userData),
      // });

      // if (response.ok) {
      //   alert('Login successful!');
      //   setName('');
      //   setPassword('');
      // } else {
      //   alert('Login failed. Please try again.');
      // }
      await axios.post("http://localhost:8000/",{
        name,password
      }).then(res=>{
        if(res.data=="exist"){
          navigate("/Homepage");
        }
        else if(res.data=="not exist"){
          alert("user not not login");
        }
      }).catch(e=>{
        console.log(e);
        alert("wrong details");
      })


    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form action="POST" >
      <label htmlFor="name">Name:</label>
      <input
        type="text"
        id="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <label htmlFor="password">Password:</label>
      <input
        type="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <button type="submit" onClick={submitt}>Login</button>
    </form>
  );
};

export default LoginForm;
