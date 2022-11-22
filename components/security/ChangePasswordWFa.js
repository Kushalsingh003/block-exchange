import React from "react";
import { useRef, useState,useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import { Alert } from "react-bootstrap";

export default function ChangePassword() {
  const oldPasswordInputRef = useRef();
  const newPasswordInputRef = useRef();
  const confirmPasswordInputRef = useRef();
  const googleAuthenticatorCodeInputRef = useRef();
  const router = useRouter();
  const [error, setError] = useState(false);
  const [verify, setVerify] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingRef, setLoadingRef] = useState(false);
  const [isPasswordOld, setIsPasswordOld] = useState(false);
  const [isPasswordNew, setIsPasswordNew] = useState(false);

  function simulateNetworkRequest() {
    return new Promise((resolve) => setTimeout(resolve, 4000));
  }

  async function changepassword(data) {
    try {
      const token = localStorage.getItem("token");
      console.log(token, "to get token from localStorage");
      let res = await axios.post("/api/security/changePasswordWFa", {token: token, data});
      const response = res.data;
      console.log(response, "to get the response from api to change the password")
      toast.success("Password has been changed successfully");
      setError(false);
      setVerify(true);
      setIsLoading(true);
      setLoadingRef(true);
      setIsPasswordOld(false);
      setIsPasswordNew(false);
      setTimeout(() => {
        router.push("/dashboard");
      }, 1000);
    } catch (err) {
      console.log(err);
      const errorStatus1 = err?.response.data.Error;
      console.log(errorStatus1, "to check the status ")
      if(errorStatus1.status == 400) {
      toast.error("Invalid Old Password");
      }
      else {
        toast.error("Invalid Verification Code")
      }
      setError(true);
      setVerify(false);
      setLoadingRef(false);
      setIsLoading(false);
      setIsPasswordOld(false);
      setIsPasswordNew(false);
      }
  }

  async function formSubmitHandler(event) {
    event.preventDefault();

    var regularExpression =
    /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    var regularExpression1 =
    /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

    const password = oldPasswordInputRef.current.value;
    const newPassword = newPasswordInputRef.current.value;
    const confirmPassword = confirmPasswordInputRef.current.value;
    const otp = googleAuthenticatorCodeInputRef.current.value;

    if (!password || !newPassword || !confirmPassword || !otp ){
      setError(false)
      toast.error ("Please Fill all the details")
    }
    

    if (newPassword != confirmPassword) {
      setError(false);
      toast.error("Password Doesn't Match");
      return;
    }

    if (password == newPassword) {
      setError(false);
      toast.error("Old and New Password can't Be Same")
      return;
    }

    const data = {
      password,
      newPassword,
      confirmPassword,
      otp
    };

    console.log(data, "data entered by the user to change the password")

    if (!regularExpression.test(password)) {
      setIsPasswordOld(true);
      setIsPasswordNew(false);
      setLoadingRef(false);
      setIsLoading(false);
      setError(false);
      return false;
    }
    if (!regularExpression1.test(newPassword)) {
      setIsPasswordNew(true);
      setIsPasswordOld(false);
      setLoadingRef(false);
      setIsLoading(false);
      setError(false);
      return false;
    }

    changepassword(data);
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
    <div id="changePasswordWithFa">
      <section className="login-form">
        <ToastContainer />
        <div className="container">
          <div className="row justify-content-center">
            <form onSubmit={formSubmitHandler} className="input-sec ">
              <h3 className="heading-text" style={{textAlign:"center"}}> Change Password </h3>

              {/* Email Form starts from Here */}

              <div className="tab-content" id="myTabContent">
                <div
                  className="tab-pane fade show active"
                  id="signmail"
                  role="tabpanel"
                  aria-labelledby="signmail-tab"
                >
                  <div className="input-item">
                    <h6 className="item-text">Old Password</h6>
                    <input
                      ref={oldPasswordInputRef}
                      // required
                      className="textinput form-input"
                      type="password"
                      name="username"
                      placeholder="Enter your old Password"
                    />
                    {isPasswordOld && (
                      <Alert variant={"danger"}>
                        Your password must be at least 8 characters long, should
                        contain at least one number and special character have a
                        mixture of uppercase and lowercase letters.
                      </Alert>
                    )}
                  </div>

                  <div className="input-item">
                    <h6 className="item-text">New Password</h6>
                    <input
                      ref={newPasswordInputRef}
                      // required
                      className="textinput"
                      type="password"
                      name="last-name"
                      placeholder="Enter your New Password"
                    />
                     {isPasswordNew && (
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
                      // required
                      className="textinput"
                      type="password"
                      name="last-name"
                      placeholder="Confirm your  Password"
                    />
                  </div>

                  <div className="input-item">
                    <h6 className="item-text">Google Authenticator Code</h6>
                    <input
                      ref={googleAuthenticatorCodeInputRef}
                      // required
                      className="textinput"
                      type="password"
                      name="last-name"
                      placeholder="Enter Google Authenticator Code"
                    />
                  </div>

                  <button
                    disabled={isLoading}
                    className="btn btn-warning
                    w-100 "
                    id="mt-setting"
                    type="submit"
                  >
                   {loadingRef ? "Loading…" : "Confirm"}
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
