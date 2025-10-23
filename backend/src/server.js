import "../instrument.mjs";
import * as Sentry from "@sentry/node";
import express from "express";
import { ENV } from "./config/env.js";
import { connectDb } from "./config/db.js";
import { clerkMiddleware } from "@clerk/express";
import { serve } from "inngest/express";
import { inngest, functions } from "./config/inngest.js";
import chatRoutes from "./routes/chat.route.js";

const app = express();

app.use(express.json());
app.use(clerkMiddleware());
// app.get("/debug-sentry", (req, res) => {
//   throw new Error("My first Sentry error!");
// });
app.use("/api/inngest", serve({ client: inngest, functions }));
app.use("/api/chat", chatRoutes);

Sentry.setupExpressErrorHandler(app);

const startServer = async () => {
  try {
    await connectDb();
    if (ENV.NODE_ENV !== "production") {
      app.listen(ENV.PORT, () => {
        console.log("Server started on port:", ENV.PORT);
      });
    }
  } catch (error) {
    console.error("Error starting server:", error);
    process.exit(1);
  }
};

startServer();

export default app;
