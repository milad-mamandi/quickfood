-- CreateTable
CREATE TABLE "Store" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "delivery_fee" INTEGER NOT NULL,
    "rating" REAL NOT NULL,
    "open_time" TEXT NOT NULL
);
