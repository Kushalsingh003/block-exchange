import React from "react";
import { useRef, useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import { Alert } from "react-bootstrap";

export default function Signup() {
  const emailInputRef = useRef();
  const emailPasswordInputRef = useRef();
  const emailReferralIdInputRef = useRef();
  const phoneNumberInputRef = useRef();
  const phonePasswordInputRef = useRef();
  const phoneReferralIdInputRef = useRef();
  const countryCodeInputRef = useRef();
  const router = useRouter();
  const [error, setError] = useState(false);
  const [verify, setVerify] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [loadingRef, setLoadingRef] = useState(false);
  const [referral, setReferral] = useState(false);
  const [passwordType, setPasswordType] = useState("password");
  const [passwordInput, setPasswordInput] = useState("");
  
  const handlePasswordChange = (evnt) => {
    setPasswordInput(evnt.target.value);
  };

  
  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
  };

  function simulateNetworkRequest() {
    return new Promise((resolve) => setTimeout(resolve, 4000));
  }

  async function emailregsitration(data) {
    try {
      let res = await axios.post("/api/signup/signupEmailApi", data);
      const response = res.data;
      console.log(response, "to get the response from the api for email");
      toast.success("Verification code sent to your email!!");
      setError(false);
      setVerify(true);
      setIsLoading(true);
      setLoadingRef(true);
      setIsPassword(false);
      setTimeout(() => {
        router.push("/signup/otpSignup");
      }, 1000);
    } catch (err) {
      console.log(err);
      toast.error("User already exist! Please login below");
      setError(true);
      setVerify(false);
      setLoadingRef(false);
      setIsLoading(false);
      setIsPassword(false);
    }
  }

  async function emailFormSubmitHandler(event) {
    event.preventDefault();

    var regularExpression =
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

    const email = emailInputRef.current.value;
    const password = emailPasswordInputRef.current.value;
    const referralId = emailReferralIdInputRef.current.value;

    localStorage.setItem("email", email);

    if (!email || !password || !email.includes('@')) {
      toast.error("Please provide the credentials");
      return;
    }

    const data = {
      email,
      password,
      // referralId: referralIdData,
    };

    console.log(data, "data entered by the user for email");

    if (!regularExpression.test(password)) {
      setIsPassword(true);
      setLoadingRef(false);
      setIsLoading(false);
      setError(false);
      return false;
    }
    if (referralId){
      setError(false);
      setReferral(true);
      toast.error("Invalid Referral Id")
      return
    }

    emailregsitration(data);
    setIsLoading(true);
    setLoadingRef(true);
  }

  async function phoneregistration(data) {
    try {
      let res = await axios.post("/api/signup/signupPhnApi", data);
      const response = res.data;
      console.log(response, "to get the response from api for phone");
      setError(false);
      setVerify(true);
      setIsLoading(true);
      setLoadingRef(true);
      setIsPassword(false);
      toast.success("successfull!!");
      setTimeout(() => {
        router.push("/signup/otpPhnSignup");
      }, 1000);
    } catch (err) {
      console.log(err);
      toast.error("Invadid Credentials");
      setError(true);
      setVerify(false);
      setLoadingRef(false);
      setIsLoading(false);
      setIsPassword(false);
    }
  }

  async function phoneFormSubmitHandler(event) {
    event.preventDefault();

    const phone = phoneNumberInputRef.current.value;
    const password = phonePasswordInputRef.current.value;
    const countryCode = countryCodeInputRef.current.value;
    // const phnReferralIdData = phoneReferralIdInputRef.current.value;

    localStorage.setItem("phone", phone);

    if (!phone || !password) {
      toast.error("Please provide the credentials");
      setIsLoading(false);
      return;
    }

    const data = {
     phone,
     password,
     countryCode,
    };
    console.log(data, "data entered by the user for phone");
   phoneregistration(data)
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
    <div id="signUp">
      <div className="dark-overlay">
      <section className="login-form">
        <ToastContainer />
        <div className="container">
          <div className="row justify-content-center">
            <form className="input-sec ">
              <h3 className="heading-text"> Create Personal Account </h3>

              <ul
                className="nav nav-tabs p-0 "
                id="myTab"
                role="tablist"
                style={{
                  padding: "0px !important",
                  marginTop: "2rem !important",
                }}
              >
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link login-head active"
                    style={{ marginRight: "24px !important" }}
                    id="login-head"
                    data-bs-toggle="tab"
                    data-bs-target="#signmail"
                    type="button"
                    role="tab"
                    aria-controls="signmail"
                    aria-selected="false"
                  >
                    Email
                  </button>
                </li>

                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link login-head "
                    id="login-head"
                    data-bs-toggle="tab"
                    data-bs-target="#signphone"
                    type="button"
                    role="tab"
                    aria-controls="signphone"
                    aria-selected="false"
                  >
                    Phone Number
                  </button>
                </li>
              </ul>

              {/* Email Form starts from Here */}

              <div className="tab-content" id="myTabContent">
                <div
                  className="tab-pane fade show active"
                  id="signmail"
                  role="tabpanel"
                  aria-labelledby="signmail-tab"
                >
                  <div className="input-item">
                    <h6 className="item-text">Personal Email</h6>
                    <input
                      ref={emailInputRef}
                      required
                      className="textinput"
                      type="email"
                      name="username"
                      placeholder="Enter your Email"
                    />
                  </div>

                  <div className="input-item">
                    <h6 className="item-text">Password</h6>
                    <input
                      ref={emailPasswordInputRef}
                      required
                      className="textinput"
                      type={passwordType}
                      onChange={handlePasswordChange}
                      name="last-name"
                      placeholder="Enter your Password"
                    />
                     <span onClick={togglePassword}>
                      {passwordType === "password" ? (
                        <svg
                          id="eye"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="w-6 h-6"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                          />
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                      ) : (
                        <svg
                          id="eye"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                          />
                        </svg>
                      )}
                    </span>
                    
                    {isPassword && (
                      <Alert variant={"danger"}>
                        Your password must be at least 8 characters long, should
                        contain at least one number and special character have a
                        mixture of uppercase and lowercase letters.
                      </Alert>
                    )}
                  </div>

                  <div className="input-item">
                    <h6 className="item-text">Referral ID (Optional)</h6>
                    <input
                      ref={emailReferralIdInputRef}
                      className="textinput"
                      type="text"
                      name="last-name"
                      placeholder="Enter your Password"
                    />
                  </div>

                  <div className="input-item d-flex">
                    <input
                      className="form-check-input check-btn"
                      required
                      type="checkbox"
                      value=""
                      id="flexCheckDefault"
                    />
                    <label
                      className="form-check-label term-text"
                      htmlFor="flexCheckDefault"
                    >
                      I have read and agree to Block Exchange’s{" "}
                      <a className="check-link" href="">
                        {" "}
                        Terms of Service
                      </a>{" "}
                      and{" "}
                      <a className="check-link" href="">
                        {" "}
                        Privacy Policy.{" "}
                      </a>
                    </label>
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
                      User Already Exist! Please LogIn Below{" "}
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
                      Verification Code Sent to Your Registered Email{" "}
                    </p>
                  )}
                   {referral && (
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
                      Invalid Referral Id{" "}
                    </p>
                  )}

                  <button
                    onClick={emailFormSubmitHandler}
                    disabled={isLoading}
                    className="btn btn-warning
                    w-100 "
                    type="button"
                  >
                    {loadingRef ? "Loading…" : " Create Personal Account"}
                    {/* Create Personal Account{" "} */}
                  </button>
                  <div className="input-item">
                    <h4 className="account-text">
                      {" "}
                      Already have an account?{" "}
                      <a href="/login/login" className="personal-text">
                        {" "}
                        Login
                      </a>{" "}
                    </h4>
                  </div>
                </div>

                {/* Phone Number Form starts form Here */}
                <div
                  className="tab-pane fade show "
                  id="signphone"
                  role="tabpanel"
                  aria-labelledby="signphone-tab"
                >
                  <div className="input-item">
                    <h6 className="item-text">Personal Phone Number</h6>
                    <div className="input-div">
                      <select
                        ref={countryCodeInputRef}
                        className="textinput"
                        style={{
                          marginRight: "10px !important",
                          width: "40%",
                          color: "white",
                        }}
                        name="countryCode"
                        id="phone"
                      >
                        <option data-countrycode="GB" value="44">
                          India(+91)
                        </option>
                        <option data-countrycode="US" value="1">
                          USA (+1)
                        </option>
                        <optgroup label="Other countries">
                          <option data-countrycode="DZ" value="213">
                            Algeria (+213)
                          </option>
                          <option data-countrycode="AD" value="376">
                            Andorra (+376)
                          </option>
                          <option data-countrycode="AO" value="244">
                            Angola (+244)
                          </option>
                          <option data-countrycode="AI" value="1264">
                            Anguilla (+1264)
                          </option>
                          <option data-countrycode="AG" value="1268">
                            Antigua &amp; Barbuda (+1268)
                          </option>
                          <option data-countrycode="AR" value="54">
                            Argentina (+54)
                          </option>
                          <option data-countrycode="AM" value="374">
                            Armenia (+374)
                          </option>
                          <option data-countrycode="AW" value="297">
                            Aruba (+297)
                          </option>
                          <option data-countrycode="AU" value="61">
                            Australia (+61)
                          </option>
                          <option data-countrycode="AT" value="43">
                            Austria (+43)
                          </option>
                          <option data-countrycode="AZ" value="994">
                            Azerbaijan (+994)
                          </option>
                          <option data-countrycode="BS" value="1242">
                            Bahamas (+1242)
                          </option>
                          <option data-countrycode="BH" value="973">
                            Bahrain (+973)
                          </option>
                          <option data-countrycode="BD" value="880">
                            Bangladesh (+880)
                          </option>
                          <option data-countrycode="BB" value="1246">
                            Barbados (+1246)
                          </option>
                          <option data-countrycode="BY" value="375">
                            Belarus (+375)
                          </option>
                          <option data-countrycode="BE" value="32">
                            Belgium (+32)
                          </option>
                          <option data-countrycode="BZ" value="501">
                            Belize (+501)
                          </option>
                          <option data-countrycode="BJ" value="229">
                            Benin (+229)
                          </option>
                          <option data-countrycode="BM" value="1441">
                            Bermuda (+1441)
                          </option>
                          <option data-countrycode="BT" value="975">
                            Bhutan (+975)
                          </option>
                          <option data-countrycode="BO" value="591">
                            Bolivia (+591)
                          </option>
                          <option data-countrycode="BA" value="387">
                            Bosnia Herzegovina (+387)
                          </option>
                          <option data-countrycode="BW" value="267">
                            Botswana (+267)
                          </option>
                          <option data-countrycode="BR" value="55">
                            Brazil (+55)
                          </option>
                          <option data-countrycode="BN" value="673">
                            Brunei (+673)
                          </option>
                          <option data-countrycode="BG" value="359">
                            Bulgaria (+359)
                          </option>
                          <option data-countrycode="BF" value="226">
                            Burkina Faso (+226)
                          </option>
                          <option data-countrycode="BI" value="257">
                            Burundi (+257)
                          </option>
                          <option data-countrycode="KH" value="855">
                            Cambodia (+855)
                          </option>
                          <option data-countrycode="CM" value="237">
                            Cameroon (+237)
                          </option>
                          <option data-countrycode="CA" value="1">
                            Canada (+1)
                          </option>
                          <option data-countrycode="CV" value="238">
                            Cape Verde Islands (+238)
                          </option>
                          <option data-countrycode="KY" value="1345">
                            Cayman Islands (+1345)
                          </option>
                          <option data-countrycode="CF" value="236">
                            Central African Republic (+236)
                          </option>
                          <option data-countrycode="CL" value="56">
                            Chile (+56)
                          </option>
                          <option data-countrycode="CN" value="86">
                            China (+86)
                          </option>
                          <option data-countrycode="CO" value="57">
                            Colombia (+57)
                          </option>
                          <option data-countrycode="KM" value="269">
                            Comoros (+269)
                          </option>
                          <option data-countrycode="CG" value="242">
                            Congo (+242)
                          </option>
                          <option data-countrycode="CK" value="682">
                            Cook Islands (+682)
                          </option>
                          <option data-countrycode="CR" value="506">
                            Costa Rica (+506)
                          </option>
                          <option data-countrycode="HR" value="385">
                            Croatia (+385)
                          </option>
                          <option data-countrycode="CU" value="53">
                            Cuba (+53)
                          </option>
                          <option data-countrycode="CY" value="90392">
                            Cyprus North (+90392)
                          </option>
                          <option data-countrycode="CY" value="357">
                            Cyprus South (+357)
                          </option>
                          <option data-countrycode="CZ" value="42">
                            Czech Republic (+42)
                          </option>
                          <option data-countrycode="DK" value="45">
                            Denmark (+45)
                          </option>
                          <option data-countrycode="DJ" value="253">
                            Djibouti (+253)
                          </option>
                          <option data-countrycode="DM" value="1809">
                            Dominica (+1809)
                          </option>
                          <option data-countrycode="DO" value="1809">
                            Dominican Republic (+1809)
                          </option>
                          <option data-countrycode="EC" value="593">
                            Ecuador (+593)
                          </option>
                          <option data-countrycode="EG" value="20">
                            Egypt (+20)
                          </option>
                          <option data-countrycode="SV" value="503">
                            El Salvador (+503)
                          </option>
                          <option data-countrycode="GQ" value="240">
                            Equatorial Guinea (+240)
                          </option>
                          <option data-countrycode="ER" value="291">
                            Eritrea (+291)
                          </option>
                          <option data-countrycode="EE" value="372">
                            Estonia (+372)
                          </option>
                          <option data-countrycode="ET" value="251">
                            Ethiopia (+251)
                          </option>
                          <option data-countrycode="FK" value="500">
                            Falkland Islands (+500)
                          </option>
                          <option data-countrycode="FO" value="298">
                            Faroe Islands (+298)
                          </option>
                          <option data-countrycode="FJ" value="679">
                            Fiji (+679)
                          </option>
                          <option data-countrycode="FI" value="358">
                            Finland (+358)
                          </option>
                          <option data-countrycode="FR" value="33">
                            France (+33)
                          </option>
                          <option data-countrycode="GF" value="594">
                            French Guiana (+594)
                          </option>
                          <option data-countrycode="PF" value="689">
                            French Polynesia (+689)
                          </option>
                          <option data-countrycode="GA" value="241">
                            Gabon (+241)
                          </option>
                          <option data-countrycode="GM" value="220">
                            Gambia (+220)
                          </option>
                          <option data-countrycode="GE" value="7880">
                            Georgia (+7880)
                          </option>
                          <option data-countrycode="DE" value="49">
                            Germany (+49)
                          </option>
                          <option data-countrycode="GH" value="233">
                            Ghana (+233)
                          </option>
                          <option data-countrycode="GI" value="350">
                            Gibraltar (+350)
                          </option>
                          <option data-countrycode="GR" value="30">
                            Greece (+30)
                          </option>
                          <option data-countrycode="GL" value="299">
                            Greenland (+299)
                          </option>
                          <option data-countrycode="GD" value="1473">
                            Grenada (+1473)
                          </option>
                          <option data-countrycode="GP" value="590">
                            Guadeloupe (+590)
                          </option>
                          <option data-countrycode="GU" value="671">
                            Guam (+671)
                          </option>
                          <option data-countrycode="GT" value="502">
                            Guatemala (+502)
                          </option>
                          <option data-countrycode="GN" value="224">
                            Guinea (+224)
                          </option>
                          <option data-countrycode="GW" value="245">
                            Guinea - Bissau (+245)
                          </option>
                          <option data-countrycode="GY" value="592">
                            Guyana (+592)
                          </option>
                          <option data-countrycode="HT" value="509">
                            Haiti (+509)
                          </option>
                          <option data-countrycode="HN" value="504">
                            Honduras (+504)
                          </option>
                          <option data-countrycode="HK" value="852">
                            Hong Kong (+852)
                          </option>
                          <option data-countrycode="HU" value="36">
                            Hungary (+36)
                          </option>
                          <option data-countrycode="IS" value="354">
                            Iceland (+354)
                          </option>
                          <option data-countrycode="IN" value="91">
                            India (+91)
                          </option>
                          <option data-countrycode="ID" value="62">
                            Indonesia (+62)
                          </option>
                          <option data-countrycode="IR" value="98">
                            Iran (+98)
                          </option>
                          <option data-countrycode="IQ" value="964">
                            Iraq (+964)
                          </option>
                          <option data-countrycode="IE" value="353">
                            Ireland (+353)
                          </option>
                          <option data-countrycode="IL" value="972">
                            Israel (+972)
                          </option>
                          <option data-countrycode="IT" value="39">
                            Italy (+39)
                          </option>
                          <option data-countrycode="JM" value="1876">
                            Jamaica (+1876)
                          </option>
                          <option data-countrycode="JP" value="81">
                            Japan (+81)
                          </option>
                          <option data-countrycode="JO" value="962">
                            Jordan (+962)
                          </option>
                          <option data-countrycode="KZ" value="7">
                            Kazakhstan (+7)
                          </option>
                          <option data-countrycode="KE" value="254">
                            Kenya (+254)
                          </option>
                          <option data-countrycode="KI" value="686">
                            Kiribati (+686)
                          </option>
                          <option data-countrycode="KP" value="850">
                            Korea North (+850)
                          </option>
                          <option data-countrycode="KR" value="82">
                            Korea South (+82)
                          </option>
                          <option data-countrycode="KW" value="965">
                            Kuwait (+965)
                          </option>
                          <option data-countrycode="KG" value="996">
                            Kyrgyzstan (+996)
                          </option>
                          <option data-countrycode="LA" value="856">
                            Laos (+856)
                          </option>
                          <option data-countrycode="LV" value="371">
                            Latvia (+371)
                          </option>
                          <option data-countrycode="LB" value="961">
                            Lebanon (+961)
                          </option>
                          <option data-countrycode="LS" value="266">
                            Lesotho (+266)
                          </option>
                          <option data-countrycode="LR" value="231">
                            Liberia (+231)
                          </option>
                          <option data-countrycode="LY" value="218">
                            Libya (+218)
                          </option>
                          <option data-countrycode="LI" value="417">
                            Liechtenstein (+417)
                          </option>
                          <option data-countrycode="LT" value="370">
                            Lithuania (+370)
                          </option>
                          <option data-countrycode="LU" value="352">
                            Luxembourg (+352)
                          </option>
                          <option data-countrycode="MO" value="853">
                            Macao (+853)
                          </option>
                          <option data-countrycode="MK" value="389">
                            Macedonia (+389)
                          </option>
                          <option data-countrycode="MG" value="261">
                            Madagascar (+261)
                          </option>
                          <option data-countrycode="MW" value="265">
                            Malawi (+265)
                          </option>
                          <option data-countrycode="MY" value="60">
                            Malaysia (+60)
                          </option>
                          <option data-countrycode="MV" value="960">
                            Maldives (+960)
                          </option>
                          <option data-countrycode="ML" value="223">
                            Mali (+223)
                          </option>
                          <option data-countrycode="MT" value="356">
                            Malta (+356)
                          </option>
                          <option data-countrycode="MH" value="692">
                            Marshall Islands (+692)
                          </option>
                          <option data-countrycode="MQ" value="596">
                            Martinique (+596)
                          </option>
                          <option data-countrycode="MR" value="222">
                            Mauritania (+222)
                          </option>
                          <option data-countrycode="YT" value="269">
                            Mayotte (+269)
                          </option>
                          <option data-countrycode="MX" value="52">
                            Mexico (+52)
                          </option>
                          <option data-countrycode="FM" value="691">
                            Micronesia (+691)
                          </option>
                          <option data-countrycode="MD" value="373">
                            Moldova (+373)
                          </option>
                          <option data-countrycode="MC" value="377">
                            Monaco (+377)
                          </option>
                          <option data-countrycode="MN" value="976">
                            Mongolia (+976)
                          </option>
                          <option data-countrycode="MS" value="1664">
                            Montserrat (+1664)
                          </option>
                          <option data-countrycode="MA" value="212">
                            Morocco (+212)
                          </option>
                          <option data-countrycode="MZ" value="258">
                            Mozambique (+258)
                          </option>
                          <option data-countrycode="MN" value="95">
                            Myanmar (+95)
                          </option>
                          <option data-countrycode="NA" value="264">
                            Namibia (+264)
                          </option>
                          <option data-countrycode="NR" value="674">
                            Nauru (+674)
                          </option>
                          <option data-countrycode="NP" value="977">
                            Nepal (+977)
                          </option>
                          <option data-countrycode="NL" value="31">
                            Netherlands (+31)
                          </option>
                          <option data-countrycode="NC" value="687">
                            New Caledonia (+687)
                          </option>
                          <option data-countrycode="NZ" value="64">
                            New Zealand (+64)
                          </option>
                          <option data-countrycode="NI" value="505">
                            Nicaragua (+505)
                          </option>
                          <option data-countrycode="NE" value="227">
                            Niger (+227)
                          </option>
                          <option data-countrycode="NG" value="234">
                            Nigeria (+234)
                          </option>
                          <option data-countrycode="NU" value="683">
                            Niue (+683)
                          </option>
                          <option data-countrycode="NF" value="672">
                            Norfolk Islands (+672)
                          </option>
                          <option data-countrycode="NP" value="670">
                            Northern Marianas (+670)
                          </option>
                          <option data-countrycode="NO" value="47">
                            Norway (+47)
                          </option>
                          <option data-countrycode="OM" value="968">
                            Oman (+968)
                          </option>
                          <option data-countrycode="PW" value="680">
                            Palau (+680)
                          </option>
                          <option data-countrycode="PA" value="507">
                            Panama (+507)
                          </option>
                          <option data-countrycode="PG" value="675">
                            Papua New Guinea (+675)
                          </option>
                          <option data-countrycode="PY" value="595">
                            Paraguay (+595)
                          </option>
                          <option data-countrycode="PE" value="51">
                            Peru (+51)
                          </option>
                          <option data-countrycode="PH" value="63">
                            Philippines (+63)
                          </option>
                          <option data-countrycode="PL" value="48">
                            Poland (+48)
                          </option>
                          <option data-countrycode="PT" value="351">
                            Portugal (+351)
                          </option>
                          <option data-countrycode="PR" value="1787">
                            Puerto Rico (+1787)
                          </option>
                          <option data-countrycode="QA" value="974">
                            Qatar (+974)
                          </option>
                          <option data-countrycode="RE" value="262">
                            Reunion (+262)
                          </option>
                          <option data-countrycode="RO" value="40">
                            Romania (+40)
                          </option>
                          <option data-countrycode="RU" value="7">
                            Russia (+7)
                          </option>
                          <option data-countrycode="RW" value="250">
                            Rwanda (+250)
                          </option>
                          <option data-countrycode="SM" value="378">
                            San Marino (+378)
                          </option>
                          <option data-countrycode="ST" value="239">
                            Sao Tome &amp; Principe (+239)
                          </option>
                          <option data-countrycode="SA" value="966">
                            Saudi Arabia (+966)
                          </option>
                          <option data-countrycode="SN" value="221">
                            Senegal (+221)
                          </option>
                          <option data-countrycode="CS" value="381">
                            Serbia (+381)
                          </option>
                          <option data-countrycode="SC" value="248">
                            Seychelles (+248)
                          </option>
                          <option data-countrycode="SL" value="232">
                            Sierra Leone (+232)
                          </option>
                          <option data-countrycode="SG" value="65">
                            Singapore (+65)
                          </option>
                          <option data-countrycode="SK" value="421">
                            Slovak Republic (+421)
                          </option>
                          <option data-countrycode="SI" value="386">
                            Slovenia (+386)
                          </option>
                          <option data-countrycode="SB" value="677">
                            Solomon Islands (+677)
                          </option>
                          <option data-countrycode="SO" value="252">
                            Somalia (+252)
                          </option>
                          <option data-countrycode="ZA" value="27">
                            South Africa (+27)
                          </option>
                          <option data-countrycode="ES" value="34">
                            Spain (+34)
                          </option>
                          <option data-countrycode="LK" value="94">
                            Sri Lanka (+94)
                          </option>
                          <option data-countrycode="SH" value="290">
                            St. Helena (+290)
                          </option>
                          <option data-countrycode="KN" value="1869">
                            St. Kitts (+1869)
                          </option>
                          <option data-countrycode="SC" value="1758">
                            St. Lucia (+1758)
                          </option>
                          <option data-countrycode="SD" value="249">
                            Sudan (+249)
                          </option>
                          <option data-countrycode="SR" value="597">
                            Suriname (+597)
                          </option>
                          <option data-countrycode="SZ" value="268">
                            Swaziland (+268)
                          </option>
                          <option data-countrycode="SE" value="46">
                            Sweden (+46)
                          </option>
                          <option data-countrycode="CH" value="41">
                            Switzerland (+41)
                          </option>
                          <option data-countrycode="SI" value="963">
                            Syria (+963)
                          </option>
                          <option data-countrycode="TW" value="886">
                            Taiwan (+886)
                          </option>
                          <option data-countrycode="TJ" value="7">
                            Tajikstan (+7)
                          </option>
                          <option data-countrycode="TH" value="66">
                            Thailand (+66)
                          </option>
                          <option data-countrycode="TG" value="228">
                            Togo (+228)
                          </option>
                          <option data-countrycode="TO" value="676">
                            Tonga (+676)
                          </option>
                          <option data-countrycode="TT" value="1868">
                            Trinidad &amp; Tobago (+1868)
                          </option>
                          <option data-countrycode="TN" value="216">
                            Tunisia (+216)
                          </option>
                          <option data-countrycode="TR" value="90">
                            Turkey (+90)
                          </option>
                          <option data-countrycode="TM" value="7">
                            Turkmenistan (+7)
                          </option>
                          <option data-countrycode="TM" value="993">
                            Turkmenistan (+993)
                          </option>
                          <option data-countrycode="TC" value="1649">
                            Turks &amp; Caicos Islands (+1649)
                          </option>
                          <option data-countrycode="TV" value="688">
                            Tuvalu (+688)
                          </option>
                          <option data-countrycode="UG" value="256">
                            Uganda (+256)
                          </option>
                          <option data-countrycode="GB" value="44">
                            UK (+44)
                          </option>
                          <option data-countrycode="UA" value="380">
                            Ukraine (+380)
                          </option>
                          <option data-countrycode="AE" value="971">
                            United Arab Emirates (+971)
                          </option>
                          <option data-countrycode="UY" value="598">
                            Uruguay (+598)
                          </option>
                          <option data-countrycode="US" value="1">
                            USA (+1)
                          </option>
                          <option data-countrycode="UZ" value="7">
                            Uzbekistan (+7)
                          </option>
                          <option data-countrycode="VU" value="678">
                            Vanuatu (+678)
                          </option>
                          <option data-countrycode="VA" value="379">
                            Vatican City (+379)
                          </option>
                          <option data-countrycode="VE" value="58">
                            Venezuela (+58)
                          </option>
                          <option data-countrycode="VN" value="84">
                            Vietnam (+84)
                          </option>
                          <option data-countrycode="VG" value="84">
                            Virgin Islands - British (+1284)
                          </option>
                          <option data-countrycode="VI" value="84">
                            Virgin Islands - US (+1340)
                          </option>
                          <option data-countrycode="WF" value="681">
                            Wallis &amp; Futuna (+681)
                          </option>
                          <option data-countrycode="YE" value="969">
                            Yemen (North)(+969)
                          </option>
                          <option data-countrycode="YE" value="967">
                            Yemen (South)(+967)
                          </option>
                          <option data-countrycode="ZM" value="260">
                            Zambia (+260)
                          </option>
                          <option data-countrycode="ZW" value="263">
                            Zimbabwe (+263)
                          </option>
                        </optgroup>
                      </select>

                      <input
                        ref={phoneNumberInputRef}
                        required
                        className="textinput"
                        type="text"
                        name="username"
                        placeholder="number"
                      />
                    </div>
                  </div>

                  <div className="input-item">
                    <h6 className="item-text">Password</h6>
                    <input
                      ref={phonePasswordInputRef}
                      required
                      className="textinput"
                      type="password"
                      name="last-name"
                      placeholder="Enter your Password"
                    />
                  </div>

                  <div className="input-item">
                    <h6 className="item-text">Referral ID (Optional)</h6>
                    <input
                      ref={phoneReferralIdInputRef}
                      className="textinput"
                      type="text"
                      name="last-name"
                      placeholder="Enter your Password"
                    />
                  </div>

                  <div className="input-item d-flex">
                    <input
                      className="form-check-input check-btn"
                      required
                      type="checkbox"
                      value=""
                      id="flexCheckDefault"
                    />
                    <label
                      className="form-check-label term-text"
                      htmlFor="flexCheckDefault"
                    >
                      I have read and agree to Block Exchange’s{" "}
                      <a className="check-link" href="">
                        {" "}
                        Terms of Service
                      </a>{" "}
                      and{" "}
                      <a className="check-link" href="">
                        {" "}
                        Privacy Policy.{" "}
                      </a>
                    </label>
                  </div>

                  <button
                    onClick={(e)=>phoneFormSubmitHandler(e)}
                    disabled={isLoading}
                    className="btn btn-warning w-100 singUpButton "
                    type="button"
                    style={{ radius: "100px" }}
                  >
                    Create Personal Account{" "}
                  </button>
                  <div className="input-item">
                    <h4 className="account-text">
                      {" "}
                      Already have an account?{" "}
                      <a href="/login/login" className="personal-text">
                        {" "}
                        Login
                      </a>{" "}
                    </h4>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
    </div>
  );
}
