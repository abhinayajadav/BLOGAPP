import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Register() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [err, setErr] = useState('');

  async function handleForm(userObj) {
    try {
      const endpoint = userObj.userType === 'author' ? 'http://localhost:4000/author-api/author' : 'http://localhost:4000/user-api/user';

      const response = await axios.post(endpoint, userObj);
      const result = response.data;
      console.log(result);

      if (result.message === "User created" || result.message === "Author created") {
        console.log(`${userObj.userType} created`);
        navigate('/login'); // Navigate to login page after successful registration
      } else {
        setErr(result.message);
      }
    } catch (error) {
      console.error('Error during registration:', error);
      setErr('An error occurred during registration');
    }
  }

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100" >
      <div className="card w-50 p-4 shadow rounded ">
        {err && <p className='text-info fs-3'>{err}</p>}
        <form onSubmit={handleSubmit(handleForm)}>
          <h2 className="display-7 mt-2 text-center mb-3">Register Now!!</h2>

          <div className="form-group mb-3 text-start">
            <div>
              <label htmlFor="userType" className="form-label me-5">Role</label>
              <input
                type="radio"
                id="author"
                value="author"
                className="form-check-input me-2"
                {...register('userType', { required: true })}
              />
              <label htmlFor="author" className="form-check-label me-4">Author</label>
              <input
                type="radio"
                id="user"
                value="user"
                className="form-check-input me-2"
                {...register('userType', { required: true })}
              />
              <label htmlFor="user" className="form-check-label">User</label>
            </div>
          </div>

          <div className="form-group mb-3 text-start">
            <label htmlFor="username" className="form-label">Username</label>
            <input
              type="text"
              id="username"
              className="form-control"
              {...register('username', { required: true, minLength: 4 })}
            />
            {errors.username && errors.username.type === "required" && <p className='text-danger'>Username is required</p>}
            {errors.username && errors.username.type === "minLength" && <p className='text-danger'>Username should be at least 4 characters long</p>}
          </div>

          <div className="form-group mb-3 text-start">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              id="password"
              className="form-control"
              {...register('password', { required: true, minLength: 4 })}
            />
            {errors.password && errors.password.type === "required" && <p className='text-danger'>Password is required</p>}
            {errors.password && errors.password.type === "minLength" && <p className='text-danger'>Password should be at least 4 characters long</p>}
          </div>

          <div className="form-group mb-3 text-start">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              id="email"
              className="form-control"
              {...register('email', { required: true, minLength: 4 })}
            />
            {errors.email && errors.email.type === "required" && <p className='text-danger'>Email is required</p>}
            {errors.email && errors.email.type === "minLength" && <p className='text-danger'>Email should be at least 4 characters long</p>}
          </div>

          <button type="submit" className="btn btn-success w-100">Sign-In</button>
        </form>
        <p className="lead text-start mt-3">Already have an account? <Link to="/login">Login</Link></p>
        <p className="lead text-start mt-1">Back to Home? <Link to="/">Home</Link></p>
      </div>
    </div>
  );
}

export default Register;
