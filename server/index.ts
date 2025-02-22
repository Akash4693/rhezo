import express from "express";
import dotenv from "dotenv";

import connectDB from "./db/connectDB";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRoute from "./routes/user.route";
import restaurantRoute from "./routes/restaurant.route";
import menuRoute from "./routes/menu.route";
import orderRoute from "./routes/order.route";
import path from "path";

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

const app = express();

const PORT = process.env.PORT || 3000;
console.log("Port: ", PORT);
console.log("PORT: ", process.env.PORT);

const DIRNAME = path.resolve();
console.log(DIRNAME);

// default middleware for any mern project
app.use(bodyParser.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(express.json());
app.use(cookieParser());
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};
app.use(cors(corsOptions));

app.get("/test", (_req, res) => {
  res.send("Hello world!");
});
app.get("/api/v1/user", (_req, res) => {
  res.json({ message: "Users route working!" });
});

// api
app.use("/api/v1/user", userRoute);
app.use("/api/v1/restaurant", restaurantRoute);
app.use("/api/v1/menu", menuRoute);
app.use("/api/v1/order", orderRoute);

app.use(express.static(path.join(DIRNAME, "/client/dist")));
app.use("*", (_, res) => {
  res.sendFile(path.resolve(DIRNAME, "client", "dist", "index.html"));
});

app.listen(PORT, () => {
  connectDB();
  console.log(`Server listen at port ${PORT}`);
});

export default app;
