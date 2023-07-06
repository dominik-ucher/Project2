import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Logo from '../../img/logo.png'
import { AuthContext } from '../../context/authContext'
'use client';
import { Button, Label, TextInput } from 'flowbite-react';

const Login = () => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  const [err, setError] = useState(null);

  const navigate = useNavigate();

  const { login } = useContext(AuthContext);


  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(inputs)
      navigate("/");
    } catch (err) {
      setError(err.response.data);
    }
  };


  return (
    <div className="flex justify-center items-center h-screen">
    <div className="bg-gray-200 p-6 rounded-md shadow-md">
    <div className='flex items-center justify-center'><img src={Logo} alt="" className='w-35 h-20 mr-4'/></div>
    <h2 className="flex justify-center items-center text-2xl font-bold mb-4">Log In</h2>
    <form className="flex max-w-md flex-col gap-4">
    <div>
        <div className="mb-2 block">
          <Label
            htmlFor="name1"
            value="Your name"
          />
        </div>
        <TextInput
          id="username"
          placeholder="name"
          required
          type="text"
          name="username"
          onChange={handleChange}
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label
            htmlFor="password1"
            value="Your password"
          />
        </div>
        <TextInput
          id="password1"
          required
          type="password"
          name="password"
          onChange={handleChange}
        />
      </div>
      <Button type="submit" onClick={handleSubmit} >
        Log in
      </Button>
      {err && <p>{err}</p>}
      <h2>Don't you have an account?</h2> 
      <h2>Use the <Link to="/contact">contact form to sign up!</Link></h2>
    </form>
    </div>
    </div>
  );
};

export default Login;
