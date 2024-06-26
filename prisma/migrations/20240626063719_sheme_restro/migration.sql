-- CreateTable
CREATE TABLE "Restro" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "logo" TEXT,
    "location" TEXT,
    "managerId" TEXT NOT NULL,
    CONSTRAINT "Restro_managerId_fkey" FOREIGN KEY ("managerId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Table" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "restroId" TEXT,
    CONSTRAINT "Table_restroId_fkey" FOREIGN KEY ("restroId") REFERENCES "Restro" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Dish" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "restroId" TEXT NOT NULL,
    "tableId" TEXT,
    CONSTRAINT "Dish_restroId_fkey" FOREIGN KEY ("restroId") REFERENCES "Restro" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Dish_tableId_fkey" FOREIGN KEY ("tableId") REFERENCES "Table" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Restro_managerId_key" ON "Restro"("managerId");
