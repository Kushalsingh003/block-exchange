import React from 'react'

export default function Navigation() {
  return (
    <div id="navigation" >
      <nav className="navbar top-nav navbar-expand-lg navbar-dark k">
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
            <ul className="navbar-nav"></ul>
            <form
              className="d-flex flex-setting"
              id="nav-item"
              style={{marginLeft:
                            "auto"}}
            >
              <ul className="navbar-nav">
                <li className="nav-item">
                  <a className="nav-link " aria-current="page" href="#">
                    English{" "}
                    <img
                      src="/state-line.png"
                      className="state-line"
                      style={{marginLeft:"7px", marginTop: "-3px"}}
                    />{" "}
                  </a>
                </li>

                <li className="nav-item">
                  <a
                    className="nav-link "
                    id="nav-icons"
                    aria-current="page"
                    href="#"
                  >
                    <img style={{marginTop:"-5px" }} src="/light-icon.png" />
                  </a>
                </li>
              </ul>
            </form>
          </div>
        </div>
      </nav>
    </div>
  );
}
