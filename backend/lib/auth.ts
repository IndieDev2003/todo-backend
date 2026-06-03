import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { client, db } from "../config/db.ts"; // your mongodb client
import { username } from "better-auth/plugins";

import "dotenv/config";


export const auth = betterAuth({
  database: mongodbAdapter(db, {
    // Optional: if you don't provide a client, database transactions won't be enabled.
    client,
  }),
trustedOrigins:[`${process.env.FRONTEND_URL || '*'}`],
  emailAndPassword: {
    enabled: true,
  },
  advanced: {
    cookiePrefix: "task-angel",
  },
  plugins: [username()],
});
