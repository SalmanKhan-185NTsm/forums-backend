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
Object.defineProperty(exports, "__esModule", { value: true });
// postId         String      @id @default(uuid())
// title          String      @db.VarChar(250)
// description    String      @db.Text
// tags           Json?        @db.JsonB
// createdAt      DateTime    @default(now())
// lastUpdatedAt  DateTime    @updatedAt
// postedByUserId Users       @relation(fields: [usersId], references: [id], onDelete: Cascade)
// usersId        String
// Questions      Questions[]
class PostService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    addPosts(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.prisma.Posts.create({
                    data: {
                        title: data.title,
                        description: data.description,
                        tags: data.tags,
                        postedByUserId: {
                            connect: { id: data.postedByUserId },
                        },
                    },
                });
                console.log("Created post:", result);
                return { response: result };
            }
            catch (error) {
                console.error(error);
                return { response: null, error };
            }
        });
    }
    deletePost(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.prisma.Posts.delete({
                    where: { postId: data.postId, usersId: data.userId },
                });
                console.log(result);
                return { response: result };
            }
            catch (error) {
                console.error(error);
                return { response: null, error };
            }
        });
    }
    findPostsByUserId(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(data);
                const result = yield this.prisma.Posts.findMany({
                    where: {
                        usersId: data.userId,
                    },
                    select: {
                        postId: true,
                        title: true,
                        description: true,
                        tags: true,
                        createdAt: true,
                        postedByUserId: {
                            select: {
                                id: true,
                                username: true,
                                email: true,
                            },
                        },
                    },
                    orderBy: {
                        createdAt: 'desc'
                    },
                });
                console.log("find records by id is ,", result);
                return { response: result };
            }
            catch (error) {
                console.error(error);
                return { response: null, error };
            }
        });
    }
    findPostById(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(data);
                const result = yield this.prisma.Posts.findUnique({
                    where: {
                        postId: data.postId,
                    },
                    select: {
                        postId: true,
                        title: true,
                        description: true,
                        tags: true,
                        createdAt: true,
                        postedByUserId: {
                            select: {
                                id: true,
                                username: true,
                                email: true,
                            },
                        },
                    },
                });
                console.log("find records by id is ,", result);
                return { response: result };
            }
            catch (error) {
                console.error(error);
                return { response: null, error };
            }
        });
    }
    updatePostsById(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.prisma.Posts.update({
                    where: { postId: data.postId, usersId: data.userId },
                    data: {
                        title: data.post.title,
                        description: data.post.description,
                        tags: data.post.tags,
                    },
                });
                console.log(result);
                return { response: result };
            }
            catch (error) {
                console.error(error);
                return { response: null, error };
            }
        });
    }
    fetchAllPosts() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.prisma.Posts.findMany({
                    select: {
                        postId: true,
                        title: true,
                        description: true,
                        tags: true,
                        createdAt: true,
                        postedByUserId: {
                            select: {
                                id: true,
                                username: true,
                                email: true,
                            },
                        },
                    },
                    orderBy: {
                        createdAt: 'desc'
                    },
                });
                console.log(result);
                return { response: result };
            }
            catch (error) {
                console.error(error);
                return { response: null, error };
            }
        });
    }
}
exports.default = PostService;
