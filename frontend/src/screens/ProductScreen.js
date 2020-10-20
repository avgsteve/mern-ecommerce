import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
} from "react-bootstrap";
import Rating from "../components/Rating";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Meta from "../components/Meta";
import {
  listProductDetails,
  createProductReview,
} from "../actions/productActions";
import { PRODUCT_CREATE_REVIEW_RESET } from "../constants/productConstants";

const ProductScreen = ({
  history,
  match, // comes from :id params in <Route path='/products/:id'> in App.js
}) => {
  const [qty, setQty] = useState(1); // 1 is default stock value (as qty)
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const {
    success: successProductReview,
    error: errorProductReview,
  } = productReviewCreate;

  // const [products, setProducts] = useState([]); //

  useEffect(() => {
    if (successProductReview) {
      alert("Review Submitted!");
      setRating(0);
      setComment("");
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }

    // listProductDetails is the action gets data with axios and backend and will be dispatched to store
    dispatch(listProductDetails(match.params.id));

    // // When use useState([]):
    // const fetchProducts = async () => {
    //   //const res = await Axios.get(`/api/products/${match.params.id}`);
    //   const {data} = await Axios.get("/api/products");
    //   res.data;
    // };
    //
    // setProducts(data)
  }, [dispatch, match, successProductReview]);

  const addToCartHandler = () => {
    // qty comes from [qty, setQty] = useState(1)
    history.push(`/cart/${match.params.id}?qty=${qty}`);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createProductReview(match.params.id, {
        rating,
        comment,
      })
    );
  };

  return (
    // <> is Fragment
    <>
      <Link className="btn btn-light my-3" to="/">
        Go Back
      </Link>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          {/* Main product detil */}
          <Meta title={product.name} />
          <Row>
            {/* ==== <Col md={6}> for image take 50% of container width */}
            <Col md={6}>
              {/* ==== Image column. Need to use fluid attr to mnake image responsive 
            options for image:
            https://react-bootstrap.github.io/components/images/
            https://react-bootstrap.github.io/components/images/#image-fluid
            */}
              <Image src={product.image} alt={product.name} fluid />
            </Col>

            {/* ==== <Col md={3}> for image take 25% of container width to show product detail */}
            <Col md={3}>
              {/*  <ListGroup variant="flush">
              doesn't have border outside the list group
               https://react-bootstrap.github.io/components/list-group/#flush  */}
              <ListGroup variant="flush">
                {/*  */}
                <ListGroup.Item>
                  <h3>{product.name}</h3>
                </ListGroup.Item>
                {/*  */}
                <ListGroup.Item>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                  />
                </ListGroup.Item>
                {/*  */}
                <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
                {/*  */}
                <ListGroup.Item>
                  Description: {product.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>

            {/* Bootstrap Card Component for shopping card detail
            
              */}
            <Col md={3}>
              {/*  */}

              <Card>
                {/*  */}
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    {/* Inside this list item for PRICE, there's one row that has two column */}
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>${product.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        {product.countInStock > 0 ? "In Stock" : "Out Of Stock"}
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  {/* === Select option as stock quantities === */}
                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Qty</Col>
                        <Col>
                          {/* 
                          1:qty is from const [qty, setQty] = useState(1) 
                          2:https://react-bootstrap.github.io/components/forms/#forms-controls
                           */}
                          <Form.Control
                            as="select"
                            style={{ width: "unset" }}
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                          >
                            {/*
                            use product stock qty to render options
                            like product.countInStock is 6, then use
                             Array(product.countInStock) to create an Array which its length is
                            [1,2,3,4,5,6] */}
                            {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}

                  <ListGroup.Item>
                    <Button
                      onClick={addToCartHandler}
                      className="btn-block"
                      type="button"
                      // disabled if product.countInStock === 0
                      disabled={product.countInStock === 0}
                    >
                      Add To Cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>

          {/* ==== ROW for REVIEW  */}
          <Row>
            <Col md={6}>
              <h2>Reviews</h2>

              {/* ==== CHECK AND RENDER REVIEW  */}
              {product.reviews.length === 0 && <Message>No Reviews</Message>}
              {/*  */}
              <ListGroup variant="flush">
                {product.reviews.map((review) => (
                  //
                  //Iterated review item
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}
                {/* Adding a review */}
                <ListGroup.Item>
                  <h2>Write a Customer Review</h2>
                  {errorProductReview && (
                    <Message variant="danger">{errorProductReview}</Message>
                  )}
                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group controlId="rating">
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                          as="select"
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value="">Select...</option>
                          <option value="1">1 - Poor</option>
                          <option value="2">2 - Fair</option>
                          <option value="3">3 - Good</option>
                          <option value="4">4 - Very Good</option>
                          <option value="5">5 - Excellent</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId="comment">
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          as="textarea"
                          row="3"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Button type="submit" variant="primary">
                        Submit
                      </Button>
                    </Form>
                  ) : (
                    <Message>
                      Please <Link to="/login">sign in</Link> to write a review{" "}
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default ProductScreen;
