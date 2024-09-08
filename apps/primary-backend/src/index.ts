import { json, urlencoded } from "body-parser";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv"
import { userRouter } from "./Router/userRouter";
import { zapRouter } from "./Router/zapRouter";

dotenv.config()
const port = process.env.PORT;
const app = express();
app
  .disable("x-powered-by")
  .use(morgan("dev"))
  .use(urlencoded({ extended: true }))
  .use(json())
  .use(cors())
  .get("/message/:name", (req, res) => {
    return res.json({ message: `hello ${req.params.name}` });
  })
  .get("/status", (_, res) => {
    return res.json({ ok: true });
  });

app.use("/api/v1/user",userRouter);
app.use("/api/v1/zap",zapRouter);

app.listen(port, () => {
  console.log(`api running on ${port}`);
});
