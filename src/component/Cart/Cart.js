import React, { useEffect, useState, useRef } from "react";
import "./cart.scss";

const Cart = ({ product, onCostUpdate, onProductDelete }) => {
  const [count, setCount] = useState(1);
  const [newCost, setNewCost] = useState(product.price);
  const prevCostRef = useRef();

  useEffect(() => {
    const cost = product.price * count;
    setNewCost(cost);
  }, [count, product.price]);

  useEffect(() => {
    if (prevCostRef.current !== newCost) {
      onCostUpdate(product.id, newCost);
      prevCostRef.current = newCost;
    }
  }, [newCost, product.id, onCostUpdate]);



  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    if (count >= 2) {
      setCount(count - 1);
    }
  };

  return (
    <div className="cart">
      <div className="cart-info">
        <img src={product.img} alt="" className="cart-img" />
        <div className="text">
          <h4 className="product">{product.product}</h4>
          <p className="ingredient">{product.topping}</p>
        </div>
      </div>

      <div className="counts">
        <div className="count">{count}</div>
        <div className="count-buttons">
          <button className="increment" onClick={increment}>
            <img src="/images/arrowUps.svg" alt="" className="up-arrow" />
          </button>
          <button className="decrement" onClick={decrement}>
            <img src="/images/arrowUps.svg" alt="" className="down-arrow" />
          </button>
        </div>
      </div>

      <div className="last-cont">
        <p className="cost">${newCost}</p>

        <button className="delete-btn" onClick={() => onProductDelete(product.id)}>
          <img src="/images/trashCan.svg" alt="" className="delete-img" />
        </button>
      </div>
    </div>
  );
};

export default Cart;
