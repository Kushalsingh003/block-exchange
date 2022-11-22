import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "react-bootstrap/Button";
import { Alert, Form } from "react-bootstrap";
import { useRouter } from "next/router";
import Link from "next/link";

export default function KYCPage() {
  const documentNumberInputRef = useRef();

  const [email, setEmail] = useState();
  const [error, setError] = useState(false);
  const [verify, setVerify] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingRef, setLoadingRef] = useState(false);
  const router = useRouter();

  const [image1, setImage1] = useState();
  const [image2, setImage2] = useState();
  const [image3, setImage3] = useState();

  const [showImage1, setShowImage1] = useState();
  const [showImage2, setShowImage2] = useState();
  const [showImage3, setShowImage3] = useState();

  const [value, setValue] = useState();

  useEffect(() => {
    setEmail(localStorage.getItem("email"));
  }, []);

  function simulateNetworkRequest() {
    return new Promise((resolve) => setTimeout(resolve, 4000));
  }

  async function formSubmitHandler(event) {
    event.preventDefault();
    const documentNumber = documentNumberInputRef.current.value;
    const formData = new FormData();

    formData.append("email", email);
    formData.append("documentName", value);
    formData.append("documentNumber", documentNumber);
    formData.append("images", image1);
    formData.append("images", image2);
    formData.append("images", image3);

    console.log(image1, "to check the first image");
    console.log(image2, "to check the second image");
    console.log(image3, "to check the third image");
    console.log([...formData], "to get the data of formData");

    for (const pair of formData.entries()) {
      console.log(`${pair[0]}, $pair[1]`);
    }

    console.log(formData, "to check the data entered by the user");

    try {
      const token = localStorage.getItem("token");
      console.log(token, "to see whether token is fetched from token or not");
      var config = {
        method: "post",
        url: "http://192.168.1.95:4000/api/v1/image/kycProfile",
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
        data: formData,
      };
      await axios(config).then(function (response) {
        console.log(JSON.stringify(response.data.data));
        toast.success("KyC Done Successfully");
        setTimeout(() => {
          router.push("/dashboard");
        }, 1000);
        setIsLoading(true);
        setLoadingRef(true);
        // res.status(200).json({ data: response.data});
      });
    } catch (err) {
      console.log(err);
      toast.error("Failed to upload Documetns");
      // res.status(500).json({ Error: err });
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

  function uploadImage1(event) {
    // setImage1(event.currentTarget.files[0]);

    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setImage1(event.currentTarget.files[0]);
      setShowImage1(URL.createObjectURL(img));
    }
  }
  function uploadImage2(event) {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setImage2(event.currentTarget.files[0]);
      setShowImage2(URL.createObjectURL(img));
    }
  }
  function uploadImage3(event) {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setImage1(event.currentTarget.files[0]);
      setShowImage3(URL.createObjectURL(img));
    }
  }

  function onChangeEvent(event) {
    setValue(event.currentTarget.value);
  }

  // async function showCamera(toast) {
  //   Android.showCamera(toast);
  // }

  return (
    <div id="kycPage">
      <div className="back-sec" id="back-sec">
        <h3 className="back-btn" id="back-btn" onClick={router.back}>
          <i className="fa fa-arrow-left" id="back-icon"></i> Back
        </h3>
        <Link href={"/dashboard"}>
          <h3 className="back-btn " id="back-btn">
            Skip for now <i className="fa fa-arrow-right" id="back-icons"></i>
          </h3>
        </Link>
      </div>

      <section className="login-form">
        <div className="container">
          <div className="row justify-content-center">
            <ToastContainer />
            <div className="input-sec " id="kyc-setting">
              <h3 className="heading-text">KYC Verification Form</h3>
              <p style={{ marginBottom: "0px" }}>
                Please Fill Out This Form to Complete Your KYC
              </p>
              <form onSubmit={formSubmitHandler}>
                <div className="input-item">
                  {/* <label htmlFor="email">Email</label> */}
                  <input
                    type="email"
                    name="email"
                    defaultValue={email}
                    disabled
                    className="textinput mt-0"
                  />
                </div>
                <div className="input-item">
                  {/* <label htmlFor="documentType">Document Type</label> */}
                  <select
                    className="textinput"
                    onChange={(event) => onChangeEvent(event)}
                  >
                    <option>Please Select the Document type</option>
                    <option value="Aadhar Card">Aadhar Card</option>
                    <option value="Pan Card">Pan Card</option>
                    <option value="Driving Licence">Driving License</option>
                  </select>
                </div>

                <div className="input-item">
                  {/* <label htmlFor="documentNumber">Document Number</label> */}
                  <input
                    ref={documentNumberInputRef}
                    type="text"
                    name="documentNumber"
                    className="textinput"
                    placeholder="Document Number"
                  />
                </div>
                <div className="kyc-sections">
                  <div className="input-item" id="kyc-sec">
                    <h6 className="item-text" style={{ marginBottom: "20px" }}>
                      {" "}
                      Upload Front Side
                    </h6>

                    {showImage1 ? (
                      <img className="kyc-image" src={showImage1}></img>
                    ) : null}
                    <input
                      type="file"
                      
                      placeholder="Upload Front Side"
                      style={{ marginTop: "10px" }}
                      onChange={(e) => uploadImage1(e)}
                    />
                  </div>
                  <div className="input-item" id="kyc-sec">
                    <h6 className="item-text" style={{ marginBottom: "20px" }}>
                      {" "}
                      Upload Back Side
                    </h6>
                    {showImage2 ? (
                      <img className="kyc-image" src={showImage2}></img>
                    ) : null}

                    <input
                      type="file"
                      placeholder="Upload Front Side"
                      style={{ marginTop: "10px" }}
                      onChange={(e) => uploadImage2(e)}
                    />
                  </div>
                </div>
                <Button
                  variant="secondary"
                  className=" w-100 btn btn-warning"
                  type="submit"
                  disabled={isLoading}
                  // onClick={!isLoading ? handleClick : null}
                >
                  {loadingRef ? "Loading…" : "   Submit"}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
