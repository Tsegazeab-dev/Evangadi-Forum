import React, { useContext } from "react";
import "./Header.css"
import { Link } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import "./Header.css";
import logo from '../../image/evangadi-logo-home.png'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container'
const Header = ({logout}) => {
  const [userData, setUserData] = useContext(UserContext);

  // const handleAuthentication = () => {
  //   if (userData) {
  //     
  //   }
  // };

  return (

    <div className="header">
    <Navbar collapseOnSelect expand="lg" bg="white" variant="light" >
    <Container>
      <Navbar.Brand >
        <Link to="/"> 
      <img
        className="nav__image"
        src={logo}
        alt=""
      />
      </Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
      
        <Nav className="me-auto mx-5 nav__bar">
          <Nav.Link href="#" className="navigate"><span >Home</span></Nav.Link>
          <Nav.Link href="#" className="navigate"><span className="nav__works">How it works </span ></Nav.Link>
          <span className="button">
          <Link to={!userData.user && "/login"} className="link">
          {userData.user ? (<button className="signInBtn" onClick={logout}>
              LogOut
            </button>
          ) : (
            <button className="signInBtn">SignIn</button>
           
          )}
           </Link></span>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  </div>
  );
};

export default Header;
