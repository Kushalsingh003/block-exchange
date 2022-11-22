import React from "react";
import { useRef, useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";

export default function ChangeEmail() {
  const oldEmailVerficationCodeInputRef = useRef();
  const newEmailInputRef = useRef();
  const newEmailVerificationCodeInputRef = useRef();
  const router = useRouter();
  const [token, setToken] = useState();
  const [email, setEmail] = useState();
  const [error, setError] = useState(false);
  const [verify, setVerify] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingRef, setLoadingRef] = useState(false);
  const [isLoading1, setIsLoading1] = useState(false);
  const [loadingRef1, setLoadingRef1] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);
  const [loadingRef2, setLoadingRef2] = useState(false);

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);

  function simulateNetworkRequest() {
    return new Promise((resolve) => setTimeout(resolve, 4000));
  }

  function simulateNetworkRequest1() {
    return new Promise((resolve) => setTimeout(resolve, 4000));
  }

  function simulateNetworkRequest2() {
    return new Promise((resolve) => setTimeout(resolve, 4000));
  }

  async function getemail() {
    try {
      const token = localStorage.getItem("token");
      console.log(token, "to get the token from the local storage");
      let res = await axios.post("/api/dashboard/getUserInfoApi", { token: token });
      const response = res.data;
      console.log(response, "to get the respose from api");
      setEmail(response.data.data.email);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getemail();
  }, []);

  async function oldEmailSendCode() {
    try {
      let res = await axios.post("/api/security/oldEmailOtp", {
        token: token,
        email: email,
      });
      const response = res.data;
      console.log(response, "to get the respose from api");
      toast.success("Verification code sent on your registered email");
      setIsLoading1(true);
      setLoadingRef1(true);
    } catch (err) {
      console.log(err);
      toast.error("Failed to generate verification code!. please try again.");
      setIsLoading1(false);
      setLoadingRef1(false);
    }
  }

  async function newEmailSendCode(data) {
    try {
      const token = localStorage.getItem("token");
      console.log(token, "to get the token from the local storage");
      let res = await axios.post("/api/security/newEmailOtp", {
        token: token,
        data,
      });
      const response = res.data;
      console.log(response, "to get the respose from api");
      toast.success("Verification Code sent to your new Eamil");
      setIsLoading2(true);
      setLoadingRef2(true);
    } catch (err) {
      console.log(err);
      toast.error("Email Already Exist!.");
      setIsLoading(false);
      setLoadingRef(false);
    }
  }

  async function newEmailFormSubmitHandler(event) {
    event.preventDefault();
    const newEmail = newEmailInputRef.current.value;
    localStorage.setItem("email", newEmail);
    if (!newEmail) {
      toast.error("Please Check the credentials");
      return;
    }
    const data = {
      newEmail,
    };
    console.log(data, "data entered by the user for new email");
    newEmailSendCode(data);
  }

  async function changeemail(data) {
    try {
      let res = await axios.post("/api/security/changeEmail", {
        token: token,
        data,
      });
      const response = res.data;
      console.log(response, "to get the response from the api to change email");
      toast.success("Email Changed Successfully");
      setError(false);
      setVerify(true);
      setIsLoading(true);
      setLoadingRef(true);
      setTimeout(() => {
      router.push("/dashboard");
      }, 1000);
    } catch (err) {
      console.log(err);
      toast.error("Invalid Credentils");
      setError(true);
      setVerify(false);
      setLoadingRef(false);
      setIsLoading(false);
    }
  }

  async function changeEmailFormSubmitHandler(event) {
    event.preventDefault();
    const otpEmail = oldEmailVerficationCodeInputRef.current.value;
    const otpNewEmail = newEmailVerificationCodeInputRef.current.value;
    if (!otpEmail || !otpNewEmail) {
      toast.error("Please provide the credentials");
      return;
    }
    const data = {
      otpEmail,
      otpNewEmail,
    };
    console.log(data, "data entered by the user");
    changeemail(data);
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

  useEffect(() => {
    if (isLoading1) {
      simulateNetworkRequest1().then(() => {
        setLoadingRef1(false);
      });
    }
  }, [isLoading1]);

  const handleClick1 = () => setLoadingRef(false);

  useEffect(() => {
    if (isLoading2) {
      simulateNetworkRequest2().then(() => {
        setLoadingRef2(false);
      });
    }
  }, [isLoading2]);

  const handleClick2 = () => setLoadingRef(false);

  return (
    <div id="changeEmail">
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
            <form className="input-sec">
              <h3 className="heading-text">Change Your Email</h3>

              {/* Email Form starts from Here */}

              <div className="tab-content" id="myTabContent">
                <div
                  className="tab-pane fade show active"
                  id="mail"
                  role="tabpanel"
                  aria-labelledby="mail-tab"
                >
                  <div className="input-item">
                    <h6 className="item-text">Existing Email</h6>
                    <div className="input-group mb-3">
                      <input
                        defaultValue={email}
                        type="text"
                        className="form-control form-input"
                        disabled
                        // placeholder="Recipient's username"
                        aria-label="Recipient's username"
                        aria-describedby="button-addon2"
                      />
                      <button
                        disabled={isLoading1}
                        className=" btn2"
                        type="button"
                        id="button-addon2"
                        onClick={oldEmailSendCode}
                      >
                        {loadingRef1 ? "Loading…" : "Send Code"}
                      </button>
                    </div>
                  </div>

                  <div className="input-item">
                    <h6 className="item-text mb-3">Verification Code</h6>
                    <input
                      ref={oldEmailVerficationCodeInputRef}
                      type="text"
                      className="form-control form-input"
                      placeholder="Enter Verification Code Sent On Existing Email"
                      aria-label="Recipient's username"
                      aria-describedby="button-addon2"
                    />
                  </div>

                  <div className="input-item">
                    <h6 className="item-text">New Email</h6>
                    <div className="input-group mb-3">
                      <input
                        ref={newEmailInputRef}
                        type="text"
                        className="form-control form-input"
                        placeholder="Enter Your New Email Here"
                        aria-label="Recipient's username"
                        aria-describedby="button-addon2"
                      />
                      <button
                        disabled={isLoading2}
                        className=" btn2"
                        type="button"
                        id="button-addon2"
                        onClick={newEmailFormSubmitHandler}
                      >
                       {loadingRef2 ? "Loading…" : "Send Code"}
                      </button>
                    </div>
                  </div>

                  <div className="input-item">
                    <h6 className="item-text mb-3">Verification Code</h6>
                    <input
                      ref={newEmailVerificationCodeInputRef}
                      type="text"
                      className="form-control form-input"
                      placeholder="Enter Verification Code Sent on New Email"
                      aria-label="Recipient's username"
                      aria-describedby="button-addon2"
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
                        float:"left",
                        width:"100%"
                      }}
                    >
                      {" "}
                      Invalid verification codes{" "}
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
                      Email changed successfully{" "}
                    </p>
                  )}

                  <button
                    onClick={changeEmailFormSubmitHandler}
                    disabled={isLoading}
                    className="btn btn-warning
                                w-100 mt-5 "
                    type="button"
                  >
                    {loadingRef ? "Loading…" : "Submit"}
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
