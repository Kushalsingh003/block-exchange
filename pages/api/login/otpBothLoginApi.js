import axios from "axios";

export default async function otpBothLoginApi(req, res) {
  if (req.method == "POST") {
    const reqBody = req.body;

    console.log(reqBody, "reqBody is here");
    try {
      const response = await axios.post(
        "http://192.168.1.95:4000/api/v1/auth/verifyLoginBoth",
        reqBody
      );

      res.status(200).json({ data: response.data, message: "success!!" });
    } catch (err) {
      res.status(500).json({ message: "Failed!!" });
      console.log(err);
    }
  } else {
    res.status(500).json({ message: "Failed!!" });
  }
}
