import axios from "axios";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
     const data = req.body.id;
     console.log(data,'coin id is here')
      var config = {
        method: "get",
        url: `https://api.binance.com/api/v3/ticker/price?symbol=${data}`
      };
      await axios(config).then(function (response) {
        console.log(JSON.stringify(response.data));
        const data = response.data
        res.status(200).json({ massege:"success", data:data});
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ Error: err });
    }
}
}