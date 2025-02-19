import express, { Request, Response } from "express";
import cors from 'cors';
import { PrismaClient } from "@prisma/client";
import UserService from "../services/UserService";
import PostService from "../services/PostService";
import CommentService from "../services/CommentService";
const prisma = new PrismaClient();
const app = express();
const port = process.env.PORT || 3001;
app.use(express.json());

const userService = new UserService(prisma);
const postService = new PostService(prisma);
const commentService = new CommentService(prisma);

// Configure CORS options
const corsOptions = {
  origin: "*", // Allow all origins; for specific origins, replace '*' with an array of origins
  methods: ["GET", "POST", "PUT", "DELETE"], // Allowed methods
  allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
};

// Enable CORS with the specified options
app.use(cors(corsOptions));
app.use(express.json()); // Parses JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parses urlencoded request bodies
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

app.get("/fetch-posts", async (req: Request, res: Response) => {
  try {
    const result = await postService.fetchAllPosts();
    if (result.response !== null) {
      res
        .status(200)
        .json({ message: "success", status: 200, data: result.response });
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

app.delete("/delete-post", async (req: Request, res: Response) => {
  try {
    const result = await postService.deletePost(req.body);
    if (result.response !== null) {
      res
        .status(200)
        .json({ message: "Successfully deleted", status: 200, result });
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

app.post("/get-posts-by-user-id", async (req: Request, res: Response) => {
  try {
    const result = await postService.findPostsByUserId(req.body);
    if (result.response !== null) {
      res
        .status(200)
        .json({ message: "success", status: 200, data: result.response });
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

app.put("/update-post", async (req: Request, res: Response) => {
  try {
    const result = await postService.updatePostsById(req.body);
    if (result.response !== null) {
      res
        .status(200)
        .json({ message: "success", status: 200, data: result.response });
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

app.post("/new-comment", async (req: Request, res: Response) => {
  try {
    console.log(req.body);
    const result = await commentService.addComment(req.body);
    if (result.response !== null) {
      res
        .status(200)
        .json({ message: "success", status: 200, data: result.response });
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

app.delete("/delete-comment", async (req: Request, res: Response) => {
  try {
    console.log(req.body);
    const result = await commentService.deleteComment(req.body);
    if (result.response !== null) {
      res
        .status(200)
        .json({ message: "success", status: 200, data: result.response });
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
app.post("/get-comments-for-post", async (req: Request, res: Response) => {
  try {
    console.log(req.body);
    const result = await commentService.getCommentsForPost(req.body);
    if (result.response !== null) {
      res
        .status(200)
        .json({ message: "success", status: 200, data: result.response });
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
