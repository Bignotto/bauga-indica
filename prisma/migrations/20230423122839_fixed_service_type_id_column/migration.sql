/*
  Warnings:

  - You are about to drop the column `service_type_id` on the `services` table. All the data in the column will be lost.
  - Added the required column `serviceTypeId` to the `services` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "services" DROP CONSTRAINT "services_service_type_id_fkey";

-- AlterTable
ALTER TABLE "services" DROP COLUMN "service_type_id",
ADD COLUMN     "serviceTypeId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "services" ADD CONSTRAINT "services_serviceTypeId_fkey" FOREIGN KEY ("serviceTypeId") REFERENCES "service_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
