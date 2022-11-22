import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Binance2 from "binance-api-node";
const client = Binance2();
import BarCharts from "../../components/BarChart";

const uid = (props) => {
 
  const [bid, setBid] = useState();
  const [sell, setSell] = useState();
  const [number, setNumber] = useState();
  const [change, setChange] = useState();
  const [allCoin, setAllCoin] = useState();
  const [tradeData, setTradeData] = useState();
  const datacoinRef = useRef();
  const router = useRouter();

  async function getData(data) {
    const response = await axios.post("/api/market/bitcoin", {id:data});
    const res = response.data.data;
    console.log(res, "hereb == datta hedehhhduebgheduyg");
    setSell(res.bids);
    setBid(res.asks);
  }

  async function getNumber(data) {
    const response = await axios.post("/api/market/bitcoinData",{id:data});
    const request = response.data.data;
    console.log(request.price, " hello data here");
    setNumber(request.price);
  }

  async function marketTrades(data) {
    const trades = await client.ws.trades([data], (trades) => {
      console.log(trades);
      setTradeData(trades);
    });
  }

  async function btcPriceChange(data) {
    const response = await client.dailyStats({ symbol: data });

    setChange(response);
    console.log(response, "------------------------------------------------->");
  }

  async function tickersDataFn() {
    const response = await client.ws.allTickers((tickers) => {
      console.log(tickers);
      setAllCoin(tickers);
    });
  }

  useEffect(() => {
    const data = props.params.id;
    
    tickersDataFn();
    marketTrades(data);

    getData(data);
    getNumber(data);
    btcPriceChange(data);
  });

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

      <div className="main-sec">
        <div className=" container" id="container-setting">
          <div className="row">
            <div className="btc-sec">
              <div className="col-md-9 left-sec">
                <div className="bitcoin-sec">
                  <nav className="navbar btc-nav navbar-expand-lg navbar-dark">
                    {/* <!-- 
                    <button className="navbar-toggler" type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#navbarNavDropdown"
                      aria-controls="navbarNavDropdown" aria-expanded="false"
                      aria-label="Toggle navigation">
                      <span className="navbar-toggler-icon"></span>
                    </button> --> */}
                    <div
                      className="collapse navbar-collapse"
                      id="navbarNavDropdown"
                    >
                      <ul className="navbar-nav" id="left-li">
                        <li className="nav-item" id="right-border">
                          <h2 className="busd-text">{change?.symbol}</h2>
                          <a className="href-setting" href="">
                            Bitcoin Price
                          </a>
                        </li>
                        <li className="nav-item">
                          <h2
                            className="bitcoin-text "
                            id="btc-txt"
                            style={{ fontSize: "16px" }}
                          >
                            {change?.symbol}
                          </h2>
                          <h4 className="doller-setting">
                            
                            ${parseFloat(change?.bidPrice).toFixed(2)}
                          </h4>
                        </li>
                        <li className="nav-item">
                          <h2 className="btc-text">24h Change</h2>
                          <h4
                            className="doller-setting"
                            style={{ color: "red" }}
                          >
                            {" "}
                            {parseFloat(change?.priceChangePercent).toFixed(2)}%
                            
                          </h4>
                        </li>

                        <li className="nav-item">
                          <h2 className="btc-text">24h High</h2>
                          <h4 className="doller-setting">
                           
                            {parseFloat(change?.highPrice).toFixed(3)}
                          </h4>
                        </li>

                        <li className="nav-item">
                          <h2 className="btc-text">24h Low</h2>
                          <h4 className="doller-setting">{parseFloat(change?.lowPrice).toFixed(2)}</h4>
                        </li>

                        <li className="nav-item">
                          <h2 className="btc-text">24h Volume(BTC)</h2>
                          <h4 className="doller-setting">{parseFloat(change?.volume).toFixed(2)}</h4>
                        </li>
                        <li className="nav-item">
                          <h2 className="btc-text">24h Volume(BUSD)</h2>
                          <h4 className="doller-setting">
                           
                            {parseFloat(change?.quoteVolume).toFixed(2)}
                          </h4>
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
                              className="nav-link btc-text "
                              id="text-font"
                              aria-current="page"
                              href="#"
                            >
                              Spot Tutorial
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              className="nav-link btc-text"
                              id="text-font"
                              aria-current="page"
                              href="#"
                            >
                              Spot Guidance
                            </a>
                          </li>
                        </ul>
                      </form>
                    </div>
                  </nav>
                </div>

                <div className="col-header">
                  <div className="col-md-4 income-sec">
                    <div
                      className="number-sec pt-0"
                      style={{
                        borderBottom: "none !important",
                        marginBottom: "0px !important",
                      }}
                    >
                      <div className="income-top">
                        <ul
                          className="nav nav-tabs"
                          style={{ paddingLeft: "0px !important" }}
                          id="myTab"
                          role="tablist"
                        >
                          <li className="nav-item" role="presentation">
                            <button
                              className="nav-link active"
                              id="first-tab"
                              data-bs-toggle="tab"
                              data-bs-target="#first"
                              type="button"
                              role="tab"
                              aria-controls="first"
                              aria-selected="true"
                              style={{
                                paddingLeft: "0px",
                                paddingBottom: "0px",
                              }}
                            >
                              <img src="/graph-img.png" />{" "}
                            </button>
                          </li>

                          <li className="nav-item" role="presentation">
                            <button
                              className="nav-link "
                              id="second-tab"
                              data-bs-toggle="tab"
                              data-bs-target="#second"
                              type="button"
                              role="tab"
                              aria-controls="second"
                              aria-selected="true"
                              style={{ paddingBottom: "0px" }}
                            >
                              <img src="/graph-img.png" />
                            </button>
                          </li>

                          <li className="nav-item" role="presentation">
                            <button
                              className="nav-link"
                              id="third-tab"
                              data-bs-toggle="tab"
                              data-bs-target="#third"
                              type="button"
                              role="tab"
                              aria-controls="third"
                              aria-selected="true"
                            >
                              <img src="/graph-img.png" />
                            </button>
                          </li>
                        </ul>

                        <form className="d-flex form-nav">
                          <li className="nav-item dropdown">
                            <a
                              className="nav-link dropdown-toggle"
                              href="#"
                              id="navbarDropdownMenuLink"
                              role="button"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              0.01
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
                          <li>
                            <img
                              style={{ marginLeft: "20px" }}
                              src="/three-dobt.png"
                            />
                          </li>
                        </form>
                      </div>

                      <div className="tab-content" id="myTabContent">
                        <div
                          className="tab-pane fade show active"
                          id="first"
                          role="tabpanel"
                          aria-labelledby="first-tab"
                          style={{ padding: "0 15px" }}
                        >
                          <table className="table number-table mt-2">
                            <thead>
                              <tr>
                                <th scope="col" className="min-sett pb-0">
                                  Price(USDT)
                                </th>
                                <th
                                  scope="col"
                                  className="min-sett pb-0"
                                  id="right-side"
                                >
                                  Amount(FORTH)
                                </th>
                                {/* <th scope="col" className="minimum-setting pb-0"
              id="right-side">Total</th> */}
                              </tr>
                            </thead>

                            <tbody>
                              {bid?.map((data) => {
                                return (
                                  <tr>
                                    <td
                                      className="min-settings pb-0"
                                      style={{ color: "red" }}
                                    >
                                      {parseFloat(data[0]).toFixed(3)}
                                    </td>

                                    <td
                                      className="min-settings pb-0"
                                      style={{ color: "red" }}
                                      id="right-side"
                                    >
                                      {" "}
                                      {parseFloat(data[1]).toFixed(3)}
                                    </td>
                                    {/* <td className="min-settings pb-0" id="right-side">6,506.9</td> */}
                                  </tr>
                                );
                              })}

                              <tr>
                                <td className="green-txt pt-2 pb-1">
                                  {parseFloat(number).toFixed(3)}
                                  <span
                                    className="gray-text pb-0"
                                    style={{ marginLeft: "20px" }}
                                  >
                                    ${parseFloat(number).toFixed(3)}
                                  </span>
                                </td>
                                <td></td>
                                <td
                                  className="gray-text m-0 pt-2"
                                  id="right-side"
                                >
                                  More
                                </td>
                              </tr>
                            </tbody>

                            <tbody>
                              {sell?.map((data) => {
                                return (
                                  <tr>
                                    <td
                                      className="min-settings pb-0"
                                      style={{ color: "rgb(14, 203, 129)" }}
                                    >
                                      {/* {data[0]} */}
                                      {parseFloat(data[0]).toFixed(3)}
                                    </td>
                                    <td
                                      className="min-settings pb-0"
                                      style={{ color: "rgb(14, 203, 129)" }}
                                      id="right-side"
                                    >
                                      {" "}
                                      {/* {data[1]} */}
                                      {parseFloat(data[1]).toFixed(3)}
                                    </td>
                                    {/* <td className="min-settings pb-0" id="right-side">6,506.9</td> */}
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>

                        <div
                          className="tab-pane fade show "
                          id="second"
                          role="tabpanel"
                          aria-labelledby="second-tab"
                          style={{ padding: "0 15px" }}
                        >
                          <table className="table number-table mt-2">
                            <thead>
                              <tr>
                                <th scope="col" className="min-sett pb-0">
                                  Price(USDT)
                                </th>
                                <th
                                  scope="col"
                                  className="min-sett pb-0"
                                  id="right-side"
                                >
                                  Amount(FORTH)
                                </th>
                                <th
                                  scope="col"
                                  className="minimum-setting pb-0"
                                  id="right-side"
                                >
                                  Total
                                </th>
                              </tr>
                            </thead>

                            <tbody>
                              <tr>
                                <td
                                  className="min-settings pb-0"
                                  id="green-txt"
                                >
                                  21,641.50
                                </td>
                                <td
                                  className="min-settings pb-0"
                                  id="right-side"
                                >
                                  346.95
                                </td>
                                <td
                                  className="min-settings pb-0"
                                  id="right-side"
                                >
                                  6,506.9
                                </td>
                              </tr>
                              <tr>
                                <td
                                  className="min-settings pb-0"
                                  id="green-txt"
                                >
                                  21,641.50
                                </td>
                                <td
                                  className="min-settings pb-0"
                                  id="right-side"
                                >
                                  346.95
                                </td>
                                <td
                                  className="min-settings pb-0"
                                  id="right-side"
                                >
                                  6,506.9
                                </td>
                              </tr>
                              <tr>
                                <td
                                  className="min-settings pb-0"
                                  id="green-txt"
                                >
                                  21,641.50
                                </td>
                                <td
                                  className="min-settings pb-0"
                                  id="right-side"
                                >
                                  346.95
                                </td>
                                <td
                                  className="min-settings pb-0"
                                  id="right-side"
                                >
                                  6,506.9
                                </td>
                              </tr>
                              <tr>
                                <td
                                  className="min-settings pb-0"
                                  id="green-txt"
                                >
                                  21,641.50
                                </td>
                                <td
                                  className="min-settings pb-0"
                                  id="right-side"
                                >
                                  346.95
                                </td>
                                <td
                                  className="min-settings pb-0"
                                  id="right-side"
                                >
                                  6,506.9
                                </td>
                              </tr>
                              <tr>
                                <td
                                  className="min-settings pb-0"
                                  id="green-txt"
                                >
                                  21,641.50
                                </td>
                                <td
                                  className="min-settings pb-0"
                                  id="right-side"
                                >
                                  346.95
                                </td>
                                <td
                                  className="min-settings pb-0"
                                  id="right-side"
                                >
                                  6,506.9
                                </td>
                              </tr>
                              <tr>
                                <td
                                  className="min-settings pb-0"
                                  id="green-txt"
                                >
                                  21,641.50
                                </td>
                                <td
                                  className="min-settings pb-0"
                                  id="right-side"
                                >
                                  346.95
                                </td>
                                <td
                                  className="min-settings pb-0"
                                  id="right-side"
                                >
                                  6,506.9
                                </td>
                              </tr>
                              <tr>
                                <td
                                  className="min-settings pb-0"
                                  id="green-txt"
                                >
                                  21,641.50
                                </td>
                                <td
                                  className="min-settings pb-0"
                                  id="right-side"
                                >
                                  346.95
                                </td>
                                <td
                                  className="min-settings pb-0"
                                  id="right-side"
                                >
                                  6,506.9
                                </td>
                              </tr>
                              <tr>
                                <td
                                  className="min-settings pb-0"
                                  id="green-txt"
                                >
                                  21,641.50
                                </td>
                                <td
                                  className="min-settings pb-0"
                                  id="right-side"
                                >
                                  346.95
                                </td>
                                <td
                                  className="min-settings pb-0"
                                  id="right-side"
                                >
                                  6,506.9
                                </td>
                              </tr>
                              <tr>
                                <td
                                  className="min-settings pb-0"
                                  id="green-txt"
                                >
                                  21,641.50
                                </td>
                                <td
                                  className="min-settings pb-0"
                                  id="right-side"
                                >
                                  346.95
                                </td>
                                <td
                                  className="min-settings pb-0"
                                  id="right-side"
                                >
                                  6,506.9
                                </td>
                              </tr>
                              <tr>
                                <td
                                  className="min-settings pb-0"
                                  id="green-txt"
                                >
                                  21,641.50
                                </td>
                                <td
                                  className="min-settings pb-0"
                                  id="right-side"
                                >
                                  346.95
                                </td>
                                <td
                                  className="min-settings pb-0"
                                  id="right-side"
                                >
                                  6,506.9
                                </td>
                              </tr>
                              <tr>
                                <td
                                  className="min-settings pb-0"
                                  id="green-txt"
                                >
                                  21,641.50
                                </td>
                                <td
                                  className="min-settings pb-0"
                                  id="right-side"
                                >
                                  346.95
                                </td>
                                <td
                                  className="min-settings pb-0"
                                  id="right-side"
                                >
                                  6,506.9
                                </td>
                              </tr>
                              <tr>
                                <td
                                  className="min-settings pb-0"
                                  id="green-txt"
                                >
                                  21,641.50
                                </td>
                                <td
                                  className="min-settings pb-0"
                                  id="right-side"
                                >
                                  346.95
                                </td>
                                <td
                                  className="min-settings pb-0"
                                  id="right-side"
                                >
                                  6,506.9
                                </td>
                              </tr>
                              <tr>
                                <td
                                  className="min-settings pb-0"
                                  id="green-txt"
                                >
                                  21,641.50
                                </td>
                                <td
                                  className="min-settings pb-0"
                                  id="right-side"
                                >
                                  346.95
                                </td>
                                <td
                                  className="min-settings pb-0"
                                  id="right-side"
                                >
                                  6,506.9
                                </td>
                              </tr>
                              <tr>
                                <td
                                  className="min-settings pb-0"
                                  id="green-txt"
                                >
                                  21,641.50
                                </td>
                                <td
                                  className="min-settings pb-0"
                                  id="right-side"
                                >
                                  346.95
                                </td>
                                <td
                                  className="min-settings pb-0"
                                  id="right-side"
                                >
                                  6,506.9
                                </td>
                              </tr>
                              <tr>
                                <td
                                  className="min-settings pb-0"
                                  id="green-txt"
                                >
                                  21,641.50
                                </td>
                                <td
                                  className="min-settings pb-0"
                                  id="right-side"
                                >
                                  346.95
                                </td>
                                <td
                                  className="min-settings pb-0"
                                  id="right-side"
                                >
                                  6,506.9
                                </td>
                              </tr>
                              <tr>
                                <td
                                  className="min-settings pb-0"
                                  id="green-txt"
                                >
                                  21,641.50
                                </td>
                                <td
                                  className="min-settings pb-0"
                                  id="right-side"
                                >
                                  346.95
                                </td>
                                <td
                                  className="min-settings pb-0"
                                  id="right-side"
                                >
                                  6,506.9
                                </td>
                              </tr>
                              <tr>
                                <td
                                  className="min-settings pb-0"
                                  id="green-txt"
                                >
                                  21,641.50
                                </td>
                                <td
                                  className="min-settings pb-0"
                                  id="right-side"
                                >
                                  346.95
                                </td>
                                <td
                                  className="min-settings pb-0"
                                  id="right-side"
                                >
                                  6,506.9
                                </td>
                              </tr>
                              <tr>
                                <td
                                  className="min-settings pb-0"
                                  id="green-txt"
                                >
                                  21,641.50
                                </td>
                                <td
                                  className="min-settings pb-0"
                                  id="right-side"
                                >
                                  346.95
                                </td>
                                <td
                                  className="min-settings pb-0"
                                  id="right-side"
                                >
                                  6,506.9
                                </td>
                              </tr>
                              <tr>
                                <td
                                  className="min-settings pb-0"
                                  id="green-txt"
                                >
                                  21,641.50
                                </td>
                                <td
                                  className="min-settings pb-0"
                                  id="right-side"
                                >
                                  346.95
                                </td>
                                <td
                                  className="min-settings pb-0"
                                  id="right-side"
                                >
                                  6,506.9
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>

                        <div
                          className="tab-pane fade show "
                          id="third"
                          role="tabpanel"
                          aria-labelledby="third-tab"
                          style={{ padding: "0 15px" }}
                        >
                          <table className="table number-table mt-2">
                            <thead>
                              <tr>
                                <th scope="col" className="min-sett pb-0">
                                  Price(USDT)
                                </th>
                                <th
                                  scope="col"
                                  className="min-sett pb-0"
                                  id="right-side"
                                >
                                  Amount(FORTH)
                                </th>
                                <th
                                  scope="col"
                                  className="minimum-setting pb-0"
                                  id="right-side"
                                >
                                  Total
                                </th>
                              </tr>
                            </thead>

                            {/* <tbody>
                              <tr>
                                <td
                                  className="min-settings pb-0"
                                  style={{ color: "red" }}
                                >
                                  21,641.50
                                </td>
                                <td
                                  className="min-settings pb-0"
                                  id="right-side"
                                >
                                  346.95
                                </td>
                                <td
                                  className="min-settings pb-0"
                                  id="right-side"
                                >
                                  6,506.9
                                </td>
                              </tr>
                              <tr>
                                <td
                                  className="min-settings pb-0"
                                  style={{ color: "red" }}
                                >
                                  21,641.50
                                </td>
                                <td
                                  className="min-settings pb-0"
                                  id="right-side"
                                >
                                  346.95
                                </td>
                                <td
                                  className="min-settings pb-0"
                                  id="right-side"
                                >
                                  6,506.9
                                </td>
                              </tr>
                              <tr>
                                <td
                                  className="min-settings pb-0"
                                  style={{ color: "red" }}
                                >
                                  21,641.50
                                </td>
                                <td
                                  className="min-settings pb-0"
                                  id="right-side"
                                >
                                  346.95
                                </td>
                                <td
                                  className="min-settings pb-0"
                                  id="right-side"
                                >
                                  6,506.9
                                </td>
                              </tr>
                              <tr>
                                <td
                                  className="min-settings pb-0"
                                  style={{ color: "red" }}
                                >
                                  21,641.50
                                </td>
                                <td
                                  className="min-settings pb-0"
                                  id="right-side"
                                >
                                  346.95
                                </td>
                                <td
                                  className="min-settings pb-0"
                                  id="right-side"
                                >
                                  6,506.9
                                </td>
                              </tr>
                              <tr>
                                <td
                                  className="min-settings pb-0"
                                  style={{ color: "red" }}
                                >
                                  21,641.50
                                </td>
                                <td
                                  className="min-settings pb-0"
                                  id="right-side"
                                >
                                  346.95
                                </td>
                                <td
                                  className="min-settings pb-0"
                                  id="right-side"
                                >
                                  6,506.9
                                </td>
                              </tr>
                              <tr>
                                <td
                                  className="min-settings pb-0"
                                  style={{ color: "red" }}
                                >
                                  21,641.50
                                </td>
                                <td
                                  className="min-settings pb-0"
                                  id="right-side"
                                >
                                  346.95
                                </td>
                                <td
                                  className="min-settings pb-0"
                                  id="right-side"
                                >
                                  6,506.9
                                </td>
                              </tr>
                              <tr>
                                <td
                                  className="min-settings pb-0"
                                  style={{ color: "red" }}
                                >
                                  21,641.50
                                </td>
                                <td
                                  className="min-settings pb-0"
                                  id="right-side"
                                >
                                  346.95
                                </td>
                                <td
                                  className="min-settings pb-0"
                                  id="right-side"
                                >
                                  6,506.9
                                </td>
                              </tr>
                              <tr>
                                <td
                                  className="min-settings pb-0"
                                  style={{ color: "red" }}
                                >
                                  21,641.50
                                </td>
                                <td
                                  className="min-settings pb-0"
                                  id="right-side"
                                >
                                  346.95
                                </td>
                                <td
                                  className="min-settings pb-0"
                                  id="right-side"
                                >
                                  6,506.9
                                </td>
                              </tr>
                              <tr>
                                <td
                                  className="min-settings pb-0"
                                  style={{ color: "red" }}
                                >
                                  21,641.50
                                </td>
                                <td
                                  className="min-settings pb-0"
                                  id="right-side"
                                >
                                  346.95
                                </td>
                                <td
                                  className="min-settings pb-0"
                                  id="right-side"
                                >
                                  6,506.9
                                </td>
                              </tr>
                              <tr>
                                <td
                                  className="min-settings pb-0"
                                  style={{ color: "red" }}
                                >
                                  21,641.50
                                </td>
                                <td
                                  className="min-settings pb-0"
                                  id="right-side"
                                >
                                  346.95
                                </td>
                                <td
                                  className="min-settings pb-0"
                                  id="right-side"
                                >
                                  6,506.9
                                </td>
                              </tr>
                              <tr>
                                <td
                                  className="min-settings pb-0"
                                  style={{ color: "red" }}
                                >
                                  21,641.50
                                </td>
                                <td
                                  className="min-settings pb-0"
                                  id="right-side"
                                >
                                  346.95
                                </td>
                                <td
                                  className="min-settings pb-0"
                                  id="right-side"
                                >
                                  6,506.9
                                </td>
                              </tr>
                              <tr>
                                <td
                                  className="min-settings pb-0"
                                  style={{ color: "red" }}
                                >
                                  21,641.50
                                </td>
                                <td
                                  className="min-settings pb-0"
                                  id="right-side"
                                >
                                  346.95
                                </td>
                                <td
                                  className="min-settings pb-0"
                                  id="right-side"
                                >
                                  6,506.9
                                </td>
                              </tr>
                              <tr>
                                <td
                                  className="min-settings pb-0"
                                  style={{ color: "red" }}
                                >
                                  21,641.50
                                </td>
                                <td
                                  className="min-settings pb-0"
                                  id="right-side"
                                >
                                  346.95
                                </td>
                                <td
                                  className="min-settings pb-0"
                                  id="right-side"
                                >
                                  6,506.9
                                </td>
                              </tr>
                              <tr>
                                <td
                                  className="min-settings pb-0"
                                  style={{ color: "red" }}
                                >
                                  21,641.50
                                </td>
                                <td
                                  className="min-settings pb-0"
                                  id="right-side"
                                >
                                  346.95
                                </td>
                                <td
                                  className="min-settings pb-0"
                                  id="right-side"
                                >
                                  6,506.9
                                </td>
                              </tr>
                              <tr>
                                <td
                                  className="min-settings pb-0"
                                  style={{ color: "red" }}
                                >
                                  21,641.50
                                </td>
                                <td
                                  className="min-settings pb-0"
                                  id="right-side"
                                >
                                  346.95
                                </td>
                                <td
                                  className="min-settings pb-0"
                                  id="right-side"
                                >
                                  6,506.9
                                </td>
                              </tr>
                              <tr>
                                <td
                                  className="min-settings pb-0"
                                  style={{ color: "red" }}
                                >
                                  21,641.50
                                </td>
                                <td
                                  className="min-settings pb-0"
                                  id="right-side"
                                >
                                  346.95
                                </td>
                                <td
                                  className="min-settings pb-0"
                                  id="right-side"
                                >
                                  6,506.9
                                </td>
                              </tr>
                              <tr>
                                <td
                                  className="min-settings pb-0"
                                  style={{ color: "red" }}
                                >
                                  21,641.50
                                </td>
                                <td
                                  className="min-settings pb-0"
                                  id="right-side"
                                >
                                  346.95
                                </td>
                                <td
                                  className="min-settings pb-0"
                                  id="right-side"
                                >
                                  6,506.9
                                </td>
                              </tr>
                              <tr>
                                <td
                                  className="min-settings pb-0"
                                  style={{ color: "red" }}
                                >
                                  21,641.50
                                </td>
                                <td
                                  className="min-settings pb-0"
                                  id="right-side"
                                >
                                  346.95
                                </td>
                                <td
                                  className="min-settings pb-0"
                                  id="right-side"
                                >
                                  6,506.9
                                </td>
                              </tr>
                              <tr>
                                <td
                                  className="min-settings pb-0"
                                  style={{ color: "red" }}
                                >
                                  21,641.50
                                </td>
                                <td
                                  className="min-settings pb-0"
                                  id="right-side"
                                >
                                  346.95
                                </td>
                                <td
                                  className="min-settings pb-0"
                                  id="right-side"
                                >
                                  6,506.9
                                </td>
                              </tr>

                              <tr>
                                <td
                                  className="min-settings pb-0"
                                  style={{ color: "red" }}
                                >
                                  21,641.50
                                </td>
                                <td
                                  className="min-settings pb-0"
                                  id="right-side"
                                >
                                  346.95
                                </td>
                                <td
                                  className="min-settings pb-0"
                                  id="right-side"
                                >
                                  6,506.9
                                </td>
                              </tr>
                              <tr>
                                <td
                                  className="min-settings pb-0"
                                  style={{ color: "red" }}
                                >
                                  21,641.50
                                </td>
                                <td
                                  className="min-settings pb-0"
                                  id="right-side"
                                >
                                  346.95
                                </td>
                                <td
                                  className="min-settings pb-0"
                                  id="right-side"
                                >
                                  6,506.9
                                </td>
                              </tr>
                              <tr>
                                <td
                                  className="min-settings pb-0"
                                  style={{ color: "red" }}
                                >
                                  21,641.50
                                </td>
                                <td
                                  className="min-settings pb-0"
                                  id="right-side"
                                >
                                  346.95
                                </td>
                                <td
                                  className="min-settings pb-0"
                                  id="right-side"
                                >
                                  6,506.9
                                </td>
                              </tr>
                              <tr>
                                <td
                                  className="min-settings pb-0"
                                  style={{ color: "red" }}
                                >
                                  21,641.50
                                </td>
                                <td
                                  className="min-settings pb-0"
                                  id="right-side"
                                >
                                  346.95
                                </td>
                                <td
                                  className="min-settings pb-0"
                                  id="right-side"
                                >
                                  6,506.9
                                </td>
                              </tr>
                              <tr>
                                <td
                                  className="min-settings pb-0"
                                  style={{ color: "red" }}
                                >
                                  21,641.50
                                </td>
                                <td
                                  className="min-settings pb-0"
                                  id="right-side"
                                >
                                  346.95
                                </td>
                                <td
                                  className="min-settings pb-0"
                                  id="right-side"
                                >
                                  6,506.9
                                </td>
                              </tr>
                              <tr>
                                <td
                                  className="min-settings pb-0"
                                  style={{ color: "red" }}
                                >
                                  21,641.50
                                </td>
                                <td
                                  className="min-settings pb-0"
                                  id="right-side"
                                >
                                  346.95
                                </td>
                                <td
                                  className="min-settings pb-0"
                                  id="right-side"
                                >
                                  6,506.9
                                </td>
                              </tr>
                              <tr>
                                <td
                                  className="min-settings pb-0"
                                  style={{ color: "red" }}
                                >
                                  21,641.50
                                </td>
                                <td
                                  className="min-settings pb-0"
                                  id="right-side"
                                >
                                  346.95
                                </td>
                                <td
                                  className="min-settings pb-0"
                                  id="right-side"
                                >
                                  6,506.9
                                </td>
                              </tr>
                              <tr>
                                <td
                                  className="min-settings pb-0"
                                  style={{ color: "red" }}
                                >
                                  21,641.50
                                </td>
                                <td
                                  className="min-settings pb-0"
                                  id="right-side"
                                >
                                  346.95
                                </td>
                                <td
                                  className="min-settings pb-0"
                                  id="right-side"
                                >
                                  6,506.9
                                </td>
                              </tr>
                              <tr>
                                <td
                                  className="min-settings pb-0"
                                  style={{ color: "red" }}
                                >
                                  21,641.50
                                </td>
                                <td
                                  className="min-settings pb-0"
                                  id="right-side"
                                >
                                  346.95
                                </td>
                                <td
                                  className="min-settings pb-0"
                                  id="right-side"
                                >
                                  6,506.9
                                </td>
                              </tr>
                              <tr>
                                <td
                                  className="min-settings pb-0"
                                  style={{ color: "red" }}
                                >
                                  21,641.50
                                </td>
                                <td
                                  className="min-settings pb-0"
                                  id="right-side"
                                >
                                  346.95
                                </td>
                                <td
                                  className="min-settings pb-0"
                                  id="right-side"
                                >
                                  6,506.9
                                </td>
                              </tr>

                              <tr>
                                <td className="green-txt pt-2 pb-1">
                                  21,641.50{" "}
                                  <span
                                    className="gray-text pb-0"
                                    style={{ marginLeft: "20px" }}
                                  >
                                    $5.57
                                  </span>
                                </td>
                                <td></td>
                                <td
                                  className="gray-text m-0 pt-2"
                                  id="right-side"
                                >
                                  More
                                </td>
                              </tr>
                            </tbody> */}
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-8 graph-sec">
                    <nav className="navbar navbar-expand-lg time-nav navbar-dark ">
                      <div className="container-fluid">
                        {/* <!-- <a className="navbar-brand" href="#">Navbar</a> --> */}
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
                        <div
                          className="collapse navbar-collapse"
                          id="navbarNavDropdown"
                        >
                          <ul className="navbar-nav">
                            <li className="nav-item">
                              <a
                                className="nav-link active"
                                id="time-text"
                                aria-current="page"
                                href="#"
                              >
                                Time
                              </a>
                            </li>
                            <li className="nav-item">
                              <a className="nav-link" id="time-text" href="#">
                                15m
                              </a>
                            </li>
                            <li className="nav-item">
                              <a className="nav-link" id="time-text" href="#">
                                1H
                              </a>
                            </li>
                            <li className="nav-item">
                              <a className="nav-link" id="time-text" href="#">
                                4H
                              </a>
                            </li>{" "}
                            <li className="nav-item">
                              <a className="nav-link" id="time-text" href="#">
                                1D
                              </a>
                            </li>{" "}
                            <li className="nav-item">
                              <a className="nav-link" id="time-text" href="#">
                                1W
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
                              ></a>
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
                              <a className="nav-link" id="time-text" href="#">
                                <img src="/level.png" />
                              </a>
                            </li>
                          </ul>

                          <div className="d-flex" id="navbar-flex">
                            <ul className="navbar-nav">
                              <li className="nav-item">
                                <a
                                  className="nav-link active"
                                  id="time-text"
                                  aria-current="page"
                                  href="#"
                                >
                                  Original
                                </a>
                              </li>
                              <li className="nav-item">
                                <a className="nav-link" id="time-text" href="#">
                                  Trading View
                                </a>
                              </li>
                              <li className="nav-item">
                                <a className="nav-link" id="time-text" href="#">
                                  Depth
                                </a>
                              </li>
                              <li className="nav-item">
                                <a className="nav-link" id="time-text" href="#">
                                  <img id="arrow" src="/arrow.png" />
                                </a>
                              </li>
                              <li className="nav-item">
                                <a className="nav-link" id="time-text" href="#">
                                  <img src="/square-bt.png" />
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </nav>

                    <div className="graph-part">
                      <div className="graph-image">
                        <BarCharts data={props?.params?.id} />
                      </div>
                      {/* <img className="graph-image" /> */}
                    </div>

                    <div className="graph-tabs">
                      <ul
                        className="nav nav-tabs p-0"
                        id="myTab"
                        role="tablist"
                        style={{ padding: "0px !important" }}
                      >
                        <li className="nav-item" role="presentation">
                          <button
                            className="nav-link link-head active"
                            id="link-head"
                            data-bs-toggle="tab"
                            data-bs-target="#spot"
                            type="button"
                            role="tab"
                            aria-controls="spot"
                            aria-selected="false"
                          >
                            Spot
                          </button>
                        </li>

                        <li className="nav-item" role="presentation">
                          <button
                            className="nav-link link-head "
                            id="link-head"
                            data-bs-toggle="tab"
                            data-bs-target="#profile"
                            type="button"
                            role="tab"
                            aria-controls="profile"
                            aria-selected="false"
                          >
                            Cross 3x
                          </button>
                        </li>
                        <li className="nav-item" role="presentation">
                          <button
                            className="nav-link link-head "
                            id="link-head"
                            data-bs-toggle="tab"
                            data-bs-target="#profile"
                            type="button"
                            role="tab"
                            aria-controls="profile"
                            aria-selected="false"
                          >
                            Isolated 10x
                          </button>
                        </li>
                      </ul>

                      <div className="d-flex percent-sec">
                        <h4 className="percent-text">
                          <img
                            style={{ marginTop: "-5px" }}
                            src="/hot-shape.png"
                          />
                          0% trading fee on this BTC pair{" "}
                          <img
                            style={{ paddingLeft: "3px" }}
                            src="/right-icon.png"
                          />{" "}
                        </h4>
                        <img className="three-icon" src="/three-icon.png" />
                      </div>
                    </div>
                    <div className="limit-sec">
                      <div className="limit-section">
                        <ul
                          className="nav nav-tabs tabs-padding"
                          id="myTab"
                          role="tablist"
                        >
                          <li className="nav-item" role="presentation">
                            <button
                              className="nav-link limit-head active"
                              id="limit-head"
                              data-bs-toggle="tab"
                              data-bs-target="#spot"
                              type="button"
                              role="tab"
                              aria-controls="spot"
                              aria-selected="false"
                            >
                              Limit
                            </button>
                          </li>

                          <li className="nav-item" role="presentation">
                            <button
                              className="nav-link limit-head "
                              id="limit-head"
                              data-bs-toggle="tab"
                              data-bs-target="#market"
                              type="button"
                              role="tab"
                              aria-controls="market"
                              aria-selected="false"
                            >
                              Market
                            </button>
                          </li>
                          <li className="nav-item" role="presentation">
                            <button
                              className="nav-link limit-head "
                              id="limit-head"
                              data-bs-toggle="tab"
                              data-bs-target="#profile"
                              type="button"
                              role="tab"
                              aria-controls="profile"
                              aria-selected="false"
                            >
                              Stop-limit
                            </button>
                          </li>
                          <li className="nav-item dropdown pt-1">
                            <a
                              className="nav-link dropdown-toggle limit-head"
                              href="#"
                              id="navbarDropdownMenuLink limit-head"
                              role="button"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                              style={{ paddingLeft: "0px !important" }}
                            ></a>
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

                          <li className="nav-item dropdown pt-2">
                            <img src="/exclamation.png" />
                          </li>
                        </ul>
                      </div>

                      <div className="busd-part">
                        <div className="busd-left">
                          <h4 className="busd-text">
                            <span className="avbl-text"> Avbl</span> - BUSD
                          </h4>
                          <div
                            className="input-group mb-2 mt-2"
                            id="input-height"
                          >
                            <span
                              className="input-group-text control-edit"
                              style={{
                                borderRadius: "4px 0 0 4px !important",
                                color: "#696D6E !important",
                              }}
                              id="basic-addon2"
                            >
                              Price
                            </span>
                            <input
                              type="text"
                              className="form-control control-edit"
                              placeholder="Recipient's username"
                              aria-label="Recipient's username"
                              aria-describedby="basic-addon2"
                            />
                            <span
                              className="input-group-text control-edit"
                              style={{ borderRadius: "0 4px 4px 0 !important" }}
                              id="basic-addon2"
                            >
                              BUSD
                            </span>
                          </div>

                          <div className="input-group mb-3" id="input-height">
                            <input
                              type="text"
                              className="form-control control-edit"
                              style={{
                                borderRadius: "4px 0 0 4px  !important",
                              }}
                              placeholder="Amount"
                              aria-label="Recipient's username"
                              aria-describedby="basic-addon2"
                            />
                            <span
                              className="input-group-text control-edit"
                              style={{ borderRadius: "0 4px 4px 0 !important" }}
                              id="basic-addon2"
                            >
                              BTC
                            </span>
                          </div>

                          <div className="rating-sec">
                            <img className="line-img" src="/line.png" />
                          </div>

                          <div className="rating-btn">
                            <button
                              id="input-height"
                              type="button"
                              className="btn login-btn"
                            >
                              {" "}
                              <a className="login-link" href="">
                                {" "}
                                Log In{" "}
                              </a>{" "}
                              or{" "}
                              <a className="login-link" href="">
                                Register Now{" "}
                              </a>{" "}
                            </button>
                          </div>
                        </div>
                        <div className="busd-right">
                          <h4 className="busd-text">
                            <span className="avbl-text"> Avbl</span> - BUSD
                          </h4>

                          <div
                            className="input-group mb-2 mt-2"
                            id="input-height"
                          >
                            <span
                              className="input-group-text control-edit"
                              style={{
                                borderRadius: "4px 0 0 4px !important",
                                color: "#696D6E !important",
                              }}
                              id="basic-addon2"
                            >
                              Price
                            </span>
                            <input
                              type="text"
                              className="form-control control-edit"
                              placeholder="Recipient's username"
                              aria-label="Recipient's username"
                              aria-describedby="basic-addon2"
                            />
                            <span
                              className="input-group-text control-edit"
                              style={{ borderRadius: "0 4px 4px 0 !important" }}
                              id="basic-addon2"
                            >
                              BUSD
                            </span>
                          </div>

                          <div className="input-group mb-3" id="input-height">
                            <input
                              type="text"
                              className="form-control control-edit"
                              style={{
                                borderRadius: "4px 0 0 4px  !important",
                              }}
                              placeholder="Amount"
                              aria-label="Recipient's username"
                              aria-describedby="basic-addon2"
                            />
                            <span
                              className="input-group-text control-edit"
                              style={{
                                borderRadius: "0 4px 4px 0 !important ",
                              }}
                              id="basic-addon2"
                            >
                              BTC
                            </span>
                          </div>

                          <div className="rating-sec">
                            <img className="line-img" src="/line.png" />
                          </div>

                          <div className="rating-btn">
                            <button
                              id="input-height"
                              type="button"
                              className="btn login-btn"
                            >
                              {" "}
                              <a className="login-link" href="">
                                {" "}
                                Log In{" "}
                              </a>{" "}
                              or{" "}
                              <a className="login-link" href="">
                                Register Now{" "}
                              </a>{" "}
                            </button>
                          </div>
                        </div>

                        {/* <!-- <div className="tab-content" id="myTabContent">
                              <div className="tab-pane fade show active" id="spot" role="tabpanel" aria-labelledby="spot-tab"> --> */}

                        {/* <!-- <div className="tab-pane fade show " id="market" role="tabpanel" aria-labelledby="market-tab">

                              <div className="busd-part">
                                <div className="busd-left">
                                  <h4 className="busd-text"><span className="avbl-text"> Avbl</span>   - BUSD</h4>
                                  <div className="input-group mb-2 mt-2" id="input-height">
                                    <span className="input-group-text control-edit"  style="border-radius: 4px 0 0 4px !important ; color: #696D6E !important;" id="basic-addon2">Price</span>
                                    <input type="text" className="form-control control-edit"  placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="basic-addon2"/>
                                    <span className="input-group-text control-edit" style="border-radius:0 4px 4px 0 !important ;" id="basic-addon2">BUSD</span>
                                  </div>
                  
                                  <div className="input-group mb-3" id="input-height">
                                  <input type="text" className="form-control control-edit" style="border-radius: 4px 0 0 4px  !important ;" placeholder="Amount" aria-label="Recipient's username" aria-describedby="basic-addon2"/>
                                    <span className="input-group-text control-edit" style="border-radius:0 4px 4px 0 !important ;" id="basic-addon2">BTC</span>
                                  </div>
                  
                                  <div className="rating-sec">
                                    <img className="line-img" src="/line.png"/>
                                  </div>
                  
                                  <div className="rating-btn">
                                    <button id="input-height" type="button" className="btn login-btn">  <a className="login-link" href=""> Log In </a> or <a className="login-link" href="">Register Now </a> </button>
                                  </div>
                                </div>
                                <div className="busd-right">
                  
                                  <h4 className="busd-text"><span className="avbl-text"> Avbl</span>   - BUSD</h4>
                  
                                  <div className="input-group mb-2 mt-2" id="input-height">
                                    <span className="input-group-text control-edit"  style="border-radius: 4px 0 0 4px !important ; color: #696D6E !important;" id="basic-addon2">Price</span>
                                    <input type="text" className="form-control control-edit"  placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="basic-addon2"/>
                                    <span className="input-group-text control-edit" style="border-radius:0 4px 4px 0 !important ;" id="basic-addon2">BUSD</span>
                                  </div>
                  
                                  <div className="input-group mb-3" id="input-height">
                                  <input type="text" className="form-control control-edit" style="border-radius: 4px 0 0 4px  !important ;" placeholder="Amount" aria-label="Recipient's username" aria-describedby="basic-addon2"/>
                                    <span className="input-group-text control-edit" style="border-radius:0 4px 4px 0 !important ;" id="basic-addon2">BTC</span>
                                  </div>
                  
                                  <div className="rating-sec">
                                    <img className="line-img" src="/line.png"/>
                                  </div>
                  
                                  <div className="rating-btn">
                                    <button id="input-height" type="button" className="btn login-btn">  <a className="login-link" href=""> Log In </a> or <a className="login-link" href="">Register Now </a> </button>
                                  </div>
                  
                                </div>
                  
                              </div>
                      
                                              </div> --> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-3 right-sec">
                <div
                  className="number-sec"
                  style={{ paddingRight: "none !important" }}
                >
                  <div
                    className="input-group flex-nowrap"
                    style={{ padding: "0 20px" }}
                  >
                    <span
                      className="input-group-text dark-bg"
                      id="addon-wrapping"
                    >
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

                  <ul
                    className="nav nav-tabs p-2 tabs-scroll"
                    id="myTab"
                    role="tablist"
                  >
                    <li className="nav-item" role="presentation">
                      <button
                        className="nav-link "
                        id="star-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#star"
                        type="button"
                        role="tab"
                        aria-controls="star"
                        aria-selected="false"
                        style={{ paddingLeft: "0px", paddingBottom: "0px;" }}
                      >
                        <img
                          style={{
                            marginTop: "-1px",
                            marginLeft: "-1px",
                            marginRight: "2px",
                          }}
                          src="/star.png"
                        />
                      </button>
                    </li>

                    <li className="nav-item" role="presentation">
                      <button
                        className="nav-link active"
                        id="home-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#home"
                        type="button"
                        role="tab"
                        aria-controls="home"
                        aria-selected="true"
                        style={{ paddingLeft: "0px", paddingBottom: "0px" }}
                      >
                        Margin
                      </button>
                    </li>

                    <li className="nav-item" role="presentation">
                      <button
                        className="nav-link"
                        id="busd-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#busd"
                        type="button"
                        role="tab"
                        aria-controls="busd"
                        aria-selected="true"
                      >
                        BUSD
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button
                        className="nav-link"
                        id="usdt-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#usdt"
                        type="button"
                        role="tab"
                        aria-controls="usdt"
                        aria-selected="false"
                      >
                        USDT
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button
                        className="nav-link"
                        id="bnb-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#bnb"
                        type="button"
                        role="tab"
                        aria-controls="bnb"
                        aria-selected="false"
                      >
                        BNB
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button
                        className="nav-link"
                        id="btc-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#btc"
                        type="button"
                        role="tab"
                        aria-controls="btc"
                        aria-selected="false"
                      >
                        BTC
                      </button>
                    </li>

                    <li className="nav-item dropdown">
                      <a
                        className="nav-link dropdown-toggle"
                        id="profile-tab"
                        data-bs-toggle="dropdown"
                        data-bs-target="#profile"
                        role="tab"
                        aria-controls="profile"
                        aria-selected="false"
                      >
                        ALTS
                      </a>
                      <ul className="dropdown-menu">
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
                        <li>
                          <hr className="dropdown-divider" />
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            Separated link
                          </a>
                        </li>
                      </ul>
                    </li>

                    <li className="nav-item dropdown">
                      <a
                        className="nav-link dropdown-toggle"
                        id="profile-tab"
                        data-bs-toggle="dropdown"
                        data-bs-target="#profile"
                        role="tab"
                        aria-controls="profile"
                        aria-selected="false"
                      >
                        FIAT
                      </a>
                      <ul className="dropdown-menu">
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
                        <li>
                          <hr className="dropdown-divider" />
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            Separated link
                          </a>
                        </li>
                      </ul>
                    </li>

                    <li className="nav-item dropdown">
                      <a
                        className="nav-link dropdown-toggle"
                        id="profile-tab"
                        data-bs-toggle="dropdown"
                        data-bs-target="#profile"
                        role="tab"
                        aria-controls="profile"
                        aria-selected="false"
                      >
                        Zones
                      </a>
                      <ul className="dropdown-menu">
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
                        <li>
                          <hr className="dropdown-divider" />
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            Separated link
                          </a>
                        </li>
                      </ul>
                    </li>
                  </ul>

                  <div className="tab-content" id="myTabContent">
                    <div
                      className="tab-pane fade show "
                      id="star"
                      role="tabpanel"
                      aria-labelledby="star-tab"
                    >
                      <table className="table number-table">
                        <thead className="thead-setting">
                          <tr>
                            <th scope="col" className="min-setting">
                              Pair
                            </th>
                            <th
                              scope="col"
                              className="min-setting"
                              id="right-side"
                            >
                              Price
                            </th>
                            <th
                              scope="col"
                              className="minimum-setting"
                              id="right-side"
                            >
                              Change
                            </th>
                          </tr>
                        </thead>
                      </table>
                    </div>

                    <div
                      className="tab-pane fade show active"
                      id="home"
                      role="tabpanel"
                      aria-labelledby="home-tab"
                    >
                      <ul
                        className="nav nav-tabs pb-4 "
                        style={{
                          paddingBottom: "10px !important",
                          paddingTop: "1px !important",
                        }}
                        id="myTab"
                        role="tablist"
                      >
                        <li className="nav-item " role="presentation">
                          <button
                            className="nav-link linking active pt-0"
                            id="all-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#all"
                            type="button"
                            role="tab"
                            aria-controls="all"
                            aria-selected="false"
                            style={{ paddingBottom: "0px" }}
                          >
                            All
                          </button>
                        </li>

                        <li className="nav-item" role="presentation">
                          <button
                            className="nav-link linking pt-0"
                            id="cross-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#cross"
                            type="button"
                            role="tab"
                            aria-controls="cross"
                            aria-selected="true"
                            style={{ paddingBottom: "0px" }}
                          >
                            Cross
                          </button>
                        </li>
                        <li className="nav-item" role="presentation">
                          <button
                            className="nav-link linking pt-0"
                            id="isolated-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#isolated"
                            type="button"
                            role="tab"
                            aria-controls="isolated"
                            aria-selected="true"
                            style={{ paddingBottom: "0px" }}
                          >
                            Isolated
                          </button>
                        </li>
                      </ul>
                      <table className="table number-table">
                        <thead className="thead-setting">
                          <tr>
                            <th scope="col" className="min-setting">
                              Pair
                            </th>
                            <th
                              scope="col"
                              className="min-setting"
                              id="right-side"
                            >
                              Price
                            </th>
                            <th
                              scope="col"
                              className="minimum-setting"
                              id="right-side"
                            >
                              Change
                            </th>
                          </tr>
                        </thead>

                        <tbody className="tbody-setting">
                          {allCoin?.map((item, id) => {
                            return (
                              <a
                                className="coin-row"
                                href={`/dynamic/${item.symbol}`}
                              >
                                <tr key={id} style={{ borderBottom: "none" }}>
                                  <td
                                    className="min-setting"
                                    style={{ display: "flex" }}
                                  >
                                    <img
                                      style={{
                                        marginTop: "-1px",
                                        marginLeft: "-1px",
                                        marginRight: "2px",
                                      }}
                                      src="/star.png"
                                    />{" "}
                                    {item?.symbol}
                                  </td>
                                  <td className="min-setting" id="right-side">
                                    {item?.bestBid}
                                  </td>
                                  <td
                                    className="min-setting"
                                    id="right-side"
                                    style={{ color: "red" }}
                                  >
                                    {" "}
                                    {item?.priceChangePercent}%
                                  </td>
                                </tr>
                              </a>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>

                    <div
                      className="tab-pane fade show "
                      id="busd"
                      role="tabpanel"
                      aria-labelledby="busd-tab"
                    >
                      <table className="table number-table">
                        <thead className="thead-setting">
                          <tr>
                            <th scope="col" className="min-setting">
                              Pair
                            </th>
                            <th
                              scope="col"
                              className="min-setting"
                              id="right-side"
                            >
                              Price
                            </th>
                            <th
                              scope="col"
                              className="minimum-setting"
                              id="right-side"
                            >
                              Change
                            </th>
                          </tr>
                        </thead>

                        <tbody className="tbody-setting">
                          <tr>
                            <td
                              className="min-setting"
                              style={{ display: "flex" }}
                            >
                              <img
                                style={{
                                  marginTop: "-1px",
                                  marginLeft: "-1px",
                                  marginRight: "2px",
                                }}
                                src="/star.png"
                              />{" "}
                              <span className="white-text">1INCH</span>/BUSD{" "}
                              <h3 className="box-text">3x</h3>
                            </td>
                            <td className="min-setting" id="right-side">
                              0.03632
                            </td>
                            <td
                              className="min-setting"
                              id="right-side"
                              style={{ color: "red" }}
                            >
                              {" "}
                              -4.24%
                            </td>
                          </tr>
                          <tr>
                            <td style={{ display: "flex" }}>
                              <img
                                style={{
                                  marginTop: "-1px",
                                  marginLeft: "-1px",
                                  marginRight: "2px",
                                }}
                                src="/star.png"
                              />{" "}
                              <span className="white-text">AAVE</span>/BUSD{" "}
                              <h3 className="box-text">3x</h3>
                            </td>
                            <td id="right-side">0.03632</td>
                            <td id="right-side" style={{ color: "red" }}>
                              {" "}
                              -4.24%
                            </td>
                          </tr>
                          <tr>
                            <td style={{ display: "flex" }}>
                              <img
                                style={{
                                  marginTop: "-1px",
                                  marginLeft: "-1px",
                                  marginRight: "2px",
                                }}
                                src="/star.png"
                              />{" "}
                              <span className="white-text">ACA</span>/BUSD{" "}
                              <h3 className="box-text">3x</h3>
                            </td>
                            <td id="right-side">0.03632</td>
                            <td id="right-side" style={{ color: "red" }}>
                              {" "}
                              -4.24%
                            </td>
                          </tr>
                          <tr>
                            <td style={{ display: "flex" }}>
                              <img
                                style={{
                                  marginTop: "-1px",
                                  marginLeft: "-1px",
                                  marginRight: "2px",
                                }}
                                src="/star.png"
                              />{" "}
                              <span className="white-text">ACH</span>/BUSD{" "}
                              <h3 className="box-text">3x</h3>
                            </td>
                            <td id="right-side">0.03632</td>
                            <td id="right-side" style={{ color: "red" }}>
                              {" "}
                              -4.24%
                            </td>
                          </tr>
                          <tr>
                            <td style={{ display: "flex" }}>
                              <img
                                style={{
                                  marginTop: "-1px",
                                  marginLeft: "-1px",
                                  marginRight: "2px",
                                }}
                                src="/star.png"
                              />{" "}
                              <span className="white-text">ACM</span>/BUSD{" "}
                              <h3 className="box-text">3x</h3>
                            </td>
                            <td id="right-side">0.03632</td>
                            <td id="right-side" style={{ color: "red" }}>
                              {" "}
                              -4.24%
                            </td>
                          </tr>
                          <tr>
                            <td style={{ display: "flex" }}>
                              <img
                                style={{
                                  marginTop: "-1px",
                                  marginLeft: "-1px",
                                  marginRight: "2px",
                                }}
                                src="/star.png"
                              />{" "}
                              <span className="white-text">ADA</span>/BUSD{" "}
                              <h3 className="box-text">3x</h3>
                            </td>
                            <td id="right-side">0.03632</td>
                            <td id="right-side" style={{ color: "red" }}>
                              {" "}
                              -4.24%
                            </td>
                          </tr>
                          <tr>
                            <td style={{ display: "flex" }}>
                              <img
                                style={{
                                  marginTop: "-1px",
                                  marginLeft: "-1px",
                                  marginRight: "2px",
                                }}
                                src="/star.png"
                              />{" "}
                              <span className="white-text">ADX</span>/BUSD{" "}
                              <h3 className="box-text">3x</h3>
                            </td>
                            <td id="right-side">0.03632</td>
                            <td id="right-side" style={{ color: "red" }}>
                              {" "}
                              -4.24%
                            </td>
                          </tr>
                          <tr>
                            <td style={{ display: "flex" }}>
                              <img
                                style={{
                                  marginTop: "-1px",
                                  marginLeft: "-1px",
                                  marginRight: "2px",
                                }}
                                src="/star.png"
                              />{" "}
                              <span className="white-text">AERGO</span>/BUSD{" "}
                              <h3 className="box-text">3x</h3>
                            </td>
                            <td id="right-side">0.03632</td>
                            <td id="right-side" style={{ color: "red" }}>
                              {" "}
                              -4.24%
                            </td>
                          </tr>
                          <tr>
                            <td style={{ display: "flex" }}>
                              <img
                                style={{
                                  marginTop: "-1px",
                                  marginLeft: "-1px",
                                  marginRight: "2px",
                                }}
                                src="/star.png"
                              />{" "}
                              <span className="white-text">AGLD</span>/BUSD{" "}
                              <h3 className="box-text">3x</h3>
                            </td>
                            <td id="right-side">0.03632</td>
                            <td id="right-side" style={{ color: "red" }}>
                              {" "}
                              -4.24%
                            </td>
                          </tr>
                          <tr>
                            <td style={{ display: "flex" }}>
                              <img
                                style={{
                                  marginTop: "-1px",
                                  marginLeft: "-1px",
                                  marginRight: "2px",
                                }}
                                src="/star.png"
                              />{" "}
                              <span className="white-text">AKRO</span>/BUSD{" "}
                              <h3 className="box-text">3x</h3>
                            </td>
                            <td id="right-side">0.03632</td>
                            <td id="right-side" style={{ color: "red" }}>
                              {" "}
                              -4.24%
                            </td>
                          </tr>
                          <tr>
                            <td style={{ display: "flex" }}>
                              <img
                                style={{
                                  marginTop: "-1px",
                                  marginLeft: "-1px",
                                  marginRight: "2px",
                                }}
                                src="/star.png"
                              />{" "}
                              <span className="white-text">ALCX</span>/BUSD{" "}
                              <h3 className="box-text">3x</h3>
                            </td>
                            <td id="right-side">0.03632</td>
                            <td id="right-side" style={{ color: "red" }}>
                              {" "}
                              -4.24%
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <div
                      className="tab-pane fade show "
                      id="usdt"
                      role="tabpanel"
                      aria-labelledby="usdt-tab"
                    >
                      <table className="table number-table">
                        <thead className="thead-setting">
                          <tr>
                            <th scope="col" className="min-setting">
                              Pair
                            </th>
                            <th
                              scope="col"
                              className="min-setting"
                              id="right-side"
                            >
                              Price
                            </th>
                            <th
                              scope="col"
                              className="minimum-setting"
                              id="right-side"
                            >
                              Change
                            </th>
                          </tr>
                        </thead>

                        <tbody className="tbody-setting">
                          <tr>
                            <td
                              className="min-setting"
                              style={{ display: "flex" }}
                            >
                              <img
                                style={{
                                  marginTop: "-1px",
                                  marginLeft: "-1px",
                                  marginRight: "2px",
                                }}
                                src="/star.png"
                              />{" "}
                              <span className="white-text">1INCH</span>/USDT{" "}
                              <h3 className="box-text">3x</h3>
                            </td>
                            <td className="min-setting" id="right-side">
                              0.03632
                            </td>
                            <td
                              className="min-setting"
                              id="right-side"
                              style={{ color: "red" }}
                            >
                              {" "}
                              -4.24%
                            </td>
                          </tr>
                          <tr>
                            <td style={{ display: "flex" }}>
                              <img
                                style={{
                                  marginTop: "-1px",
                                  marginLeft: "-1px",
                                  marginRight: "2px",
                                }}
                                src="/star.png"
                              />{" "}
                              <span className="white-text">AAVE</span>/USDT{" "}
                              <h3 className="box-text">3x</h3>
                            </td>
                            <td id="right-side">0.03632</td>
                            <td id="right-side" style={{ color: "red" }}>
                              {" "}
                              -4.24%
                            </td>
                          </tr>
                          <tr>
                            <td style={{ display: "flex" }}>
                              <img
                                style={{
                                  marginTop: "-1px",
                                  marginLeft: "-1px",
                                  marginRight: "2px",
                                }}
                                src="/star.png"
                              />{" "}
                              <span className="white-text">ACA</span>/USDT{" "}
                              <h3 className="box-text">3x</h3>
                            </td>
                            <td id="right-side">0.03632</td>
                            <td id="right-side" style={{ color: "red" }}>
                              {" "}
                              -4.24%
                            </td>
                          </tr>
                          <tr>
                            <td style={{ display: "flex" }}>
                              <img
                                style={{
                                  marginTop: "-1px",
                                  marginLeft: "-1px",
                                  marginRight: "2px",
                                }}
                                src="/star.png"
                              />{" "}
                              <span className="white-text">ACH</span>/USDT{" "}
                              <h3 className="box-text">3x</h3>
                            </td>
                            <td id="right-side">0.03632</td>
                            <td id="right-side" style={{ color: "red" }}>
                              {" "}
                              -4.24%
                            </td>
                          </tr>
                          <tr>
                            <td style={{ display: "flex" }}>
                              <img
                                style={{
                                  marginTop: "-1px",
                                  marginLeft: "-1px",
                                  marginRight: "2px",
                                }}
                                src="/star.png"
                              />{" "}
                              <span className="white-text">ACM</span>/USDT{" "}
                              <h3 className="box-text">3x</h3>
                            </td>
                            <td id="right-side">0.03632</td>
                            <td id="right-side" style={{ color: "red" }}>
                              {" "}
                              -4.24%
                            </td>
                          </tr>
                          <tr>
                            <td style={{ display: "flex" }}>
                              <img
                                style={{
                                  marginTop: "-1px",
                                  marginLeft: "-1px",
                                  marginRight: "2px",
                                }}
                                src="/star.png"
                              />{" "}
                              <span className="white-text">ADA</span>/USDT{" "}
                              <h3 className="box-text">3x</h3>
                            </td>
                            <td id="right-side">0.03632</td>
                            <td id="right-side" style={{ color: "red" }}>
                              {" "}
                              -4.24%
                            </td>
                          </tr>
                          <tr>
                            <td style={{ display: "flex" }}>
                              <img
                                style={{
                                  marginTop: "-1px",
                                  marginLeft: "-1px",
                                  marginRight: "2px",
                                }}
                                src="/star.png"
                              />{" "}
                              <span className="white-text">ADX</span>/USDT{" "}
                              <h3 className="box-text">3x</h3>
                            </td>
                            <td id="right-side">0.03632</td>
                            <td id="right-side" style={{ color: "red" }}>
                              {" "}
                              -4.24%
                            </td>
                          </tr>
                          <tr>
                            <td style={{ display: "flex" }}>
                              <img
                                style={{
                                  marginTop: "-1px",
                                  marginLeft: "-1px",
                                  marginRight: "2px",
                                }}
                                src="/star.png"
                              />{" "}
                              <span className="white-text">AERGO</span>/USDT{" "}
                              <h3 className="box-text">3x</h3>
                            </td>
                            <td id="right-side">0.03632</td>
                            <td id="right-side" style={{ color: "red" }}>
                              {" "}
                              -4.24%
                            </td>
                          </tr>
                          <tr>
                            <td style={{ display: "flex" }}>
                              <img
                                style={{
                                  marginTop: "-1px",
                                  marginLeft: "-1px",
                                  marginRight: "2px",
                                }}
                                src="/star.png"
                              />{" "}
                              <span className="white-text">AGLD</span>/USDT{" "}
                              <h3 className="box-text">3x</h3>
                            </td>
                            <td id="right-side">0.03632</td>
                            <td id="right-side" style={{ color: "red" }}>
                              {" "}
                              -4.24%
                            </td>
                          </tr>
                          <tr>
                            <td style={{ display: "flex" }}>
                              <img
                                style={{
                                  marginTop: "-1px",
                                  marginLeft: "-1px",
                                  marginRight: "2px",
                                }}
                                src="/star.png"
                              />{" "}
                              <span className="white-text">AKRO</span>/USDT{" "}
                              <h3 className="box-text">3x</h3>
                            </td>
                            <td id="right-side">0.03632</td>
                            <td id="right-side" style={{ color: "red" }}>
                              {" "}
                              -4.24%
                            </td>
                          </tr>
                          <tr>
                            <td style={{ display: "flex" }}>
                              <img
                                style={{
                                  marginTop: "-1px",
                                  marginLeft: "-1px",
                                  marginRight: "2px",
                                }}
                                src="/star.png"
                              />{" "}
                              <span className="white-text">ALCX</span>/USDT{" "}
                              <h3 className="box-text">3x</h3>
                            </td>
                            <td id="right-side">0.03632</td>
                            <td id="right-side" style={{ color: "red" }}>
                              {" "}
                              -4.24%
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <div
                      className="tab-pane fade show "
                      id="bnb"
                      role="tabpanel"
                      aria-labelledby="bnb-tab"
                    >
                      <table className="table number-table">
                        <thead className="thead-setting">
                          <tr>
                            <th scope="col" className="min-setting">
                              Pair
                            </th>
                            <th
                              scope="col"
                              className="min-setting"
                              id="right-side"
                            >
                              Price
                            </th>
                            <th
                              scope="col"
                              className="minimum-setting"
                              id="right-side"
                            >
                              Change
                            </th>
                          </tr>
                        </thead>

                        <tbody className="tbody-setting">
                          <tr>
                            <td
                              className="min-setting"
                              style={{ display: "flex" }}
                            >
                              <img
                                style={{
                                  marginTop: "-1px",
                                  marginLeft: "-1px",
                                  marginRight: "2px",
                                }}
                                src="/star.png"
                              />{" "}
                              <span className="white-text">ACH</span>/BNB{" "}
                              <h3 className="box-text">3x</h3>
                            </td>
                            <td className="min-setting" id="right-side">
                              0.03632
                            </td>
                            <td
                              className="min-setting"
                              id="right-side"
                              style={{ color: "red" }}
                            >
                              {" "}
                              -4.24%
                            </td>
                          </tr>
                          <tr>
                            <td style={{ display: "flex" }}>
                              <img
                                style={{
                                  marginTop: "-1px",
                                  marginLeft: "-1px",
                                  marginRight: "2px",
                                }}
                                src="/star.png"
                              />{" "}
                              <span className="white-text">AAVE</span>/BNB{" "}
                              <h3 className="box-text">3x</h3>
                            </td>
                            <td id="right-side">0.03632</td>
                            <td id="right-side" style={{ color: "red" }}>
                              {" "}
                              -4.24%
                            </td>
                          </tr>
                          <tr>
                            <td style={{ display: "flex" }}>
                              <img
                                style={{
                                  marginTop: "-1px",
                                  marginLeft: "-1px",
                                  marginRight: "2px",
                                }}
                                src="/star.png"
                              />{" "}
                              <span className="white-text">ACA</span>/BNB{" "}
                              <h3 className="box-text">3x</h3>
                            </td>
                            <td id="right-side">0.03632</td>
                            <td id="right-side" style={{ color: "red" }}>
                              {" "}
                              -4.24%
                            </td>
                          </tr>
                          <tr>
                            <td style={{ display: "flex" }}>
                              <img
                                style={{
                                  marginTop: "-1px",
                                  marginLeft: "-1px",
                                  marginRight: "2px",
                                }}
                                src="/star.png"
                              />{" "}
                              <span className="white-text">ACH</span>/BNB{" "}
                              <h3 className="box-text">3x</h3>
                            </td>
                            <td id="right-side">0.03632</td>
                            <td id="right-side" style={{ color: "red" }}>
                              {" "}
                              -4.24%
                            </td>
                          </tr>
                          <tr>
                            <td style={{ display: "flex" }}>
                              <img
                                style={{
                                  marginTop: "-1px",
                                  marginLeft: "-1px",
                                  marginRight: "2px",
                                }}
                                src="/star.png"
                              />{" "}
                              <span className="white-text">ACM</span>/BNB{" "}
                              <h3 className="box-text">3x</h3>
                            </td>
                            <td id="right-side">0.03632</td>
                            <td id="right-side" style={{ color: "red" }}>
                              {" "}
                              -4.24%
                            </td>
                          </tr>
                          <tr>
                            <td style={{ display: "flex" }}>
                              <img
                                style={{
                                  marginTop: "-1px",
                                  marginLeft: "-1px",
                                  marginRight: "2px",
                                }}
                                src="/star.png"
                              />{" "}
                              <span className="white-text">ADA</span>/BNB{" "}
                              <h3 className="box-text">3x</h3>
                            </td>
                            <td id="right-side">0.03632</td>
                            <td id="right-side" style={{ color: "red" }}>
                              {" "}
                              -4.24%
                            </td>
                          </tr>
                          <tr>
                            <td style={{ display: "flex" }}>
                              <img
                                style={{
                                  marginTop: "-1px",
                                  marginLeft: "-1px",
                                  marginRight: "2px",
                                }}
                                src="/star.png"
                              />{" "}
                              <span className="white-text">ADX</span>/BNB{" "}
                              <h3 className="box-text">3x</h3>
                            </td>
                            <td id="right-side">0.03632</td>
                            <td id="right-side" style={{ color: "red" }}>
                              {" "}
                              -4.24%
                            </td>
                          </tr>
                          <tr>
                            <td style={{ display: "flex" }}>
                              <img
                                style={{
                                  marginTop: "-1px",
                                  marginLeft: "-1px",
                                  marginRight: "2px",
                                }}
                                src="/star.png"
                              />{" "}
                              <span className="white-text">AERGO</span>/BNB{" "}
                              <h3 className="box-text">3x</h3>
                            </td>
                            <td id="right-side">0.03632</td>
                            <td id="right-side" style={{ color: "red" }}>
                              {" "}
                              -4.24%
                            </td>
                          </tr>
                          <tr>
                            <td style={{ display: "flex" }}>
                              <img
                                style={{
                                  marginTop: "-1px",
                                  marginLeft: "-1px",
                                  marginRight: "2px",
                                }}
                                src="/star.png"
                              />{" "}
                              <span className="white-text">AGLD</span>/BNB{" "}
                              <h3 className="box-text">3x</h3>
                            </td>
                            <td id="right-side">0.03632</td>
                            <td id="right-side" style={{ color: "red" }}>
                              {" "}
                              -4.24%
                            </td>
                          </tr>
                          <tr>
                            <td style={{ display: "flex" }}>
                              <img
                                style={{
                                  marginTop: "-1px",
                                  marginLeft: "-1px",
                                  marginRight: "2px",
                                }}
                                src="/star.png"
                              />{" "}
                              <span className="white-text">AKRO</span>/BNB{" "}
                              <h3 className="box-text">3x</h3>
                            </td>
                            <td id="right-side">0.03632</td>
                            <td id="right-side" style={{ color: "red" }}>
                              {" "}
                              -4.24%
                            </td>
                          </tr>
                          <tr>
                            <td style={{ display: "flex" }}>
                              <img
                                style={{
                                  marginTop: "-1px",
                                  marginLeft: "-1px",
                                  marginRight: "2px",
                                }}
                                src="/star.png"
                              />{" "}
                              <span className="white-text">ALCX</span>/BNB{" "}
                              <h3 className="box-text">3x</h3>
                            </td>
                            <td id="right-side">0.03632</td>
                            <td id="right-side" style={{ color: "red" }}>
                              {" "}
                              -4.24%
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <div
                      className="tab-pane fade show "
                      id="btc"
                      role="tabpanel"
                      aria-labelledby="btc-tab"
                    >
                      <table className="table number-table">
                        <thead className="thead-setting">
                          <tr>
                            <th scope="col" className="min-setting">
                              Pair
                            </th>
                            <th
                              scope="col"
                              className="min-setting"
                              id="right-side"
                            >
                              Price
                            </th>
                            <th
                              scope="col"
                              className="minimum-setting"
                              id="right-side"
                            >
                              Change
                            </th>
                          </tr>
                        </thead>

                        <tbody className="tbody-setting">
                          <tr>
                            <td
                              className="min-setting"
                              style={{ display: "flex" }}
                            >
                              <img
                                style={{
                                  marginTop: "-1px",
                                  marginLeft: "-1px",
                                  marginRight: "2px",
                                }}
                                src="/star.png"
                              />{" "}
                              <span className="white-text">ACH</span>/BTC{" "}
                              <h3 className="box-text">3x</h3>
                            </td>
                            <td className="min-setting" id="right-side">
                              0.03632
                            </td>
                            <td
                              className="min-setting"
                              id="right-side"
                              style={{ color: "red" }}
                            >
                              {" "}
                              -4.24%
                            </td>
                          </tr>
                          <tr>
                            <td style={{ display: "flex" }}>
                              <img
                                style={{
                                  marginTop: "-1px",
                                  marginLeft: "-1px",
                                  marginRight: "2px",
                                }}
                                src="/star.png"
                              />{" "}
                              <span className="white-text">AAVE</span>/BTC{" "}
                              <h3 className="box-text">3x</h3>
                            </td>
                            <td id="right-side">0.03632</td>
                            <td id="right-side" style={{ color: "red" }}>
                              {" "}
                              -4.24%
                            </td>
                          </tr>
                          <tr>
                            <td style={{ display: "flex" }}>
                              <img
                                style={{
                                  marginTop: "-1px",
                                  marginLeft: "-1px",
                                  marginRight: "2px",
                                }}
                                src="/star.png"
                              />{" "}
                              <span className="white-text">ACA</span>/BTC{" "}
                              <h3 className="box-text">3x</h3>
                            </td>
                            <td id="right-side">0.03632</td>
                            <td id="right-side" style={{ color: "red" }}>
                              {" "}
                              -4.24%
                            </td>
                          </tr>
                          <tr>
                            <td style={{ display: "flex" }}>
                              <img
                                style={{
                                  marginTop: "-1px",
                                  marginLeft: "-1px",
                                  marginRight: "2px",
                                }}
                                src="/star.png"
                              />{" "}
                              <span className="white-text">ACH</span>/BTC{" "}
                              <h3 className="box-text">3x</h3>
                            </td>
                            <td id="right-side">0.03632</td>
                            <td id="right-side" style={{ color: "red" }}>
                              {" "}
                              -4.24%
                            </td>
                          </tr>
                          <tr>
                            <td style={{ display: "flex" }}>
                              <img
                                style={{
                                  marginTop: "-1px",
                                  marginLeft: "-1px",
                                  marginRight: "2px",
                                }}
                                src="/star.png"
                              />{" "}
                              <span className="white-text">ACM</span>/BTC{" "}
                              <h3 className="box-text">3x</h3>
                            </td>
                            <td id="right-side">0.03632</td>
                            <td id="right-side" style={{ color: "red" }}>
                              {" "}
                              -4.24%
                            </td>
                          </tr>
                          <tr>
                            <td style={{ display: "flex" }}>
                              <img
                                style={{
                                  marginTop: "-1px",
                                  marginLeft: "-1px",
                                  marginRight: "2px",
                                }}
                                src="/star.png"
                              />{" "}
                              <span className="white-text">ADA</span>/BTC{" "}
                              <h3 className="box-text">3x</h3>
                            </td>
                            <td id="right-side">0.03632</td>
                            <td id="right-side" style={{ color: "red" }}>
                              {" "}
                              -4.24%
                            </td>
                          </tr>
                          <tr>
                            <td style={{ display: "flex" }}>
                              <img
                                style={{
                                  marginTop: "-1px",
                                  marginLeft: "-1px",
                                  marginRight: "2px",
                                }}
                                src="/star.png"
                              />{" "}
                              <span className="white-text">ADX</span>/BTC{" "}
                              <h3 className="box-text">3x</h3>
                            </td>
                            <td id="right-side">0.03632</td>
                            <td id="right-side" style={{ color: "red" }}>
                              {" "}
                              -4.24%
                            </td>
                          </tr>
                          <tr>
                            <td style={{ display: "flex" }}>
                              <img
                                style={{
                                  marginTop: "-1px",
                                  marginLeft: "-1px",
                                  marginRight: "2px",
                                }}
                                src="/star.png"
                              />{" "}
                              <span className="white-text">AERGO</span>/BTC{" "}
                              <h3 className="box-text">3x</h3>
                            </td>
                            <td id="right-side">0.03632</td>
                            <td id="right-side" style={{ color: "red" }}>
                              {" "}
                              -4.24%
                            </td>
                          </tr>
                          <tr>
                            <td style={{ display: "flex" }}>
                              <img
                                style={{
                                  marginTop: "-1px",
                                  marginLeft: "-1px",
                                  marginRight: "2px",
                                }}
                                src="/star.png"
                              />{" "}
                              <span className="white-text">AGLD</span>/BTC{" "}
                              <h3 className="box-text">3x</h3>
                            </td>
                            <td id="right-side">0.03632</td>
                            <td id="right-side" style={{ color: "red" }}>
                              {" "}
                              -4.24%
                            </td>
                          </tr>
                          <tr>
                            <td style={{ display: "flex" }}>
                              <img
                                style={{
                                  marginTop: "-1px",
                                  marginLeft: "-1px",
                                  marginRight: "2px",
                                }}
                                src="/star.png"
                              />{" "}
                              <span className="white-text">AKRO</span>/BTC{" "}
                              <h3 className="box-text">3x</h3>
                            </td>
                            <td id="right-side">0.03632</td>
                            <td id="right-side" style={{ color: "red" }}>
                              {" "}
                              -4.24%
                            </td>
                          </tr>
                          <tr>
                            <td style={{ display: "flex" }}>
                              <img
                                style={{
                                  marginTop: "-1px",
                                  marginLeft: "-1px",
                                  marginRight: "2px",
                                }}
                                src="/star.png"
                              />{" "}
                              <span className="white-text">ALCX</span>/BTC{" "}
                              <h3 className="box-text">3x</h3>
                            </td>
                            <td id="right-side">0.03632</td>
                            <td id="right-side" style={{ color: "red" }}>
                              {" "}
                              -4.24%
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                <div
                  className="number-sec pt-0"
                  style={{ paddingRight: "none !important" }}
                >
                  <ul
                    className="nav nav-tabs p-0 "
                    style={{ paddingTop: "0px !important" }}
                    id="myTab"
                    role="tablist"
                  >
                    <li className="nav-item" role="presentation">
                      <button
                        className="nav-link active"
                        id="market-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#market"
                        type="button"
                        role="tab"
                        aria-controls="market"
                        aria-selected="true"
                        style={{
                          paddingLeft: "0px",
                          fontSize: "16px !important",
                          paddingBottom: "0px",
                          marginRight: "26px",
                        }}
                      >
                        Market Trades
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button
                        className="nav-link "
                        id="trade-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#trade"
                        type="button"
                        role="tab"
                        aria-controls="trade"
                        aria-selected="true"
                        style={{
                          paddingLeft: "0px",
                          paddingBottom: "0px",
                          fontSize: "16px !important",
                        }}
                      >
                        My Trades
                      </button>
                    </li>
                  </ul>
                  <div className="tab-content dummy-height" id="myTabContent">
                    <div
                      className="tab-pane fade show active"
                      id="market"
                      role="tabpanel"
                      aria-labelledby="market-tab"
                    >
                      <table className="table number-table mt-2">
                        <thead className="thead-setting">
                          <tr>
                            <th scope="col" className="min-setting pb-0">
                              Price(BUSD)
                            </th>
                            <th
                              scope="col"
                              className="min-setting pb-0"
                              id="right-side"
                            >
                              Amount(BTC)
                            </th>
                            <th
                              scope="col"
                              className="minimum-setting pb-0"
                              id="right-side"
                            >
                              Time
                            </th>
                          </tr>
                        </thead>

                        <tbody className="tbody-setting">
                          <tr>
                            <td
                              className="min-setting pb-0"
                              style={{ color: "red" }}
                            >
                              {tradeData?.price}
                            </td>
                            <td className="min-setting pb-0" id="right-side">
                              {tradeData?.quantity}
                            </td>
                            <td className="min-setting pb-0" id="right-side">
                              {tradeData?.eventTime}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <div
                      className="tab-pane fade show "
                      id="trade"
                      role="tabpanel"
                      aria-labelledby="trade-tab"
                    >
                      <div className="login-sec">
                        <h3>
                          {" "}
                          <span className="login-span">Log In</span> or{" "}
                          <span className="login-span">Register Now</span> to
                          trade
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className="number-sec pt-0"
                  style={{
                    borderBottom: "0px !important",
                    paddingRight: "none !important ",
                  }}
                >
                  <div className="accordion" id="accordionExample">
                    <div className="accordion-item">
                      <h2 className="accordion-header" id="headingOne">
                        <button
                          className="accordion-button"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapseOne"
                          aria-expanded="true"
                          aria-controls="collapseOne"
                        >
                          Market Activities
                        </button>
                      </h2>

                      <div
                        id="collapseOne"
                        className="accordion-collapse collapse show"
                        aria-labelledby="headingOne"
                        data-bs-parent="#accordionExample"
                      >
                        <div className="accordion-body">
                          <div className="acdn-sec">
                            <div className="acdn-left">
                              <h4 className="market-text">
                                {" "}
                                <span className="mtext-span"> VOXEL </span>/USDT
                              </h4>
                              <h6 className="market-txt">15:01:07</h6>
                            </div>
                            <div className="acdn-center">
                              <h4 className="green-text">+5.10%</h4>
                              <h6 className="white-text">New 24h High</h6>
                            </div>
                            <div className="acdn-right">
                              <button
                                type="button"
                                id="market-btns"
                                className="btn btn-success"
                              >
                                <img src="/btn-arrow.png" />
                              </button>
                            </div>
                          </div>

                          <div className="acdn-sec">
                            <div className="acdn-left">
                              <h4 className="market-text">
                                {" "}
                                <span className="mtext-span"> VOXEL </span>/USDT
                              </h4>
                              <h6 className="market-txt">15:01:07</h6>
                            </div>
                            <div className="acdn-center">
                              <h4 className="green-text">+5.10%</h4>
                              <h6 className="white-text">New 24h High</h6>
                            </div>
                            <div className="acdn-right">
                              <button
                                type="button"
                                id="market-btns"
                                className="btn btn-success"
                              >
                                <img src="/btn-arrow.png" />
                              </button>
                            </div>
                          </div>

                          <div className="acdn-sec">
                            <div className="acdn-left">
                              <h4 className="market-text">
                                {" "}
                                <span className="mtext-span"> VOXEL </span>/USDT
                              </h4>
                              <h6 className="market-txt">15:01:07</h6>
                            </div>
                            <div className="acdn-center">
                              <h4 className="green-text">+5.10%</h4>
                              <h6 className="white-text">New 24h High</h6>
                            </div>
                            <div className="acdn-right">
                              <button
                                type="button"
                                id="market-btns"
                                className="btn btn-success"
                              >
                                <img src="/btn-arrow.png" />
                              </button>
                            </div>
                          </div>

                          <div className="acdn-sec">
                            <div className="acdn-left">
                              <h4 className="market-text">
                                {" "}
                                <span className="mtext-span"> VOXEL </span>/USDT
                              </h4>
                              <h6 className="market-txt">15:01:07</h6>
                            </div>
                            <div className="acdn-center">
                              <h4 className="green-text">+5.10%</h4>
                              <h6 className="white-text">New 24h High</h6>
                            </div>
                            <div className="acdn-right">
                              <button
                                type="button"
                                id="market-btns"
                                className="btn btn-success"
                              >
                                <img src="/btn-arrow.png" />
                              </button>
                            </div>
                          </div>
                          <div className="acdn-sec">
                            <div className="acdn-left">
                              <h4 className="market-text">
                                {" "}
                                <span className="mtext-span"> VOXEL </span>/USDT
                              </h4>
                              <h6 className="market-txt">15:01:07</h6>
                            </div>
                            <div className="acdn-center">
                              <h4 className="green-text">+5.10%</h4>
                              <h6 className="white-text">New 24h High</h6>
                            </div>
                            <div className="acdn-right">
                              <button
                                type="button"
                                id="market-btns"
                                className="btn btn-success"
                              >
                                <img src="/btn-arrow.png" />
                              </button>
                            </div>
                          </div>
                          <div className="acdn-sec">
                            <div className="acdn-left">
                              <h4 className="market-text">
                                {" "}
                                <span className="mtext-span"> VOXEL </span>/USDT
                              </h4>
                              <h6 className="market-txt">15:01:07</h6>
                            </div>
                            <div className="acdn-center">
                              <h4 className="green-text">+5.10%</h4>
                              <h6 className="white-text">New 24h High</h6>
                            </div>
                            <div className="acdn-right">
                              <button
                                type="button"
                                id="market-btns"
                                className="btn btn-success"
                              >
                                <img src="/btn-arrow.png" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="order-sec">
                <div className="limit-section">
                  <ul
                    className="nav nav-tabs tabs-padding"
                    id="myTab"
                    role="tablist"
                  >
                    <li className="nav-item" role="presentation">
                      <button
                        className="nav-link order-head active"
                        id="order-head"
                        data-bs-toggle="tab"
                        data-bs-target="#"
                        type="button"
                        role="tab"
                        aria-controls=""
                        aria-selected="false"
                      >
                        Open Orders(0)
                      </button>
                    </li>

                    <li className="nav-item" role="presentation">
                      <button
                        className="nav-link order-head "
                        id="order-head"
                        data-bs-toggle="tab"
                        data-bs-target="#"
                        type="button"
                        role="tab"
                        aria-controls=""
                        aria-selected="false"
                      >
                        Order History
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button
                        className="nav-link order-head "
                        id="order-head"
                        data-bs-toggle="tab"
                        data-bs-target="#"
                        type="button"
                        role="tab"
                        aria-controls=""
                        aria-selected="false"
                      >
                        Trade History
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button
                        className="nav-link order-head "
                        id="order-head"
                        data-bs-toggle="tab"
                        data-bs-target="#"
                        type="button"
                        role="tab"
                        aria-controls=""
                        aria-selected="false"
                      >
                        Funds
                      </button>
                    </li>
                  </ul>
                </div>
                <div className="order-part">
                  <h4 className="login-text">
                    {" "}
                    <a className="login-link" href="">
                      {" "}
                      Log In{" "}
                    </a>{" "}
                    or{" "}
                    <a className="login-link" href="">
                      Register Now{" "}
                    </a>{" "}
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default uid;

export async function getServerSideProps(context) {
  let { params } = await context;
  console.log(params);
  return {
    props: { params },
  };
}
