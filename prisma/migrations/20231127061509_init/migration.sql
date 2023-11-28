-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Artist" (
    "id" SERIAL NOT NULL,
    "artistId" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Artist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserArtistScore" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "artistId" TEXT NOT NULL,
    "score" INTEGER NOT NULL,

    CONSTRAINT "UserArtistScore_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_userId_key" ON "User"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Artist_artistId_key" ON "Artist"("artistId");

-- CreateIndex
CREATE UNIQUE INDEX "UserArtistScore_userId_artistId_key" ON "UserArtistScore"("userId", "artistId");

-- AddForeignKey
ALTER TABLE "UserArtistScore" ADD CONSTRAINT "UserArtistScore_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserArtistScore" ADD CONSTRAINT "UserArtistScore_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "Artist"("artistId") ON DELETE RESTRICT ON UPDATE CASCADE;
