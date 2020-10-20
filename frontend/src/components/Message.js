import React from "react";
import { Alert } from "react-bootstrap";

// https://react-bootstrap.github.io/components/alerts/

// variant :  https://react-bootstrap.github.io/components/alerts/#additional-content

// children is the child element as "text"
// like <Message variant="danger">{error}</Message>)
// {error} will map to {child} variable...
const Message = ({ variant, children }) => {
  return <Alert variant={variant}>{children}</Alert>;
};

Message.defaultProps = {
  variant: "info",
};

// https://reactjs.org/docs/typechecking-with-proptypes.html#default-prop-values

export default Message;
