const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => res.json({
    ip: req.ip,
    ipForwarded: req.header('X-Forwarded-For') || null,
    remoteAddress: req.connection.remoteAddress,
    socketRemoteAds: req.socket.remoteAddress,
}));

// Listen server
app.listen(8080, () => {
    console.log('App running on');
});

