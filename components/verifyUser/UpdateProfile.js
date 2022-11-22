import React from "react";
import { useRouter } from "next/router";
import { useRef, useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import country from "/flag.json";
// import { format } from "date-fns";
// import { data } from "jquery";

export default function UpdateProfile() {
  const fullNameInputRef = useRef();
  const countryInputRef = useRef();
  const DOBInputRef = useRef();
  const addressInputRef = useRef();
  const cityInputRef = useRef();
  const pinInputRef = useRef();
  const router = useRouter();
  const [error, setError] = useState(false);
  const [verify, setVerify] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingRef, setLoadingRef] = useState(false);
  const [countries, setCountries] = useState(country);
  const [countryData, setCountryData] = useState();
  const [getName, setGetName] = useState();
  const [getDob, setGetDob] = useState();
  const [getAddress, setGetAddress] = useState();
  const [getCity, setGetCity] = useState();
  const [getPin, setGetPin] = useState();
  const [getCountry, setGetCountry] = useState();
  // console.log(country, "all india");
  const [minYear, setMinYear] = useState();
  const [token, setToken] = useState();

  function simulateNetworkRequest() {
    return new Promise((resolve) => setTimeout(resolve, 4000));
  }

  useEffect(()=> {
    setToken(localStorage.getItem("token"))
  }, []);

  
  async function getProfileData() {
    try {
      const token = localStorage.getItem("token")
      let res = await axios.post ("/api/dashboard/getUserInfoApi", {token:token});
      const response = res.data;
      console.log(response,"to get the response from api to get porfile data")
      console.log(response.data.data.data, "to check the details")
      
      setGetName(response.data.data.data.fullname);
      setGetCountry(response.data.data.data.country);
      setGetAddress(response.data.data.data.address);
      setGetDob(response.data.data.data.dob);
      setGetCity(response.data.data.data.city);
      setGetPin(response.data.data.data.pin);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    setCountryData(localStorage.getItem("country"));
    getProfileData();
  }, []);

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

  async function updateprofile(data) {
    try {
      let res = await axios.post("/api/verifyUser/updateProfile", {token:token,data});
      const response = res.data;
      console.log(
        response,
        "to get the response from api to create the user profile"
      );
      toast.success("User Profile updated successfully");
      setError(false);
      setVerify(true);
      setIsLoading(true);
      setLoadingRef(true);
      setTimeout(() => {
        router.push("/dashboard");
      }, 1000);
    } catch {
      toast.error("Please Check Your Data");
      setError(true);
      setVerify(false);
      setLoadingRef(false);
      setIsLoading(false);
    }
  }

  async function formSubmitHandler(event) {
    event.preventDefault();
    const fullname = fullNameInputRef.current.value;
    const country = countryInputRef.current.value;
    const dob = DOBInputRef.current.value;
    const address = addressInputRef.current.value;
    const city = cityInputRef.current.value;
    const pin = pinInputRef.current.value;
    if (!fullname || !country || !dob || !address || !city || !pin) {
      toast.error("Please Fill all the details to create profile");
      return;
    }
    const data = {
      fullname,
      country,
      dob,
      address,
      city,
      pin,
    };

    console.log(data, "data entered by the user to create the porfile");
    updateprofile(data);
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
      <section className="login-form">
        {/* <div className="heading-section">
        </div> */}
        <div className="container">
          <div className="row justify-content-center">
            <form className="input-sec"
             onSubmit={formSubmitHandler}
             >
              <h1 className="main-heading">Personal Information</h1>
              <p className="helper-heading">Identity Information</p>

              <div className="input-item">
                <h4 className="item-text">Full Name</h4>
                <input
                  className="textinput"
                  defaultValue={getName}
                  ref={fullNameInputRef}
                  type="text"
                  onChange={(e) => setGetName(e.currentTarget.value)}
                />
              </div>
              <div className=" input-item  setCountry-selection ">
                <h2 className="item-text">Nationality</h2>
                <select
                  ref={countryInputRef}
                  value={getCountry}
                  onChange={(e) => setGetCountry(e.currentTarget.value)}
                  className="textinput"
                  aria-label="Default select example"
                >
                  {countries
                    ? countries.map((item) => {
                        return (
                          <option>
                             {/* {item.number} */}
                            {item.name}
                            {/* <img src={item.flag}/> */}
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
                  defaultValue={getDob}
                  max={minYear}
                  type="date"
                  onChange={(e) => setGetDob(e.currentTarget.value)}
                />

                {/* <input type="date" ref={DOBInputRef} data-dte="" data-date-format="DD MMMM YYYY" value="2015-08-09"/> */}
              </div>

              <div className="input-item">
                <h4 className="item-text">Residential Address</h4>
                <input
                  defaultValue={getAddress}
                  className="textinput"
                  ref={addressInputRef}
                  type="text"
                  onChange={(e) => setGetAddress(e.currentTarget.value)}
                />
              </div>

              <div className="input-item">
                <h4 className="item-text">Pin</h4>
                <input
                  defaultValue={getPin}
                  className="textinput"
                  ref={pinInputRef}
                  type="number"
                  onChange={(e) => setGetPin(e.currentTarget.value)}
                />
              </div>

              <div className="input-item">
                <h4 className="item-text">City</h4>
                <input
                  defaultValue={getCity}
                  className="textinput"
                  ref={cityInputRef}
                  type="text"
                  onChange={(e) => setGetCity(e.currentTarget.value)}
                />
              </div>

              <button
                disabled={isLoading}
                className="btn btn-warning   w-100 mt-5"
                type="submit"
              >
                {loadingRef ? "Loading…" : " Update Profile"}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
