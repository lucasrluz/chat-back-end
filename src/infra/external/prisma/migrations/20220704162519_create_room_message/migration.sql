-- CreateTable
CREATE TABLE "RoomMessage" (
    "roomMessageId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "roomId" TEXT NOT NULL,

    CONSTRAINT "RoomMessage_pkey" PRIMARY KEY ("roomMessageId")
);

-- AddForeignKey
ALTER TABLE "RoomMessage" ADD CONSTRAINT "RoomMessage_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user_account"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoomMessage" ADD CONSTRAINT "RoomMessage_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "room"("roomId") ON DELETE RESTRICT ON UPDATE CASCADE;
