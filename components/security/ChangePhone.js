import React from "react";
import { useRef, useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";

export default function ChangeEmail() {
  const newEmailInputRef = useRef();
  const verficationCodeInputRef = useRef();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState();
  const [token, setToken] = useState();

  useEffect(() => {
    setToken(localStorage.getItem("token"));
    console.log(setToken(localStorage.getItem("token")), "to get the token");
  }, []);

  async function getemail() {
    try {
      const token = localStorage.getItem("token");
      console.log(token, "to get the token from the local storage");
      let res = await axios.post("/api/security/getEmail", { token: token });
      const response = res.data;
      console.log(response, "to get the respose from api");
      console.log(response.data.data.checkdata, "to see the response");
      setEmail(response.data.data.checkdata);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getemail();
  }, []);

  async function changeemail(data) {
    try {
      let res = await axios.post("/api/security/changeEmail", {
        token: token,
        data,
      });
      const response = res.data;
      console.log(response, "to get the response from the api to change email");
      toast.success("Email Changed Successfully");
    } catch (err) {
      console.log(err);
      toast.error("Invalid Credentils");
    }
  }

  async function formSubmitHandler(event) {
    event.preventDefault();

    const NewEmail = newEmailInputRef.current.value;
    const otpEmail = verficationCodeInputRef.current.value;

    if (!NewEmail || !otpEmail) {
      toast.success("Please provide the credentials");
      return;
    }

    const data = {
      NewEmail,
      otpEmail,
    };

    console.log(data, "data entered by the user");

    changeemail(data);
  }

  return (
    <div id="phoneChange">
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
            <form className="input-sec" onSubmit={formSubmitHandler}>
              <h3 className="heading-text">Change Your Phone Number</h3>

              {/* Email Form starts from Here */}

              <div className="tab-content" id="myTabContent">
                <div
                  className="tab-pane fade show active"
                  id="mail"
                  role="tabpanel"
                  aria-labelledby="mail-tab"
                >
                  <div className="input-item">
                    <h6 className="item-text">Existing Phone Number</h6>
                    <div class="input-group mb-3">
                      <input
                        defaultValue={email?.email}
                        type="text"
                        class="form-control"
                        // placeholder="Recipient's username"
                        aria-label="Recipient's username"
                        aria-describedby="button-addon2"
                      />
                      <button class=" btn2" type="button" id="button-addon2">
                        Send Code
                      </button>
                    </div>
                  </div>

                  <div className="input-item">
                    <h6 className="item-text mb-3">Verification Code</h6>
                    <input
                        type="text"
                        class="form-control"
                        placeholder="Enter Verification Code Sent On Existing Phone Number"
                        aria-label="Recipient's username"
                        aria-describedby="button-addon2"
                      />
                  </div>

                  <div className="input-item">
                    <h6 className="item-text">New Phone Number</h6>
                    <div class="input-group mb-3">
                      <input
                        
                        type="text"
                        class="form-control"
                        placeholder="Enter Your New Email Here"
                        aria-label="Recipient's username"
                        aria-describedby="button-addon2"
                      />
                      <button class=" btn2" type="button" id="button-addon2">
                        Send Code
                      </button>
                    </div>
                  </div>

                  <div className="input-item">
                    <h6 className="item-text mb-3">Verification Code</h6>
                    <input
                        type="text"
                        class="form-control"
                        placeholder="Enter Verification Code Sent on New Phone Number"
                        aria-label="Recipient's username"
                        aria-describedby="button-addon2"
                      />
                  </div>

                  <button
                    // onClick={emailHandlerFn}
                    disabled={loading}
                    className="btn btn-warning
                                w-100 "
                    type="button"
                  >
                    Submit
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

// export default Login
