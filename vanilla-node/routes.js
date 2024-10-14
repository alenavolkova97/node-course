const fs = require("fs"); 

const requestListener = (request, response) => {
  // process.exit();
  const {url, method} = request;

  if (url === "/") { // GET by default when clicking a link or entering URL
    response.write("<html>");
    response.write("<head><title>Enter message</title></head>");
    // form auto set data to request by input name
    response.write("<body><form action='/message' method='POST'><input type='text' name='my-message'><button type='submit'>Send</button></form></body>");
    response.write("</html>");

    return response.end(); // commonly we don't need to return a response
  }

  if (url === "/message" && method === "POST") {
    const body = [];

    request.on("data", (chunk) => {
      body.push(chunk);
    }); // data event is fired whenever a new chunk is ready to be read

    return request.on("end", () => { // fired when it is done parsing incoming data/request
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split("=")[1];
      fs.writeFile("./message.txt", message, (err) => {
        // another way of doing this -> response.writeHead(302, {});
        response.statusCode = 302; // redirect code
        response.setHeader("Location", "/");

        return response.end();
      });
      // writeFileSync blocks execution of further code untill this file is done
      // better to use writeFile instead
    });
  }

  response.setHeader("Content-Type", "text/html"); 
  // header default - "Content-Type"
  // some headers will be auto set by the server
  response.write("<html><head><title>My first page!</title></head><body>");
  response.write("<h1>Hello from server!!!</h1></body></html>");
  response.end();
};

// module.exports = requestListener;

module.exports = {
  requestListener,
  b: "b"
}; // which is the same as below

// module.exports.a = "a";
// module.exports.b = "b";

// exports.a = "a";
// exports.b = "b"; // a shortcut for above offered by nodejs
