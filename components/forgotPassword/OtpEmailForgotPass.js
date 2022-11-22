import React from "react";
import { useRef, useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";

export default function OtpEmailForgotPass() {
  const otpInputRef = useRef();
  const router = useRouter();
  const [email, setEmail] = useState();
  const [error, setError] = useState(false);
  const [verify, setVerify] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingRef, setLoadingRef] = useState(false);

  useEffect(() => {
    setEmail(localStorage.getItem("email"));
  }, []);

  function simulateNetworkRequest() {
    return new Promise((resolve) => setTimeout(resolve, 4000));
  }

  async function forgotPasswordOtpVerify(data) {
    try {
      let res = await axios.post("/api/forgotPassword/otpEmailApi", data);
      const response = res.data;
      console.log(response, "to get the response from the api");
      toast.success("Verification Code Verified Successfully");
      setError(false);
      setVerify(true);
      setIsLoading(true);
      setLoadingRef(true);
      setTimeout(() => {
        router.push("/forgotPassword/newPassword");
      }, 1000);
    } catch {
      toast.error("OTP doesn't match!");
      setError(true);
      setVerify(false);
      setLoadingRef(false);
      setIsLoading(false);
      // setIsPassword(false);
    }
  }

  async function formSubmitHandler(event) {
    event.preventDefault();
    const otp = otpInputRef.current.value;
    if (!otp) {
      setError(false);
      toast.error("Please Provide the Verification Code");
      return;
    }
    const data = {
      otp,
      email,
    };
    console.log(data, "data entered by the user for code");
    forgotPasswordOtpVerify(data);
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
    <div id="forgotPasswordOtpVerify">
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
              <h3
                className="heading-text"
                style={{
                  textAlign: "center",
                  marginBottom: "30px",
                  marginTop: "50px",
                }}
              >
                Reset Your Password
              </h3>

              {/* Email Form starts from Here */}

              <div className="tab-content" id="myTabContent">
                <div
                  className="tab-pane fade show active"
                  id="mail"
                  role="tabpanel"
                  aria-labelledby="mail-tab"
                >
                  <div className="input-item">
                    <h6 className="item-text">OTP</h6>
                    <input
                      ref={otpInputRef}
                      className="textinput"
                      type="text"
                      name="username"
                      placeholder="Enter your OTP"
                    />
                  </div>

                  {error && (
                    <p
                      style={{
                        color: "red",
                        fontSize: "15px",
                        margin: "0",
                        marginTop: "30px",
                        textAlign: "center",
                        float: "left",
                        width: "100%",
                      }}
                    >
                      {" "}
                      Invalid Verification Code! Please try again{" "}
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
                        float: "left",
                        width: "100%",
                      }}
                    >
                      {" "}
                      Verification Code Verified Successfully{" "}
                    </p>
                  )}

                  <button
                    onClick={formSubmitHandler}
                    disabled={isLoading}
                    className="btn btn-warning
                                    w-100 "
                    type="button"
                  >
                    {loadingRef ? "Loading…" : " Verify"}
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
