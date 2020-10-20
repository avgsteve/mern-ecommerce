import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from "react-bootstrap";
import Message from "../components/Message";
//
// MAIN FUNCIONALITY OF CartScreen.js
import { updateCartItemQty, removeFromCart } from "../actions/cartActions";

const CartScreen = ({ match, location, history }) => {
  const productId = match.params.id;

  // location.search is the query string like ?qty=1
  const qty = location.search ? Number(location.search.split("=")[1]) : 1;

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart); // get current cart object from state
  const { cartItems } = cart;

  useEffect(() => {
    if (productId) {
      // if the URL has query string like ?qty=1, there will be value assign to variable productId at line 17
      dispatch(updateCartItemQty(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
    console.log(
      `product removed from cart:`,
      cartItems.filter((item) => item.productId === id)
    );
  };

  const checkoutHandler = () => {
    history.push("/login?redirect=shipping"); // forward page to login page. If user has logged in, redirect to shipping page
  };

  return (
    <Row>
      {/* ==== Column: main screen ==== */}
      <Col md={8}>
        <h1>Shopping Cart</h1>

        {
          //carItems is the from the cart obj pull out from state
          cartItems.length === 0 ? (
            <Message>
              Your cart is empty
              <Link to="/">Go Back</Link>
            </Message>
          ) : (
            //if card is not empty, then use the ListGroup Component
            <ListGroup variant="flush">
              {cartItems.map((item) => (
                //render each item data with the <<ListGroup.Item>
                //each item has the property fetched by updateCartItemQty() (in cartActions.js) from backend
                <ListGroup.Item key={item.productId}>
                  <Row>
                    {/* === column ===*/}

                    <Col md={2}>
                      <Image src={item.image} alt={item.name} fluid rounded />
                    </Col>
                    {/* === column ===*/}

                    <Col md={3}>
                      <Link to={`/product/${item.productId}`}>{item.name}</Link>
                    </Col>
                    {/* === column ===*/}

                    <Col md={2}>${item.price}</Col>

                    {/* === The column showing the cart item's qty ===*/}

                    <Col md={2}>
                      <Form.Control
                        as="select"
                        value={item.qty}
                        onChange={(e) =>
                          dispatch(
                            updateCartItemQty(
                              item.productId,
                              Number(e.target.value)
                            )
                          )
                        }
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                    {/* === column for REMOVING item===*/}

                    <Col md={2}>
                      <Button
                        type="button"
                        variant="light"
                        onClick={() => removeFromCartHandler(item.productId)}
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )
        }
      </Col>

      {/* ==== Column: product price, and qty ==== */}

      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              {/* Showing how many items by accmulating the .qty value from each item  */}
              <h2>
                Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                items
              </h2>
              {/* Showing each item's total price (qty times price). Then reduce all items total price to a subtotal  */}
              $
              {
                cartItems
                  .reduce((acc, item) => acc + item.qty * item.price, 0)
                  .toFixed(2)
                // keep two decimal
              }
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type="button"
                className="btn-block"
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
              >
                Proceed To Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default CartScreen;
