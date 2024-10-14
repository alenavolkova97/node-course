const requestHandler = (req, res) => {
  const {url, method} = req;

  if (url === "/") {
    res.setHeader("Content-Type", "text/html"); // !!!!!
    res.write("<html><body><h1>Hello from server!</h1>");
    res.write("<form action='/create-user' method='POST'><input type='text' name='username'/><button type='submit'>Send</button></form>");
    res.write("</body></html>");

    res.end();
  }

  if (url === "/users") {
    res.setHeader("Content-Type", "text/html"); // !!!!!
    res.write("<html><body><ul><li>User 1</li><li>User 2</li><li>User 3</li></ul></body></html>");

    res.end();
  }

  if (url === "/create-user" && method === "POST") {
    const body = [];

    req.on("data", (chunk) => {
      body.push(chunk);
    });

    req.on("end", () => {
      const data = Buffer.concat(body).toString();
      const userName = data.split("=")[1];

      console.log(userName); // не можем их сейчас применить на users? можно сохранить в объект ВНЕ requestHandler

      res.statusCode = 302;
      res.setHeader("Location", "/users");
      res.end();
    });

    // надо ли писать res.end() если не было обработки response? ДА
  }
};

module.exports = requestHandler;
