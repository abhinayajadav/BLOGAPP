//authorprofile
import { NavLink, Outlet } from "react-router-dom";
import {useSelector} from 'react-redux';


function AuthorProfile() {
  let {currentUser}=useSelector(state=>state.userAuthorLoginReducer)
 
  return (
    <div className="author-profile p-3 ">
      <ul className="nav  justify-content-around fs-3">
        <li className="nav-item">
          <NavLink
            className="nav-link bg-info rounded"
            to={`articles-by-author/${currentUser.username}`}
            style={{ color: "var(--dark-green)" }}
          >
            Articles
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            className="nav-link bg-success rounded"
            to="new-article"
            style={{ color: "var(--dark-green)" }}
          >
            Add new
          </NavLink>
        </li>
      </ul>
      <Outlet />
    </div>
  );
}

export default AuthorProfile;