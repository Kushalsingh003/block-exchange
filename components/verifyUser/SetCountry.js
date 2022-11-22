import React, { useEffect } from 'react'
import {  useRef,useState } from 'react';
import { useRouter } from 'next/router';
// import country from "/flag.json";
import axios from 'axios';
import country from "/flag.json";



export default function SetCountry() {
  const [countries, setCountries] = useState(country);
  const [countryData,setCountryData] = useState();
  console.log(country, "all india");
  const router = useRouter();
  
 function onChangeHandler(event) {
  const data = event.target.value;
  setCountryData(data);
  }

 async function clickHandler() {
  localStorage.setItem("country",countryData)
    router.push("/verifyUser/personalInfo");
  }
  return (
    <div id="setCountry">
      <section className="login-form">
        <div className="container">
          <div className="row justify-content-center">
            <div className="input-sec">
              <div className="heading-section">
                <h1 className="heading-text">Select Country of Residence</h1>
              </div>

              <div className="setCountry-selection">
                <h2 className="selection-heading">
                  Please ensure your country of residence matches your valid ID.
                  <br /> Your privileges could change based on the selection.
                </h2>

                <select
                  onChange={(event) => onChangeHandler(event)}
                  className="textinput mt-3"
                  name="countrycode"
                  id="phone"
                >
                  {countries
                    ? countries.map((item) => {
                        return (
                          <option>
                             {/* <img src={item.flag}/>  */}
                            {item.name}
                          </option>
                        );
                      })
                    : []}
                </select>
              </div>

              <div className="steps">
                <h3 className="steps-heading">Verification process</h3>
                <div>
                  <p className="selection-step--1">
                    {" "}
                    <i class="fa fa-address-card" id="fa-style"></i> Personal
                    information
                  </p>
                </div>

                <div>
                  <p className="selection-step--1">
                    <i class="fa fa-id-card" id="fa-style"></i>{" "}
                    Government-issued ID
                  </p>
                </div>

                <div>
                  <p className="selection-step--1">
                    <i
                      class="fa-sharp fa fa-user"
                      id="fa-style"
                      style={{ marginLeft: "3px", marginRight: "9px" }}
                    ></i>{" "}
                    Facial recognition
                  </p>
                </div>

                <div>
                  <p className="selection-step--1">
                    {" "}
                    <img
                      src="/watch.png"
                      style={{ marginLeft: "-1px", marginRight: "7px" }}
                    />{" "}
                    Review time: 2 days
                  </p>
                </div>
              </div>

              <div className="guidance-div">
                <h3 className="steps-heading guidance-heading">Guidance</h3>
                <div>
                  <p className="guidance--1">
                    {" "}
                    <i class="fa fa-play-circle" id="fa-style"></i>{" "}
                    <a href=""> How to verify my identity</a>
                  </p>
                </div>
              </div>

              <button onClick={clickHandler} className="setCountry-btn">
                Continue
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
