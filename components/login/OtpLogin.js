import React from "react";
import { useRef, useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";

export default function OtpLogin() {
  const otpInputRef = useRef();
  const router = useRouter();
  const [email, setEmail] = useState();
  const [error, setError] = useState(false);
  const [verify, setVerify] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingRef, setLoadingRef] = useState(false);

  function simulateNetworkRequest() {
    return new Promise((resolve) => setTimeout(resolve, 4000));
  }

  useEffect(() => {
    setEmail(localStorage.getItem("email"));
  }, []);

  async function sendCodeHandler(data) {
    try {
      const res = await axios.post("/api/login/getCodeEmailApi", {email: email});
      const response = res.data;
      console.log(response, "to get response from api to login");
      toast.success("OTP verified Successfully");
    } catch (err) {
      console.log(err);
      toast.error("Invalid Verification Code");
    }
  }

  async function emailLoginOtpVerify(data) {
    try {
      const res = await axios.post("/api/login/otpEmailLoginApi", data);
      const response = res.data;
      console.log(response, "to get response from api to login");
      localStorage.setItem("token", response.data.data);
      toast.success("OTP verified Successfully");
      setError(false);
      setVerify(true);
      setIsLoading(false);
      setLoadingRef(false);
      setTimeout(() => {
        router.push("/dashboard");
      }, 1000);
    } catch (err) {
      console.log(err);
      toast.error("Invalid Code");
      setError(true);
      setVerify(false);
      setLoadingRef(false);
      setIsLoading(false);
    }
  }

  async function emailFormSubmitHandler(event) {
    event.preventDefault();
    const otp = otpInputRef.current.value;
    if (!otp) {
      setError(false);
      toast.error("Please Provide the verification Code");
      return;
    }
    const data = {
      otp,
      email,
    };
    console.log(data, "data entered by the user to login");
    emailLoginOtpVerify(data);
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
    <div id="login-otp">
      <header>
        <ToastContainer />
        <nav className="navbar top-nav navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
            <a className="navbar-brand" id="logo-id" href="/">
              Block Exchange
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNavDropdown"
              aria-controls="navbarNavDropdown"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
              <ul className="navbar-nav"></ul>

              <form
                className="d-flex flex-setting"
                id="nav-item"
                style={{ marginLeft: "auto" }}
              >
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <a className="nav-link " aria-current="page" href="#">
                      English{" "}
                      <img
                        src="/state-line.png"
                        className="state-line"
                        style={{ marginLeft: "7px", marginTop: "-3px" }}
                      />{" "}
                    </a>
                  </li>

                  <li className="nav-item">
                    <a
                      className="nav-link "
                      id="nav-icons"
                      aria-current="page"
                      href="#"
                    >
                      <img
                        style={{ marginTop: "-5px" }}
                        src="/light-icon.png"
                      />
                    </a>
                  </li>
                </ul>
              </form>
            </div>
          </div>
        </nav>
      </header>

      <section className="login-form">
        <div className="container">
          <div className="row justify-content-center">
            <form className="input-sec ">
              <h3 className="heading-text">Security Verification</h3>

              {/* Email Form starts from Here */}

              <div className="tab-content" id="myTabContent">
                <div
                  className="tab-pane fade show active"
                  id="mail"
                  role="tabpanel"
                  aria-labelledby="mail-tab"
                >
                  <div className="input-item">
                    <h6 className="item-text">Email Verification Code</h6>
                    <div className="input-group mb-3">
                      <input
                        ref={otpInputRef}
                        type="text"
                        className="form-control"
                        placeholder="Enter Verification Code"
                        // aria-label="Recipient's username"
                        aria-describedby="button-addon2"
                      />
                      <button
                        className=" btn2"
                        type="button"
                        id="button-addon2"
                        onClick={sendCodeHandler}
                      >
                        Send Code
                      </button>
                    </div>
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
                      Invalid Verification Code{" "}
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
                      Verification Code Verified Successfully{" "}
                    </p>
                  )}

                  <button
                    onClick={emailFormSubmitHandler}
                    disabled={isLoading}
                    className="btn btn-warning
                                    w-100 "
                    type="button"
                    style={{ cursor: "pointer" }}
                  >
                    {loadingRef ? "Loading…" : " LogIn"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
