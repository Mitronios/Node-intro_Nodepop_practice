import http from "node:http";

//Create http server
const server = http.createServer((req, res) => {
  res.writeHead(200, { "content-type": "text/plain" });
  res.end(`Wake up Neo...`);
});

//Start the server
server.listen(3000, "127.0.0.1", () => {
  console.log(`Server running at http://127.0.0.1:3000`);
});
