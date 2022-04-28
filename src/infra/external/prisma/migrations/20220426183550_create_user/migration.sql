-- CreateTable
CREATE TABLE "user_account" (
    "userId" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "user_account_pkey" PRIMARY KEY ("userId")
);
