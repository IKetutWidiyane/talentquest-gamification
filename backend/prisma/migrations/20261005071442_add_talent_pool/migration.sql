-- CreateEnum
CREATE TYPE "TalentPoolStatus" AS ENUM ('ACTIVE', 'HIRED', 'INACTIVE');

-- CreateTable
CREATE TABLE "talent_pool" (
    "id" TEXT NOT NULL,
    "candidateProfileId" TEXT NOT NULL,
    "addedByUserId" TEXT NOT NULL,
    "status" "TalentPoolStatus" NOT NULL DEFAULT 'ACTIVE',
    "notes" TEXT,
    "tags" TEXT,
    "addedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "talent_pool_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "talent_pool_status_idx" ON "talent_pool"("status");

-- CreateIndex
CREATE INDEX "talent_pool_addedByUserId_idx" ON "talent_pool"("addedByUserId");

-- CreateIndex
CREATE INDEX "talent_pool_addedAt_idx" ON "talent_pool"("addedAt");

-- CreateIndex
CREATE UNIQUE INDEX "talent_pool_candidateProfileId_key" ON "talent_pool"("candidateProfileId");

-- AddForeignKey
ALTER TABLE "talent_pool" ADD CONSTRAINT "talent_pool_candidateProfileId_fkey" FOREIGN KEY ("candidateProfileId") REFERENCES "candidate_profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "talent_pool" ADD CONSTRAINT "talent_pool_addedByUserId_fkey" FOREIGN KEY ("addedByUserId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
