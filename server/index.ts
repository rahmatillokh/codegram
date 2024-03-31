import express from "express";
import "dotenv/config";
import http from "http";
import cors from "cors";
import mongoose from "mongoose";
import userRoutes from "./userRoutes";
import { Server } from "socket.io";
import { User } from "./userModel";
import jwt from "jsonwebtoken";

const app = express();
const server = http.createServer(app);
const { PORT } = process.env || 8000;

app.use(cors());
app.use(express.json());
app.use("/", userRoutes);

mongoose
  .connect(process.env.MONGO_URL!)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(`Error connecting to MongoDB: \n${err}`));

const io = new Server(server, { cors: { origin: "*" } });

io.on("connection", (socket) => {
  socket.on("joined", () => {
    io.sockets.emit("new-user", "new user joined");
  });

  socket.on("private message", async (to, message, mySelf) => {
    const user = await User.find({ email: to });
    const decoded = jwt.verify(mySelf, process.env.ACCESS_TOKEN_SECRET!);
    const sender = await User.findById(decoded);
    io.sockets.emit("refresh", "new Message");

    if (user) {
      user[0].messages.push({
        reciver: user[0].email,
        message,
        sender: sender?.email,
        time: new Date(),
      });

      sender?.messages.push({
        reciver: user[0].email,
        message,
        sender: sender?.email,
        time: new Date(),
      });

      await user[0].save();
      await sender?.save();
    }
  });
});

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
