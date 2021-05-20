import React from "react";
import { CartItem } from "../components";
import { Link } from "react-router-dom";
import Payment from "../components/Payment";

const Cart = ({
  totalPrice,
  cartItems,
  totalCount,
  onRemoveFromCart,
  onPlusCartItem,
  onMinusCartItem,
  onClearCart,
}) => {
  const addedProductCartItems = Object.keys(cartItems).map((key) => {
    return cartItems[key].items[0];
  });

  const [isOrderConfirmed, setOrderConfirm] = React.useState(false);
  const [isPaymentConfirmed, setConfirmPayment] = React.useState(false);

  const switchOrderConfirmation = () => {
    setOrderConfirm(!isOrderConfirmed);
  };
  const switchConfirmationPayment = () => {
    setConfirmPayment(!isPaymentConfirmed);
    onClearCart();
  };

  return (
    <section className="cart">
      <h1 className="cart__title title">Корзина</h1>
      {!isPaymentConfirmed ? (
        totalCount ? (
          <div className="cart__content">
            <ul className="cart-items">
              {addedProductCartItems &&
                addedProductCartItems.map((addedProductCartItem) => (
                  <CartItem
                    key={addedProductCartItem._id}
                    id={addedProductCartItem._id}
                    name={addedProductCartItem.name}
                    price={addedProductCartItem.price}
                    totalCount={
                      cartItems[addedProductCartItem._id].items.length
                    }
                    onRemoveFromCart={onRemoveFromCart}
                    onPlusCartItem={onPlusCartItem}
                    onMinusCartItem={onMinusCartItem}
                  />
                ))}
            </ul>
            <footer className="cart-summary">
              <h4 className="cart-summary__price">ИТОГ: ${totalPrice}</h4>
              <button
                className="cart-summary__confirm"
                onClick={switchOrderConfirmation}
              >
                {!isOrderConfirmed ? "Купить" : "Отмена"}
              </button>
            </footer>
            {isOrderConfirmed && (
              <Payment confirmPayment={switchConfirmationPayment} />
            )}
          </div>
        ) : (
          <p>
            К сожалению, ваша корзина пуста. Вернитесь на
            <Link to="/"> главную</Link>, чтобы пополнить корзину
          </p>
        )
      ) : (
        <p>
          Спасибо за заказ. Вернитесь на
          <Link to="/"> главную</Link>, чтобы сделать еще покупки
        </p>
      )}
    </section>
  );
};

export default Cart;
