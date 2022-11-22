import React from "react";
import { useRouter } from "next/router";

export default function VerifyAcc() {
  const router = useRouter();

  function clickHandler() {
    router.push("/verifyUser/setCountry");
  }

  return (
    <div id="accountVerify">
      <div className="set-container">
        <section className="section-verifyAcc">
          <div className="content-div">
            <div className="heading-div">
              <h1 className="main-heading">Account Created</h1>
              <p className="secondary-heading">
                Please proceed to complete identity verification.
              </p>
            </div>

            <div className="step--1">
              <div className="verify-sertion">
                <img src="/icon.png" />
              </div>
              <div className="step-class">
                <p className="text--1"> Create Account</p>
                <div className="text--2">Enter your account details</div>
              </div>
            </div>

            <div className="step--1">
              <div className="verify-sertion">
                <img src="/verify-icon.png" />
              </div>
              <div className="step-class">
                <p className="text--1"> Verify Identity</p>
                <div className="text--2">
                  {" "}
                  Verify your identity to protect your account
                </div>
              </div>
            </div>

            <div className="step--1">
              <div className="verify-sertion">
                <img src="/unlock-icon.png" />
              </div>
              <div className="step-class">
                <p className="text--1"> Unlock Prize</p>
                <div className="text--2"> Get Your prize and start trading</div>
              </div>
            </div>

            {/* <div className="step--1 step--2">
            <div>
              <p className="text--1">Verify Identity</p>
            </div>
            <div className="text--2">
              Verify your identity to protect your account
            </div>
          </div> */}
            {/* 
          <div className="step--1 step--3">
            <div>
              <p className="text--1">Unlock Prize</p>
            </div>
            <div className="text--2">Get Your prize and start trading</div>
          </div> */}

            <button onClick={clickHandler} className="verify-btn">
              Verify Now
            </button>
          </div>

          <div className="image-div">
            <div>
              <img className="verify-img" src="/coin.jpg" />
            </div>
            <div className="text-div">
              <p>You're almost there!</p>
              <p className="img-heading--2">
                Next complete identity verification for account
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
