import React from "react";
import axios from "axios";

const Payment = ({ confirmPayment }) => {
  const frontCard = React.useRef(null);
  const bankLogo = React.useRef(null);
  const brandLogo = React.useRef(null);
  const numberField = React.useRef(null);
  const expMonthDate = React.useRef(null);
  const expYearDate = React.useRef(null);
  const frontFields = [numberField, expMonthDate, expYearDate];

  const onInputCardNumber = (value) => {
    axios
      .get(
        `https://api.cardinfo.online?input=${value.slice(
          0,
          6
        )}&apiKey=2938deef61c28d0fa1d9b4b0183f4cdc`
      )
      .then(({ data }) => {
        frontCard.current.style.background = data.formBackgroundColor;
        frontCard.current.style.color = data.formTextColor;
        frontCard.current.style.borderColor = data.formBorderColor;
        frontFields.forEach(
          (field) => (field.current.style.borderColor = data.formBorderColor)
        );
        bankLogo.current.style.display = data.formBankLogoBigSvg
          ? "block"
          : "none";
        bankLogo.current.src = data.formBankLogoBigSvg;
        brandLogo.current.style.display =
          data.formBrandLogoSvg || data.brandLogoOriginalSvg ? "block" : "none";
        brandLogo.current.src =
          data.formBrandLogoSvg || data.brandLogoOriginalSvg;
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <div className="payment-order">
      <h2 className="payment-order__title">Оплата заказа</h2>
      <p className="payment-order__description">
        Введите реквизиты банковской карты
      </p>
      <div className="payment">
        <div className="payment__front-card card" ref={frontCard}>
          <img className="card__bank-logo" alt="Логотип банка" ref={bankLogo} />
          <img className="card__brand-logo" alt="Логотип" ref={brandLogo} />
          <div className="card__fields fields">
            <input
              className="field number"
              type="text"
              placeholder="0000 0000 0000 0000"
              onChange={(e) => {
                onInputCardNumber(e.target.value);
              }}
              ref={numberField}
            />
            <label className="label">Valid thru</label>
            <input
              className="field expired"
              type="text"
              placeholder="MM"
              ref={expMonthDate}
            />
            <input
              className="field expired"
              type="text"
              placeholder="YY"
              ref={expYearDate}
            />
          </div>
        </div>

        <div className="payment__back-card card">
          <input className="field code" type="password" />
          <label className="label">Safety code</label>
        </div>
      </div>
      <button className="payment-order__pay" onClick={confirmPayment}>
        Оплатить
      </button>
    </div>
  );
};

export default Payment;
