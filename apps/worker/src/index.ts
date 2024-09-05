import db from "@repo/db";
import { Kafka } from "kafkajs";

const TOPIC_NAME = "zap-event";
const kafka = new Kafka({
  clientId: "my-app",
  brokers: ["localhost:9092"],
});
const consumer = kafka.consumer({ groupId: "test-group" });

async function main() {
  try {
    await consumer.connect();
    await consumer.subscribe({ topic: TOPIC_NAME, fromBeginning: true });
    await consumer.run({
      autoCommit: false,
      eachMessage: async ({ topic, partition, message }) => {
        const ZapRun=await db.zapRun.findFirst({
          where:{
            id:message.value?.toString()||""
          }
        })
        console.log({
         ZapRun
        });

        await consumer.commitOffsets([
          {
            topic: TOPIC_NAME,
            partition,
            offset: (parseInt(message.offset, 10) + 1).toString(),
          },
        ]);
        await new Promise((r) => setTimeout(r, 1000));
        console.log("piked");
      },
    });
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

main().catch(console.error);
