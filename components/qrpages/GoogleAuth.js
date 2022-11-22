import React from "react";
import { useRef, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

export default function GoogleAuth() {
  const googleAuthInputRef = useRef();
  const router = useRouter();
  const [error, setError] = useState(false);
  const [verify, setVerify] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingRef, setLoadingRef] = useState(false);

  function simulateNetworkRequest() {
    return new Promise((resolve) => setTimeout(resolve, 4000));
  }

  async function googleauthverify(data) {
    try {
      const token = localStorage.getItem("token");
      console.log(token, "to get token from local storage");
      let res = await axios.post("/api/qrCode/verifyQrCode", {token:token, data});
      const response = res.data;
      console.log(response, "to get the response from api to verify qrCode");
      toast.success("Verification code verified successfully");
      setError(false);
      setVerify(true);
      setIsLoading(true);
      setLoadingRef(true);
      setTimeout(() => {
        router.push("/qrpages/completeAuth")
      }, 1000);
    } catch (err) {
      console.log(err);
      toast.error("Invalid verification code");
      setError(true);
      setVerify(false);
      setLoadingRef(false);
      setIsLoading(false);
    
    }
  }

  async function googleAuthVerificationCodeHandler(event) {
    event.preventDefault();
    const otp = googleAuthInputRef.current.value;
    if (!otp) {
      setError(false);
      toast.error("Please Provide the verification code");
      return;
    }
    const data = {
      otp,
    };
    console.log(data, "data entered by the user to verify the code");
    googleauthverify(data);
    setIsLoading(true);
    setLoadingRef(true);
  }
  useEffect(() => {
    if (isLoading) {
      simulateNetworkRequest().then(() => {
        setLoadingRef(false);
      });
    }
  }, [isLoading]);

  const handleClick = () => setLoadingRef(false);

  return (
    <div id="qrVerify">
    <div className="scanQR-section">
      <div className="scanQR-heading--div">
        <h1 className="scanQR-heading">Two Factor Authentication </h1>
      </div>

      <div className="flex-container">
        <div className="context--1">
          <span className="number number-1">1</span>
          <span className="scan-text">scan QR code</span>
        </div>

        <div className="empty-div empty-div--1"></div>

        <div className="context--1">
          <span className="number  number-2">2</span>
          <span className="scan-text">Google Authenticator </span>
        </div>

        <div className="empty-div empty-div--2  "></div>

        <div className="context--1">
          <span className="number number-3">3</span>
          <span className="scan-text">Complete</span>
        </div>
      </div>

      <div className="scanQR-content">
        <h2 className="scanQR-secondary--heading googleAuth-heading">
          Enable Authenticator by verifing <br /> your account
        </h2>

        <form className="login-form googleAuth-form">
         
          

          <div className="input-item googleAuth-input">
            <h6 className="item-text googleAuth-text"> Authenticator code</h6>
            <input
              ref={googleAuthInputRef}
              className="textinput code-inputField"
              type="text"
              name="username"
              placeholder="Enter Your Verification code Here..."
            />
            <p className="googleAuth-secondary--text">
              Enter the 6-digit code from Google Authenticator
            </p>
          </div>

          {error && (
                    <p
                      style={{
                        color: "red",
                        fontSize: "15px",
                        margin: "0",
                        marginTop: "30px",
                        textAlign: "center",
                        float:"left",
                        width:"100%"
                      }}
                    >
                      {" "}
                      Invalid Verificatino Code{" "}
                    </p>
                  )}
                  {verify && (
                    <p
                      style={{
                        color: "green",
                        fontSize: "15px",
                        margin: "0",
                        marginTop: "30px",
                        textAlign: "center",
                        float:"left",
                        width:"100%"
                      }}
                    >
                      {" "}
                      User Verified Successfully{" "}
                    </p>
                  )}

          <div className="scan-div googleAuth-btn--div" style={{cursor:"pointer"}}>
            <a href="/qrpages/qrscanner" className="scan-previous" >
              Previous
            </a>
            <button
                    onClick={googleAuthVerificationCodeHandler}
                    disabled={isLoading}
                    className="btn-warning scan-next
                    w-100 "
                    type="button"
                  >
                    {loadingRef ? "Loading…" : "Continue"}
                  
                  </button>
          </div>

       
        </form>
      </div>
    </div>
    </div>
  );
}
