-- CreateTable
CREATE TABLE "trades" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "ticker" TEXT NOT NULL,
    "entry_date" DATETIME NOT NULL,
    "exit_date" DATETIME NOT NULL,
    "result" REAL NOT NULL
);
