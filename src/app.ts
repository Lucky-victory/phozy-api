import db  from "./config/db/index";
import express, { Application } from "express";
const app: Application = express();
const port = process.env.PORT || 3300;

import albumRoute from "./routes/album";

app.use("/album", albumRoute);

app.get("/", (req, res) => {
  // db.select("*")
  //   .from("albums")
  //   .then((result) => {
  //     console.log(result);
  //   });

  res.status(200).send("PHOZY API 1.3");
});
app.listen(port, () => {
  console.log("server running on port " + port);
});

export default app;
