import React from 'react'
import Link from 'next/link'

export default function FirstPage() {
  return (
    <div>
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
                  <a className="nav-link" aria-current="page" href="/coinMarket">
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
                    // disabled={isLoading}
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
              <form
                className="d-flex"
                id="nav-item"
                style={{ marginLeft: "auto" }}
              >
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <a
                      className="nav-link "
                      aria-current="page"
                      href="/login/login"
                    >
                      Log In
                    </a>
                  </li>

                  <a href="/signup/signup" className="btn btn-bg" type="submit">
                    Register
                  </a>

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
                      className="nav-link "
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
              </form>
            </div>
          </div>
        </nav>
      </header>
         <section class="binance">
        <div class="container">
            <div class="benance-content">
                <p class="benance-text">Buy, trade, and hold 350+ cryptocurrencies on Binance</p>
                <div class="benance-btn">
                    <button class="benance-signup">
                        <a href="">
                            <img src="/user.png" alt=""/>
                            <span>Sign up with Email or Phone</span>
                        </a>
                    </button>
                </div>
                <div class="benance-btn">
                    <div class="benance-lines">
                        <div class="benance-line"></div>
                        <div class="benance-continue">or continue with</div>
                        <div class="benance-line"></div>
                    </div>
                </div>
                <div class="benance-btn">
                    <div class="benance-button">
                        <button class="benance-google"><a href="">
                                <img src="/google.png" alt=""/>
                                <span>google</span>
                            </a></button>
                        <button class="benance-apple"><a href="">
                                <img src="/apple-logo.png" alt=""/>
                                <span>Apple</span>
                            </a></button>
                    </div>
                </div>
            </div>
            <div class="benance-image">
                <img src="/benance-bg.png" alt=""/>
            </div>

        </div>
    </section>
    </div>
  )
}
