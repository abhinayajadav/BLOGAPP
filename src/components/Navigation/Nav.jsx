import React from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { resetState } from '../../redux/slices/userAuthorSlice';
import LogoutIcon from '@mui/icons-material/Logout';
import { FaHome } from "react-icons/fa";
import { MdAssignmentInd } from "react-icons/md";
import HowToRegIcon from '@mui/icons-material/HowToReg';
import HomeIcon from '@mui/icons-material/Home';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
function Nav() {
  const { loginUserStatus, currentUser } = useSelector(state => state.userAuthorLoginReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function signOut() {
    localStorage.removeItem('token');
    dispatch(resetState());
    navigate('/');
  }

  return (
    <ul className="nav justify-content-end mb-2  p-3 fs-4" style={{backgroundColor:"rgb(105, 174, 209)" }} >
      
      {!loginUserStatus ? (
        <>

          <li className="nav-item text-white">
            <Link className="nav-link text-white" to="">
            <HomeIcon className='me-2 fs-3' />
              Home
            </Link>
          </li>
          <li className="nav-item text-white">
            <Link className="nav-link text-white" to="register">
            <MdAssignmentInd className='me-2 fs-3'/>
              Sign-up
            </Link>
          </li>
          <li className="nav-item text-white">
            <Link className="nav-link text-white" to="login">
           
            <HowToRegIcon className='me-2 fs-3'/>
              Sign-In
            </Link>
          </li>
        </>
      ) : (
        <li className="nav-item d-flex align-items-center">
          <span className="mb-0 me-3 fs-4 text-white">
            <AccountBoxIcon className='me-2 fs-3'/>
            {currentUser.username} - {currentUser.userType}
          </span>
          <button className="btn btn-link nav-link text-white fs-5 p-2 me-2" onClick={signOut}>
          <LogoutIcon className='me-2 fs-3'/>
            Sign-Out
          </button>
        </li>
      )}
    </ul>
  );
}

export default Nav;
