import React from "react";

const ProductCard = ({ product, onAddToCart }) => {
  return (
    <article className="product">
      <img src={product.img} alt={product.name} className="product__img" />
      <footer className="product__description">
        <h2 className="product__name">{product.name}</h2>
        <p className="product__price">${product.price}</p>
        <button
          className="product__button"
          onClick={() => {
            onAddToCart(product);
          }}
        >
          Добавить в корзину
        </button>
      </footer>
    </article>
  );
};

export default ProductCard;
