/*
  Warnings:

  - Made the column `restroId` on table `Table` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Table" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT DEFAULT 'abc',
    "restroId" TEXT NOT NULL,
    CONSTRAINT "Table_restroId_fkey" FOREIGN KEY ("restroId") REFERENCES "Restro" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Table" ("id", "name", "restroId") SELECT "id", "name", "restroId" FROM "Table";
DROP TABLE "Table";
ALTER TABLE "new_Table" RENAME TO "Table";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
