
import express, { Application } from "express";
const app: Application = express();
const port = process.env.PORT || 3300;

import albumRoute from "./routes/albums";
import signUpRoute from './routes/sign-up';
import signInRoute from './routes/sign-in';


app.use(express.urlencoded({
  extended:true 
}));
app.use(express.json());
app.use('/uploads',express.static('uploads'));
// routes
app.use('/sign-up', signUpRoute)
app.use('/sign-in', signInRoute);
app.use("/album", albumRoute);

app.get("/", (req, res) => {
  
  
  res.status(200).send("PHOZY API 1.3");
});
app.listen(port, () => {
  console.log("server running on port " + port);
});

export default app;
