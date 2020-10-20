import axios from "axios";
import {
  UPDATE_CART_ITEM_QTY,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
} from "../constants/cartConstants";

//used in useEffect in CartScreen.js to send action with dispatch
export const updateCartItemQty = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/products/${id}`);

  //use data from backend to add new item obj to state let cart Component to access the data later
  dispatch({
    type: UPDATE_CART_ITEM_QTY,
    payload: {
      productId: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty, // the qty from select option
    },
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

//
// === REMOVE ITEM FROM CART ===
// Dispatching action with dispatch(removeFromCart(id)) function in CartScreen.js to cartReducer
export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id,
  });

  // After the action is send to reducer and the state.cartItems is update, get updated state.cartItems to overwrite the localStorage item with same name "cartItems"
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const saveShippingAddress = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_SHIPPING_ADDRESS,
    payload: data,
  });

  localStorage.setItem("shippingAddress", JSON.stringify(data));
};

export const savePaymentMethod = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_PAYMENT_METHOD,
    payload: data,
  });

  localStorage.setItem("paymentMethod", JSON.stringify(data));
};
