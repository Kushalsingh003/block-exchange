import React from "react";
import { useRouter } from "next/router";
import { useRef, useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import country from "/flag.json";
import Link from "next/link";

export default function PersonalInfo() {
  const fullNameInputRef = useRef();
  const countryInputRef = useRef();
  const DOBInputRef = useRef();
  const addressInputRef = useRef();
  const cityInputRef = useRef();
  const pinInputRef = useRef();
  const router = useRouter();
  const [minYear, setMinYear] = useState();
  const [error, setError] = useState(false);
  const [verify, setVerify] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingRef, setLoadingRef] = useState(false);
  const [getCountry, setGetCountry] = useState();
  const [countries, setCountries] = useState(country);
  console.log(country, "all india");

  function simulateNetworkRequest() {
    return new Promise((resolve) => setTimeout(resolve, 4000));
  }

  useEffect(() => {
    setGetCountry(localStorage.getItem("country"));
  }, []);

  async function personalprofile(data) {
    try {
      let res = await axios.post("/api/verifyUser/personalInfoApi", data);
      const response = res.data;
      console.log(
        response,
        "to get the response from api to create the user profile"
      );
      toast.success("User Profile Created successfully");
      localStorage.setItem("token", response.data.data.token);
      setError(false);
      setVerify(true);
      setIsLoading(true);
      setLoadingRef(true);
      setTimeout(() => {
        router.push("/verifyUser/kycPage");
      }, 1000);
    } catch {
      toast.error("Please provide all the detials to create your profile!");
      setError(true);
      setVerify(false);
      setLoadingRef(false);
      setIsLoading(false);
    }
  }

  function getAge() {
    648237696353;
    let today = new Date().getTime();
    let min = today - 582382064640;
    let day = new Date(min).getDate();
    if (day < 10) {
      day = "0" + day;
    }
    let month = new Date(min).getMonth();
    if (month < 10) {
      month = "0" + month;
    }
    let year = new Date(min).getFullYear();
    let newTime = year + "-" + month + "-" + day;

    setMinYear(newTime);
  }
  useEffect(() => {
    getAge();
  }, []);


  async function updateProfileByPhone(data) {
    try {
      let res = await axios.post("/api/verifyUser/updateProfileByPhone", data);
      const response = res.data;
      console.log(
        response,
        "to get the response from api to create the user profile"
      );
      toast.success("User Profile Created successfully");
      localStorage.setItem("token", response.data.data);  
      console.log(response.data.data,'hello data token is here!!')
      setError(false);
      setVerify(true);
      setIsLoading(true);
      setLoadingRef(true);
      setTimeout(() => {
        router.push("/verifyUser/kycPage");
      }, 1000);
    } catch {
      toast.error("Please provide all the detials to create your profile!");
      setError(true);
      setVerify(false);
      setLoadingRef(false);
      setIsLoading(false);
    }
  }

  async function formSubmitHandler(event) {
    event.preventDefault();

    const email = localStorage.getItem("email");
    const phone = localStorage.getItem('phone');

    const fullname = fullNameInputRef.current.value;
    const country = countryInputRef.current.value;
    const dob = DOBInputRef.current.value;
    const address = addressInputRef.current.value;
    const city = cityInputRef.current.value;
    const pin = pinInputRef.current.value;

    if (!fullname || !country || !dob || !address || !city || !pin) {
      toast.error("Please Fill all the details to continue");
      return;
    }

    if(email){
      const data = {
        email,
        fullname,
        country,
        dob,
        address,
        city,
        pin,
      };

      personalprofile(data);

    }else{

      const data = {
        phone,
        fullname,
        country,
        dob,
        address,
        city,
        pin,
      };

      updateProfileByPhone(data)
    } 
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
    <div id="personalInfo">
      <ToastContainer />
      <div className="back-sec" id="back-sec">
        <h3 className="back-btn" id="back-btn" onClick={router.back}>
          <i className="fa fa-arrow-left" id="back-icon"></i> Back
        </h3>
        <Link href={"/verifyUser/KycPage"}>
          <h3 className="back-btn " id="back-btn">
            Skip for now <i className="fa fa-arrow-right" id="back-icons"></i>
          </h3>
        </Link>
      </div>
      <section className="login-form">
        <div className="container">
          <div className="row justify-content-center">
            <form className="input-sec" onSubmit={formSubmitHandler}>
              <h1 className="main-heading">Personal Information</h1>

              <div className="input-item">
                <h4 className="item-text">Full Name</h4>
                <input
                  className="textinput"
                  ref={fullNameInputRef}
                  type="text"
                />
              </div>

              <div className=" input-item  setCountry-selection ">
                <h2 className="item-text">Nationality</h2>
                <select
                  value={getCountry}
                  ref={countryInputRef}
                  className="textinput"
                  name="countrycode"
                  id="phone"
                  key="select"
                >
                  {countries
                    ? countries.map((item) => {
                        return (
                          <option style={{ backgroundImage: "url{item.flag}" }}>
                            {/* {/ {item.number}  /} */}
                            {item.name}
                            {/* {/ {/ <img src={item.flag}/> /} /} */}
                          </option>
                        );
                      })
                    : []}
                </select>
              </div>

              <div className="input-item">
                <h4 className="item-text">Date of Birth</h4>
                <input
                  className="textinput"
                  ref={DOBInputRef}
                  max={minYear}
                  type="date"
                />
              </div>

              <div className="input-item">
                <h4 className="item-text">Residential Address</h4>
                <input
                  className="textinput"
                  ref={addressInputRef}
                  type="text"
                />
              </div>
              
              <div className="input-item">
                <h4 className="item-text">Pin</h4>
                <input className="textinput" ref={pinInputRef} type="text" />
              </div>

              <div className="input-item">
                <h4 className="item-text">City</h4>
                <input className="textinput" ref={cityInputRef} type="text" />
              </div>

              <button
                disabled={isLoading}
                className="btn btn-warning   w-100 mt-5"
                type="submit"
              >
                {loadingRef ? "Loading…" : " Create Profile"}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
