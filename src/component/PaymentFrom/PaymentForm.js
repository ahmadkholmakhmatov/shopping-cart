import React, { useEffect, useState } from "react";
import { usePaymentInputs } from "react-payment-inputs";

import "./paymentForm.scss";

const PaymentForm = ({ totalCost }) => {
  const { getCardNumberProps, getExpiryDateProps, getCVCProps } =
    usePaymentInputs();

  const [cardType, setCardType] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    cardNumber: "",
    expirationDate: "",
    cvv: "",
  });

  const [finalTotalCost, setFinalTotalCost] = useState(totalCost + 4);

  useEffect(() => {
    setFinalTotalCost(totalCost + 4);
  }, [totalCost]);

  const handleCardTypeChange = (type) => {
    setCardType(type);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const finalFormData = {
      ...formData,
      totalCost: finalTotalCost,
      cardType: cardType,
    };


    setFormData({
      name: "",
      cardNumber: "",
      expirationDate: "",
      cvv: "",
    });
    setCardType("");
  };

  const handleCardDetailChange = (e) => {
    handleInputChange(e);
    e.persist();
  };

  const handleCardDisplay = () => {
    const rawText = [...formData.cardNumber.split(" ").join("")];
    const creditCard = [];
    rawText.forEach((t, i) => {
      if (i % 4 === 0) creditCard.push(" ");
      creditCard.push(t);
    });
    return creditCard.join("");
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <div className="form-header">
        <h3 className="title">Card Details</h3>

        <img src="/images/user.png" alt="" className="pfp-img" />
      </div>

      <div className="card-con">
        <h4 className="title">Card type</h4>
        <div className="card-type">
          <label
            onClick={() => handleCardTypeChange("MasterCard")}
            className={cardType === "MasterCard" ? "selected" : ""}
          >
            <img
              src="/images/masterCard.png"
              alt="MasterCard"
              className="card"
            />
          </label>
          <label
            onClick={() => handleCardTypeChange("Visa")}
            className={cardType === "Visa" ? "selected" : ""}
          >
            <img src="/images/Visa.png" alt="Visa" className="card" />
          </label>
          <label
            onClick={() => handleCardTypeChange("RuPay")}
            className={cardType === "RuPay" ? "selected" : ""}
          >
            <img src="/images/ruPay.png" alt="RuPay" className="card" />
          </label>
          <label
            className={`others ${cardType === "Other" ? "selected" : ""}`}
            onClick={() => handleCardTypeChange("Other")}
          >
            <div className="other">See All</div>
          </label>
        </div>
      </div>

      <div className="card-details">
        <div className="input">
          <label htmlFor="name" className="input-label">
            Name
          </label>

          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="input">
          <label htmlFor="cardNumber" className="input-label">
            Card Number
          </label>

          {/* <input
            maxLength="20"
            type="text"
            name="cardNumber"
            placeholder="xxxx xxxx xxxx xxxx"
            value={handleCardDisplay()}
            onChange={handleInputChange}
            required
          /> */}

          <input
            maxLength="20"
            required
            {...getCardNumberProps({ onChange: handleCardDetailChange })}
            value={handleCardDisplay()}
            placeholder="xxxx xxxx xxxx xxxx"
          />
        </div>

        <div className="card-add-info">
          <div className="input">
            <label htmlFor="expirationDate" className="input-label">
              Expiration date
            </label>

            {/* <input
              type="text"
              name="expirationDate"
              placeholder="mm/yy"
              value={formData.expirationDate}
              onChange={handleInputChange}
              required
            /> */}

            <input
              {...getExpiryDateProps({
                onChange: handleCardDetailChange,
                value: formData.expirationDate,
              })}
              name="expirationDate"
              placeholder="mm/yy"
              required
            />
          </div>

          <div className="input">
            <label htmlFor="name" className="input-label">
              CVV
            </label>

            {/* <input
              maxLength="3"
              type="number"
              name="cvv"
              placeholder="123"
              value={formData.cvv}
              onChange={handleInputChange}
              required
            /> */}

            <input
              maxLength="3"
              {...getCVCProps({
                onChange: handleCardDetailChange,
                value: formData.cvv,
              })}
              name="cvv"
              placeholder="123"
              required
            />
          </div>
        </div>
      </div>

      <hr className="tagline" />

      <div className="totalCostInfo">
        <div className="cost-container">
          <p className="text">Subtotal</p>
          <p className="cost subCost">${totalCost}</p>
        </div>

        <div className="cost-container">
          <p className="text">Shipping</p>
          <p className=" cost shipCost">$4</p>
        </div>

        <div className="cost-container">
          <p className="text">Total (Tax incl.)</p>
          <p className="cost totalCost">${finalTotalCost}</p>
        </div>
      </div>

      <button type="submit" className="sumbit-btn">
        <p className="tCost">$1672</p>
        <div className="text">
          Checkout <img src="/images/Right.png" alt="" className="right-icon" />
        </div>
      </button>
    </form>
  );
};

export default PaymentForm;
