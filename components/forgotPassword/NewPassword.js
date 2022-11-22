import React from "react";
import { useRef, useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";

export default function NewPassword() {
  const passwordInputRef = useRef();
  const confirmPasswordInputRef = useRef();
  const router = useRouter();
  const [email, setEmail] = useState();
  const [error, setError] = useState(false);
  const [verify, setVerify] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingRef, setLoadingRef] = useState(false);
  const [isPassword, setIsPassword] = useState(false);

  useEffect(() => {
    setEmail(localStorage.getItem("email"));
  }, []);

  function simulateNetworkRequest() {
    return new Promise((resolve) => setTimeout(resolve, 4000));
  }

  async function newPasswordverify(data) {
    try {
      let res = await axios.post("/api/forgotPassword/newPassApi", data);
      const response = res.data;
      console.log(
        response,
        "to get the response from the api to set new password"
      );
      setError(false);
      setVerify(true);
      setIsLoading(true);
      setLoadingRef(true);
      toast.success("Password Changed Successfully ");
      setTimeout(() => {
        router.push("/login/login");
      }, 2000);
    } catch (err) {
      console.log(err);
      toast.error("Please Check Your Credentials to create new password");
      setVerify(false);
      setLoadingRef(false);
      setIsLoading(false);
      setIsPassword(false);
    }
  }

  async function formSubmitHandler(event) {
    event.preventDefault();

    var regularExpression =
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

    const password = passwordInputRef.current.value;
    const confirmPassword = confirmPasswordInputRef.current.value;
    if (!password || !confirmPassword) {
      setError(false);
      toast.error("Please Provide the credentials");
      return;
    }

    if (password != confirmPassword) {
      setError(false);
      toast.error("Password doesnot match");
      return;
    }

    const data = {
      email,
      password,
      confirmPassword,
    };
    console.log(data, "data entered by the user to create new password");
    if (!regularExpression.test(password)) {
      setIsPassword(true);
      setLoadingRef(false);
      setIsLoading(false);
      setError(false);
      return false;
    }
    newPasswordverify(data);
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
    <div id="newForgotPassword">
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
                  marginTop: "50px",
                  marginBottom: "30px",
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
                    <h6 className="item-text">New Password</h6>
                    <input
                      ref={passwordInputRef}
                      className="textinput"
                      type="password"
                      name="last-name"
                      placeholder="Enter your Password"
                    />
                    {isPassword && (
                      <Alert variant={"danger"}>
                        Your password must be at least 8 characters long, should
                        contain at least one number and special character have a
                        mixture of uppercase and lowercase letters.
                      </Alert>
                    )}
                  </div>

                  <div className="input-item">
                    <h6 className="item-text">Confirm Password</h6>
                    <input
                      ref={confirmPasswordInputRef}
                      className="textinput"
                      type="password"
                      name="last-name"
                      placeholder="Enter your Password"
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
                      Please Check Your Credentials to Change the Password{" "}
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
                      Password Changed Successfully{" "}
                    </p>
                  )}

                  <button
                    onClick={formSubmitHandler}
                    disabled={isLoading}
                    className="btn btn-warning
                                w-100 "
                    type="button"
                  >
                    {loadingRef ? "Loading…" : " Submit"}
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
