import axios from "axios";

export default async function priceApi(req, res) {
  if (req.method === "POST") {
    try {
      const id = req.body.id;
      console.log(id, "to see coin data here");
      var config = {
        method: "post",
        url: "http://192.168.1.95:4000/blockexchange/getPriceChange",
        data: { pair: id },
      };
      await axios(config).then(function (response) {
        console.log(JSON.stringify(response.data));
        const data = response.data;
        res.status(200).json({ massege: "success", data: data });
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ Error: err });
    }
  }
}
