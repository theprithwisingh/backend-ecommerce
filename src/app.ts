import express, { Request, Response } from "express";
export const app = express();

app.get("/", function (_req: Request, res: Response) {
  console.log("hello");
  res.send("hello");
});