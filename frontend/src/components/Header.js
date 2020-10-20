import React from "react";
import { Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import SearchBox from "./SearchBox";
import { logout } from "../actions/userActions";

const Header = () => {
  // get userInfo from store with useSelector
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const dispatch = useDispatch();
  const logoutHandler = () => {
    /*  dispatch logout action imported from userActions.js to 

  localStorage.removeItem("userInfo");

  // reset user state in userReducers:
  // state = { user: {} } by returning {}
  dispatch({ type: USER_LOGOUT });
  dispatch({ type: USER_DETAILS_RESET });
  dispatch({ type: ORDER_LIST_MY_RESET });

  // reset order state in orderReducers:
  // state = { orders: []}
  dispatch({ type: USER_LIST_RESET });   */
    dispatch(logout());
  };

  return (
    <header>
      {/* https://react-bootstrap.github.io/components/navbar/#navbars-mobile-friendly */}

      {/* https://bootswatch.com/darkly/ */}

      {/* https://react-bootstrap.github.io/components/navbar/#navbar-props */}

      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        {/* all items go into <Container>  */}
        <Container>
          {/* use <LinkContainer to='/'>
             instead of  <Navbar.Brand href='/'> */}
          <LinkContainer to="/">
            <Navbar.Brand>ProShop</Navbar.Brand>
          </LinkContainer>

          {/* toggle for mobile navbar  */}
          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          <Navbar.Collapse id="basic-navbar-nav">
            <Route render={({ history }) => <SearchBox history={history} />} />

            <Nav className="ml-auto">
              {/* cart links  */}
              <LinkContainer to="/cart">
                <Nav.Link>
                  <i className="fas fa-shopping-cart"></i> Cart
                </Nav.Link>
              </LinkContainer>

              {/* user profile links  */}
              {
                // if userInfo is true, means there is already user data in store (as state.userLogin)
                userInfo ? (
                  <NavDropdown title={userInfo.name} id="username">
                    {/*  */}
                    <LinkContainer to="/profile">
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                    </LinkContainer>

                    {/* Send logout action */}
                    <NavDropdown.Item onClick={logoutHandler}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                ) : (
                  <LinkContainer to="/login">
                    <Nav.Link>
                      <i className="fas fa-user"></i> Sign In
                    </Nav.Link>
                  </LinkContainer>
                )
              }

              {/* admin links  */}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title="Admin" id="adminmenu">
                  <LinkContainer to="/admin/userlist">
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/productlist">
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/orderlist">
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
