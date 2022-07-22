import { DATABASE_URL } from "./config/index";
import express, { Application } from "express";
const app: Application = express();
const port = process.env.PORT || 3300;

import albumRoute from "./routes/album";
import mysql2 from "mysql2";

console.log(DATABASE_URL, "db url");

const connection = mysql2.createConnection(DATABASE_URL as string);
connection.connect((err) => {
  if (err) throw err;
});

app.use("/album", albumRoute);

app.get("/", (req, res) => {
  connection.query("SELECT * FROM `users`", (err, result, fields) => {
    if (err) throw err;
    console.log(result, fields);
  });
  res.status(200).send("PHOZY API 1.1");
});
app.listen(port, () => {
  console.log("server running on port " + port);
});

export default app;
