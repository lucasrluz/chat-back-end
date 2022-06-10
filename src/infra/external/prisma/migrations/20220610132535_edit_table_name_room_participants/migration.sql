/*
  Warnings:

  - You are about to drop the `roomParticipants` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "roomParticipants" DROP CONSTRAINT "roomParticipants_roomId_fkey";

-- DropForeignKey
ALTER TABLE "roomParticipants" DROP CONSTRAINT "roomParticipants_userId_fkey";

-- DropTable
DROP TABLE "roomParticipants";

-- CreateTable
CREATE TABLE "roomParticipant" (
    "roomId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "roomParticipant_pkey" PRIMARY KEY ("roomId","userId")
);

-- AddForeignKey
ALTER TABLE "roomParticipant" ADD CONSTRAINT "roomParticipant_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user_account"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "roomParticipant" ADD CONSTRAINT "roomParticipant_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "room"("roomId") ON DELETE RESTRICT ON UPDATE CASCADE;
