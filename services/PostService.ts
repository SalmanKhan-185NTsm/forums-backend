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

  async deletePost(data: { postId: string; userId: string }) {
    try {
      const result = await this.prisma.Posts.delete({
        where: { postId: data.postId, usersId: data.userId },
      });
      console.log(result);
      return { response: result };
    } catch (error) {
      console.error(error);
      return { response: null, error };
    }
  }
  async findPostsByUserId(data: { userId: string }) {
    try {
      console.log(data);
      const result = await this.prisma.Posts.findMany({
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
      });

      console.log("find records by id is ,", result);
      return { response: result };
    } catch (error) {
      console.error(error);
      return { response: null, error };
    }
  }
  async findPostById(data: { postId: string }) {
    try {
      console.log(data);
      const result = await this.prisma.Posts.findUnique({
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
    } catch (error) {
      console.error(error);
      return { response: null, error };
    }
  }
  async updatePostsById(data: { postId: string; userId: string; post: Post }) {
    try {
      const result = await this.prisma.Posts.update({
        where: { postId: data.postId, usersId: data.userId },
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
      const result = await this.prisma.Posts.findMany({
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
      console.log(result);
      return { response: result };
    } catch (error) {
      console.error(error);
      return { response: null, error };
    }
  }
}
