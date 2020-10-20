import { Row, Col } from "react-bootstrap";
import React, {
  useEffect,
  // useState
} from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Product from "../components/Product";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Paginate from "../components/Paginate";
import ProductCarousel from "../components/ProductCarousel";
import Meta from "../components/Meta";
import { listProducts } from "../actions/productActions";
// import Axios from "axios";

const HomeScreen = ({ match }) => {
  const keyword = match.params.keyword;

  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();

  // 1)  Get state (productList) from productList reducer
  const productList = useSelector((state) => state.productList);
  // useSelector: https://react-redux.js.org/api/hooks#useselector
  // extract data from the Redux store state, using a selector function.
  // productList is the property name of productListReducer in store.js

  // Get current value from productList
  const { loading, error, products, page, pages } = productList;
  // import products from '../products' // products.js

  // const [products, setProducts] = useState([]); //

  useEffect(() => {
    // call dispatch() function whenever every time the page is being loaded
    // dispatch function sends action to store
    dispatch(listProducts(keyword, pageNumber));

    // // When use useState([]):
    // const fetchProducts = async () => {
    //   //const res = await Axios.get("/api/products");
    //   const {data} = await Axios.get("/api/products");
    //   res.data;
    // };
    //
    // setProducts(data)
  }, [dispatch, keyword, pageNumber]);

  return (
    <>
      <Meta />
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to="/" className="btn btn-light">
          Go Back
        </Link>
      )}
      <h1>Latest Products</h1>

      {/* check if there any true value in loading and error in current store created by the dispatch action  */}
      {loading ? (
        <Loader />
      ) : error ? (
        /* The error is from the backend */
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Row>
            {/* iterate all products data with <Col>  */}
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                {/* pass product data to component Product that contains Card components */}
                <Product product={product} />
              </Col>
            ))}
          </Row>

          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ""}
          />
        </>
      )}
    </>
  );
};

export default HomeScreen;
