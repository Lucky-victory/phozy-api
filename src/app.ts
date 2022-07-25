import db  from "./config/db/index";
import express, { Application } from "express";
const app: Application = express();
const port = process.env.PORT || 3300;

import albumRoute from "./routes/albums";
import signUpRoute from './routes/sign-up';
import path from "path";


app.use(express.static('uploads/'));
// routes
app.use('/sign-up', signUpRoute);
app.use("/album", albumRoute);

app.get("/", (req, res) => {
  db('user').select("*")
    .then((result) => {
      console.log(result);
    });

  res.status(200).send("PHOZY API 1.3");
});
app.listen(port, () => {
  console.log("server running on port " + port);
});

export default app;
