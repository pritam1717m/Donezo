import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const username = "debalinajana393_db_user";
const password = "deba393";

const uri =
  `mongodb://${username}:${password}` +
  `@ac-rpyksvy-shard-00-02.wpkhiec.mongodb.net:27017/donezo-app` +
  `?tls=true&authSource=admin`;

console.log("Testing direct connection to PRIMARY...");

try {
  await mongoose.connect(uri, {
    serverSelectionTimeoutMS: 10000,
  });

  console.log("✅ MongoDB connected!");
  console.log("Database:", mongoose.connection.name);

  await mongoose.disconnect();
} catch (error) {
  console.error("❌ Connection failed:");
  console.error(error);
}