const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => res.json({
    ip: req.ip || req.connection.remoteAddress || 'null',
}));

const listenServer = () => {
    console.log('App running on');
};

// Use IPv4 address to listen on IPv4
app.listen(3000, '0.0.0.0', listenServer);

// Use IPv6 address to listen on IPv6.
app.listen(3000, '2401:4900:169e:80c3:11e9:63ba:1f81:d224', listenServer);
