-- DropForeignKey
ALTER TABLE `transaksi` DROP FOREIGN KEY `transaksi_id_transaksi_fkey`;

-- AddForeignKey
ALTER TABLE `detail_transaksi` ADD CONSTRAINT `detail_transaksi_id_transaksi_fkey` FOREIGN KEY (`id_transaksi`) REFERENCES `transaksi`(`id_transaksi`) ON DELETE RESTRICT ON UPDATE CASCADE;
