import axios from "axios";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const data = req.body;
      console.log(data, "to get data from front");
      var config = {
        method: "post",
        url: "http://192.168.1.95:4000/api/v1/auth/reSendOtp",
        data,
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

// import axios from "axios";

// export default async function otpSignupApi(req, res) {
//   if (req.method == "POST") {
//     const reqBody = req.body;
//     // let { token } = reqBody;
//     // let { otp } = reqBody;
//     // console.log(token, "data");

//     console.log(reqBody, "reqBody is here");
//     try {
//       // let config = {
//       //   method: "post",
//       //   url: "http://192.168.1.24:4000/api/v1/member/verifyEmail",
//       //   data: { otp: otp },
//       //   headers: {
//       //     Authorization: `Bearer ${token}`,
//       //   },
//       // };
//       await axios.post("http://192.168.1.95:4000/api/v1/auth/verifyEmail",reqBody);

//       res.status(200).json({ message: "success!!" });
//     } catch (err) {
//       res.status(500).json({ message: "Failed!!" });
//       console.log(err);
//     }
//   } else {
//     res.status(500).json({ message: "Failed!!" });
//   }
// }
