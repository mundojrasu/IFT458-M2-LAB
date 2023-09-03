const httpServer = require("http");
const url = require("url");
// /////////////////

// Create Server
const server = httpServer.createServer(function (req, res) {
  // call back function

  const urlParameter = url.parse(req.url, true);
  console.log(urlParameter.query);
  console.log(urlParameter.pathname);
  res.end(` We received our first request from the client`);
});

// Start Listening to requests
server.listen(8000, "localhost", function () {
  console.log("Server is listening to port 8000");
});
