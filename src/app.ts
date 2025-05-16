
// app.ts
import express from "express";
import authRouter from "./modules/auth/auth.routes";
import userRouter from "./modules/user/user.routes"

export const app = express();

app.use(express.json());

app.use("/auth", authRouter);
app.use("/user",userRouter)
