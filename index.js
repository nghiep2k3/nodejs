const { RestClientV5 } = require("bybit-api");
const express = require("express");
const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST"); // Sửa đổi ở đây
  next();
});

const client = new RestClientV5({
  testnet: true,
  key: "pTbfndzhhSLUSmsoM1",
  secret: "ua459YvilMmBNPW4ZqZWypwJtnYUZtoHtVV1",
});

app.post("/balance", (req, res) => {
  main();
  res.json("ok");
});

async function main() {
  await client
    .setLeverage({
      category: "linear",
      symbol: "BTCUSDT",
      buyLeverage: "6",
      sellLeverage: "6",
    })
    .then((response) => {
      console.log(response);
      // res.json(response); // Gửi phản hồi trả về cho client
    })
    .catch((error) => {
      console.error(error);
      // res.status(500).json({ error: "Internal server error" });
    });
}

app.listen(3001, () => {
  console.log("Server đã chạy");
});
