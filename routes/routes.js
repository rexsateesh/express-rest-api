const appRouter = (app) => {
  app.get("/", (req, res) => {
    res.status(200).send("Welcome to our restful API");
  });

  app.get("/ip", (req, res) => res.json({ipv4: req.ip, ipv6: req.connection.remoteAddress || 'nul'}));
}

module.exports = appRouter;
