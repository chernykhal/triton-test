const getTotalPrice = (arr) => arr.reduce((sum, obj) => obj.price + sum, 0);

const _get = (obj, path) => {
  const [firstKey, ...keys] = path.split(".");
  return keys.reduce((val, key) => {
    return val[key];
  }, obj[firstKey]);
};

const getTotalSum = (obj, path) => {
  return Object.values(obj).reduce((sum, obj) => {
    const value = _get(obj, path);
    return sum + value;
  }, 0);
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_PRODUCT_TO_CART": {
      const currentProducts = !state.items[action.payload._id]
        ? [action.payload]
        : [...state.items[action.payload._id].items, action.payload];
      const newProducts = {
        ...state.items,
        [action.payload._id]: {
          items: currentProducts,
          totalPrice: getTotalPrice(currentProducts),
        },
      };
      const totalCount = getTotalSum(newProducts, "items.length");
      const totalPrice = getTotalSum(newProducts, "totalPrice");
      return {
        ...state,
        items: newProducts,
        totalCount,
        totalPrice,
      };
    }
    case "REMOVE_CART_ITEM": {
      const newCartItems = {
        ...state.items,
      };
      const currentTotalPrice = newCartItems[action.payload].totalPrice;
      const currentTotalCount = newCartItems[action.payload].items.length;
      delete newCartItems[action.payload];
      return {
        ...state,
        items: newCartItems,
        totalPrice: state.totalPrice - currentTotalPrice,
        totalCount: state.totalCount - currentTotalCount,
      };
    }
    case "PLUS_CART_ITEM": {
      const allPlusItems = [
        ...state.items[action.payload].items,
        state.items[action.payload].items[0],
      ];
      const newItems = {
        ...state.items,
        [action.payload]: {
          items: allPlusItems,
          totalPrice: getTotalPrice(allPlusItems),
        },
      };
      const totalCount = getTotalSum(newItems, "items.length");
      const totalPrice = getTotalSum(newItems, "totalPrice");

      return {
        ...state,
        items: newItems,
        totalCount,
        totalPrice,
      };
    }
    case "MINUS_CART_ITEM": {
      const oldItems = state.items[action.payload].items;
      const allMinusItems =
        oldItems.length > 1
          ? [...state.items[action.payload].items].slice(1)
          : oldItems;

      const newItems = {
        ...state.items,
        [action.payload]: {
          items: allMinusItems,
          totalPrice: getTotalPrice(allMinusItems),
        },
      };
      const totalCount = getTotalSum(newItems, "items.length");
      const totalPrice = getTotalSum(newItems, "totalPrice");
      return {
        ...state,
        items: newItems,
        totalCount,
        totalPrice,
      };
    }
    case "CLEAR_CART": {
      return {
        totalPrice: 0,
        totalCount: 0,
        items: {},
      };
    }
    default:
      throw new Error();
  }
};
export default cartReducer;
