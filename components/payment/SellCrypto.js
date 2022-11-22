import React from "react";
import { useRouter } from "next/router";

export default function SellCrypto() {
    const router = useRouter();

    function changePageHandler() {
      router.push("/payment/buyCrypto");
    }
  return (
    <div className="buyCrypto-container">
      <div className="buy-sell--div">
        <button onClick={changePageHandler} className="buy-btn buy-btn--2">
          Buy
        </button>
        <button className="sell-btn sell-btn--2">Sell</button>
      </div>
      <span className="info-text">Estimate price: 1 BTC ≈ 19,940.19 USD</span>

      <form className="buyCrypto-form">
        <div className="spend-div">
          <label className="spend-label" htmlFor="spend">
            Spend
          </label>
          <input placeholder="Please Enter amount" id="spend" />
        </div>

        <div className="spend-div receive-div">
          <label className="spend-lebel receive-label" htmlFor="receive">
            Receive
          </label>
          <input placeholder="0.00" id="receive" />
        </div>

        <button className="form-btn">Continue</button>
      </form>
    </div>
  );
}
