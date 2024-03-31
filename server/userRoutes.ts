import { Request, Response, Router } from "express";
import jwt from "jsonwebtoken";
import { User } from "./userModel";

const router = Router();

router.post("/auth", async (req: Request, res: Response) => {
  try {
    const exist = await User.findOne({ email: req.body.email });
    if (exist) {
      const accessToken = jwt.sign(
        exist.toObject(),
        process.env.ACCESS_TOKEN_SECRET!
      );
      res.setHeader("Set-Cookie", `user=${accessToken}; Path=/`);
      res.send(exist);
    } else {
      const user = new User(req.body);
      await user.save();
      const accessToken = jwt.sign(
        user.toObject(),
        process.env.ACCESS_TOKEN_SECRET!
      );
      res.setHeader("Set-Cookie", `user=${accessToken}; Path=/`);
      res.send(user);
    }
  } catch (error) {
    console.log(error);
  }
});

router.get("/users", async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (error) {
    console.log(error);
  }
});

router.get("/user", async (req: Request, res: Response) => {
  try {
    const data = jwt.verify(
      req.headers.authorization!,
      process.env.ACCESS_TOKEN_SECRET!
    );
    if (typeof data === "string") {
      throw new Error("Invalid token");
    }
    const user = await User.find({ email: data?.email });
    res.send(user);
  } catch (error) {
    console.log(error);
  }
});

router.get("/messages", async (req: Request, res: Response) => {
  const { sender, reciver } = req.query;
  const user = await User.find({ email: reciver });
  const filteredUser = user[0]?.messages?.filter(
    (message: any) =>
      (message.sender === sender && message.reciver === reciver) ||
      (message.sender === reciver && message.reciver === sender)
  );
  res.send(filteredUser);
});

export default router;
