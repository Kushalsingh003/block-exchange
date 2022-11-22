import React, { useRef } from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Link from "next/link";
import { toast } from "react-toastify";
// import { data } from "jquery";

const Dashboard = () => {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState();
  const [userOtherInfo, setUserOtherInfo] = useState();
  const [profilePic, setProfilePic] = useState();
  const [nickName, setNickName] = useState();
  const nickNameInputRef = useRef();

  async function nickname(data) {
    try {
      const token = localStorage.getItem("token");
      console.log(
        token,
        "to get the token from local stroage to get the nick name"
      );
      const res = await axios.post("api/dashboard/getNickName", {
        token: token,
        data,
      });
      const response = res.data;
      console.log(response, "to get the reponse from api to get the nick name");
      router.reload("/dashboard");
      console.log(response.data.data, "to get the nickname");
      setNickName(response.data.data);
    } catch (err) {
      console.log(err);
    }
  }

  async function onSubmitHandler(event) {
    event.preventDefault();

    const nickName = nickNameInputRef.current.value;

    if (!nickName) {
      toast.error("Please provide the nick name for your profile");
      return;
    }

    const data = {
      nickName,
    };

    nickname(data);
  }

  async function getUserData() {
    const token = localStorage.getItem("token");
    console.log(token, "to get the token from localstorage to get user data");
    const res = await axios.post("/api/dashboard/getUserInfoApi", {
      token: token,
    });
    const response = res.data;
    console.log(
      response,
      "to get the response from api to get the user Profile"
    );
    console.log(response.data.data.data, "to see the user Infor");
    console.log(response.data.data, "to see the user Other Info");
    setUserInfo(response.data.data.data);
    setUserOtherInfo(response.data.data);
  }

  async function getProfilePic() {
    try {
      const token = localStorage.getItem("token");
      console.log(token, "to get the token from the local Storage");
      const res = await axios.post("/api/settings/getProfilePic", {
        token: token,
      });
      const response = res.data;
      console.log(response, "to get response from api to get avatar");
      const getProfile = response.data.data.data.avatar;
      setProfilePic(getProfile);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getUserData();
    getProfilePic();
  }, []);

  function depositPage() {
    router.push("/payment/deposit");
  }

  function withdrawPage() {
    router.push("/payment/withdraw");
  }

  function buyCryptoPage() {
    router.push("/payment/buyCrypto");
  }
  async function onClickHandler() {
    localStorage.clear();
  }

  const testEmail = userOtherInfo?.email;
  console.log(testEmail, "to get the email");

  const obsecureEmail = (email) => {
    const [name, domain] = email?.split("@");
    return `${name[0]}${new Array(name.length).join("*")}@${domain}`;
  };

  const email = obsecureEmail(`${testEmail}`);
  console.log(email, "to get email");

  return (
    <div id="dashboard">
      <header>
        <nav className="navbar top-nav navbar-expand-lg navbar-dark ">
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
              <ul className="navbar-nav">
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="navbarDropdownMenuLink"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <img className="nine-sequare" src="/9sequare.png" />
                  </a>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdownMenuLink"
                  >
                    <li>
                      <a className="dropdown-item" href="#">
                        Action
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Another action
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Something else here
                      </a>
                    </li>
                  </ul>
                </li>

                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="navbarDropdownMenuLink"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Buy Crypto{" "}
                    <img style={{ marginTop: "-2px" }} src="/arp-shape.png" />
                  </a>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdownMenuLink"
                  >
                    <li>
                      <a className="dropdown-item" href="#">
                        Action
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Another action
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Something else here
                      </a>
                    </li>
                  </ul>
                </li>

                <li className="nav-item">
                  <a className="nav-link " aria-current="page" href="#">
                    Markets
                  </a>
                </li>

                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="navbarDropdownMenuLink"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Trade
                  </a>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdownMenuLink"
                  >
                    <li>
                      <a className="dropdown-item" href="#">
                        Action
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Another action
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Something else here
                      </a>
                    </li>
                  </ul>
                </li>

                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="navbarDropdownMenuLink"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Derivatives
                  </a>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdownMenuLink"
                  >
                    <li>
                      <a className="dropdown-item" href="#">
                        Action
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Another action
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Something else here
                      </a>
                    </li>
                  </ul>
                </li>

                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="navbarDropdownMenuLink"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Earn
                  </a>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdownMenuLink"
                  >
                    <li>
                      <a className="dropdown-item" href="#">
                        Action
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Another action
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Something else here
                      </a>
                    </li>
                  </ul>
                </li>

                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="navbarDropdownMenuLink"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Finance
                  </a>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdownMenuLink"
                  >
                    <li>
                      <a className="dropdown-item" href="#">
                        Action
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Another action
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Something else here
                      </a>
                    </li>
                  </ul>
                </li>

                <li className="nav-item">
                  <a className="nav-link " aria-current="page" href="#">
                    NFT <img src="/new-shape.png" />
                  </a>
                </li>
              </ul>
              <div
                className="d-flex wallet-part"
                id="nav-item"
                style={{ marginLeft: "auto" }}
              >
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      href="/dashboard"
                      id="navbarDropdownMenuLink"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Dashboard
                    </a>
                  </li>

                  <li className="nav-item dropdown nav-none">
                    <a
                      className="nav-link dropdown-toggle"
                      href="#"
                      id="navbarDropdownMenuLink"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Orders
                    </a>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="navbarDropdownMenuLink"
                    >
                      <li>
                        <a className="dropdown-item" href="#">
                          Action
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          Another action
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          Something else here
                        </a>
                      </li>
                    </ul>
                  </li>

                  <li className="nav-item dropdown nav-none">
                    <a
                      className="nav-link dropdown-toggle"
                      href="#"
                      id="navbarDropdownMenuLink"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <i
                        className="fa
                      fa-user"
                      ></i>
                    </a>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="navbarDropdownMenuLink"
                    >
                      <li>
                        <a
                          className="dropdown-item"
                          href="#"
                          style={{ fontSize: "16px" }}
                        >
                          <img
                            src={profilePic}
                            id="profile-dropdown"
                            className="avatar-profile"
                          />
                          {userInfo?.fullname}
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="/kycPage">
                          KYC
                        </a>
                      </li>
                      <li>
                        <a
                          onClick={onClickHandler}
                          className="dropdown-item"
                          href="/"
                        >
                          Logout
                        </a>
                      </li>
                    </ul>
                  </li>

                  <li className="nav-item">
                    <a
                      className="nav-link nav-none"
                      aria-current="page"
                      href="#"
                    >
                      {" "}
                      <i className="fa fa-bell"></i>
                    </a>
                  </li>

                  <li className="nav-item">
                    <a className="nav-link " aria-current="page" href="#">
                      Downloads
                    </a>
                  </li>

                  <li className="nav-item">
                    <a className="nav-link " aria-current="page" href="#">
                      English
                    </a>
                  </li>

                  <li className="nav-item">
                    <a className="nav-link " aria-current="page" href="#">
                      USD
                    </a>
                  </li>

                  <li className="nav-item">
                    <a
                      className="nav-link nav-none"
                      id="nav-icons"
                      aria-current="page"
                      href="#"
                    >
                      <img src="/question-icon.png" />
                    </a>
                  </li>

                  <li className="nav-item">
                    <a
                      className="nav-link "
                      id="nav-icons"
                      aria-current="page"
                      href="#"
                    >
                      <img src="/setting-icon.png" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </nav>
      </header>

      <div className="main-sec">
        <div className=" container-fluid">
          <div className="row">
            <div className="col-md-2 dleft-sec">
              <ul className="dleft-ul nav nav-tabs" id="myTab">
                <li className="nav-item" role="presentation" id="present-id">
                  <button
                    className="nav-link dashboard-link active"
                    id="board-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#dashboard"
                    type="button"
                    role="tab"
                    aria-controls="first"
                    aria-selected="true"
                  >
                    {/* <!-- <img src="/profile4.png" style="margin-right:5px; margin-top: -2px; width: 5%;"/>  --> */}
                    <i className="fa fa-house"></i> Dashboard{" "}
                  </button>
                </li>
                <li className="nav-item" role="presentation" id="present-id">
                  <button
                    className="nav-link dashboard-link "
                    id="dash-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#profile"
                    type="button"
                    role="tab"
                    aria-controls="profile"
                    aria-selected="true"
                  >
                    <img src="/profile4.png" className="profile-icon" />
                    Profile{" "}
                  </button>
                </li>

                <li className="nav-item" role="presentation" id="present-id">
                  <button
                    className="nav-link dashboard-link "
                    id="security-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#security"
                    type="button"
                    role="tab"
                    aria-controls="security"
                    aria-selected="true"
                  >
                    <i
                      className="fa fa-lock"
                      style={{ marginRight: "5px" }}
                    ></i>{" "}
                    Security
                  </button>
                </li>

                <li className="nav-item" role="presentation" id="present-id">
                  <button
                    className="nav-link dashboard-link "
                    id="setting-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#setting"
                    type="button"
                    role="tab"
                    aria-controls="first"
                    aria-selected="true"
                  >
                    {/* <!-- <img src="/profile4.png" style="margin-right:5px; margin-top: -2px; width: 5%;"/> --> */}
                    <i
                      className="fa fa-gear"
                      style={{ marginRight: "5px" }}
                    ></i>
                    Setting
                  </button>
                </li>
              </ul>
            </div>

            <div className="col-md-10 dright-sec">
              <div className="tab-content" id="myTabContent">
                {/* ................Dashboard tab............... */}
                <div
                  className="tab-pane fade show active"
                  id="dashboard"
                  role="tabpanel"
                  aria-labelledby="dashboard-tab"
                >
                  <div className="bitcoin-sec" id="dashboard-btcs">
                    <div className="dp-item">
                      <img src={profilePic} className="avatar-profile" />
                    </div>

                    <nav
                      className="navbar btc-nav navbar-expand-lg navbar-dark
                    "
                      id="dashboard-nav"
                    >
                      {/* <!-- 
            <button className="navbar-toggler" type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNavDropdown"
              aria-controls="navbarNavDropdown" aria-expanded="false"
              aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button> --> */}
                      <h2 className="anon-text">
                        {userInfo?.fullname}
                        {/* <button
                          type="button"
                          className="btn btn-secondary anon-btn"
                        >
                          
                        </button> */}
                      </h2>
                      <div
                        className="collapse navbar-collapse navbar-show"
                        id="navbarNavDropdown"
                      >
                        <ul className="navbar-nav nav-direction" id="left-li">
                          <li className="nav-item" id="user-idt">
                            <h2 className="btc-text">User ID </h2>
                            <h4 className="doller-setting">
                              {userInfo?.userId}
                            </h4>
                          </li>

                          <li className="nav-item">
                            <h2 className="btc-text">User Type</h2>
                            <h4 className="doller-setting">Regular User</h4>
                          </li>

                          <li className="nav-item">
                            <h2 className="btc-text">Twitter</h2>
                            <h4 className="doller-setting">not linked</h4>
                          </li>
                          <li className="nav-item">
                            <h2 className="btc-text">Last login time</h2>
                            <h4 className="doller-setting">
                              {userInfo?.updatedAt}
                            </h4>
                          </li>
                        </ul>
                      </div>
                    </nav>
                  </div>

                  <div className="col-md-8 balance-sheet">
                    <div className="balance-part">
                      <h3 className="balance-text">
                        Estimated Balance <img src="/eye-icon.png" />{" "}
                      </h3>
                      <div className="d-flex deposit-sec">
                        <button
                          type="button"
                          onClick={depositPage}
                          className="btn btn-secondary dash-btn
                        active"
                        >
                          Deposit
                        </button>

                        <button
                          type="button"
                          onClick={withdrawPage}
                          className="btn btn-secondary dash-btn"
                        >
                          Withdraw
                        </button>
                        <button
                          type="button"
                          onClick={buyCryptoPage}
                          className="btn btn-secondary dash-btn"
                        >
                          Buy Crypto
                        </button>
                      </div>
                    </div>

                    <h3 className="realbtc-text">
                      0.00006500 BTC{" "}
                      <span className="doller-balance"> ≈ $1.33 </span>{" "}
                    </h3>

                    <div id="piechart">
                      <div style={{ position: "relative" }}>
                        <div
                          dir="ltr"
                          style={{
                            position: "relative",
                            width: "550px",
                            height: "400px",
                          }}
                        >
                          <div
                            aria-label="A chart."
                            style={{
                              position: "absolute",
                              left: "0px",
                              top: "0px",
                              width: "100%",
                              height: "100%",
                            }}
                          >
                            <svg
                              width="550"
                              height="400"
                              aria-label="A chart."
                              style={{ overflow: "hidden" }}
                            >
                              <defs id="_ABSTRACT_RENDERER_ID_0">
                                <filter id="_ABSTRACT_RENDERER_ID_1">
                                  <feGaussianBlur
                                    in="SourceAlpha"
                                    stdDeviation="2"
                                  ></feGaussianBlur>
                                  <feOffset dx="1" dy="1"></feOffset>
                                  <feComponentTransfer>
                                    <feFuncA
                                      type="linear"
                                      slope="0.1"
                                    ></feFuncA>
                                  </feComponentTransfer>
                                  <feMerge>
                                    <feMergeNode></feMergeNode>
                                    <feMergeNode in="SourceGraphic"></feMergeNode>
                                  </feMerge>
                                </filter>
                              </defs>
                              <rect
                                x="0"
                                y="0"
                                width="550"
                                height="400"
                                stroke="none"
                                strokeWidth="0"
                                fill="#ffffff"
                              ></rect>
                              <g>
                                <rect
                                  x="334"
                                  y="77"
                                  width="111"
                                  height="88"
                                  stroke="none"
                                  strokeWidth="0"
                                  fillOpacity="0"
                                  fill="#ffffff"
                                ></rect>
                                <g column-id="Work">
                                  <rect
                                    x="334"
                                    y="77"
                                    width="111"
                                    height="12"
                                    stroke="none"
                                    strokeWidth="0"
                                    fillOpacity="0"
                                    fill="#ffffff"
                                  ></rect>
                                  <g>
                                    <text
                                      textAnchor="start"
                                      x="351"
                                      y="87.2"
                                      fontFamily="Arial"
                                      fontSize="12"
                                      stroke="none"
                                      strokeWidth="0"
                                      fill="#fff"
                                    >
                                      Work
                                    </text>
                                  </g>
                                  <circle
                                    cx="340"
                                    cy="83"
                                    r="6"
                                    stroke="none"
                                    strokeWidth="0"
                                    fill="#3366cc"
                                  ></circle>
                                </g>
                                <g column-id="Eat">
                                  <rect
                                    x="334"
                                    y="96"
                                    width="111"
                                    height="12"
                                    stroke="none"
                                    strokeWidth="0"
                                    fillOpacity="0"
                                    fill="#ffffff"
                                  ></rect>
                                  <g>
                                    <text
                                      textAnchor="start"
                                      x="351"
                                      y="106.2"
                                      fontFamily="Arial"
                                      fontSize="12"
                                      stroke="none"
                                      strokeWidth="0"
                                      fill="#fff"
                                    >
                                      Eat
                                    </text>
                                  </g>
                                  <circle
                                    cx="340"
                                    cy="102"
                                    r="6"
                                    stroke="none"
                                    strokeWidth="0"
                                    fill="#dc3912"
                                  ></circle>
                                </g>
                                <g column-id="TV">
                                  <rect
                                    x="334"
                                    y="115"
                                    width="111"
                                    height="12"
                                    stroke="none"
                                    strokeWidth="0"
                                    fillOpacity="0"
                                    fill="#ffffff"
                                  ></rect>
                                  <g>
                                    <text
                                      textAnchor="start"
                                      x="351"
                                      y="125.2"
                                      fontFamily="Arial"
                                      fontSize="12"
                                      stroke="none"
                                      strokeWidth="0"
                                      fill="#fff"
                                    >
                                      TV
                                    </text>
                                  </g>
                                  <circle
                                    cx="340"
                                    cy="121"
                                    r="6"
                                    stroke="none"
                                    strokeWidth="0"
                                    fill="#ff9900"
                                  ></circle>
                                </g>
                                <g column-id="Gym">
                                  <rect
                                    x="334"
                                    y="134"
                                    width="111"
                                    height="12"
                                    stroke="none"
                                    strokeWidth="0"
                                    fillOpacity="0"
                                    fill="#ffffff"
                                  ></rect>
                                  <g>
                                    <text
                                      textAnchor="start"
                                      x="351"
                                      y="144.2"
                                      fontFamily="Arial"
                                      fontSize="12"
                                      stroke="none"
                                      strokeWidth="0"
                                      fill="#fff"
                                    >
                                      Gym
                                    </text>
                                  </g>
                                  <circle
                                    cx="340"
                                    cy="140"
                                    r="6"
                                    stroke="none"
                                    strokeWidth="0"
                                    fill="#109618"
                                  ></circle>
                                </g>
                                <g column-id="Sleep">
                                  <rect
                                    x="334"
                                    y="153"
                                    width="111"
                                    height="12"
                                    stroke="none"
                                    strokeWidth="0"
                                    fillOpacity="0"
                                    fill="#ffffff"
                                  ></rect>
                                  <g>
                                    <text
                                      textAnchor="start"
                                      x="351"
                                      y="163.2"
                                      fontFamily="Arial"
                                      fontSize="12"
                                      stroke="none"
                                      strokeWidth="0"
                                      fill="#fff"
                                    >
                                      Sleep
                                    </text>
                                  </g>
                                  <circle
                                    cx="340"
                                    cy="159"
                                    r="6"
                                    stroke="none"
                                    strokeWidth="0"
                                    fill="#990099"
                                  ></circle>
                                </g>
                              </g>
                              <g>
                                <path
                                  d="M210,201L210,96A105,105,0,0,1,300.93266739736606,253.5L210,201A0,0,0,0,0,210,201"
                                  stroke="#ffffff"
                                  strokeWidth="1"
                                  fill="#3366cc"
                                ></path>
                                <text
                                  textAnchor="start"
                                  x="258.1414476000689"
                                  y="167.59056769269827"
                                  fontFamily="Arial"
                                  fontSize="12"
                                  stroke="none"
                                  strokeWidth="0"
                                  fill="#ffffff"
                                >
                                  33.3%
                                </text>
                              </g>
                              <g>
                                <path
                                  d="M210,201L300.93266739736606,253.5A105,105,0,0,1,262.5,291.93266739736606L210,201A0,0,0,0,0,210,201"
                                  stroke="#ffffff"
                                  strokeWidth="1"
                                  fill="#dc3912"
                                ></path>
                                <text
                                  textAnchor="start"
                                  x="252.40392219814441"
                                  y="261.1039221981444"
                                  fontFamily="Arial"
                                  fontSize="12"
                                  stroke="none"
                                  strokeWidth="0"
                                  fill="#ffffff"
                                >
                                  8.3%
                                </text>
                              </g>
                              <g>
                                <path
                                  d="M210,201L119.06733260263394,253.5A105,105,0,0,1,210,96L210,201A0,0,0,0,0,210,201"
                                  stroke="#ffffff"
                                  strokeWidth="1"
                                  fill="#990099"
                                ></path>
                                <text
                                  textAnchor="start"
                                  x="127.85855239993109"
                                  y="167.5905676926983"
                                  fontFamily="Arial"
                                  fontSize="12"
                                  stroke="none"
                                  strokeWidth="0"
                                  fill="#ffffff"
                                >
                                  33.3%
                                </text>
                              </g>

                              <g>
                                <path
                                  d="M210,201L157.50000000000003,291.93266739736606A105,105,0,0,1,119.06733260263391,253.49999999999994L210,201A0,0,0,0,0,210,201"
                                  stroke="#ffffff"
                                  strokeWidth="1"
                                  fill="#109618"
                                ></path>
                                <text
                                  textAnchor="start"
                                  x="140.59607780185559"
                                  y="261.1039221981444"
                                  fontFamily="Arial"
                                  fontSize="12"
                                  stroke="none"
                                  strokeWidth="0"
                                  fill="#ffffff"
                                >
                                  8.3%
                                </text>
                              </g>
                              <g>
                                <path
                                  d="M210,201L262.5,291.93266739736606A105,105,0,0,1,157.50000000000003,291.93266739736606L210,201A0,0,0,0,0,210,201"
                                  stroke="#ffffff"
                                  strokeWidth="1"
                                  fill="#ff9900"
                                ></path>
                                <text
                                  textAnchor="start"
                                  x="193.00000000000003"
                                  y="290.63303560529965"
                                  fontFamily="Arial"
                                  fontSize="12"
                                  stroke="none"
                                  strokeWidth="0"
                                  fill="#ffffff"
                                >
                                  16.7%
                                </text>
                              </g>
                              <g></g>
                            </svg>
                            <div
                              aria-label="A tabular
                            representation of the data in the chart."
                              style={{
                                position: "absolute",
                                left: "-10000px",
                                top: "auto",
                                width: "1px",
                                height: "1px",
                                overflow: "hidden",
                              }}
                            >
                              <table>
                                <thead>
                                  <tr>
                                    <th>Task</th>
                                    <th>Hours per Day</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td>Work</td>
                                    <td>8</td>
                                  </tr>
                                  <tr>
                                    <td>Eat</td>
                                    <td>2</td>
                                  </tr>
                                  <tr>
                                    <td>TV</td>
                                    <td>4</td>
                                  </tr>
                                  <tr>
                                    <td>Gym</td>
                                    <td>2</td>
                                  </tr>
                                  <tr>
                                    <td>Sleep</td>
                                    <td>8</td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                        <div
                          aria-hidden="true"
                          style={{
                            display: "none",
                            position: "absolute",
                            top: "410px",
                            left: "560px",
                            whiteSpace: "nowrap",
                            fontFamily: "Arial",
                            fontSize: "12px",
                          }}
                        >
                          Sleep
                        </div>
                        <div></div>
                      </div>
                    </div>
                    <h3 className="balance-text">
                      Markets <img src="/eye-icon.png" />
                    </h3>

                    <ul className="dleft-ul nav nav-tabs mt-3" id="myTab">
                      <li className="nav-item" role="presentation">
                        <button
                          className="nav-link market-link active"
                          id="spot-tab"
                          data-bs-toggle="tab"
                          data-bs-target="#spot"
                          type="button"
                          role="tab"
                          aria-controls="first"
                          aria-selected="true"
                        >
                          Spot Holdings{" "}
                        </button>
                      </li>
                      <li className="nav-item" role="presentation">
                        <button
                          className="nav-link market-link "
                          id="hot-tab"
                          data-bs-toggle="tab"
                          data-bs-target="#hot"
                          type="button"
                          role="tab"
                          aria-controls="first"
                          aria-selected="true"
                        >
                          <img src="/sky-icon.png" /> Hot{" "}
                        </button>
                      </li>
                      <li className="nav-item" role="presentation">
                        <button
                          className="nav-link market-link "
                          id="first-tab"
                          data-bs-toggle="tab"
                          data-bs-target="#first"
                          type="button"
                          role="tab"
                          aria-controls="first"
                          aria-selected="true"
                        >
                          Favotite{" "}
                        </button>
                      </li>
                    </ul>

                    <div className="tab-content" id="myTabContent">
                      <div
                        className="tab-pane fade show active"
                        id="spot"
                        role="tabpanel"
                        aria-labelledby="first-tab"
                      >
                        <table className="table number-table" id="market-table">
                          <thead>
                            <tr>
                              <th scope="col" className="market-sett ">
                                Name
                              </th>
                              <th scope="col" className="market-sett ">
                                Amount / Est.Value
                              </th>
                              <th scope="col" className="market-sett ">
                                Price
                              </th>
                              <th scope="col" className="market-sett ">
                                24H Change
                              </th>
                              <th scope="col" className="market-sett "></th>
                            </tr>
                          </thead>

                          <tbody className="market-body">
                            <tr className="market-tr">
                              <td
                                className="markete-settings pb-0"
                                style={{
                                  paddingTop: "13px",
                                  borderRadius: "8px 0 0 8px",
                                }}
                                id="market-td"
                              >
                                <img
                                  style={{ marginRight: "5px" }}
                                  src="/xrp-icon.png"
                                />{" "}
                                XRP <span className="market-span">Ripple</span>{" "}
                              </td>
                              <td
                                className="markets-settings pb-0"
                                id="market-td"
                              >
                                2.8 <br />{" "}
                                <span className="doller-span">≈$0.93 </span>
                              </td>
                              <td className="market-settings pb-0">$0.3303</td>
                              <td className="market-settings pb-0">
                                {" "}
                                <span className="market-green">+2.15%</span>
                              </td>
                              <td
                                className="market-settings pb-0"
                                style={{ borderRadius: "0 8px 8px 0" }}
                              >
                                <span className="trade-span">Trade </span>{" "}
                              </td>
                            </tr>
                            <tr className="market-tr">
                              <td
                                className="markete-settings pb-0"
                                style={{
                                  paddingTop: "13px",
                                  borderRadius: "8px 0 0 8px",
                                }}
                                id="market-td"
                              >
                                <img
                                  style={{ marginRight: "5px" }}
                                  src="/xrp-icon.png"
                                />{" "}
                                XRP <span className="market-span">Ripple</span>{" "}
                              </td>
                              <td
                                className="markets-settings pb-0"
                                id="market-td"
                              >
                                2.8 <br />{" "}
                                <span className="doller-span">≈$0.93</span>
                              </td>
                              <td className="market-settings pb-0">$0.3303</td>
                              <td className="market-settings pb-0">
                                {" "}
                                <span className="market-green">+2.15%</span>
                              </td>
                              <td
                                className="market-settings pb-0"
                                style={{
                                  borderRadius: "0 8px 8px 0",
                                }}
                              >
                                <span className="trade-span">Trade </span>{" "}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      <div
                        className="tab-pane fade show "
                        id="hot"
                        role="tabpanel"
                        aria-labelledby="hot-tab"
                      >
                        <table className="table number-table" id="market-table">
                          <thead>
                            <tr>
                              <th scope="col" className="market-sett ">
                                Name
                              </th>
                              <th scope="col" className="market-sett ">
                                Amount / Est.Value
                              </th>
                              <th scope="col" className="market-sett ">
                                Price
                              </th>
                              <th scope="col" className="market-sett ">
                                24H Change
                              </th>
                              <th scope="col" className="market-sett "></th>
                            </tr>
                          </thead>

                          <tbody className="market-body">
                            <tr className="market-tr">
                              <td
                                className="markete-settings pb-0"
                                style={{
                                  paddingTop: "13px",
                                  borderRadius: "8px 0 0 8px",
                                }}
                                id="market-td"
                              >
                                <img style={{ marginRight: "5px" }} src="" />{" "}
                                XRP
                                <span className="market-span">Ripple</span>{" "}
                              </td>
                              <td
                                className="markets-settings pb-0"
                                id="market-td"
                              >
                                {" "}
                                2.8 <br />{" "}
                                <span className="doller-span">≈$0.93 </span>
                              </td>
                              <td className="market-settings pb-0">$0.3303</td>
                              <td className="market-settings pb-0">
                                {" "}
                                <span className="market-green">+2.15%</span>
                              </td>
                              <td
                                className="market-settings pb-0"
                                style={{ borderRadius: "0 8px 8px 0" }}
                              >
                                <span className="trade-span">Trade </span>{" "}
                              </td>
                            </tr>

                            <tr className="market-tr">
                              <td
                                className="markete-settings pb-0"
                                style={{
                                  paddingTop: "13px",
                                  borderRadius: "8px 0 0 8px",
                                }}
                                id="market-td"
                              >
                                <img style={{ marginRight: "5px" }} src="" />{" "}
                                XRP
                                <span className="market-span">Ripple</span>
                              </td>
                              <td
                                className="markets-settings pb-0"
                                id="market-td"
                              >
                                {" "}
                                2.8 <br />{" "}
                                <span className="doller-span">≈$0.93 </span>
                              </td>
                              <td className="market-settings pb-0">$0.3303</td>
                              <td className="market-settings pb-0">
                                {" "}
                                <span className="market-green">+2.15%</span>
                              </td>
                              <td
                                className="market-settings pb-0"
                                style={{ borderRadius: "0 8px 8px 0" }}
                              >
                                <span className="trade-span">Trade </span>{" "}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-4 explore-sheet">
                    <h3 className="balance-text">Explore </h3>
                    <div className="input-group " id="group-set">
                      <span className="input-group-text dark-bg">
                        <img src="/search-icon.png" />
                      </span>
                      <input
                        type="text"
                        className="form-control dark-bg p-0"
                        placeholder="Search"
                        aria-label="Username"
                        aria-describedby="addon-wrapping"
                      />
                    </div>

                    <div
                      id="carouselExampleIndicators "
                      className="carousel
                            slide mt-4"
                      data-bs-ride="carousel"
                    >
                      <div
                        className="carousel-inner"
                        style={{ borderRadius: "4px" }}
                      >
                        <div className="carousel-item active">
                          <img
                            src="/download.jpeg"
                            className="d-block
                                  w-100"
                            alt="..."
                          />
                        </div>
                        <div className="carousel-item">
                          <img
                            src="/download.jpeg"
                            className="d-block
                                  w-100"
                            alt="..."
                          />
                        </div>
                        <div className="carousel-item">
                          <img
                            src="/download.jpeg"
                            className="d-block
                                  w-100"
                            alt="..."
                          />
                        </div>
                      </div>
                      <button
                        className="carousel-control-prev"
                        type="button"
                        data-bs-target="#carouselExampleIndicators"
                        data-bs-slide="prev"
                      >
                        <span
                          className="carousel-control-prev-icon"
                          aria-hidden="true"
                        ></span>
                        <span className="visually-hidden">Previous</span>
                      </button>
                      <button
                        className="carousel-control-next"
                        type="button"
                        data-bs-target="#carouselExampleIndicators"
                        data-bs-slide="next"
                      >
                        <span
                          className="carousel-control-next-icon"
                          aria-hidden="true"
                        ></span>
                        <span className="visually-hidden">Next</span>
                      </button>
                    </div>

                    <div className="trading-section">
                      <h4 className="trading-text">
                        New:0% fees onn Bitcoin trading
                      </h4>
                      <img style={{ width: "100%" }} src="/coin.png" />
                    </div>

                    <div className="service-sec">
                      <h3 className="balance-text"> More Service</h3>
                      <div className="service-part">
                        <div className="icon-item">
                          <img src="/learn-icon.png" />
                          <div className="text-item">
                            <h5 className="learn-txt">Learn and Earn</h5>
                            <p className="earn-paragraph">
                              Earn FREE crypto while you learn with Binance
                            </p>
                          </div>
                        </div>
                        <div className="sright-sec" id="sright-sec">
                          <img src="/right-arr.png" />
                        </div>
                      </div>

                      <div className="service-part">
                        <div className="icon-item">
                          <img src="/learn-icon.png" />
                          <div className="text-item">
                            <h5 className="learn-txt">Referral</h5>
                            <p className="earn-paragraph">
                              Earn up to 40% commission
                            </p>
                          </div>
                        </div>
                        <div className="sright-sec" id="sright-sec">
                          <img src="/right-arr.png" />
                        </div>
                      </div>

                      <div className="service-part">
                        <div className="icon-item">
                          <img src="/learn-icon.png" />
                          <div className="text-item">
                            <h5 className="learn-txt">Open Orders</h5>
                            <p className="earn-paragraph">
                              View all spot orders
                            </p>
                          </div>
                        </div>
                        <div className="sright-sec" id="sright-sec">
                          <img src="/right-arr.png" />
                        </div>
                      </div>

                      <div className="service-part">
                        <div className="icon-item">
                          <img src="/learn-icon.png" />
                          <div className="text-item">
                            <h5 className="learn-txt">Wallet Direct</h5>
                            <p className="earn-paragraph">
                              Transfer coins or tokens between Binance.com
                              account and Binance Chain Wallet.
                            </p>
                          </div>
                        </div>
                        <div className="sright-sec" id="sright-sec">
                          <img src="/right-arr.png" />
                        </div>
                      </div>
                    </div>
                    <h3
                      className="balance-text"
                      style={{ float: "left", marginTop: "60px" }}
                    >
                      Announcements <img src="/eye-icon.png" />{" "}
                    </h3>

                    <div
                      className="service-part mt-4"
                      style={{ border: "none!important" }}
                    >
                      <div className="icon-item">
                        <img src="/copy-icon.png" />
                        <div className="text-item">
                          <h5 className="learn-txt">
                            Binance Swap Farming Extends 75% Trading Fee Rebates
                            for BTC/BUSD, BTC/USDT & ETH/USDT Liquidity Pools
                          </h5>
                          <p className="earn-paragraph">2022-09-01</p>
                        </div>
                      </div>
                      <div className="sright-sec" id="sright-sec">
                        <img src="/right-arr.png" />
                      </div>
                    </div>

                    <div
                      className="service-part mt-4"
                      style={{ border: "none !important" }}
                    >
                      <div className="icon-item">
                        <img src="/copy-icon.png" />
                        <div className="text-item">
                          <h5 className="learn-txt">
                            Mid-Autumn Special: Share 50,000 BUSD by Collecting
                            Moon Rocks & Unlocking the Wishing Moon!
                          </h5>
                          <p className="earn-paragraph">2022-09-01</p>
                        </div>
                      </div>
                      <div className="sright-sec" id="sright-sec">
                        <img src="/right-arr.png" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* {/ ..................Security tab............................... /} */}
                <div
                  className="tab-pane fade show"
                  id="security"
                  role="tabpanel"
                  aria-labelledby="security-tab"
                >
                  <div className="bitcoin-sec" id="dashboard-btcs">
                    <nav
                      className="navbar btc-nav navbar-expand-lg
                            navbar-dark "
                      id="security-nav"
                    >
                      {/* <!-- 
           <button className="navbar-toggler" type="button"
             data-bs-toggle="collapse"
             data-bs-target="#navbarNavDropdown"
             aria-controls="navbarNavDropdown" aria-expanded="false"
             aria-label="Toggle navigation">
             <span className="navbar-toggler-icon"></span>
           </button> --> */}
                      <h2 className="security-text">Security </h2>

                      <div
                        className="collapse navbar-collapse navbar-show"
                        id="navbarNavDropdown"
                      >
                        <ul
                          className="navbar-nav nav-direction nav-responsive"
                          id="left-li"
                        >
                          <li
                            className="nav-item"
                            style={{ paddingLeft: "0px !important" }}
                            id="verify-item"
                          >
                            {userOtherInfo?.fa ? (
                              <h6 className="on-text">
                                {/*  <i class="fa-sharp fa-solid fa-circle-check" id="color-green"></i>
                                 */}
                                <i
                                  class="fa-sharp fa-solid fa-circle-check"
                                  id="color-green"
                                ></i>
                                Two Factor Authentication
                              </h6>
                            ) : (
                              <h6 className="on-text">
                                {/* <img src="/gray1-check.png" /> */}
                                <i
                                  class="fa-sharp fa-solid fa-circle-xmark"
                                  id="color-dark"
                                ></i>
                                Two Factor Authentication
                              </h6>
                            )}
                          </li>

                          <li className="nav-item" id="verify-item">
                            {userOtherInfo?.kyc ? (
                              <h6 className="on-text">
                                <i
                                  class="fa-sharp fa-solid fa-circle-check"
                                  id="color-green"
                                ></i>
                                Indentiy Verification
                              </h6>
                            ) : (
                              <h6 className="on-text">
                                {/* <img src="/gray1-check.png" /> */}
                                <i
                                  class="fa-sharp fa-solid fa-circle-xmark"
                                  id="color-dark"
                                ></i>
                                Identify Verification
                              </h6>
                            )}
                          </li>

                          {/* <li className="nav-item" id="verify-item">
                            <h4 className="verify-setting">
                              <img
                                className="check-circle"
                                src="/gray-check.png"
                              />

                              <a href="" className="verify-setting">
                                Anti-Phishing Code
                              </a>
                            </h4>
                          </li> */}
                          {/* <li className="nav-item" id="verify-item">
                            <h4 className="verify-setting">
                              <img
                                className="check-circle"
                                src="/gray-check.png"
                              />
                              <a href="" className="verify-setting">
                                Withdrawal Whitelist
                              </a>
                            </h4>
                          </li> */}
                        </ul>
                      </div>
                    </nav>

                    <img className="security-icon" src="/security-icon.png" />
                  </div>

                  <div className="col-md-12 balance-sheet" id="balance-sheet">
                    <div className="factor-sec">
                      <h2 className="factor-text">
                        Two-Factor Authentication (2FA)
                      </h2>
                      {/* <div className="security-sec">
                        <div className="biometric-sec">
                          <div className="biometric-part">
                            <img src="/biometric.png" />
                          </div>
                          <div className="bio-part">
                            <h4 className="biometric-text">
                              {" "}
                              Biometric Authentication/Security Key
                            </h4>
                            <p className="protect-text">
                              {" "}
                              Protect your account and withdrawals with a
                              security key such as Yubikey.
                            </p>
                          </div>
                        </div>

                        <div className="id-verify">
                          <h6 className="on-text">
                             <i class="fa-sharp fa-solid fa-circle-check" id="color-green"></i>
On
                          </h6>
                        </div>
                        <div className="manage-btns">
                          <button type="btn" className="btn manage-btn">
                            Manage
                          </button>
                        </div>
                      </div> */}

                      <div className="security-sec">
                        <div className="biometric-sec">
                          <div className="biometric-part">
                            <img src="/btc-icon.png" />
                          </div>
                          <div className="bio-part">
                            <h4 className="biometric-text">
                              {" "}
                              Binance/Google Authenticator (Recommended)
                            </h4>
                            <p className="protect-text mb-0">
                              {" "}
                              Protect your account and transactions.
                            </p>
                            <a href="" className="having-link mb-4">
                              Having trouble?
                            </a>
                          </div>
                        </div>

                        <div className="id-verify">
                          {userOtherInfo?.fa ? (
                            <h6 className="on-text">
                              {/*  <i class="fa-sharp fa-solid fa-circle-check" id="color-green"></i>
                               */}
                              <i
                                class="fa-sharp fa-solid fa-circle-check"
                                id="color-green"
                              ></i>
                              linked
                            </h6>
                          ) : (
                            <h6 className="on-text">
                              {/* <img src="/gray1-check.png" /> */}
                              <i
                                class="fa-sharp fa-solid fa-circle-xmark"
                                id="color-dark"
                              ></i>
                              Not Linked
                            </h6>
                          )}
                        </div>
                        <div className="manage-btns">
                          {userOtherInfo?.fa ? (
                            <a
                              role="link"
                              style={{
                                color: "#f0b60c",
                                backgroundColor: "#f0b60c",
                              }}
                              className="btn manage-btn"
                              type="btn"
                              aria-disabled="true"
                            >
                              {" "}
                              Disabled{" "}
                            </a>
                          ) : (
                            <a
                              href="/qrpages/qrscanner"
                              type="btn"
                              className="btn manage-btn"
                            >
                              Enable
                            </a>
                          )}
                        </div>
                      </div>

                      <div className="security-sec">
                        <div className="biometric-sec">
                          <div className="biometric-part">
                            <img src="/phone-icon.png" />
                          </div>
                          <div className="bio-part">
                            <h4 className="biometric-text">
                              {" "}
                              Phone Number Verification{" "}
                            </h4>
                            <p className="protect-text">
                              {" "}
                              Protect your account and transactions.
                            </p>
                          </div>
                        </div>

                        <div className="id-verify">
                          <h6 className="on-text">
                            <i
                              class="fa-sharp fa-solid fa-circle-check"
                              id="color-green"
                            ></i>
                            827****969
                          </h6>
                        </div>
                        <div className="manage-btns">
                          <button
                            type="btn"
                            className="btn manage-btn"
                            id="btn-margin"
                          >
                            Change
                          </button>
                          <button type="btn" className="btn manage-btn">
                            Remove
                          </button>
                        </div>
                      </div>

                      <div className="security-sec">
                        <div className="biometric-sec">
                          <div className="biometric-part">
                            <img src="/email-icon.png" />
                          </div>
                          <div className="bio-part">
                            <h4 className="biometric-text">
                              {" "}
                              Email Address Verification{" "}
                            </h4>
                            <p className="protect-text">
                              {" "}
                              Protect your account and transactions.
                            </p>
                          </div>
                        </div>

                        <div className="id-verify">
                          <h6 className="on-text">
                            <i
                              class="fa-sharp fa-solid fa-circle-check"
                              id="color-green"
                            ></i>
                            {email}
                          </h6>
                        </div>

                        <div className="manage-btns">
                          <Link href="/security/changeEmail">
                            <button
                              type="btn"
                              className="btn manage-btn"
                              id="btn-margin"
                            >
                              Change
                            </button>
                          </Link>
                          <button type="btn" className="btn manage-btn">
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="factor-sec">
                      <h2 className="factor-text">Advanced Security </h2>
                      <div className="security-sec">
                        <div className="biometric-sec">
                          <div className="biometric-part">
                            <img src="/login-icon.png" />
                          </div>
                          <div className="bio-part">
                            <h4 className="biometric-text"> Login Password</h4>
                            <p className="protect-text">
                              {" "}
                              Login password is used to log in to your account.
                            </p>
                          </div>
                        </div>
                        <div className="id-verify"></div>

                        <div className="manage-btns">
                          {/* <a
                            href="/security/changePassword"
                            type="btn"
                            className="btn manage-btn"
                          >
                            Change
                          </a> */}
                          {userOtherInfo?.fa ? (
                            <a
                              href="/security/changePasswordWFa"
                              type="btn"
                              className="btn manage-btn"
                            >
                              Chanage
                            </a>
                          ) : (
                            <a
                              href="/security/changePasswordWoFa"
                              type="btn"
                              className="btn manage-btn"
                            >
                              Change
                            </a>
                          )}
                        </div>
                      </div>

                      <div className="security-sec">
                        <div className="biometric-sec">
                          <div className="biometric-part">
                            {/* <img src="/login-icon.png" /> */}
                            <i
                              class="fa-solid fa-id-card"
                              id="profile-icons"
                            ></i>
                          </div>
                          <div className="bio-part">
                            <h4 className="biometric-text"> KYC Create</h4>
                            <p className="protect-text">
                              {" "}
                              KYC is used to log in to your account.
                            </p>
                          </div>
                        </div>
                        <div className="id-verify">
                          {/* <!-- <h6 className="on-text"><img style="margin-top:
                                    -4px;" src="/gray-check.png"/> OFF</h6> --> */}
                        </div>

                        <div className="manage-btns">
                          {userOtherInfo?.kyc ? (
                            <a
                              role="link"
                              style={{ color: "#f0b60c" }}
                              className="btn manage-btn"
                              type="text"
                              aria-disabled="true"
                            >
                              {" "}
                              Under Review{" "}
                            </a>
                          ) : (
                            <a
                              href="/verifyUser/kycPage"
                              type="btn"
                              className="btn manage-btn"
                            >
                              Enable
                            </a>
                          )}
                        </div>
                      </div>

                      <div className="bio-part mt-5">
                        <h4
                          className="biometric-text"
                          style={{ color: "#fff" }}
                        >
                          <img
                            style={{ marginRight: "20px" }}
                            src="/crypto-icon.png"
                          />
                          Crypto Withdrawal
                        </h4>
                      </div>

                      <div className="security-sec">
                        <div className="biometric-sec">
                          <div className="biometric-part">
                            {/* {/ <!-- <img src="/biometric.png"/> --> /} */}
                          </div>
                          <div className="bio-part">
                            <h4 className="step-text"> One-step Withdrawal</h4>

                            <p className="protect-text">
                              {" "}
                              When this function is turned on, you can withdraw
                              small amount crypto to whitelisted addresses
                              without passing 2FA verification
                            </p>
                          </div>
                        </div>
                        <div className="id-verify">
                          <h6 className="on-text">
                            <i
                              class="fa-sharp fa-solid fa-circle-xmark"
                              id="color-dark"
                              style={{ marginRight: "0px" }}
                            ></i>{" "}
                            OFF
                          </h6>
                        </div>
                        <div className="manage-btns">
                          <button type="btn" className="btn manage-btn">
                            Enable
                          </button>
                        </div>
                      </div>

                      <div className="security-sec">
                        <div className="biometric-sec">
                          <div className="biometric-part">
                            {/* {/ <!-- <img src="/biometric.png"/> --> /} */}
                          </div>
                          <div className="bio-part">
                            <h4 className="step-text">Withdrawal Whitelist</h4>
                            <p className="protect-text">
                              {" "}
                              Once this function is enabled, your account will
                              only be able to withdraw to addresses on your
                              whitelist.
                            </p>
                          </div>
                        </div>

                        <div className="id-verify">
                          <h6 className="on-text">
                            <i
                              class="fa-sharp fa-solid fa-circle-xmark"
                              id="color-dark"
                              style={{ marginRight: "0px" }}
                            ></i>{" "}
                            OFF
                          </h6>
                        </div>

                        <div className="manage-btns">
                          <button type="btn" className="btn manage-btn">
                            Enable
                          </button>
                        </div>
                      </div>

                      {/* <div className="security-sec">
                         <div className="biometric-sec">
                          <div className="biometric-part">
                            <img src="/anti-icon.png" />
                          </div>
                          <div className="bio-part">
                            <h4 className="biometric-text">
                              {" "}
                              Anti-Phishing Code
                            </h4>
                            <p className="protect-text">
                              {" "}
                              Protect your account from phishing attempts and
                              ensure that your notification emails are from
                              Binance only.
                            </p>
                          </div>
                        </div>

                         <div className="id-verify">
                          <h6 className="on-text">
                            <img
                              style={{ marginTop: "-4px" }}
                              src="/gray1-check.png"
                            />{" "}
                            OFF
                          </h6>
                        </div> 

                        <div className="manage-btns">
                          <button type="btn" className="btn manage-btn">
                            Enable
                          </button>
                        </div>
                      </div> */}
                    </div>

                    <div className="factor-sec">
                      <h2 className="factor-text">Devices and Activities</h2>
                      <div className="security-sec">
                        <div className="biometric-sec">
                          <div className="biometric-part">
                            <img src="/device-icon.png" />
                          </div>
                          <div className="bio-part">
                            <h4 className="biometric-text">
                              {" "}
                              Device Management
                            </h4>
                            <p className="protect-text">
                              {" "}
                              Manage devices allowed to access your account.{" "}
                            </p>
                          </div>
                        </div>
                        <div className="id-verify">
                          {/* <!-- <h6 className="on-text"><img style="margin-top:
                                    -4px;" src="/gray-check.png"/> OFF</h6> --> */}
                        </div>
                        <div className="manage-btns">
                          <button type="btn" className="btn manage-btn">
                            Manage
                          </button>
                        </div>
                      </div>

                      <div className="security-sec">
                        <div className="biometric-sec">
                          <div className="biometric-part">
                            <img src="/account-icon.png" />
                          </div>
                          <div className="bio-part">
                            <h4 className="biometric-text">
                              {" "}
                              Account Activity
                            </h4>
                            <p className="protect-text mb-0">
                              Last login: 2022-09-05 08:55:13{" "}
                            </p>
                            <p className="protect-text">
                              Suspicious account activity?{" "}
                              <a className="having-link" href="">
                                Disable account{" "}
                              </a>
                            </p>
                          </div>
                        </div>
                        <div className="id-verify">
                          {/* <!-- <h6 className="on-text"><img style="margin-top:
                                    -4px;" src="/gray-check.png"/> OFF</h6> --> */}
                        </div>
                        <div className="manage-btns">
                          <button type="btn" className="btn manage-btn">
                            More
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* ..............Profile Tab.................. */}
                <div
                  className="tab-pane fade show"
                  id="profile"
                  role="tabpanel"
                  aria-labelledby="profile-tab"
                >
                  <div className="bitcoin-sec" id="dashboard-setting">
                    <nav
                      className="navbar btc-nav navbar-expand-lg
                            navbar-dark "
                      id="security-nav"
                    >
                      {/* <!-- 
           <button className="navbar-toggler" type="button"
             data-bs-toggle="collapse"
             data-bs-target="#navbarNavDropdown"
             aria-controls="navbarNavDropdown" aria-expanded="false"
             aria-label="Toggle navigation">
             <span className="navbar-toggler-icon"></span>
           </button> --> */}
                      <h2 className="security-text">Profile </h2>

                      {/* <div
                        className="collapse navbar-collapse navbar-show"
                        id="navbarNavDropdown"
                      >
                        <ul
                          className="navbar-nav nav-direction nav-responsive"
                          id="left-li"
                        >
                          <li
                            className="nav-item"
                            style={{ paddingLeft: "0px !important" }}
                            id="verify-item"
                          >
                            <h4 className="verify-setting">
                              <img
                                className="check-circle"
                                src="/green-check.png"
                              />
                              Two-Factor Authentication (2FA)
                            </h4>
                          </li>

                          <li className="nav-item" id="verify-item">
                            <h4 className="verify-setting">
                              <img
                                className="check-circle"
                                src="/green-check.png"
                              />
                              Identity Verification
                            </h4>
                          </li>

                          <li className="nav-item" id="verify-item">
                            <h4 className="verify-setting">
                              <img
                                className="check-circle"
                                src="/gray-check.png"
                              />

                              <a href="" className="verify-setting">
                                Anti-Phishing Code
                              </a>
                            </h4>
                          </li>
                          <li className="nav-item" id="verify-item">
                            <h4 className="verify-setting">
                              <img
                                className="check-circle"
                                src="/gray-check.png"
                              />
                              <a href="" className="verify-setting">
                                Withdrawal Whitelist
                              </a>
                            </h4>
                          </li>
                        </ul>
                      </div> */}
                    </nav>

                    <img className="security-icon" src="/setting-yellow.png" />
                  </div>

                  <div className="col-md-12 balance-sheet" id="balance-sheet">
                    <div className="factor-sec">
                      {/* <h2 className="factor-text">
                        My Profile
                      </h2> */}
                      <div className="security-sec">
                        <div className="biometric-sec">
                          <div className="biometric-part">
                            <img src="/nick-icon.png" />
                          </div>
                          <div className="bio-part">
                            <h4 className="biometric-text"> Full Name</h4>
                            <p className="protect-text">
                              {" "}
                              Set a customized nickname for your profile.
                            </p>
                          </div>
                        </div>

                        <div className="id-verify">
                          <h6 className="on-text">{userInfo?.fullname}</h6>
                        </div>
                        <div className="manage-btns">
                          {/* <button type="btn" className="btn manage-btn">
                            Edit
                          </button> */}
                        </div>
                      </div>

                      <div className="security-sec">
                        <div className="biometric-sec">
                          <div className="biometric-part">
                            {/* <img src="/nick-icon.png" /> */}
                            <i class="fa-solid fa-globe" id="profile-icons"></i>
                          </div>
                          <div className="bio-part">
                            <h4 className="biometric-text"> Nationality</h4>
                            <p className="protect-text">
                              {" "}
                              Set a customized nationality for your profile.
                            </p>
                          </div>
                        </div>

                        <div className="id-verify">
                          <h6 className="on-text">{userInfo?.country}</h6>
                        </div>
                        <div className="manage-btns">
                          {/* <button type="btn" className="btn manage-btn">
                            Edit
                          </button> */}
                        </div>
                      </div>
                      <div className="security-sec">
                        <div className="biometric-sec">
                          <div className="biometric-part">
                            {/* <img src="/nick-icon.png" /> */}
                            <i
                              class="fa-solid fa-calendar-days"
                              id="profile-icons"
                            ></i>
                          </div>
                          <div className="bio-part">
                            <h4 className="biometric-text"> Date Of Birth</h4>
                            <p className="protect-text">
                              {" "}
                              Set a customized date of birth for your profile.
                            </p>
                          </div>
                        </div>

                        <div className="id-verify">
                          <h6 className="on-text">{userInfo?.dob}</h6>
                        </div>
                        <div className="manage-btns">
                          {/* <button type="btn" className="btn manage-btn">
                            Edit
                          </button> */}
                        </div>
                      </div>

                      <div className="security-sec">
                        <div className="biometric-sec">
                          <div className="biometric-part">
                            {/* <img src="/nick-icon.png" /> */}
                            <i
                              class="fa-solid fa-location-arrow"
                              id="profile-icons"
                            ></i>
                          </div>
                          <div className="bio-part">
                            <h4 className="biometric-text">
                              {" "}
                              Residential Address
                            </h4>
                            <p className="protect-text">
                              {" "}
                              Set a customized residential address for your
                              profile.
                            </p>
                          </div>
                        </div>

                        <div className="id-verify">
                          <h6 className="on-text">{userInfo?.address}</h6>
                        </div>
                        <div className="manage-btns">
                          {/* <button type="btn" className="btn manage-btn">
                            Edit
                          </button> */}
                        </div>
                      </div>

                      <div className="security-sec">
                        <div className="biometric-sec">
                          <div className="biometric-part">
                            {/* <img src="/nick-icon.png" /> */}
                            <i
                              class="fa-sharp fa-solid fa-location-dot"
                              id="profile-icons"
                            ></i>
                          </div>
                          <div className="bio-part">
                            <h4 className="biometric-text"> Pin</h4>
                            <p className="protect-text">
                              {" "}
                              Set a customized pin for your profile.
                            </p>
                          </div>
                        </div>

                        <div className="id-verify">
                          <h6 className="on-text">{userInfo?.pin}</h6>
                        </div>
                        <div className="manage-btns">
                          {/* <button type="btn" className="btn manage-btn">
                            Edit
                          </button> */}
                        </div>
                      </div>

                      <div className="security-sec">
                        <div className="biometric-sec">
                          <div className="biometric-part">
                            {/* <img src="/nick-icon.png" /> */}
                            {/* <i class="fa-solid fa-city" id="profile-icons"></i> */}
                            <i class="fa-solid fa-city" id="profile-icons"></i>
                          </div>
                          <div className="bio-part">
                            <h4 className="biometric-text"> City</h4>
                            <p className="protect-text">
                              {" "}
                              Set a customized city for your profile.
                            </p>
                          </div>
                        </div>

                        <div className="id-verify">
                          <h6 className="on-text">{userInfo?.city}</h6>
                        </div>
                        <div className="manage-btns">
                          {/* <button type="btn" className="btn manage-btn">
                            Edit
                          </button> */}
                        </div>
                      </div>

                      <div className="security-sec" id="li-item">
                        <div className="biometric-sec">
                          <div className="biometric-part">
                            {/* <img src="/nick-icon.png" /> */}
                          </div>
                          <div className="bio-part">
                            {/* <h4 className="biometric-text">
                              {" "}
                              Full Name
                            </h4> */}
                            {/* <p className="protect-text">
                              {" "}
                          Set a customized nickname for your profile.
                            </p> */}
                          </div>
                        </div>

                        <div className="id-verify">
                          {/* <h6 className="on-text">
                            Nikhil
                          </h6> */}
                        </div>
                        <div className="manage-btns">
                          <a
                            href="/verifyUser/updateProfile"
                            type="btn"
                            className="btn manage-btn "
                            id="profile-btns"
                          >
                            Edit Profile
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ...............Setting Tab.................. */}

                <div
                  className="tab-pane fade show"
                  id="setting"
                  role="tabpanel"
                  aria-labelledby="setting-tab"
                >
                  <div className="bitcoin-sec" id="dashboard-setting">
                    <nav
                      className="navbar btc-nav navbar-expand-lg
                            navbar-dark "
                      id="security-nav"
                    >
                      <h2 className="security-text">Setting </h2>
                    </nav>

                    <img className="security-icon" src="/setting-yellow.png" />
                  </div>

                  <div
                    class="modal fade"
                    id="exampleModalToggle"
                    aria-hidden="true"
                    aria-labelledby="exampleModalToggleLabel"
                    tabindex="-1"
                  >
                    <div class="modal-dialog modal-dialog-centered">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h5 class="modal-title" id="exampleModalToggleLabel">
                            Edit Nickname
                          </h5>
                          <button
                            type="button"
                            class="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          >
                            {" "}
                          </button>
                        </div>
                        <form onSubmit={onSubmitHandler}>
                          <div class="modal-body">
                            Set a customized nickname for your profile.
                            <div className="input-item " id="modal-items">
                              <h6 className="item-text">Nickname</h6>
                              <input
                                ref={nickNameInputRef}
                                defaultValue={userInfo?.nickName}
                                required
                                className="textinput"
                                type="text"
                                name="last-name"
                                placeholder="Enter Your Nickname"
                              />
                            </div>
                          </div>
                          <div class="modal-footer">
                            <button
                              class="btn modal-pbtns"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                            >
                              Close
                            </button>
                            <button
                              type="submit"
                              class="btn modal-btns"
                              // onClick={onSubmitHandler}
                            >
                              Save
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>

                  {/* <a class="btn btn-primary" data-bs-toggle="modal" href="#exampleModalToggle" role="button">Open first modal</a> */}

                  <div className="col-md-12 balance-sheet" id="balance-sheet">
                    <div className="factor-sec">
                      <h2 className="factor-text">My Profile</h2>
                      <div className="security-sec">
                        <div className="biometric-sec">
                          <div className="biometric-part">
                            <img src="/nick-icon.png" />
                          </div>
                          <div className="bio-part">
                            <h4 className="biometric-text"> Nickname</h4>
                            <p className="protect-text">
                              {" "}
                              Set a customized nickname for your profile.
                            </p>
                          </div>
                        </div>

                        <div className="id-verify">
                          <h6 className="on-text">
                            {/* Nikhil003 */}
                            {userInfo?.nickName}
                          </h6>
                        </div>
                        <div className="manage-btns">
                          <button
                            type="btn"
                            className="btn manage-btn"
                            data-bs-toggle="modal"
                            href="#exampleModalToggle"
                            role="button"
                          >
                            Edit
                          </button>
                        </div>
                      </div>

                      <div className="security-sec">
                        <div className="biometric-sec">
                          <div className="biometric-part">
                            <img src="/avatar-icon.png" />
                          </div>
                          <div className="bio-part">
                            <h4 className="biometric-text"> Avatar</h4>
                            <p className="protect-text ">
                              {" "}
                              Select an avatar to personalize your account. You
                              can purchase your own avatar in{" "}
                              <a href="" className="having-link mb-4">
                                NFT Marketplace
                              </a>
                            </p>
                          </div>
                        </div>

                        <div className="id-verify">
                          <h6 className="on-text">
                            <img className="avatar-profile" src={profilePic} />{" "}
                          </h6>
                        </div>
                        <div className="manage-btns">
                          <a
                            href="/settings/profilePic"
                            type="btn"
                            className="btn manage-btn"
                          >
                            Change
                          </a>
                        </div>
                      </div>

                      <div className="security-sec">
                        <div className="biometric-sec">
                          <div className="biometric-part">
                            <img src="/p2p.png" />
                          </div>
                          <div className="bio-part">
                            <h4 className="biometric-text">
                              {" "}
                              P2P Profile Settings{" "}
                            </h4>
                            <p className="protect-text">
                              {" "}
                              Edit your P2P nickname here.
                            </p>
                          </div>
                        </div>

                        <div className="id-verify">
                          {/* <h6 className="on-text">
                             <i class="fa-sharp fa-solid fa-circle-check" id="color-green"></i>
827****969
                          </h6> */}
                        </div>
                        <div className="manage-btns">
                          <button type="btn" className="btn manage-btn">
                            Manage
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="factor-sec pt-2">
                      <h2 className="factor-text">Preferences </h2>
                      <div className="security-sec">
                        <div className="biometric-sec">
                          <div className="biometric-part">
                            <img src="/order-icon.png" />
                          </div>
                          <div className="bio-part">
                            <h4 className="biometric-text">
                              {" "}
                              Order Confirmation Reminders
                            </h4>
                            <p className="protect-text">
                              {" "}
                              If the order reminder function is enabled, it will
                              need to be reconfirmed every time an order is
                              submitted.
                            </p>
                          </div>
                        </div>
                        <div className="id-verify">
                          <i
                            class="fa-sharp fa-solid fa-circle-check"
                            id="color-green"
                          ></i>

                          <h6 className="on-text">
                            Stop-Limit Order
                          </h6>
                        </div>

                        <div className="manage-btns">
                          <button type="btn" className="btn manage-btn">
                            Manage
                          </button>
                        </div>
                      </div>

                      <div className="bio-part mt-5">
                        <h4 className="biometric-text">
                          <img
                            style={{ marginRight: "20px" }}
                            src="/notification-icon.png"
                          />
                          Notification
                        </h4>
                      </div>

                      <div className="security-sec">
                        <div className="biometric-sec">
                          <div className="biometric-part">
                            {/* <!-- <img src="/biometric.png"/> --> */}
                          </div>
                          <div className="bio-part">
                            <h4 className="step-text">On-site Notifications</h4>
                            <p className="protect-text">
                              {" "}
                              Once enabled, you will receive relevant
                              notifications within the app and website.
                            </p>
                          </div>
                        </div>

                        <div className="id-verify">
                          <i
                            class="fa-sharp fa-solid fa-circle-check"
                            id="color-green"
                          ></i>
                          <h6 className="on-text">
                            {" "}
                            Activities,Trade Notification News,System
                            Messages
                          </h6>
                        </div>

                        <div className="manage-btns">
                          <button type="btn" className="btn manage-btn">
                            Enable
                          </button>
                        </div>
                      </div>

                      <div className="security-sec">
                        <div className="biometric-sec">
                          <div className="biometric-part">
                            {/* <!-- <img src="/biometric.png"/> --> */}
                          </div>
                          <div className="bio-part">
                            <h4 className="step-text">Marketing Emails</h4>
                            <p className="protect-text">
                              {" "}
                              Select whether you want to receive marketing
                              emails from us.
                            </p>
                          </div>
                        </div>

                        <div className="id-verify">
                          <i
                            class="fa-sharp fa-solid fa-circle-check"
                            id="color-green"
                          ></i>

                          <h6 className="on-text"> On</h6>
                        </div>

                        <div className="manage-btns">
                          <button type="btn" className="btn manage-btn">
                            Enable
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <!-- ////////////.................Footer......................//////////////////////////// --> */}
        <footer id="footer" className="footer">
          <div className="container" id="footer-container">
            <div className="row gy-4">
              <div className="col-lg-2 col-6 footer-links">
                <h4>About Us</h4>

                <ul>
                  <li>
                    <a href="#">About</a>
                  </li>
                  <li>
                    <a href="#">Careers</a>
                  </li>
                  <li>
                    <a href="#">Business Contact</a>
                  </li>
                  <li>
                    <a href="#">Community</a>
                  </li>
                  <li>
                    <a href="#">Blog</a>
                  </li>
                </ul>
              </div>

              <div className="col-lg-2 col-6 footer-links">
                <h4>Products</h4>
                <ul>
                  <li>
                    <a href="#">Exchange</a>
                  </li>
                  <li>
                    <a href="#">Academy</a>
                  </li>
                  <li>
                    <a href="#">Binance Live</a>
                  </li>
                  <li>
                    <a href="#">Charity</a>
                  </li>
                  <li>
                    <a href="#">Card</a>
                  </li>
                </ul>
              </div>
              <div className="col-lg-2 col-6 footer-links">
                <h4>Service</h4>
                <ul>
                  <li>
                    <a href="#">Download</a>
                  </li>
                  <li>
                    <a href="#">Buy Crypto</a>
                  </li>
                  <li>
                    <a href="#">Referral</a>
                  </li>
                  <li>
                    <a href="#">BNB</a>
                  </li>
                  <li>
                    <a href="#">Affiliate</a>
                  </li>
                </ul>
              </div>

              <div className="col-lg-2 col-6 footer-links">
                <h4>Support</h4>
                <ul>
                  <li>
                    <a href="#">Give Us Feedback</a>
                  </li>
                  <li>
                    <a href="#">Support Center</a>
                  </li>
                  <li>
                    <a href="#">Submit a request</a>
                  </li>
                  <li>
                    <a href="#">Trading Rules</a>
                  </li>
                  <li>
                    <a href="#">Binance Verify</a>
                  </li>
                </ul>
              </div>

              <div className="col-lg-2 col-6 footer-links">
                <h4>Our Services</h4>
                <ul>
                  <li>
                    <a href="#">Learn & Earn</a>
                  </li>
                  <li>
                    <a href="#">Buy BNB</a>
                  </li>
                  <li>
                    <a href="#">Buy BUSD</a>
                  </li>
                  <li>
                    <a href="#">Buy Bitcoin</a>
                  </li>
                  <li>
                    <a href="#">Buy Ethereum</a>
                  </li>
                </ul>
              </div>

              <div
                className="col-lg-2 col-6 footer-links
                      footer-contact text-center text-md-start"
              >
                <h4>Community</h4>
                <div className="social-links d-flex mt-2">
                  <a href="#" className="twitter">
                    <i class="fa-brands fa-twitter"></i>
                  </a>
                  <a href="#" className="facebook">
                    <i class="fa-brands fa-facebook-f"></i>
                  </a>
                  <a href="#" className="instagram">
                    <i class="fa-brands fa-instagram"></i>
                  </a>
                  <a href="#" className="linkedin">
                    <i class="fa-brands fa-linkedin-in"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="container mt-4">
            <div className="copyright">Block Exchange @ 2022</div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Dashboard;
