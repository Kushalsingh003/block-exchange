import React from "react";
import { useRef, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";

export default function OtpForgotPassword() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const otpRef = useRef();

  //otp Data submit Handler Function:
  async function otpHandlerFn() {
    setLoading(true);
    const otpData = otpRef.current.value;
    const phnNumberData = localStorage.getItem("phoneNumber");

    const newData = {
      phoneNumber: phnNumberData,
      otp: otpData,
    };
    console.log(newData, "newData");

    if (otpData == "") {
      toast.error("Please Enter Data !!");
    } else {
      try {
        await axios.post("/api/forgotPassword/otpPhnAPi", newData);
        toast.success("successfull!!");

        setTimeout(() => {
          router.push("/forgotPassword/newPassword");
        }, 2000);
      } catch {
        toast.error("Failed!!");
        setLoading(false)
      }
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
              <h3 className="heading-text">Reset Your Password</h3>

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
                      ref={otpRef}
                      className="textinput"
                      type="text"
                      name="username"
                      placeholder="Enter your OTP"
                    />
                  </div>

                  <button
                    onClick={otpHandlerFn}
                    disabled = {loading }
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
