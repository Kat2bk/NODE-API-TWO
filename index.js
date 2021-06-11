const server = require("./api/server");

const port = 8080;

server.listen(port, () => {
  console.log("\n --- server is listening on port 8080 ---");
});
