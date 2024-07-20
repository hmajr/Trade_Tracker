-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_day_trades" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "day_id" TEXT NOT NULL,
    "trade_id" TEXT NOT NULL,
    CONSTRAINT "day_trades_day_id_fkey" FOREIGN KEY ("day_id") REFERENCES "days" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "day_trades_trade_id_fkey" FOREIGN KEY ("trade_id") REFERENCES "trades" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_day_trades" ("day_id", "id", "trade_id") SELECT "day_id", "id", "trade_id" FROM "day_trades";
DROP TABLE "day_trades";
ALTER TABLE "new_day_trades" RENAME TO "day_trades";
CREATE UNIQUE INDEX "day_trades_day_id_trade_id_key" ON "day_trades"("day_id", "trade_id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
