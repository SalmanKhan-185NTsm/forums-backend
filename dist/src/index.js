"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const client_1 = require("@prisma/client");
const UserService_1 = __importDefault(require("../services/UserService"));
const PostService_1 = __importDefault(require("../services/PostService"));
const CommentService_1 = __importDefault(require("../services/CommentService"));
const prisma = new client_1.PrismaClient();
const app = (0, express_1.default)();
const port = process.env.PORT || 3001;
app.use(express_1.default.json());
const userService = new UserService_1.default(prisma);
const postService = new PostService_1.default(prisma);
const commentService = new CommentService_1.default(prisma);
// Configure CORS options
const corsOptions = {
    origin: "*", // Allow all origins; for specific origins, replace '*' with an array of origins
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
};
// Enable CORS with the specified options
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json()); // Parses JSON request bodies
app.use(express_1.default.urlencoded({ extended: true })); // Parses urlencoded request bodies
app.post("/register-user", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield userService.addUser(req.body.userData, req.body.authData);
        if (result.response !== null) {
            res
                .status(200)
                .json({ message: "success", status: 200, data: result.response[0] });
        }
        else {
            res.status(500).json({
                message: "An Error occured,",
                error: result,
            });
        }
    }
    catch (error) {
        res.status(500).json({
            message: "Internal server error.",
            status: 500,
            error: error,
        });
    }
}));
app.post("/delete-user", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.body.userId;
        const result = yield userService.deleteUser({ id });
        if (result.response !== null) {
            res
                .status(200)
                .json({ message: "Successfully Deleted", status: 200, result });
        }
        else {
            res.status(500).json({
                message: "An Error occured,",
                error: result,
            });
        }
    }
    catch (error) {
        res.status(500).json({
            message: "Internal server error.",
            status: 500,
            error: error,
        });
    }
}));
app.get("/fetch-posts", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield postService.fetchAllPosts();
        if (result.response !== null) {
            res
                .status(200)
                .json({ message: "success", status: 200, data: result.response });
        }
        else {
            res.status(500).json({
                message: "An Error occured,",
                error: result,
            });
        }
    }
    catch (error) {
        res.status(500).json({
            message: "Internal server error.",
            status: 500,
            error: error,
        });
    }
}));
app.post("/create-post", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield postService.addPosts(req.body);
        if (result.response !== null) {
            res
                .status(200)
                .json({ message: "Successfully created", status: 200, result });
        }
        else {
            res.status(500).json({
                message: "An Error occured,",
                error: result,
            });
        }
    }
    catch (error) {
        res.status(500).json({
            message: "Internal server error.",
            status: 500,
            error: error,
        });
    }
}));
app.delete("/delete-post", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield postService.deletePost(req.body);
        if (result.response !== null) {
            res
                .status(200)
                .json({ message: "Successfully deleted", status: 200, result });
        }
        else {
            res.status(500).json({
                message: "An Error occured,",
                error: result,
            });
        }
    }
    catch (error) {
        res.status(500).json({
            message: "Internal server error.",
            status: 500,
            error: error,
        });
    }
}));
app.post("/get-posts-by-user-id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield postService.findPostsByUserId(req.body);
        if (result.response !== null) {
            res
                .status(200)
                .json({ message: "success", status: 200, data: result.response });
        }
        else {
            res.status(500).json({
                message: "An Error occured,",
                error: result,
            });
        }
    }
    catch (error) {
        res.status(500).json({
            message: "Internal server error.",
            status: 500,
            error: error,
        });
    }
}));
app.delete("/delete-post-by-id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield postService.deletePost(req.body);
        if (result.response !== null) {
            res
                .status(200)
                .json({ message: "success", status: 200, data: result.response });
        }
        else {
            res.status(500).json({
                message: "An Error occured,",
                error: result,
            });
        }
    }
    catch (error) {
        res.status(500).json({
            message: "Internal server error.",
            status: 500,
            error: error,
        });
    }
}));
app.post("/get-posts-details", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield postService.findPostById(req.body);
        if (result.response !== null) {
            res
                .status(200)
                .json({ message: "success", status: 200, data: result.response });
        }
        else {
            res.status(500).json({
                message: "An Error occured,",
                error: result,
            });
        }
    }
    catch (error) {
        res.status(500).json({
            message: "Internal server error.",
            status: 500,
            error: error,
        });
    }
}));
app.put("/update-post", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield postService.updatePostsById(req.body);
        if (result.response !== null) {
            res
                .status(200)
                .json({ message: "success", status: 200, data: result.response });
        }
        else {
            res.status(500).json({
                message: "An Error occured,",
                error: result,
            });
        }
    }
    catch (error) {
        res.status(500).json({
            message: "Internal server error.",
            status: 500,
            error: error,
        });
    }
}));
app.post("/new-comment", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield commentService.addComment(req.body);
        if (result.response !== null) {
            res
                .status(200)
                .json({ message: "success", status: 200, data: result.response });
        }
        else {
            res.status(500).json({
                message: "An Error occured,",
                error: result,
            });
        }
    }
    catch (error) {
        res.status(500).json({
            message: "Internal server error.",
            status: 500,
            error: error,
        });
    }
}));
app.delete("/delete-comment", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield commentService.deleteComment(req.body);
        if (result.response !== null) {
            res
                .status(200)
                .json({ message: "success", status: 200, data: result.response });
        }
        else {
            res.status(500).json({
                message: "An Error occured,",
                error: result,
            });
        }
    }
    catch (error) {
        res.status(500).json({
            message: "Internal server error.",
            status: 500,
            error: error,
        });
    }
}));
app.post("/get-comments-for-post", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield commentService.getCommentsForPost(req.body);
        if (result.response !== null) {
            res
                .status(200)
                .json({ message: "success", status: 200, data: result.response });
        }
        else {
            res.status(500).json({
                message: "An Error occured,",
                error: result,
            });
        }
    }
    catch (error) {
        res.status(500).json({
            message: "Internal server error.",
            status: 500,
            error: error,
        });
    }
}));
app.get("/test", (req, res) => {
    res.send("Hello, TypeScript Express! test");
});
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
