import { json, urlencoded } from "body-parser";
import express, { type Express } from "express";
import morgan from "morgan";
import cors from "cors";
import db from '@repo/db';

const port = process.env.PORT || 5001;
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

app.post("/hooks/catch/:userId/:ZapId", async (req, res) => {
  const userId = req.params.userId;
  const ZapId = req.params.ZapId;
  const body=req.body;

  try {
    const result = await db.$transaction(async (tx) => {
      // Create zapRun entry
      const zapRun = await tx.zapRun.create({
        data: {
          ZapId,
          metadata:body
        },
      });

      // Create zapRunOutBox entry with the zapRun ID
      await tx.zapRunOutBox.create({
        data: {
          ZapRunId: zapRun.id, // Using the ID from the created zapRun
        },
      });

      return zapRun;
    });

    res.status(201).json({ success: true, data: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`api running on ${port}`);
});
