import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { createServer } from "http";
import cors from "cors";
import {
  globalErrorHandler,
  catchNotFoundRoute,
} from "./src/middleware/errorHandler.js";
import { rateLimiter } from "./src/middleware/rateLimit.js";

import userRoutes from "./src/routes/user.routes.js";
import taskRoutes from "./src/routes/task.routes.js";

const app = express();
const httpServer = createServer(app);

app.use(
  cors({
    origin: ["http://localhost:5173", "https://task-duty-seven.vercel.app"],
    credentials: true,
    methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
    optionsSuccessStatus: 200,
  }),
);

app.use(cookieParser());
app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ extended: true, limit: "25mb" }));
app.use(rateLimiter(100));
app.disable("x-powered-by");

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.get("/", (req, res) => {
  res.status(200).json({
    status: "Success",
    message: "Server is running",
    environment: process.env.NODE_ENV,
    time: req.requestTime,
  });
});

// assemble api routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/task", taskRoutes);

app.use((req, res, next) => {
  return next(catchNotFoundRoute(req, res));
});
app.use((err, req, res, next) => {
  return next(globalErrorHandler(err, req, res));
});

const connectOptions = {
  dbName: "TaskDuty",
  serverSelectionTimeoutMs:
    process.env.NODE_ENV === "development" ? 45000 : 10000, //max time to wait for server to be selected (45sec in dev mode or 10s in pro). if  no server selection, a server timeout error is thrown
  socketTimeoutMs: 30000, //time before socket timeout due to inactivity, useful to avoid hanging connections
  retryWrites: true, //enables automatics retry of some write operations like insert or updating a document
  retryReads: true, //enables automatic retry of read operations
  maxPoolSize: 100, //maximum number of connections in mongodb connection pool, it helps to manage concurrent request
  minPoolSize: 1, // minimum number of connection maintained by mongodb pool
};
const connectToDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, connectOptions);
    console.log(`MongoDb Connected: ${conn.connection.host}`);
    //connection event handler
    mongoose.connection.on("error", (err) => {
      console.error("MongoDb connection error", err);
    });
    mongoose.connection.on("disconnected", () => {
      console.log("MongoDb disconnected");
    });
    //handle graceful shutdown
    const gracefulShutdown = async () => {
      await mongoose.connection.close();
      console.log("MongoDb connection closed via app termination");
      process.exit(0); //exit the node process
    };
    process.on("SIGINT", gracefulShutdown); //signal interruption - CTRL + C
    process.on("SIGTERM", gracefulShutdown); //signal termination
    return conn;
  } catch (error) {
    console.error("MongoDb connection failed", error.message);
    process.exit(1);
  }
};

//handle incaught exceptions
process.on("uncaughtException", (err) => {
  console.error("UNCAUGHT EXCEPTION, shutting down...");
  console.error(err.name, err.message);
  process.exit(1);
});
//server configuration
const PORT = process.env.PORT || 3800;

const startServer = async () => {
  try {
    await connectToDb();
    const server = httpServer.listen(PORT, () => {
      console.log(
        `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`,
      );
    });
    //handle promise rejection
    process.on("unhandledRejection", (err) => {
      console.error("UNHANDLED REJECTION! shutting down...");
      console.error(err.name, err.message);
      //close server gracefullly
      server.close(() => {
        console.log("Process terminated due to unhandled rejection");
      });
    });
    //handle gracefull server shutdown
    const shutdown = async () => {
      console.log("Receiving shutdown signal. Closing server...");
      server.close(() => {
        console.log("Server closed");
        process.exit(0);
      });
    };
    //handle termination signal
    process.on("SIGINT", shutdown);
    process.on("SIGTERM", shutdown);
  } catch (error) {
    console.error(`Failed to start server: ${error.message}`);
    process.exit(1);
  }
};

//start server
startServer();
