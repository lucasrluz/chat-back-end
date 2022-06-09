/*
  Warnings:

  - You are about to drop the `RoomParticipants` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "RoomParticipants" DROP CONSTRAINT "RoomParticipants_roomId_fkey";

-- DropForeignKey
ALTER TABLE "RoomParticipants" DROP CONSTRAINT "RoomParticipants_userId_fkey";

-- DropTable
DROP TABLE "RoomParticipants";

-- CreateTable
CREATE TABLE "roomParticipants" (
    "roomId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "roomParticipants_pkey" PRIMARY KEY ("roomId","userId")
);

-- AddForeignKey
ALTER TABLE "roomParticipants" ADD CONSTRAINT "roomParticipants_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user_account"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "roomParticipants" ADD CONSTRAINT "roomParticipants_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "room"("roomId") ON DELETE RESTRICT ON UPDATE CASCADE;
