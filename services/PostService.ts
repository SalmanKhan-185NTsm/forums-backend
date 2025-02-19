import { response } from "express";

interface Tags {
  tagId: string;
  tagName: string;
}
interface Post {
  title: string;
  description: string;
  tags: Tags[];
  postedByUserId: string;
}

// postId         String      @id @default(uuid())
// title          String      @db.VarChar(250)
// description    String      @db.Text
// tags           Json?        @db.JsonB
// createdAt      DateTime    @default(now())
// lastUpdatedAt  DateTime    @updatedAt
// postedByUserId Users       @relation(fields: [usersId], references: [id], onDelete: Cascade)
// usersId        String
// Questions      Questions[]
export default class PostService {
  prisma: any;
  constructor(prisma: any) {
    this.prisma = prisma;
  }
  async addPosts(data: Post) {
    try {
      const result = await this.prisma.Posts.create({
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
    } catch (error) {
      console.error(error);
      return { response: null, error };
    }
  }
  async deletePost(data: { postId: string }) {
    try {
      const result = await this.prisma.Posts.delete({
        where: { postId: data.postId },
      });
      console.log(result);
      return { response: result };
    } catch (error) {
      console.error(error);
      return { response: null, error };
    }
  }
  async findPostsByUserId(data: { usersId: string }) {
    try {
      const result = await this.prisma.Posts.findMany({
        where: { usersId: data.usersId },
      });
      console.log(result);
      return { response: result };
    } catch (error) {
      console.error(error);
      return { response: null, error };
    }
  }
  async updatePostsById(data: { postId: string; usersId: string; post: Post }) {
    try {
      const result = await this.prisma.Posts.update({
        where: { postId: data.postId, usersId: data.usersId },
        data: {
          title: data.post.title,
          description: data.post.description,
          tags: data.post.tags,
        },
      });
      console.log(result);
      return { response: result };
    } catch (error) {
      console.error(error);
      return { response: null, error };
    }
  }
  async fetchAllPosts() {
    try {
      const result = await this.prisma.Posts.findMany({});
      console.log(result);
      return { response: result };
    } catch (error) {
      console.error(error);
      return { response: null, error };
    }
  }
}
