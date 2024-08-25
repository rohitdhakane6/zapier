/*
  Warnings:

  - Added the required column `AvailableTriggerId` to the `Trigger` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Trigger" ADD COLUMN     "AvailableTriggerId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Action" (
    "id" TEXT NOT NULL,
    "zapId" TEXT NOT NULL,
    "AvailableActionId" TEXT NOT NULL,

    CONSTRAINT "Action_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AvailableAction" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "AvailableAction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Action_zapId_key" ON "Action"("zapId");

-- AddForeignKey
ALTER TABLE "Trigger" ADD CONSTRAINT "Trigger_AvailableTriggerId_fkey" FOREIGN KEY ("AvailableTriggerId") REFERENCES "AvailableTrigger"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Action" ADD CONSTRAINT "Action_AvailableActionId_fkey" FOREIGN KEY ("AvailableActionId") REFERENCES "AvailableAction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Action" ADD CONSTRAINT "Action_zapId_fkey" FOREIGN KEY ("zapId") REFERENCES "Zap"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
