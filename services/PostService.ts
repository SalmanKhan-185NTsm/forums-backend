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
export default class PostsService {
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
  async deletePosts<T>(data: T) {}
  async findPostsById<T>(data: T) {}
  async updatePostsById<T>(data: T) {}
}
