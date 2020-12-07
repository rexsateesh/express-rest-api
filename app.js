const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => res.json({
    ipInfo: req.socket.address()
}));
  
const server = app.listen(3000, '2600:1f18:1492:9200:fc2f:689a:db6d:138f', () => {
    console.log("app running on port.", server.address().port);
});
