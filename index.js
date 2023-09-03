const httpServer = require("http");
const url = require("url");
const fs = require("fs");
// /////////////////
// Read Data from file
const tempCourse = fs.readFileSync(`${__dirname}/data.txt`, "utf-8");
// Create Server
const server = httpServer.createServer(function (req, res) {
  // call back function

  const urlParameter = url.parse(req.url, true);
  console.log(urlParameter.query);
  console.log(urlParameter.pathname);

  if (urlParameter.query.id) {
    // if there is a query parameter name id
    //courses page
    if (
      urlParameter.pathname === "/" ||
      urlParameter.pathname.toLowerCase() === "/courses"
    ) {
      res.writeHead(200, {
        // Everything ran successfully
        "Content-type": "text/html",
      });
      res.end(
        `We received our first request from the client at resource ${urlParameter.pathname.toLowerCase()} with query parameter ${
          urlParameter.query.id
        }
        ${tempCourse}`
      );
    } else {
      res.writeHead(404, {
        // Server did not find what you were looking for
        "Content-type": "text/html",
      });
      res.end(`resource not found`);
    }
  }
});

// Start Listening to requests
server.listen(8000, "localhost", function () {
  console.log("Server is listening to port 8000");
});
