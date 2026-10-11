import { betterAuth } from "better-auth";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db("bazardor");

export const auth = betterAuth({
  database: mongodbAdapter(db, { client }),
 emailAndPassword: {
  enabled: true,
  requireEmailVerification: false,
},
});