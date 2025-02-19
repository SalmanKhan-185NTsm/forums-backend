/*
  Warnings:

  - Added the required column `postsPostId` to the `Comments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Comments" ADD COLUMN     "postsPostId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Posts" ALTER COLUMN "tags" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Comments" ADD CONSTRAINT "Comments_postsPostId_fkey" FOREIGN KEY ("postsPostId") REFERENCES "Posts"("postId") ON DELETE RESTRICT ON UPDATE CASCADE;
