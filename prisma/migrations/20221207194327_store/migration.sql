/*
  Warnings:

  - The primary key for the `Store` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Store" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "delivery_fee" INTEGER NOT NULL,
    "rating" REAL NOT NULL,
    "open_time" TEXT NOT NULL
);
INSERT INTO "new_Store" ("address", "delivery_fee", "id", "name", "open_time", "rating") SELECT "address", "delivery_fee", "id", "name", "open_time", "rating" FROM "Store";
DROP TABLE "Store";
ALTER TABLE "new_Store" RENAME TO "Store";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
