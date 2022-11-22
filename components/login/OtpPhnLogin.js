import React, { useEffect } from "react";
import { useRef, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";

export default function OtpPhnLogin() {
  const [emailShow, setEmailShow] = useState();
  const [phoneShow, setPhoneShow] = useState();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const emailOtpRef = useRef();
  const phnOtpRef = useRef();

  useEffect(() => {
    setEmailShow(localStorage.getItem("email"));
    setPhoneShow(localStorage.getItem("phone"));
  }, []);

 
  async function otpHandlerFn(e) {
    e.preventDefault()
    console.log(emailShow, phoneShow);
    if ( phoneShow == null && emailShow == null) {
        console.log("first")
      return;
    }
    if (emailShow && phoneShow != null) {
        console.log("both")
      bothOtpHandler();
      return;
    }
    if (emailShow == null) {
         console.log("email");
      phoneOtpHandler();
    } else {
      emailOtpHandler();
    }

  }

  async function bothOtpHandler() {
    const emailOtpData = emailOtpRef.current.value;
    const emailData = localStorage.getItem("email");
    const phnOtpData = phnOtpRef.current.value;
    const phoneData = localStorage.getItem("phone");

    const newData = {
      email: emailData,
      emailOtp: emailOtpData,
      phone: phoneData,
      phoneOtp: phnOtpData,
    };

    try {
      const response = await axios.post("/api/login/otpBothLoginApi", newData);
      console.log(response.data, "response data");
      const data = response.data.data;
      localStorage.setItem("token", data);
      toast.success("OTP verified");

      setTimeout(() => {
        router.push("/verifyUser/verifyAcc");
      }, 2000);
    } catch {
      toast.error("Failed!");
    }
  }

  async function emailOtpHandler() {
    const emailOtpData = emailOtpRef.current.value;
    const emailData = localStorage.getItem("email");
    console.log("first")
    const newData = {
      email: emailData,
      otp: emailOtpData,
    };

    try {
      const response = await axios.post("/api/login/otpEmailLoginApi", newData);
       console.log(response.data, "response data");
       const data = response.data.data.data;
       console.log(data,'token is herejjjj');
       localStorage.setItem('token',data);
      //   localStorage.setItem("token", response.data.data);
      toast.success("OTP verified");

      setTimeout(() => {
        router.push("/verifyUser/verifyAcc");
      }, 2000);
    } catch {
      toast.error("Failed!");
    }
  }

  async function phoneOtpHandler() {
    const otp = phnOtpRef.current.value;
    const phone = localStorage.getItem("phone");

    const newData = {
    phone,
    otp,
    };
     console.log(newData,'newData is here!!')

    try {
      const response = await axios.post("/api/login/otpPhnLoginApi", newData);
      console.log(response.data, "response data");
      const data = response.data.data;
      localStorage.setItem("token", data);
      toast.success("OTP verified");

      setTimeout(() => {
        router.push("/verifyUser/verifyAcc");
      }, 2000);
    } catch {
      toast.error("Failed!");
    }
  }

  async function getCodeEmailHandler(e) {
    e.preventDefault();
    const emailData = localStorage.getItem("email");
    console.log(emailData, "email");

    try {
      const res = await axios.post("/api/login/getCodeEmailApi", {
        email: emailData,
      });
      console.log(res.data, "yehhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh");
      toast.success(" OTP sent");
    } catch {
      toast.error("Failed!");
    }
  }

  async function getCodePhnHandler(e) {
    e.preventDefault();
    const phone = localStorage.getItem("phone");
    const data = {
      phone,
    }
    console.log(phone, "phone");

    try {
     const res = await axios.post("/api/login/getCodePhnApi", data);
      console.log(res,'data is here from api')

      toast.success("otp sent");
    } catch {
      toast.error("Failed!");
    }
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
              <h3 className="heading-text">Security Verification</h3>

              {/* Email Form starts from Here */}

              <div className="tab-content" id="myTabContent">
                <div
                  className="tab-pane fade show active"
                  id="mail"
                  role="tabpanel"
                  aria-labelledby="mail-tab"
                >
                  {emailShow ? (
                    <div className="input-item">
                      <h6 className="item-text">Email OTP</h6>
                      <input
                        ref={emailOtpRef}
                        className="textinput"
                        type="text"
                        name="username"
                        placeholder="Enter your OTP"
                      />
                      <button
                        onClick={(e) => {
                          getCodeEmailHandler(e);
                        }}
                        className="getCode"
                      >
                        Get Code
                      </button>
                    </div>
                  ) : null}

                  {phoneShow ? (
                    <div className="input-item">
                      <h6 className="item-text">Phone OTP</h6>
                      <input
                        ref={phnOtpRef}
                        className="textinput"
                        type="text"
                        name="username"
                        placeholder="Enter your OTP"
                      />
                      <button
                        onClick={(e) => {
                          getCodePhnHandler(e);
                        }}
                        className="getCode"
                      >
                        Get Code
                      </button>
                    </div>
                  ) : null}

                  <button
                    onClick={otpHandlerFn}
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
