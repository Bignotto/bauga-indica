-- AlterTable
ALTER TABLE "users" ADD COLUMN     "emailConfirmed" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "phoneConfirmed" BOOLEAN NOT NULL DEFAULT false;
