import db from "@repo/db";
import { Kafka, Partitioners } from "kafkajs";

const TOPIC_NAME = "zap-event";
const kafka = new Kafka({
  clientId: "my-app",
  brokers: ["localhost:9092"],
});
const producer = kafka.producer({
  createPartitioner: Partitioners.LegacyPartitioner,
});

async function main() {
  await producer.connect(); // Ensure producer connection before sending messages
  while (true) {
    try {
      const pendingRows = await db.zapRunOutBox.findMany({
        where: {},
        take: 10,
      });

      if (pendingRows.length > 0) {
        // Send each row individually
        for (const row of pendingRows) {
          console.log(row);
          await producer.send({
            topic: TOPIC_NAME,
            messages: [
              {
                value: row.ZapRunId.toString(), // Ensure the value is a string
              },
            ],
          });
          await db.zapRunOutBox.delete({
            where: {
              id: row.id,
            },
          });
        }
      }

      // Uncomment this line to add delay between iterations
      // await new Promise((resolve) => setTimeout(resolve, 10000));
    } catch (error) {
      console.error("An error occurred:", error);
    }

    // break; // Remove this for continuous operation
  }
}

main().catch(console.error);
