import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Logo from '../../images/logoHome.png'

import Search from "./SearchBar";
import Menu from "./Menu";

const Navbar = () => {
  const { theme } = useSelector(state => state);
  return (
    <div className="header bg-light" theme={theme ? 'invert(1)' : 'invert(0)'}>
      <nav className="navbar navbar-expand-lg navbar-light bg-light justify-content-between align-middle">
        <Link to="/" className="logo">
          <img src={Logo} alt='logo' className="logo-Image" />
          <h2
            className="navbar-brand text-uppercase m-0 p-0"
            onClick={() => window.scrollTo({ top: 0 })}
          >
            FOOD VIEW
          </h2>

        </Link>
        <Search theme={theme}/>
        <Menu />
      </nav>
    </div>
  );
};
export default Navbar;
