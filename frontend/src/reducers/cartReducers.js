import {
  UPDATE_CART_ITEM_QTY,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
} from "../constants/cartConstants";

export const cartReducer = (
  state = { cartItems: [], shippingAddress: {} },
  action
) => {
  switch (action.type) {
    case UPDATE_CART_ITEM_QTY:
      const itemFromPayload = action.payload; // the payload the itemFromPayload being added

      // check if there's the same itemFromPayload has been added before
      const existedItem = state.cartItems.find(
        (iteratedItem) => iteratedItem.productId === itemFromPayload.productId
      );

      if (existedItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((iteratedItem) =>
            iteratedItem.productId === existedItem.productId
              ? itemFromPayload // if there's match, return the itemFromPayload as new item
              : iteratedItem
          ),
        };
      } else {
        return {
          ...state,
          // if doesn't exists, add to current state.cartItems
          cartItems: [...state.cartItems, itemFromPayload],
        };
      }

    /* The action from cartAction.js will send action:
        dispatch({
          type: CART_REMOVE_ITEM,
          payload: id,
        });
    */
    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (x) => x.productId !== action.payload
        ),
      };
    case CART_SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: action.payload,
      };
    case CART_SAVE_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: action.payload,
      };
    default:
      return state;
  }
};
