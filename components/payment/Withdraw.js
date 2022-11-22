import React from "react";

export default function Withdraw() {
  return (
    <div className="deposit-container">
      <nav className="deposit-nav">
        <div className="deposit-fiat">
          <div>
            <p className="deposit-fiat--heading">Withdraw Fiat</p>
          </div>
          <div>
            <button className="deposit-fiat--btn">
              <span>Order History</span>
              <svg
                className="deposit-icon"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                class="is-inline-block css-15si91e"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M21 11.999l-7.071-7.071-1.768 1.768 4.055 4.054H2.999v2.5h13.216l-4.054 4.053 1.768 1.768L21 12v-.001z"
                  fill="currentColor"
                ></path>
              </svg>
            </button>
          </div>
        </div>
        <div className="deposit-crypto">
          <button className="deposit-crypto--btn">
            <span>Withdraw Crypto</span>
            <svg
              className="deposit-icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              class="is-inline-block css-15si91e"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M21 11.999l-7.071-7.071-1.768 1.768 4.055 4.054H2.999v2.5h13.216l-4.054 4.053 1.768 1.768L21 12v-.001z"
                fill="currentColor"
              ></path>
            </svg>
          </button>
        </div>
      </nav>

      <section className="deposit-section">
        <div className="deposit-form--container">
          <h1 className="deposit-form--heading">1. Select currency</h1>
          <form className="deposit-form">
            <div className="currency-div">
              <label className="currency-div--heading">Currency</label>
              <select className="currency-selection">
                <option>EUR</option>
                <option>TRY</option>
                <option>GBP</option>
                <option>KZT</option>
              </select>
            </div>

            <div className="deposit-option">
              <h2 className="deposit-option--heading">Withdraw to </h2>
              <div className="option-div">
                <button className="option--1">Recommended</button>
                <button className="option--2">Other Payments</button>
              </div>

              <div className="bankTransfer-div">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault1"
                  />
                  <label
                    className="bankTransfer-heading"
                    class="form-check-label"
                    for="flexRadioDefault1"
                  >
                    Bank Transfer (SEPA)
                    <span></span>
                  </label>
                </div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault2"
                    checked
                  />
                  <label
                    className="bankCard-heading"
                    class="form-check-label"
                    for="flexRadioDefault2"
                  >
                    Bank Card(Visa/MC)
                  </label>
                </div>
              </div>
            </div>
            <button className="form-btn">Continue</button>
          </form>
        </div>
      </section>
    </div>
  );
}
