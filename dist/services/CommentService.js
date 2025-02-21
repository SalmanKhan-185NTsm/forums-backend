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
// model Comments {
//   id                String   @id @default(uuid())
//   content           String   @db.Text
//   commentedByUserId Users    @relation(fields: [usersId], references: [id], onDelete: Cascade)
//   createdAt         DateTime @default(now())
//   lastUpdatedAt     DateTime @updatedAt
//   usersId           String
//   postId            Posts    @relation(fields: [postsPostId], references: [postId])
//   postsPostId       String
// }
class CommentService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    addComment(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.prisma.Comments.create({
                    data: {
                        content: data.content,
                        commentedByUserId: {
                            connect: { id: data.userId },
                        },
                        postId: {
                            connect: { postId: data.postId },
                        },
                    },
                });
                console.log("Created comment:", result);
                return { response: result };
            }
            catch (error) {
                console.error(error);
                return { response: null, error };
            }
        });
    }
    deleteComment(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.prisma.Comments.delete({
                    where: { id: data.commentId, usersId: data.userId },
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
    getCommentsForPost(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.prisma.Comments.findMany({
                    where: { postsPostId: data.postId },
                    select: {
                        id: true,
                        createdAt: true,
                        content: true,
                        commentedByUserId: {
                            select: {
                                id: true,
                                username: true,
                                email: true,
                            },
                        },
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
exports.default = CommentService;
