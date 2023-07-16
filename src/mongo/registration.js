import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Homepage from '../mycomponents/homepage';
import axios from 'axios';
const RegistrationForm = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("kii");
    // const userData = { name, password };

    try {
      // const response = await fetch('/register', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(userData),
      // });

      // if (response.ok) {
      //   alert('Registration successful!');
      //   setName('');
      //   setPassword('');
      // } else {
      //   alert('Registration failed. Please try again later.');
      // }
      console.log(name, password)
      await axios.post("http://localhost:8000/RegistrationForm", {
        name, password
      }).then(res => {
        if (res.data == "exist") {
          alert("user already exist");
        }
        else if (res.data == "not exist") {
          navigate("/Homepage");
        }
      }).catch(e => {
        console.log(e);
        alert("wrong details");
      })

    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
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

      <button type="submit">Register</button>
    </form>
  );
};

export default RegistrationForm;
