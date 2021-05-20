export const AddToCart = (product) => ({
  type: "ADD_PRODUCT_TO_CART",
  payload: {
    ...product,
  },
});
export const PlusCartItem = (id) => ({
  type: "PLUS_CART_ITEM",
  payload: id,
});
export const MinusCartItem = (id) => ({
  type: "MINUS_CART_ITEM",
  payload: id,
});
export const RemoveCartItem = (id) => ({
  type: "REMOVE_CART_ITEM",
  payload: id,
});
export const ClearCart = () => ({
  type: "CLEAR_CART",
});
