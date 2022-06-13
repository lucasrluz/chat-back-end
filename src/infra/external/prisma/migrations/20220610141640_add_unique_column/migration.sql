/*
  Warnings:

  - A unique constraint covering the columns `[roomId]` on the table `roomParticipant` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `roomParticipant` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "roomParticipant_roomId_key" ON "roomParticipant"("roomId");

-- CreateIndex
CREATE UNIQUE INDEX "roomParticipant_userId_key" ON "roomParticipant"("userId");
