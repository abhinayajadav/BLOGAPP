import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userAuthorLoginThunk } from '../redux/slices/userAuthorSlice';

function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { loginUserStatus, currentUser } = useSelector(state => state.userAuthorLoginReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleForm = (formData) => {
    dispatch(userAuthorLoginThunk(formData));
  }

  useEffect(() => {
    if (loginUserStatus) {
      if (currentUser && currentUser.userType === "user") {
        navigate("/user-profile");
      } else if (currentUser && currentUser.userType === "author") {
        navigate("/author-profile");
      }
    }
  }, [loginUserStatus, currentUser, navigate]);

  return (
    <div className="container d-flex justify-content-center align-items-center mt-5 mb-5">
      <div className="card w-50 p-4">
        <form onSubmit={handleSubmit(handleForm)}>
          <h2 className="display-6 mt-3 text-center">Login Here!!</h2>

          <div className="form-group mb-3 text-start">
            <div>
              <label htmlFor="userType" className="form-label me-5">User Type</label>
              <input
                type="radio"
                id="author"
                value="author"
                className="form-check-input me-2"
                {...register('userType', { required: true })}
              />
              <label htmlFor="author" className="form-check-label me-4 text-danger">Author</label>
              <input
                type="radio"
                id="user"
                value="user"
                className="form-check-input me-2"
                {...register('userType', { required: true })}
              />
              <label htmlFor="user" className="form-check-label text-danger">User</label>
              {errors.userType && <p className="text-danger">User Type is required</p>}
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
            {errors.username && <p className="text-danger">Username is required and should be at least 4 characters long</p>}
          </div>

          <div className="form-group mb-3 text-start">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              id="password"
              className="form-control"
              {...register('password', { required: true, minLength: 4 })}
            />
            {errors.password && <p className="text-danger">Password is required and should be at least 4 characters long</p>}
          </div>

          <button type="submit" className="btn btn-success w-100">Login</button>
        </form>
        <p className="text-start mt-3 fs-4">If you are a new user, please <Link to="/register">register</Link> first!</p>
      </div>
    </div>
  );
}

export default Login;
