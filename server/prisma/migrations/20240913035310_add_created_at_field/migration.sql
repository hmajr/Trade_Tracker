-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_trades" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ticker" TEXT NOT NULL,
    "entry_date" DATETIME NOT NULL,
    "exit_date" DATETIME NOT NULL,
    "result" REAL NOT NULL
);
INSERT INTO "new_trades" ("entry_date", "exit_date", "id", "result", "ticker") SELECT "entry_date", "exit_date", "id", "result", "ticker" FROM "trades";
DROP TABLE "trades";
ALTER TABLE "new_trades" RENAME TO "trades";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
