/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `Recomendation` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `Services` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[serviceId]` on the table `Tags` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Recomendation_userId_key" ON "Recomendation"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Services_userId_key" ON "Services"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Tags_serviceId_key" ON "Tags"("serviceId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
