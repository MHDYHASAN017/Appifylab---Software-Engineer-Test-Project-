import React from "react";
import "./header.css";
import { Container, Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../Redux/Actions/userActions";


const Header = () => {
  const userRed = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const { isAuth, user } = userRed;
  // console.log(userRed);

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <div className="container-fluid">
      <Navbar expand="md" variant="dark" className="p-0">
        <Container fluid={true} className="header__bg m-0">
          <NavLink
            to="/"
            className="logo__container lg:text-4xl md:text-3xl text-4xl"
          >
            AppifyQuiz
          </NavLink>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "active_link nav-link link" : "nav-link link"
                }
              >
                Home
              </NavLink>
              {isAuth === false ? (
                <>
                  {" "}
                  <NavLink
                    to="/login"
                    className={({ isActive }) =>
                      isActive ? "active_link nav-link link" : "nav-link link"
                    }
                  >
                    <span>Login</span>
                  </NavLink>
                  <NavLink
                    to="/register"
                    className={({ isActive }) =>
                      isActive ? "active_link nav-link link" : "nav-link link"
                    }
                  >
                    <span>Register</span>
                  </NavLink>
                </>
              ) : (
                <>
                  {user.isAdmin && (
                    <NavLink
                      to="/admin"
                      className={({ isActive }) =>
                        isActive ? "active_link nav-link link" : "nav-link link"
                      }
                    >
                      <span>Admin</span>
                    </NavLink>
                  )}
                  <NavLink
                    to="/profile"
                    className={({ isActive }) =>
                      isActive ? "active_link nav-link link" : "nav-link link"
                    }
                  >
                    <span>Profile</span>
                  </NavLink>
                  <NavLink
                    to="/login"
                    className={({ isActive }) =>
                      isActive ? "active_link nav-link link" : "nav-link link"
                    }
                    onClick={() => logoutHandler()}
                  >
                    <span>Logout</span>
                  </NavLink>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
