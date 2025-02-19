import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import UserService from "../services/UserService";
const prisma = new PrismaClient();
const app = express();
const port = process.env.PORT || 3001;
app.use(express.json());
// app.use(cors());

app.post("/register-user", (req: Request, res: Response) => {
  const userService = new UserService(prisma);
  console.log(req.body);
  const result = userService.addUser(req.body.userData, req.body.authData);

  res.send("executed");
});
app.get("/test", (req: Request, res: Response) => {
  res.send("Hello, TypeScript Express! test");
});
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
