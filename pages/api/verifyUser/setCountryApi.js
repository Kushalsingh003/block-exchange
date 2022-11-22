import axios from "axios";

export default async function setCountryApi(req, res) {
  if (req.method == "POST") {
    const reqBody = req.body;

    console.log(reqBody, "reqBody");
    await axios.post("", reqBody);

    res.status(200).json({ message: "success!!" });
  } else {
    res.status(201).json({ message: "Failed!!" });
  }
}
