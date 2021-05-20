import React from "react";
import { Route, Switch } from "react-router-dom";
import axios from "axios";

import { Header } from "./components";
import { Cart, Home } from "./pages";

import cartReducer from "./reducers/CartReducer";
import {
  AddToCart,
  MinusCartItem,
  PlusCartItem,
  RemoveCartItem,
  ClearCart,
} from "./actions/CartActions";

import "./scss/app.scss";

const App = () => {
  const initialState = {
    items: {},
    totalPrice: 0,
    totalCount: 0,
  };

  const onAddToCart = (product) => {
    dispatch(AddToCart(product));
  };
  const onPlusCartItem = (id) => {
    dispatch(PlusCartItem(id));
  };
  const onMinusCartItem = (id) => {
    dispatch(MinusCartItem(id));
  };
  const onRemoveCartItem = (id) => {
    dispatch(RemoveCartItem(id));
  };
  const onClearCart = () => {
    dispatch(ClearCart());
  };

  const [cart, dispatch] = React.useReducer(cartReducer, initialState);
  const [products, setProducts] = React.useState(null);

  React.useEffect(() => {
    axios.get("/generated.json").then(({ data }) => {
      setProducts(data);
    });
  }, []);

  return (
    <React.Fragment>
      <Header totalCount={cart.totalCount} />
      <main className="main">
        <Switch>
          <Route path="/" exact>
            <Home onAddToCart={onAddToCart} products={products} />
          </Route>
          <Route path="/cart" exact>
            <Cart
              totalPrice={cart.totalPrice}
              cartItems={cart.items}
              totalCount={cart.totalCount}
              onRemoveFromCart={onRemoveCartItem}
              onPlusCartItem={onPlusCartItem}
              onMinusCartItem={onMinusCartItem}
              onClearCart={onClearCart}
            />
          </Route>
        </Switch>
      </main>
    </React.Fragment>
  );
};

export default App;
