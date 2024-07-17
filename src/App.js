import { useState, useEffect } from "react";
import Cart from "./component/Cart/Cart";
import PaymentForm from "./component/PaymentFrom/PaymentForm";
import "./global.scss";

const data = [
  {
    id: 1,
    img: "/images/card1.png",
    product: "Italy Pizza",
    topping: "Extra cheese and toping",
    price: 681,
    cost: 681,
  },
  {
    id: 2,
    img: "/images/card2.png",
    product: "Combo Plate",
    topping: "Extra cheese and toping",
    price: 681,
    cost: 681,
  },
  {
    id: 3,
    img: "/images/card3.png",
    product: "Spanish Rice",
    topping: "Extra garllic",
    price: 681,
    cost: 681,
  },
];

function App() {
  const [products, setProducts] = useState(data);
  const [totalCost, setTotalCost] = useState(() =>
    data.reduce((acc, product) => acc + product.cost, 0)
  );

  const handleCostUpdate = (id, newCost) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id ? { ...product, cost: newCost } : product
      )
    );
  };

  const handleProductDelete = (id) => {
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== id)
    );
  };



  console.log(products);

  useEffect(() => {
    const newTotalCost = products.reduce(
      (acc, product) => acc + product.cost,
      0
    );
    setTotalCost(newTotalCost);
  }, [products]);

  return (
    <div className="app">
      <div className="left-container">
        <button className="back-btn">
          <img src="/images/arrow.svg" alt="arrow-back" className="arrow" />
          Shopping Continue
        </button>

        <hr className="tagline" />

        <div className="header">
          <h1 className="title">Shopping cart</h1>
          <p className="info">You have 3 item in your cart</p>
        </div>

        {products.map((product) => (
          <Cart
            key={product.id}
            product={product}
            onCostUpdate={handleCostUpdate}
            onProductDelete={handleProductDelete}
          />
        ))}
      </div>

      <div className="right-container">
        <PaymentForm totalCost={totalCost} />
      </div>
    </div>
  );
}

export default App;
