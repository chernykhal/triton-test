import React from "react";
import { ProductCard } from "../components";

const Home = ({ products, onAddToCart }) => {
  return (
    <section className="home">
      <h1 className="home__title title">Каталог</h1>
      <div className="home__content">
        <div className="products">
          {products &&
            products.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                onAddToCart={onAddToCart}
              />
            ))}
        </div>
      </div>
    </section>
  );
};

export default Home;
