const { default: axios } = require("axios");
const express = require("express");
const app = express();
const port = 4000;
const URL_BULK = `http://api.weatherapi.com/v1/forecast.json?key=92c670185cda426d8b9162522232203&q=bulk&days=1`;
const cors = require("cors");

app.use(cors());
app.use(function (req, res, next) {
  let allowedOrigin = ["http://localhost:3000", process.env.FRONTEND];
  console.log(allowedOrigin.indexOf(req.headers.origin));
  if (allowedOrigin.indexOf(req.headers.origin) !== -1) {
    res.header("Access-Control-Allow-Origin", req.headers.origin);
  }
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Set-Cookie");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  next();
});

app.get("/bulk", async (req, res) => {
  const option = {
    method: "GET",
    url: URL_BULK,
    headers: {
      "content-type": "application/json",
    },
    data: {
      locations: [
        {
          q: "New delhi",
          custom_id: "0",
        },
        {
          q: "Chennai",
          custom_id: "1",
        },
        {
          q: "Mumbai",
          custom_id: "2",
        },
      ],
    },
  };
  const resData = await axios.request(option);
  res.json(resData?.data);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
