const http = require("http");
// require -> global function

const {requestListener, b} = require("./routes"); // don't need .js when import out own files but should start with ./ or /

console.log(b);

const server = http.createServer(requestListener); // createServer (or node) will execute it for EVERY incoming request

server.listen(3200); // here we say node.js that it needs to listen to incoming requests
// port default - 80
// hostname default - local
