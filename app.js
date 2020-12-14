const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const getOsIps = () => {
    const os = require('os');
    let networkInterfaces = os.networkInterfaces();
    let nonLocalInterfaces = {};
    for (let inet in networkInterfaces) {
        let addresses = networkInterfaces[inet];
        for (let i=0; i<addresses.length; i++) {
            let address = addresses[i];
            if (!address.internal) {
                if (!nonLocalInterfaces[inet]) {
                    nonLocalInterfaces[inet] = [];
                }
                nonLocalInterfaces[inet].push(address);
            }
        }
    }

    return nonLocalInterfaces;
}

const getLocalIpv6 = () => {
    const netBlocks = getOsIps();
    for(let blocks of Object.keys(netBlocks)) {
        for(let block of netBlocks[blocks]) {
            if (block.family === 'IPv6') {
                return block.address;
            }
        }
    }
}

app.get("/", (req, res) => res.json({
    ip: req.ip,
    ipForwarded: req.header('X-Forwarded-For') || null,
    remoteAddress: req.connection.remoteAddress,
    socketRemoteAds: req.socket.remoteAddress,
    localIp: getLocalIpv6()
}));

const listenServer = () => {
    console.log('App running on');
};

// Use IPv4 address to listen on IPv4
app.listen(8080, '0.0.0.0', listenServer);

// Use IPv6 address to listen on IPv6.
app.listen(8080, getLocalIpv6(), listenServer);
