const http = require("http");

const requestHandler = require("./routes");

const server = http.createServer(requestHandler);

server.listen(3200, () => console.log('aa'));
