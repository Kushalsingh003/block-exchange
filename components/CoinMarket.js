import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import Link from "next/link";
import Binance2 from 'binance-api-node'
const client = Binance2()


export default function CoinMarket() {
  const [allCoin, setAllCoin] = useState();
  const [itemName, setItemName] = useState();
  const [tickerData,setTickersData] = useState();

  async function getAllPrices() {
    const response = await axios.post("/api/market/getAllPricesApi");
    console.log(response.data.data.data, " all prices are here change data");
    const data = response.data.data.data;
    setAllCoin(data);
  }


  async function tickersDataFn(){
    const response = await client.ws.allTickers(tickers => {
      console.log(tickers);

      const filterData = tickers.filter((item)=>{
        const data = item?.symbol;
  
        return data.slice(-4).includes('USDT')
        
      })
     
      console.log(filterData,'response ');
       
          setTickersData(filterData)
    })

   
  
  }



  useEffect(() => {
    
    tickersDataFn()
  },[]);

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
                  <a className="nav-link " aria-current="page" href="/coinMarket">
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


      {/* <div className="col-md-3 right-sec"> */}
      <div className="number-sec" style={{ paddingRight: "none !important" }}>
      

        <ul
          className="nav nav-tabs p-2 tabs-scroll"
          id="myTab"
          role="tablist"
          style={{ gap: "5rem", marginBottom: "1rem"  }}
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
              style={{
                paddingLeft: "0px",
                paddingBottom: "0px;",
                fontSize: "18px !important",
                color: "white",
                // fontWeight: "600",
              }}
            >
              <img
                style={{
                  marginTop: "-1px",
                  marginLeft: "-1px",
                  marginRight: "2px",
                }}
                src="/star.png"
              />{" "}
              Favorites
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
              style={{
                paddingLeft: "0px",
                paddingBottom: "0px",
                fontSize: "18px !important",
                // fontWeight: "600",
              }}
            >
              All Cryptos
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
              style={{ fontSize: "18px !important",
              //  fontWeight: "600"
               }}
              aria-controls="busd"
              aria-selected="true"
            >
              Spot Markets
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
              style={{ fontSize: "18px !important", 
              // fontWeight: "600"
             }}
              aria-controls="usdt"
              aria-selected="false"
            >
              Futures Markets
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
              style={{ fontSize: "18px !important",
              //  fontWeight: "600"
               }}
              aria-controls="bnb"
              aria-selected="false"
            >
              New Listing
            </button>
          </li>

          <div
          className="input-group flex-nowrap search-input--div"
          style={{
            
            width: "20%",
            height: "40px",
            marginBottom: "20px",
            marginLeft:'20%'
          }}
        >
          <span className="input-group-text dark-bg" id="addon-wrapping">
            <img src="/search-icon.png" />
          </span>
          <input
            type="text"
            className="form-control dark-bg p-0 search-coin--input"
            placeholder="Search"
            aria-label="Username"
            aria-describedby="addon-wrapping"
          />
        </div>
         
        </ul>

        <div className="tab-content" id="myTabContent">
          <div
            className="tab-pane fade show"
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
                  <th scope="col" className="min-setting" id="right-side">
                    Price
                  </th>
                  <th scope="col" className="minimum-setting" id="right-side">
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
                display: "grid",
                gridTemplateColumns: "repeat(9,1fr)",
                marginBottom: "1rem",
              }}
              id="myTab"
              role="tablist"
            >
              <li className="nav-item " role="presentation" id="tabs-sets">
                <button
                  className="nav-link linking active pt-0"
                  id="all-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#all"
                  type="button"
                  role="tab"
                  aria-controls="all"
                  aria-selected="false"
                  style={{
                    paddingBottom: "0px",
                    fontSize: "18px !important",
                    backgroundColor: "none !important",
                  }}
                >
                  All
                </button>
              </li>

              <li className="nav-item" role="presentation" id="tabs-sets">
                <button
                  className="nav-link linking pt-0"
                  id="cross-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#cross"
                  type="button"
                  role="tab"
                  aria-controls="cross"
                  aria-selected="true"
                  style={{ paddingBottom: "0px", fontSize: "18px !important" }}
                >
                  Metaverse
                </button>
              </li>
              <li className="nav-item" role="presentation" id="tabs-sets">
                <button
                  className="nav-link linking pt-0"
                  id="isolated-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#isolated"
                  type="button"
                  role="tab"
                  aria-controls="isolated"
                  aria-selected="true"
                  style={{ paddingBottom: "0px", fontSize: "18px !important" }}
                >
                  Gaming
                </button>
              </li>
              <li className="nav-item" role="presentation" id="tabs-sets">
                <button
                  className="nav-link linking pt-0"
                  id="isolated-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#isolated"
                  type="button"
                  role="tab"
                  aria-controls="isolated"
                  aria-selected="true"
                  style={{ paddingBottom: "0px", fontSize: "18px !important" }}
                >
                  DeFi
                </button>
              </li>
              <li className="nav-item" role="presentation" id="tabs-sets">
                <button
                  className="nav-link linking pt-0"
                  id="isolated-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#isolated"
                  type="button"
                  role="tab"
                  aria-controls="isolated"
                  aria-selected="true"
                  style={{ paddingBottom: "0px", fontSize: "18px !important" }}
                >
                  Inovation
                </button>
              </li>
              <li className="nav-item" role="presentation" id="tabs-sets">
                <button
                  className="nav-link linking pt-0"
                  id="isolated-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#isolated"
                  type="button"
                  role="tab"
                  aria-controls="isolated"
                  aria-selected="true"
                  style={{ paddingBottom: "0px", fontSize: "18px !important" }}
                >
                  Fan Token
                </button>
              </li>
              <li className="nav-item" role="presentation" id="tabs-sets">
                <button
                  className="nav-link linking pt-0"
                  id="isolated-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#isolated"
                  type="button"
                  role="tab"
                  aria-controls="isolated"
                  aria-selected="true"
                  style={{ paddingBottom: "0px", fontSize: "18px !important" }}
                >
                  NFT
                </button>
              </li>
              <li className="nav-item" role="presentation" id="tabs-sets">
                <button
                  className="nav-link linking pt-0"
                  id="isolated-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#isolated"
                  type="button"
                  role="tab"
                  aria-controls="isolated"
                  aria-selected="true"
                  style={{ paddingBottom: "0px", fontSize: "18px !important" }}
                >
                  POS
                </button>
              </li>
              <li className="nav-item" role="presentation" id="tabs-sets">
                <button
                  className="nav-link linking pt-0"
                  id="isolated-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#isolated"
                  type="button"
                  role="tab"
                  aria-controls="isolated"
                  aria-selected="true"
                  style={{ paddingBottom: "0px", fontSize: "18px !important" }}
                >
                  POW
                </button>
              </li>
            </ul>

            {/* <ul
          className="nav nav-tabs p-2 tabs-scroll"
          id="myTab"
          role="tablist"
          style={{ gap: "5rem", marginBottom: "1rem"  }}
        >
          <li className="nav-item" role="presentation">
            <button
              className="nav-link "
              id="star-tab"
              data-bs-toggle="tab"
              data-bs-target="#star-BUSD"
              type="button"
              role="tab"
              aria-controls="star"
              aria-selected="false"
              style={{
                paddingLeft: "0px",
                paddingBottom: "0px;",
                fontSize: "18px !important",
                color: "white",
                // fontWeight: "600",
              }}
            >
             
              BUSD
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
              style={{
                paddingLeft: "0px",
                paddingBottom: "0px",
                fontSize: "18px !important",
                // fontWeight: "600",
              }}
            >
             USDT
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
              style={{ fontSize: "18px !important",
              //  fontWeight: "600"
               }}
              aria-controls="busd"
              aria-selected="true"
            >
              BNB
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
              style={{ fontSize: "18px !important", 
              // fontWeight: "600"
             }}
              aria-controls="usdt"
              aria-selected="false"
            >
              BTC
            </button>
          </li>
         

         
         
        </ul> */}

       
            <table className="table number-table coin-head">
              <thead className="thead-setting" style={{ width: "100%" }}>
                <tr
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(5,1fr)",
                    marginBottom: "1rem",
                  }}
                >
                  <th
                    scope="col"
                    className="min-setting"
                    style={{
                      fontSize: "16px !important",
                      backgroundColor: "#02020299 !important",
                    }}
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="min-setting"
                    id="right-side"
                    style={{
                      fontSize: "16px !important",
                      backgroundColor: "#02020299 !important",
                    }}
                  >
                    Price
                  </th>
                  <th
                    scope="col"
                    className="minimum-setting"
                    id="right-side"
                    style={{
                      fontSize: "16px !important",
                      backgroundColor: "#02020299 !important",
                    }}
                  >
                    24h Change
                  </th>
                  <th
                    scope="col"
                    className="min-setting"
                    id="right-side"
                    style={{
                      fontSize: "16px !important",
                      backgroundColor: "#02020299 !important",
                    }}
                  >
                    24h Volume
                  </th>
                  <th
                    scope="col"
                    className="min-setting"
                    id="right-side"
                    style={{
                      fontSize: "16px !important",
                      backgroundColor: "#02020299 !important",
                    }}
                  >
                    Market Cap
                  </th>
                </tr>
              </thead>

              <tbody className="tbody-setting" style={{ height: "100vh" }}>

                {
                tickerData?.map((item, id) => {
                  return (
                    <a  className="coin-row" href={`/dynamic/${item.symbol}`}>
                    <tr
                      key={id}
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(5,1fr)",
                        borderBottom:'none'
                      }}
                    >
                      <td
                        className="min-setting"
                        style={{ display: "flex", fontSize: "18px" }}
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
                      <td
                        className="min-setting"
                        id="right-side"
                        style={{ fontSize: "18px" }}
                      >
                        
                        ${parseFloat(item?.bestAsk).toFixed(2)}
                      </td>
                      <td
                        className="min-setting"
                        id="right-side"
                        style={{ color: "red", fontSize: "18px" }}
                      >
                        {" "}
                        {parseFloat(item?.priceChangePercent).toFixed(2)}%
                        {/* {item?.priceChangePercent}% */}
                      </td>
                      <td
                        className="min-setting"
                        id="right-side"
                        style={{ color: "red", fontSize: "18px" }}
                      >
                        {" "}
                        {parseFloat(item?.volume).toFixed(2)}
                       
                      </td>
                    </tr>
                    </a>
                  );
                })}
              </tbody>

            </table>
          </div>
        </div>
      </div>
      {/* </div>  */}
    </div>
  );
}
