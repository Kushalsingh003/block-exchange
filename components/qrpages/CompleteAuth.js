import React, { useEffect, useState } from "react";
import Link from "next/link";



const Welcome = () => {
  return (
    <div id="welcome-inner">
      <div className="dark-overlay">
        <div className="container">
          <div className="row">
            <div className="column">
              <form>
                <div className=" form-group">
                  <img
                    src="/success.png"
                    style={{ width: "30%", marginBottom: "30px" }}
                  />
                </div>
                <div className="form-group">
                  <h3>AUTHENTICATED SUCCESSFULLY</h3>
                  <p className="pt-2">
                    Your authentication has been completed successfully
                  </p>
                  <div className="dashboard">
                    <Link href={"/dashboard"}>
                      <button
                        className="btn btn-round btn-warning form-btn w-50 p-0 mb-3"
                        style={{ marginTop: "100px", height:"35px" }}
                        type="submit"
                      >
                        DASHBOARD
                      </button>
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
