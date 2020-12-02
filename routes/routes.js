const appRouter = (app) => {
  app.get("/", (req, res) => {
    res.status(200).send("Welcome to our restful API");
  });

  app.get("/ip", (req, res) => res.send(req));
}

module.exports = appRouter;
