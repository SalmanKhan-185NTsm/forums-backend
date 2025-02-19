import { response } from "express";

interface Comment {
  content: string;
  postId: string;
  userId: string;
}

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

export default class CommentService {
  prisma: any;
  constructor(prisma: any) {
    this.prisma = prisma;
  }
  async addComment(data: Comment) {
    try {
      const result = await this.prisma.Comments.create({
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
    } catch (error) {
      console.error(error);
      return { response: null, error };
    }
  }
  async deleteComment(data: { id: string; userId: string }) {
    try {
      const result = await this.prisma.Comments.delete({
        where: { id: data.id, commentedByUserId: data.userId },
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
