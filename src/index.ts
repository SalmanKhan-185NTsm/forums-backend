import express, { Request, Response } from "express";

const app = express();
const port = process.env.PORT || 3001;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript Express!");
});
app.get("/test", (req: Request, res: Response) => {
  res.send("Hello, TypeScript Express! test");
});
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
