import React from 'react'
import { useRouter } from 'next/router';

export default function BuyCrypto() {
  const router = useRouter();

  function changePageHandler(){
      router.push('/payment/sellCrypto')
  }
  return (
    <div className="buyCrypto-container">
      <div className="buy-sell--div">
        <button className="buy-btn">Buy</button>
        <button onClick={changePageHandler} className="sell-btn">Sell</button>
      </div>
      <span className='info-text'>Estimate price: 1 BTC ≈ 19,940.19 USD</span>

      <form className="buyCrypto-form">
        <div className="spend-div">
          <label className="spend-label" htmlFor="spend">
            Spend
          </label>
          <input placeholder="15.00 - 12000.00" id="spend" />
        </div>

        <div className="spend-div receive-div">
          <label className="spend-lebel receive-label" htmlFor="receive">
            Receive
          </label>
          <input placeholder="0.00" id="receive" />
        </div>

        <button className='form-btn'>Continue</button>
      </form>
    </div>
  );
}
