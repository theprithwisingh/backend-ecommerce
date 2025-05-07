
// app.ts
import express from "express";
import authRouter from "./modules/auth/auth.routes";

export const app = express();

app.use(express.json());

app.use("/auth", authRouter);
