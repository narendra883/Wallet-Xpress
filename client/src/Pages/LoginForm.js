import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as Yup from 'yup';
import './Register.css'

const LoginForm = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    email: '',
    password: '',
  });
  const { email, password } = inputValue;

  const schema = Yup.object().shape({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue((prevInputValue) => ({
      ...prevInputValue,
      [name]: value,
    }));
  };

  const handleError = (err) =>
    toast.error(err, {
      position: 'bottom-left',
    });

  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: 'bottom-right',
    });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await schema.validate(inputValue, { abortEarly: false });

      const { data } = await axios.post('http://localhost:5000/login', inputValue, {
        withCredentials: true,
      });

      const { success, message } = data;

      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate('/');
        }, 1000);
      } else {
        handleError(message);
      }
    } catch (error) {
      if (error.name === 'ValidationError') {
        error.errors.forEach((errMsg) => handleError(errMsg));
      } else {
        console.error(error);
      }
    }
  };

  return (
    <div className="container">
      <div className="register-container">
        <h2 className="title">Login</h2>
        <form onSubmit={handleSubmit} className="form">
          <label htmlFor="email" className="label">
            Email:
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleOnChange}
              className="input"
            />
          </label>
          <br />
          <label htmlFor="password" className="label">
            Password:
            <input
              type="password"
              name="password"
              value={password}
              onChange={handleOnChange}
              className="input"
            />
          </label>
          <br />
          <button type="submit" className="button">
            Login
          </button>
          <p className="login-link">
            Have an account? <Link to="/register">Signup</Link>
          </p>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default LoginForm;
