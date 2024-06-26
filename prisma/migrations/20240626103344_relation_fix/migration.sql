-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Dish" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "restroId" TEXT NOT NULL,
    "tableId" TEXT,
    CONSTRAINT "Dish_restroId_fkey" FOREIGN KEY ("restroId") REFERENCES "Restro" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Dish_tableId_fkey" FOREIGN KEY ("tableId") REFERENCES "Table" ("id") ON DELETE NO ACTION ON UPDATE CASCADE
);
INSERT INTO "new_Dish" ("id", "image", "name", "price", "restroId", "tableId") SELECT "id", "image", "name", "price", "restroId", "tableId" FROM "Dish";
DROP TABLE "Dish";
ALTER TABLE "new_Dish" RENAME TO "Dish";
CREATE TABLE "new_Restro" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "logo" TEXT,
    "location" TEXT,
    "managerId" TEXT NOT NULL,
    CONSTRAINT "Restro_managerId_fkey" FOREIGN KEY ("managerId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Restro" ("id", "location", "logo", "managerId", "name") SELECT "id", "location", "logo", "managerId", "name" FROM "Restro";
DROP TABLE "Restro";
ALTER TABLE "new_Restro" RENAME TO "Restro";
CREATE UNIQUE INDEX "Restro_managerId_key" ON "Restro"("managerId");
CREATE TABLE "new_Table" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "restroId" TEXT,
    CONSTRAINT "Table_restroId_fkey" FOREIGN KEY ("restroId") REFERENCES "Restro" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Table" ("id", "restroId") SELECT "id", "restroId" FROM "Table";
DROP TABLE "Table";
ALTER TABLE "new_Table" RENAME TO "Table";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
