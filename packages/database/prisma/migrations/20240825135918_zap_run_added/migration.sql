-- CreateTable
CREATE TABLE "ZapRun" (
    "id" TEXT NOT NULL,
    "ZapId" TEXT NOT NULL,

    CONSTRAINT "ZapRun_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ZapRunOutBox" (
    "id" TEXT NOT NULL,
    "ZapRunId" TEXT NOT NULL,

    CONSTRAINT "ZapRunOutBox_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ZapRunOutBox_ZapRunId_key" ON "ZapRunOutBox"("ZapRunId");

-- AddForeignKey
ALTER TABLE "ZapRun" ADD CONSTRAINT "ZapRun_ZapId_fkey" FOREIGN KEY ("ZapId") REFERENCES "Zap"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ZapRunOutBox" ADD CONSTRAINT "ZapRunOutBox_ZapRunId_fkey" FOREIGN KEY ("ZapRunId") REFERENCES "ZapRun"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
