import { response } from "express";

interface Question {
  content: string;
  postId: string;
  userId: string;
}

// model Questions {
//   id            String    @id @default(uuid())
//   askedByUserId Users     @relation(fields: [usersId], references: [id], onDelete: Cascade)
//   usersId       String
//   postId        Posts     @relation(fields: [postsPostId], references: [postId], onDelete: Cascade)
//   postsPostId   String
//   content       String    @db.Text
//   createdAt     DateTime  @default(now())
//   lastUpdatedAt DateTime  @updatedAt
//   Answers       Answers[]
// }

export default class QuestionsService {
  prisma: any;
  constructor(prisma: any) {
    this.prisma = prisma;
  }
  async addQuestion(data: Question) {
    try {
      const result = await this.prisma.Questions.create({
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
      console.log("Created:", result);
      return { response: result };
    } catch (error) {
      console.error(error);
      return { response: null, error };
    }
  }
  async deleteQuestion(data: { commentId: string; userId: string }) {
    try {
      const result = await this.prisma.Comments.delete({
        where: { id: data.commentId, usersId: data.userId },
      });
      console.log(result);
      return { response: result };
    } catch (error) {
      console.error(error);
      return { response: null, error };
    }
  }
  async getCommentsForPost(data: { postId: string }) {
    try {
      const result = await this.prisma.Comments.findMany({
        where: { postsPostId: data.postId },
      });
      console.log(result);
      return { response: result };
    } catch (error) {
      console.error(error);
      return { response: null, error };
    }
  }

  // async updateComment(data: { postId: string; usersId: string; post: Post }) {
  //   try {
  //     const result = await this.prisma.Posts.update({
  //       where: { postId: data.postId, usersId: data.usersId },
  //       data: {
  //         title: data.post.title,
  //         description: data.post.description,
  //         tags: data.post.tags,
  //       },
  //     });
  //     console.log(result);
  //     return { response: result };
  //   } catch (error) {
  //     console.error(error);
  //     return { response: null, error };
  //   }
  // }
}
