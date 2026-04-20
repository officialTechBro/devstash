-- CreateIndex
CREATE INDEX "Item_isPinned_idx" ON "Item"("isPinned");

-- CreateIndex
CREATE INDEX "Item_isFavorite_idx" ON "Item"("isFavorite");

-- CreateIndex
CREATE INDEX "Item_createdAt_idx" ON "Item"("createdAt");

-- CreateIndex
CREATE INDEX "ItemTag_tagId_idx" ON "ItemTag"("tagId");

-- CreateIndex
CREATE INDEX "ItemType_isSystem_idx" ON "ItemType"("isSystem");
