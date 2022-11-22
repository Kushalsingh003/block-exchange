import axios from "axios";
export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { token } = req.body;
      console.log(token, "to send the token to the api");
      var config = {
        method: "post",
        url: "http://192.168.1.95:4000/api/v1/member/getQrCode",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      await axios(config).then(function (response) {
        console.log(JSON.stringify(response.data));
        res.status(200).json({ data: response.data });
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ Error: err });
    }
  }
}
