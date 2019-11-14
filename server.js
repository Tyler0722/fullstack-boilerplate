const express = require("express");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.use(express.static("public"));

  server.get("/", (req, res) => {
    app.render(req, res, "/index");
  });

  server.get("*", (req, res) => {
    handle(req, res);
  });

  server.listen(3000, () => {
    console.log("Server listening on port 3000.");
  });
});
