import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function ScanQR() {
  const [qrCode, setQrCode] = useState();
  const [base32, setBase32] = useState();
  const [qrGenerated,setQrGenerated] =useState(false)




  async function qrData() {
    try {
      const token = localStorage.getItem("token");
      console.log(token, "to get the token from local Storage to get Qr Code");
      const res = await axios.post("/api/qrCode/getQrCode", { token:token});
      const response = res.data;
      console.log(response, "to get the response from the api to get qrScanner");
      setQrCode(response.data.data.result.data);
      setBase32(response.data.data.secret.base32);
    } catch (err) {
      console.log(err)
      toast.error("Something Went wrong to generate the Qr Code")
    }
  }

useEffect(()=>{
qrData()
},[])

  return (
    <div id="qrScanner">
      <form className="scanQR-section">
        <div className="scanQR-heading--div">
          <h1 className="scanQR-heading">
            Two Factor Authentication
          </h1>
        </div>

        <div className="flex-container">
          <div className="context--1">
            <span className="number number-1">1</span>
            <span className="scan-text">scan QR code</span>
          </div>

          <div className="empty-div"></div>

          <div className="context--1">
            <span className="number  ">2</span>
            <span className="scan-text">Google Authenticator </span>
          </div>

          <div className="empty-div"></div>

          <div className="context--1">
            <span className="number number-3">3</span>
            <span className="scan-text">Complete</span>
          </div>
        </div>

        <div className="scanQR-content">
          <h2 className="scanQR-secondary--heading">
            Scan this QR code in the <br /> Authenticator App
          </h2>
          <div className="scan-img">
            <img src={qrCode} />
          </div>
          <p className="scan-code">{base32}</p>
          <span className="scan-text">
            If you are unable to scan the QR code, please enter this code
            <br /> manually into the app
          </span>
          <div className="scan-div">
            <Link href="/dashboard">
            <a className="scan-previous">Previous</a>
            </Link>
            <Link href="/qrpages/googleAuth">
              <button type="button" className="scan-next">
             Next
              </button>
            </Link>
          </div>
        </div>
        {/* <div className="scan-copyrightText">
          <p className="scan-copyrightText--1">
            2017 - 2022 Binance.com All rights reserved
          </p>
          <p className="scan-copyrightText--2">Cookie Preferences</p>
        </div> */}
      </form>
    </div>
  );
}
