import React from "react";
import { useRef, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";

export default function OtpPhnSignup() {
  const otpInputRef = useRef();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function phoneOtpVerify(data) {
    try {
      let res = await axios.post("/api/signup/otpPhnSignupApi", data);
      const response = res.data;
      console.log(response, "to get the response from api for phone");
      toast.success("Phone Number Verified ! Account Created Successfully!!");
      setLoading(true);
      setTimeout(() => {
        localStorage.clear();
        router.push("/verifyUser/verifyAcc");
      }, 1000);
    } catch {
      toast.error("Invalid Verification Code");
      setLoading(false);
    }
  }

  async function formSubmitHandler(event) {
    event.preventDefault();

    const otp = otpInputRef.current.value;

    const phone = localStorage.getItem("phone");
    console.log(phone, "to get the phone number from local Storage");

    if (!otp) {
      toast.error("Please Provide the credentials");
      return;
    }

    const data = {
      otp,
      phone,
    };

    console.log(data, "data entered by the user for phone");

    phoneOtpVerify(data);
  }

  return (
    <div>
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
              <h3 className="heading-text">OTP Verification</h3>

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
                      required
                      className="textinput"
                      type="text"
                      name="username"
                      placeholder="Enter your OTP"
                    />
                  </div>

                  <button
                    onClick={formSubmitHandler}
                    disabled={loading}
                    className="btn btn-warning
                                    w-100 "
                    type="button"
                  >
                    VERIFY
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
