import axios from "axios";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const data = req.body;
      console.log(data, "to be send to api");
      var config = {
        method: "post",
        url: "http://192.168.1.95:4000/api/v1/auth/register",
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

// export default async function signupEmailApi(req, res) {
//   if (req.method == "POST") {
//     const reqBody = req.body;

//     console.log(reqBody, "reqBody");
//     const response = await axios.post("http://192.168.1.95:4000/api/v1/auth/register", reqBody);
//     console.log(response.data.data,'respone data');
//     const data = response.data.data;

//     res.status(200).json({ message: "success!!",data });
//   } else {
//     res.status(201).json({ message: "Failed!!" });
//   }
// }
