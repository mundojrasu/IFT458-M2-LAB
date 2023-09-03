const httpServer = require("http");
const url = require("url");
const fs = require("fs");

const replaceTemplate = require("./modules/replaceTemplate");

// /////////////////
// Read Data from file
const tempCourse = fs.readFileSync(`${__dirname}/data/data.json`, "utf-8");

//Template
const templateHTMLcourse = fs.readFileSync(
  `${__dirname}/template/templateCourses.html`,
  "utf-8"
);

// const replaceTemplate = (htmlStr, course) => {
//   let output = htmlStr.replace(/{%NAME%}/g, course.courseName);
//   output = output.replace(/{%IMAGE%}/g, course.image);
//   output = output.replace(/{%FROM%}/g, course.from);
//   output = output.replace(/{%INSTRUCTOR%}/g, course.instructor);
//   output = output.replace(/{%DESCRIPTION%}/g, course.description);
//   output = output.replace(/{%ID%}/g, course.id);
//   return output;
// };

const dataObj = JSON.parse(tempCourse); //string to JavaScript Object JSON

// Create Server
// const server = httpServer.createServer(function (req, res) {
const server = httpServer.createServer((req, res) => {
  // call back function

  //   const urlParameter = url.parse(req.url, true);
  //   console.log(urlParameter.query);
  //   console.log(urlParameter.pathname);
  const { query, pathname } = url.parse(req.url, true); //destructuring

  if (query.id) {
    // if there is a query parameter name id
    //courses page
    if (pathname === "/" || pathname.toLowerCase() === "/courses") {
      res.writeHead(200, {
        // Everything ran successfully
        "Content-type": "text/html",
      });
      const course = dataObj[Number(query.id)]; //convert string to number
      res.end(
        `We received our first request from the client at resource ${urlParameter.pathname.toLowerCase()} with query parameter ${
          urlParameter.query.id
        }
        ${JSON.stringify(course)}` // convert object back to string
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
//server.listen(8000, "localhost", function () {
server.listen(8000, "localhost", () => {
  console.log("Server is listening to port 8000");
});
