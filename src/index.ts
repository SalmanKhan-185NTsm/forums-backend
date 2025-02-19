import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import UserService from "../services/UserService";
import PostService from "../services/PostService";
const prisma = new PrismaClient();
const app = express();
const port = process.env.PORT || 3001;
app.use(express.json());

const userService = new UserService(prisma);
const postService = new PostService(prisma);

// app.use(cors());

app.post("/register-user", async (req: Request, res: Response) => {
  try {
    const result = await userService.addUser(
      req.body.userData,
      req.body.authData
    );
    console.log(result);

    if (result.response !== null) {
      res
        .status(200)
        .json({ message: "Successfully Registered", status: 200, result });
    } else {
      res.status(500).json({
        message: "An Error occured,",
        error: result,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Internal server error.",
      status: 500,
      error: error,
    });
  }
});
app.post("/delete-user", async (req: Request, res: Response) => {
  try {
    const id = req.body.userId;
    const result = await userService.deleteUser({ id });
    if (result.response !== null) {
      res
        .status(200)
        .json({ message: "Successfully Deleted", status: 200, result });
    } else {
      res.status(500).json({
        message: "An Error occured,",
        error: result,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Internal server error.",
      status: 500,
      error: error,
    });
  }
});

app.post("/create-post", async (req: Request, res: Response) => {
  try {
    const result = await postService.addPosts(req.body);
    if (result.response !== null) {
      res
        .status(200)
        .json({ message: "Successfully created", status: 200, result });
    } else {
      res.status(500).json({
        message: "An Error occured,",
        error: result,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Internal server error.",
      status: 500,
      error: error,
    });
  }
});


app.get("/test", (req: Request, res: Response) => {
  res.send("Hello, TypeScript Express! test");
});
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
