import React, { useState, useCallback, useEffect } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
// var W3CWebSocket = require('websocket').w3cwebsocket
var WebSocketClient = require("websocket").client;

const client = new WebSocketClient();

export const WebSocketDemo = () => {
  const [data, setData] = useState();

  client.on("connectFailed", function (error) {
    console.log("Connect Error: " + error.toString());
  });

  client.on("connect", function (connection) {
    console.log("WebSocket Client Connected");
    connection.on("error", function (error) {
      console.log("Connection Error: " + error.toString());
    });
    connection.on("close", function () {
      console.log("echo-protocol Connection Closed");
    });
    connection.on("message", function (message) {
      if (message.type === "utf8") {
        console.log("Received: '" + message.utf8Data + "'");
        // setData(message.utf8Data);
      }
    });

    function sendNumber() {
      if (connection.connected) {
        var number = Math.round(Math.random() * 0xffffff);
        connection.sendUTF(number.toString());
        setTimeout(sendNumber, 1000);
      }
    }
    sendNumber();
  });

  client.connect("ws://192.168.1.95:4000/blockexchange/candleSticks");
  //  console.log(data,'state is here')
  return <div></div>;
};
