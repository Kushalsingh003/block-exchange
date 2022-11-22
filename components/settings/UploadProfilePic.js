import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Button from "react-bootstrap/Button";
import { Alert, Form } from "react-bootstrap";
import { useRouter } from "next/router";
import Link from "next/link";

export default function ProfilePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingRef, setLoadingRef] = useState(false);
  const router = useRouter();
  const [image1, setImage1] = useState();
  const [showImage1, setShowImage1] = useState();

  function simulateNetworkRequest() {
    return new Promise((resolve) => setTimeout(resolve, 4000));
  }

  async function formSubmitHandler(event) {
    event.preventDefault();
    const formData = new FormData();
    formData.append("avatar", image1);
    console.log(image1, "to check the first image");
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
        url: "http://192.168.1.95:4000/api/v1/image/avatar",
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
        data: formData,
      };
      await axios(config).then(function (response) {
        console.log(JSON.stringify(response.data.data));
        toast.success("Profile Pic Updated Successfully");
        setTimeout(() => {
          router.push("/dashboard");
        }, 1000);
        setIsLoading(true);
        setLoadingRef(true);
        // res.status(200).json({ data: response.data});
      });
    } catch (err) {
      console.log(err);
      toast.error("No Porfile Pic Selected");
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
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setImage1(event.currentTarget.files[0]);
      setShowImage1(URL.createObjectURL(img));
    }
  }

  return (
    <div id="profilePic">
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
              <h3 className="heading-text" id="pic-text">
                Profile Pic{" "}
              </h3>

              <form onSubmit={formSubmitHandler}>
                <div className="kyc-sections">
                  <div className="input-item" id="kyc-pics">
                    <h6 className="item-text"> Upload Your Profile Pic</h6>

                    <img
                      className="kyc-image"
                      src={showImage1}
                      type="file"
                    ></img>
                    <input
                      type="file"
                      id="file-id"
                      placeholder="Upload Front Side"
                      style={{ marginTop: "10px" }}
                      onChange={(e) => uploadImage1(e)}
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
