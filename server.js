const express = require("express");
const app = express();
const port = process.env.PORT || 3300;

app.get("/", (req, res) => {
  res.status(200).send("PHOZY API 1.0");
});
app.listen(port, () => {
  console.log("server running on port " + port);
});
