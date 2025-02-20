-- DropForeignKey
ALTER TABLE "Comments" DROP CONSTRAINT "Comments_postsPostId_fkey";

-- AddForeignKey
ALTER TABLE "Comments" ADD CONSTRAINT "Comments_postsPostId_fkey" FOREIGN KEY ("postsPostId") REFERENCES "Posts"("postId") ON DELETE CASCADE ON UPDATE CASCADE;
