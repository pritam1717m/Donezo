import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const client = new MongoClient(process.env.MONGO_URI, {
  serverSelectionTimeoutMS: 10000,
});

try {
  console.log("Testing MongoDB driver directly...");

  await client.connect();

  console.log("✅ MongoDB driver connected!");

  const result = await client
    .db("donezo-app")
    .command({ ping: 1 });

  console.log("Ping result:", result);

  await client.close();

  console.log("Connection closed.");
} catch (error) {
  console.error("❌ MongoDB driver connection failed:");
  console.error(error);
}