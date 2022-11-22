import React, { useEffect, useState } from "react";
import axios from "axios";
// import  TradeViewChart from 'react-crypto-chart'
import dynamic from 'next/dynamic'
const AsyncApiComponent = dynamic(() => import ('react-tradingview-widget'), { ssr:false})
// import TradingViewWidget from "";

const BarCharts = ({data}) => {
  console.log(data,"to chekc the props on barchart")
  // const [data, setData] = useState();

  // async function barcharts() {
  //   try {
  //     let res = await axios.post("/api/pricePages/candleStickData");
  //     const response = res.data;
  //     console.log(
  //       response,
  //       "to get the response from api for candle stick data"
  //     );
  //     setData(response.data)
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  // useEffect(() => {
  //   barcharts();
    
  // },[]);


  
  return (
    <div
      class="tradingview-widget-container"
      style={{ backgroundColor: "white", width:"895px !important" }}
    >
      <div id="tradingview_2353e"></div>
      <div class="tradingview-widget-copyright" >
        {typeof window != undefined && (
          <AsyncApiComponent
            symbol={data}
            // interval="1H"
            timezone="UTC"
            theme="dark"
            style="1"
            locale="in"
            toolbar_bg="#f1f3f6"
            enable_publishing="false"
            allow_symbol_change="true"
            container_id="tradingview_2353e"
            // data={}
            
            
          />
          
        )}
        {/* <TradeViewChart pair="BTCBUSD" />; */}

      </div>

      
    </div>
  );
};

export default BarCharts;



