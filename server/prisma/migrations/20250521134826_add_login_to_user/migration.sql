/*
  Warnings:

  - Added the required column `login` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN "login" TEXT;

-- Заполняем login для существующих записей (пример для 1 пользователя)
UPDATE "User" SET "login" = 'admin_login' WHERE id = 1; -- Уточните ID вашей записи!

-- Делаем колонку обязательной
ALTER TABLE "User" ALTER COLUMN "login" SET NOT NULL;
