import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { login } from "../actions/userActions";

const LoginScreen = ({ location, history }) => {
  // data for input fields and used to register user by submitHandler function triggered by
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  /* === Use useSelector function to get state.userLogin from store data created and updated beforehand by userReducer such as
   */
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  //
  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    // If there's already userInfo exists, then redirect page to the link stored in redirect variable
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  // send action to reducer
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    /* use Bootstrap :

    <FormContainer>
    <h1>...</h1>
        <Form>
        ...
        </Form>
    </FormContainer>

*/
    <FormContainer>
      <h1>Sign In</h1>
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}

      {/* When submitting this form, call submitHandler to send dispatch function to send action to reducer */}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary">
          Sign In
        </Button>
      </Form>

      <Row className="py-3">
        <Col>
          New Customer?{" "}
          <Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>
            Register
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginScreen;
