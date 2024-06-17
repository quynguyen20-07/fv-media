import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/actions/authAction";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";
import Avatar from "../Avatar";

import {
  Message,
  Notifications,
  WbIncandescent,
  Person,
  ExitToApp,
  Home,
  Explore
} from "@material-ui/icons";
import NotifyModal from "../NotifyModal";

const Menu = () => {
  const linkPage = [
    { icon: <Home />, path: "/" },
    { icon: <Message />, path: "/message" },
    { icon: <Explore />, path: "/discover" },
  ];

  const { auth, theme, notify } = useSelector((state) => state);
  const dispatch = useDispatch();
  const { pathIcon } = useLocation();

  const isActive = (pi) => {
    if (pi === pathIcon) return "active";
  };

  return (
    <div className="menu" theme={ theme ? 'invert(1)' : 'invert(0)'}>
      <ul className="navbar-nav flex-row">
        {linkPage.map((link, index) => (
          <li className={`nav-item px-2 ${isActive(link.path)}`} key={index}>
            <Link className="nav-link" to={link.path}>
              <span>{link.icon}</span>
            </Link>
          </li>
        ))}

        <li className="nav-item dropdown" style={{ opacity: 1 }} >
          <span className="nav-link position-relative" id="navbarDropdown"
            role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <span style={{ color: notify.data.length > 0 ? 'crimson' : '' }}>
              <Notifications />
            </span>
            <span className="notify_length">{notify.data.length}</span>
          </span>
          <div className="dropdown-menu" aria-labelledby="navbarDropdown"
            style={{ transform: 'translateX(75px)' }}>
            <NotifyModal />
          </div>
        </li>


        <li className="nav-item dropdown" style={{ opacity: 1 }}>
          <span
            className="nav-link dropdown-toggle"
            id="navbarDropdown"
            type="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <Avatar src={auth.user.avatar} size="medium-avatar" />
          </span>
          <div className="dropdown-menu" aria-labelledby="navbarDropdown">
            <Link className="dropdown-item" to={`/profile/${auth.user._id}`}>
              <Person />
              Profile
            </Link>
            <label
              htmlFor="theme"
              className="dropdown-item"
              onClick={() =>
                dispatch({ type: GLOBALTYPES.THEME, payload: !theme })
              }
            >
              <WbIncandescent /> {theme ? "Light interface" : "Dark interface"}
            </label>
            <div className="dropdown-divider"></div>
            <Link
              className="dropdown-item"
              to="/"
              onClick={() => dispatch(logout())}
            >
              <ExitToApp />
              Logout
            </Link>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Menu;
