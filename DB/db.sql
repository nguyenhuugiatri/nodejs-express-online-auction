/*
 Navicat Premium Data Transfer

 Source Server         : auctionConnection
 Source Server Type    : MySQL
 Source Server Version : 80018
 Source Host           : 127.0.0.1:3306
 Source Schema         : DB

 Target Server Type    : MySQL
 Target Server Version : 80018
 File Encoding         : 65001

 Date: 07/01/2020 04:57:20
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for admin
-- ----------------------------
DROP TABLE IF EXISTS `admin`;
CREATE TABLE `admin` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `email` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `phone` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `username` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `password` varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `username_UNIQUE` (`username`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of admin
-- ----------------------------
BEGIN;
INSERT INTO `admin` VALUES (1, 'lem', 'nguyenhuugiatri@gmail.com', '0964351101', 'lemdeptry', '$2a$10$VdYEIX7Jq/cOvw1mJfF2MOJIfMGacz1r1eC0A0fVqGHTo3sZoJ0tG');
COMMIT;

-- ----------------------------
-- Table structure for autobid
-- ----------------------------
DROP TABLE IF EXISTS `autobid`;
CREATE TABLE `autobid` (
  `id_user` int(11) NOT NULL,
  `id_product` int(11) NOT NULL,
  `price` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_user`,`id_product`),
  KEY `fk_autobid_product` (`id_product`),
  CONSTRAINT `fk_autobid_product` FOREIGN KEY (`id_product`) REFERENCES `product` (`id`),
  CONSTRAINT `fk_autobid_user` FOREIGN KEY (`id_user`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of autobid
-- ----------------------------
BEGIN;
INSERT INTO `autobid` VALUES (6, 63, 240000);
COMMIT;

-- ----------------------------
-- Table structure for ban
-- ----------------------------
DROP TABLE IF EXISTS `ban`;
CREATE TABLE `ban` (
  `id_product` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  PRIMARY KEY (`id_product`,`id_user`) USING BTREE,
  KEY `fk_ban_user` (`id_user`) USING BTREE,
  CONSTRAINT `fk_ban_product` FOREIGN KEY (`id_product`) REFERENCES `product` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fk_ban_user` FOREIGN KEY (`id_user`) REFERENCES `user` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of ban
-- ----------------------------
BEGIN;
INSERT INTO `ban` VALUES (69, 6);
COMMIT;

-- ----------------------------
-- Table structure for biddinglist
-- ----------------------------
DROP TABLE IF EXISTS `biddinglist`;
CREATE TABLE `biddinglist` (
  `id_product` int(11) NOT NULL,
  `time` datetime NOT NULL,
  `bidPrice` float DEFAULT NULL,
  `id_user` int(11) NOT NULL,
  PRIMARY KEY (`id_product`,`time`,`id_user`) USING BTREE,
  KEY `fk_aucHistory_user_idx` (`id_user`) USING BTREE,
  KEY `fk_aucHistory_product_idx` (`id_product`) USING BTREE,
  CONSTRAINT `fk_aucHistory_product` FOREIGN KEY (`id_product`) REFERENCES `product` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fk_aucHistory_user` FOREIGN KEY (`id_user`) REFERENCES `user` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of biddinglist
-- ----------------------------
BEGIN;
INSERT INTO `biddinglist` VALUES (63, '2020-01-06 02:51:59', 210000, 20);
INSERT INTO `biddinglist` VALUES (63, '2020-01-07 04:57:00', 220000, 6);
INSERT INTO `biddinglist` VALUES (67, '2020-01-06 05:18:36', 100100000, 24);
INSERT INTO `biddinglist` VALUES (68, '2020-01-06 05:17:27', 24980000, 24);
INSERT INTO `biddinglist` VALUES (72, '2020-01-06 05:16:48', 110000, 24);
INSERT INTO `biddinglist` VALUES (77, '2020-01-06 05:34:19', 1001000, 7);
INSERT INTO `biddinglist` VALUES (77, '2020-01-06 05:34:23', 1005000, 7);
INSERT INTO `biddinglist` VALUES (77, '2020-01-06 05:34:30', 1016000, 7);
INSERT INTO `biddinglist` VALUES (87, '2020-01-07 04:08:57', 210, 22);
INSERT INTO `biddinglist` VALUES (87, '2020-01-07 04:09:37', 220, 22);
COMMIT;

-- ----------------------------
-- Table structure for category
-- ----------------------------
DROP TABLE IF EXISTS `category`;
CREATE TABLE `category` (
  `status` int(1) NOT NULL DEFAULT '1',
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of category
-- ----------------------------
BEGIN;
INSERT INTO `category` VALUES (1, 1, 'Laptop');
INSERT INTO `category` VALUES (1, 2, 'Smartphone');
INSERT INTO `category` VALUES (1, 3, 'Tablet');
INSERT INTO `category` VALUES (1, 4, 'Camera');
INSERT INTO `category` VALUES (1, 5, 'Watch');
INSERT INTO `category` VALUES (1, 6, 'Car');
INSERT INTO `category` VALUES (1, 7, 'Clothes');
COMMIT;

-- ----------------------------
-- Table structure for image
-- ----------------------------
DROP TABLE IF EXISTS `image`;
CREATE TABLE `image` (
  `id_product` int(11) NOT NULL,
  `src` varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`id_product`,`src`) USING BTREE,
  KEY `fk_image_product_idx` (`id_product`) USING BTREE,
  CONSTRAINT `fk_image_product` FOREIGN KEY (`id_product`) REFERENCES `product` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of image
-- ----------------------------
BEGIN;
INSERT INTO `image` VALUES (61, '/uploads/20/2020-01-06-01-43-36-AnkK6y_simg_de2fe0_500x500_maxb.jpg');
INSERT INTO `image` VALUES (61, '/uploads/20/2020-01-06-01-43-36-OHBP3m_simg_de2fe0_500x500_maxb.jpg');
INSERT INTO `image` VALUES (61, '/uploads/20/2020-01-06-01-43-36-pbTkLZ_simg_de2fe0_500x500_maxb.jpg');
INSERT INTO `image` VALUES (61, '/uploads/20/2020-01-06-01-43-36-zo9cjs_simg_de2fe0_500x500_maxb.jpg');
INSERT INTO `image` VALUES (62, '/uploads/20/2020-01-06-02-43-45-gDlxBn_simg_de2fe0_500x500_maxb.jpg');
INSERT INTO `image` VALUES (62, '/uploads/20/2020-01-06-02-43-45-StT46F_simg_de2fe0_500x500_maxb.jpg');
INSERT INTO `image` VALUES (62, '/uploads/20/2020-01-06-02-43-45-W8bLwf_simg_de2fe0_500x500_maxb.jpg');
INSERT INTO `image` VALUES (63, '/uploads/20/2020-01-06-02-50-29-b5y5i9_simg_de2fe0_500x500_maxb.png');
INSERT INTO `image` VALUES (63, '/uploads/20/2020-01-06-02-50-29-PBrWhu_simg_de2fe0_500x500_maxb.jpg');
INSERT INTO `image` VALUES (63, '/uploads/20/2020-01-06-02-50-29-QjljsE_simg_de2fe0_500x500_maxb.jpg');
INSERT INTO `image` VALUES (64, '/uploads/20/2020-01-06-03-19-01-31VlewPD10L._AC_.jpg');
INSERT INTO `image` VALUES (64, '/uploads/20/2020-01-06-03-19-01-6347785_sd.jpg');
INSERT INTO `image` VALUES (64, '/uploads/20/2020-01-06-03-19-01-d605dac4-7b55-4f6b-840b-46058607fcfb.__CR0,0,300,300_PT0_SX300_V1___.jpg');
INSERT INTO `image` VALUES (65, '/uploads/20/2020-01-06-03-26-44-a1.jpg');
INSERT INTO `image` VALUES (65, '/uploads/20/2020-01-06-03-26-44-a2.jpg');
INSERT INTO `image` VALUES (65, '/uploads/20/2020-01-06-03-26-44-a3.jpg');
INSERT INTO `image` VALUES (66, '/uploads/7/2020-01-06-03-57-34-asus-rog-zephyrus-s-gx701gxr-hg142t_1_b9da84208c4c4c638bd9f45be0be115a_grande.jpg');
INSERT INTO `image` VALUES (66, '/uploads/7/2020-01-06-03-57-34-asus-rog-zephyrus-s-gx701gxr-hg142t_2_087d680a9b054f51b48321320b041d50_grande.jpg');
INSERT INTO `image` VALUES (66, '/uploads/7/2020-01-06-03-57-34-asus-rog-zephyrus-s-gx701gxr-hg142t_efe257079a8746839df666d34b1e1c2c_grande.jpg');
INSERT INTO `image` VALUES (67, '/uploads/7/2020-01-06-03-59-55-acer-predator-helios-300-ph315-52-78hh_1_ca30016ab24840f2bbfbe68687e28ed9_grande.jpg');
INSERT INTO `image` VALUES (67, '/uploads/7/2020-01-06-03-59-55-laptop-acer-predator-helios-300-ph315-52-78hh_2_4304b07c9c2f4fe3914be6fd688ec308_grande.jpg');
INSERT INTO `image` VALUES (67, '/uploads/7/2020-01-06-03-59-55-laptop-acer-predator-helios-300-ph315-52-78hh_9cac67d561d947ca855c4a8c4f2021b7_grande.jpg');
INSERT INTO `image` VALUES (68, '/uploads/7/2020-01-06-04-05-49-apple-macbook-air-2019-i5-16ghz-8gb-128gb-mvfm2sa-13-32-600x600.jpg');
INSERT INTO `image` VALUES (68, '/uploads/7/2020-01-06-04-05-49-IMG_3265.jpg');
INSERT INTO `image` VALUES (68, '/uploads/7/2020-01-06-04-05-49-MBA13_201810_GLD_npyr-v6.jpg');
INSERT INTO `image` VALUES (69, '/uploads/7/2020-01-06-04-09-11-vertu-signature-s-vang-khoi-full-kim-cuong-1.jpg');
INSERT INTO `image` VALUES (69, '/uploads/7/2020-01-06-04-09-11-vertu-signature-s-vang-khoi-full-kim-cuong-2.jpg');
INSERT INTO `image` VALUES (69, '/uploads/7/2020-01-06-04-09-11-vertu-signature-s-vang-khoi-full-kim-cuong-3.jpg');
INSERT INTO `image` VALUES (69, '/uploads/7/2020-01-06-04-11-48-vertu-signature-s-vang-khoi-full-kim-cuong-1.jpg');
INSERT INTO `image` VALUES (69, '/uploads/7/2020-01-06-04-11-48-vertu-signature-s-vang-khoi-full-kim-cuong-2.jpg');
INSERT INTO `image` VALUES (69, '/uploads/7/2020-01-06-04-11-48-vertu-signature-s-vang-khoi-full-kim-cuong-3.jpg');
INSERT INTO `image` VALUES (69, '/uploads/7/2020-01-06-04-13-12-vertu-signature-s-vang-khoi-full-kim-cuong-1.jpg');
INSERT INTO `image` VALUES (69, '/uploads/7/2020-01-06-04-13-12-vertu-signature-s-vang-khoi-full-kim-cuong-2.jpg');
INSERT INTO `image` VALUES (69, '/uploads/7/2020-01-06-04-13-12-vertu-signature-s-vang-khoi-full-kim-cuong-3.jpg');
INSERT INTO `image` VALUES (70, '/uploads/7/2020-01-06-04-16-42-bX49Wb_simg_de2fe0_500x500_maxb.png');
INSERT INTO `image` VALUES (70, '/uploads/7/2020-01-06-04-16-42-oaLTgj_simg_de2fe0_500x500_maxb.png');
INSERT INTO `image` VALUES (70, '/uploads/7/2020-01-06-04-16-42-vaYskt_simg_de2fe0_500x500_maxb.png');
INSERT INTO `image` VALUES (71, '/uploads/22/2020-01-06-04-18-56-5ZgSOS_simg_de2fe0_500x500_maxb.jpg');
INSERT INTO `image` VALUES (71, '/uploads/22/2020-01-06-04-18-56-aRfHeU_simg_de2fe0_500x500_maxb.jpg');
INSERT INTO `image` VALUES (71, '/uploads/22/2020-01-06-04-18-56-qpqYJX_simg_de2fe0_500x500_maxb.jpg');
INSERT INTO `image` VALUES (72, '/uploads/22/2020-01-06-04-21-56-4U9RH9_simg_de2fe0_500x500_maxb.jpg');
INSERT INTO `image` VALUES (72, '/uploads/22/2020-01-06-04-21-56-INXGth_simg_de2fe0_500x500_maxb.jpg');
INSERT INTO `image` VALUES (72, '/uploads/22/2020-01-06-04-21-56-kWJ6ka_simg_de2fe0_500x500_maxb.jpg');
INSERT INTO `image` VALUES (72, '/uploads/22/2020-01-06-04-21-56-Pnodlu_simg_de2fe0_500x500_maxb.jpg');
INSERT INTO `image` VALUES (73, '/uploads/22/2020-01-06-04-27-56-51z81k_simg_de2fe0_500x500_maxb.jpg');
INSERT INTO `image` VALUES (73, '/uploads/22/2020-01-06-04-27-56-8Z4j88_simg_de2fe0_500x500_maxb.jpg');
INSERT INTO `image` VALUES (73, '/uploads/22/2020-01-06-04-27-56-psO2Bj_simg_de2fe0_500x500_maxb.jpg');
INSERT INTO `image` VALUES (74, '/uploads/22/2020-01-06-04-30-19-0L2C3A_simg_de2fe0_500x500_maxb.jpg');
INSERT INTO `image` VALUES (74, '/uploads/22/2020-01-06-04-30-19-SjhK4Q_simg_de2fe0_500x500_maxb.jpg');
INSERT INTO `image` VALUES (74, '/uploads/22/2020-01-06-04-30-19-Uz04D7_simg_de2fe0_500x500_maxb.jpg');
INSERT INTO `image` VALUES (75, '/uploads/22/2020-01-06-04-34-16-cV0DyW_simg_de2fe0_500x500_maxb.jpg');
INSERT INTO `image` VALUES (75, '/uploads/22/2020-01-06-04-34-16-NdFH5W_simg_de2fe0_500x500_maxb.jpg');
INSERT INTO `image` VALUES (75, '/uploads/22/2020-01-06-04-34-16-p0RHNo_simg_de2fe0_500x500_maxb.jpg');
INSERT INTO `image` VALUES (76, '/uploads/23/2020-01-06-04-37-40-A0JTCv_simg_de2fe0_500x500_maxb.jpg');
INSERT INTO `image` VALUES (76, '/uploads/23/2020-01-06-04-37-40-CNgjUg_simg_de2fe0_500x500_maxb.jpg');
INSERT INTO `image` VALUES (76, '/uploads/23/2020-01-06-04-37-40-WdzC1O_simg_de2fe0_500x500_maxb.jpg');
INSERT INTO `image` VALUES (77, '/uploads/23/2020-01-06-04-42-02-08_1180x664-Innenraum_II.jpg');
INSERT INTO `image` VALUES (77, '/uploads/23/2020-01-06-04-42-02-161027_F20_S080_TCMP01_V010.0001.jpg');
INSERT INTO `image` VALUES (77, '/uploads/23/2020-01-06-04-42-02-563x317_AQ5_161004.jpg');
INSERT INTO `image` VALUES (78, '/uploads/23/2020-01-06-04-45-28-1920x1080-A_E-TRON_191020.jpg');
INSERT INTO `image` VALUES (78, '/uploads/23/2020-01-06-04-45-28-audi-e-tron-sportback-new-rendering.jpg');
INSERT INTO `image` VALUES (78, '/uploads/23/2020-01-06-04-45-28-CR-Cars-InlineHero-2021-Audi-e-tron-Sportback-f-11-19.jpg');
INSERT INTO `image` VALUES (79, '/uploads/23/2020-01-06-04-49-01-lamborghini-aventador-s-doc-nhat-viet-nam-2-1577952198466856797157.jpg');
INSERT INTO `image` VALUES (79, '/uploads/23/2020-01-06-04-49-01-lamborghini-aventador-s-doc-nhat-viet-nam-3-15779521985741373876132.jpg');
INSERT INTO `image` VALUES (79, '/uploads/23/2020-01-06-04-49-01-lamborghini-aventador-s-doc-nhat-viet-nam-4-157795219883769026392.jpg');
INSERT INTO `image` VALUES (80, '/uploads/23/2020-01-06-04-53-28-aventador-svj.jpg');
INSERT INTO `image` VALUES (80, '/uploads/23/2020-01-06-04-53-28-photo1535350754432-1535350754432618578691.jpg');
INSERT INTO `image` VALUES (80, '/uploads/23/2020-01-06-04-53-28-xehay-lamborghini-aventador-svj-240818-7.jpg');
INSERT INTO `image` VALUES (81, '/uploads/24/2020-01-06-04-57-55-bo-vest-xanh-den-1103-145-slide-products-5b31fbf1c1f38.jpg');
INSERT INTO `image` VALUES (81, '/uploads/24/2020-01-06-04-57-55-bo-vest-xanh-den-1103-145-slide-products-5b31fc6faeafd.jpg');
INSERT INTO `image` VALUES (81, '/uploads/24/2020-01-06-04-57-55-bo-vest-xanh-den-1103-145-slide-products-5b31fc6ff12c2.jpg');
INSERT INTO `image` VALUES (81, '/uploads/24/2020-01-06-04-57-55-bo-vest-xanh-den-1103-145-slide-products-5b31fcf904aba.jpg');
INSERT INTO `image` VALUES (82, '/uploads/24/2020-01-06-05-00-22-bo-vest-xam-1113-215-slide-products-5b32065d6a64e.jpg');
INSERT INTO `image` VALUES (82, '/uploads/24/2020-01-06-05-00-22-bo-vest-xam-1113-215-slide-products-5b32065dd7380.jpg');
INSERT INTO `image` VALUES (82, '/uploads/24/2020-01-06-05-00-22-bo-vest-xam-1113-215-slide-products-5b32068678565.jpg');
INSERT INTO `image` VALUES (83, '/uploads/24/2020-01-06-05-02-59-FzUc9E_simg_de2fe0_500x500_maxb.jpg');
INSERT INTO `image` VALUES (83, '/uploads/24/2020-01-06-05-02-59-jeYfg3_simg_de2fe0_500x500_maxb.jpg');
INSERT INTO `image` VALUES (83, '/uploads/24/2020-01-06-05-02-59-JT5m5H_simg_de2fe0_500x500_maxb.jpg');
INSERT INTO `image` VALUES (84, '/uploads/24/2020-01-06-05-05-10-51VYko_simg_de2fe0_500x500_maxb.jpg');
INSERT INTO `image` VALUES (84, '/uploads/24/2020-01-06-05-05-10-ixSuY6_simg_de2fe0_500x500_maxb.jpg');
INSERT INTO `image` VALUES (84, '/uploads/24/2020-01-06-05-05-10-xWtUxl_simg_de2fe0_500x500_maxb.jpg');
INSERT INTO `image` VALUES (85, '/uploads/24/2020-01-06-05-06-44-GqCLxV_simg_de2fe0_500x500_maxb.png');
INSERT INTO `image` VALUES (85, '/uploads/24/2020-01-06-05-06-44-LgmeTL_simg_de2fe0_500x500_maxb.png');
INSERT INTO `image` VALUES (85, '/uploads/24/2020-01-06-05-06-44-nLbDG1_simg_de2fe0_500x500_maxb.png');
INSERT INTO `image` VALUES (86, '/uploads/7/2020-01-07-02-59-52-2634201c16845b50e7325606660d4e70.jpg');
INSERT INTO `image` VALUES (86, '/uploads/7/2020-01-07-02-59-52-35b8661f773093580df41d058e2d6525.jpg');
INSERT INTO `image` VALUES (86, '/uploads/7/2020-01-07-02-59-52-97e082ffe293d9df5f2016685e589b06.jpg');
INSERT INTO `image` VALUES (87, '/uploads/23/2020-01-07-03-41-44-637002757583637894_samsung-galaxy-tab-s6-xanh-3.png');
INSERT INTO `image` VALUES (87, '/uploads/23/2020-01-07-03-41-44-637002757583807877_samsung-galaxy-tab-s6-xanh-1.png');
INSERT INTO `image` VALUES (87, '/uploads/23/2020-01-07-03-41-44-637002765551246478_samsung-galaxy-tab-s6-xanh-4.png');
INSERT INTO `image` VALUES (88, '/uploads/7/2020-01-07-03-52-47-636827999345684256_ipad-pro-11-wi-fi-4g-xam.png');
INSERT INTO `image` VALUES (88, '/uploads/7/2020-01-07-03-52-47-636827999346152175_ipad-pro-11-wi-fi-xam-1.png');
INSERT INTO `image` VALUES (88, '/uploads/7/2020-01-07-03-52-47-736827999345060364_ipad-pro-11-wi-fi-xam-3.png');
COMMIT;

-- ----------------------------
-- Table structure for parameter
-- ----------------------------
DROP TABLE IF EXISTS `parameter`;
CREATE TABLE `parameter` (
  `sell_product_cost` int(11) DEFAULT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Table structure for product
-- ----------------------------
DROP TABLE IF EXISTS `product`;
CREATE TABLE `product` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(5000) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `category` int(11) NOT NULL,
  `id_seller` int(11) DEFAULT NULL,
  `id_bidder` int(11) DEFAULT NULL,
  `bidStep` int(11) DEFAULT NULL,
  `currentPrice` int(11) NOT NULL,
  `buynowPrice` int(11) DEFAULT NULL,
  `startDate` datetime NOT NULL,
  `endDate` datetime NOT NULL,
  `details` varchar(5000) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `auctioned` int(11) DEFAULT '0',
  `isSentMailEndBid` int(1) DEFAULT '0',
  `startPrice` int(11) DEFAULT NULL,
  `requireReputation` int(1) DEFAULT '0',
  PRIMARY KEY (`id`) USING BTREE,
  KEY `fk_product_category_idx` (`category`) USING BTREE,
  KEY `fk_product_bidder_idx` (`id_bidder`) USING BTREE,
  KEY `fk_product_seller` (`id_seller`) USING BTREE,
  CONSTRAINT `fk_product_bidder` FOREIGN KEY (`id_bidder`) REFERENCES `user` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fk_product_category` FOREIGN KEY (`category`) REFERENCES `category` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fk_product_seller` FOREIGN KEY (`id_seller`) REFERENCES `user` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=89 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of product
-- ----------------------------
BEGIN;
INSERT INTO `product` VALUES (61, 'Máy Ảnh Sony DSC H300 - 20.1 Megapixel, Zoom 35x + Tặng thẻ 8G, bao da', 4, 20, NULL, 10000, 200000, 1000000, '2020-01-06 01:43:36', '2020-01-24 12:00:00', '<h3>TH&Ocirc;NG SỐ KỸ THUẬT</h3>\r\n<p><strong>Bộ cảm biến ảnh</strong> Super HAD CCD 20.1 MP</p>\r\n<p><strong>Tốc độ m&agrave;n trập</strong>&nbsp; iAuto (2 - 1/1500) / Chương tr&igrave;nh tự động (1 - 1/1500) / Thủ c&ocirc;ng (30 - 1/1500)</p>\r\n<p><strong>Tốc độ chụp</strong>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;chụp li&ecirc;n tiếp 0.8fps</p>\r\n<p><strong>K&iacute;ch thước m&agrave;n h&igrave;nh</strong>&nbsp;&nbsp;&nbsp;&nbsp; 3\"</p>\r\n<p><strong>Hỗ trợ định dạng</strong>&nbsp; &nbsp;JPEG</p>\r\n<p><strong>K&iacute;ch thước</strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Khoảng 127.5 x 89.0 x 91.7mm</p>\r\n<p><strong>Camera</strong>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;20.1MP</p>\r\n<p><strong>Phụ kiện đi k&egrave;m</strong>&nbsp; Th&acirc;n m&aacute;y, Pin AA (kh&ocirc;ng sạc), C&aacute;p, D&acirc;y đeo, Nắp đậy ống k&iacute;nh, Hướng dẫn sử dụng</p>', 0, 0, NULL, 0);
INSERT INTO `product` VALUES (62, 'Máy ảnh Canon Ixus 190 Black, Blue - 1794C002AA', 4, 20, NULL, 100000, 1000000, 5000000, '2020-01-06 02:43:45', '2020-01-29 01:01:00', '<h2><strong>Th&ocirc;ng số kỹ thuật</strong></h2>\r\n<p>&nbsp;</p>\r\n<p><strong>Bộ xử l&yacute; ảnh</strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; DIGIC 4+</p>\r\n<p><strong>Bộ cảm biến ảnh&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </strong></p>\r\n<p><strong>Điểm ảnh hiệu quả</strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Approx. 20.0 megapixels (aspect ratio: 4:3)</p>\r\n<p><strong>K&iacute;ch thước bộ cảm biến</strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Loại 1/2.3</p>\r\n<p><strong>Ống k&iacute;nh</strong></p>\r\n<p><strong>Chiều d&agrave;i ti&ecirc;u cự</strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 10x zoom:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 4.3 (W) - 43.0 (T) mm</p>\r\n<p>Tương đương phim 35mm: 24 (W) - 240 (T) mm</p>\r\n<p><strong>Dải lấy n&eacute;t</strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 1cm (0,4in.) - ở v&ocirc; cực (W), 1,0 m (3,3 ft) - ở v&ocirc; cực (T)</p>', 0, 0, NULL, 0);
INSERT INTO `product` VALUES (63, 'ĐIỆN THOẠI-VD5', 2, 20, 6, 10000, 220000, 600000, '2020-01-06 02:50:29', '2020-01-08 11:11:00', '<p><strong>(GI&Aacute; KH&Ocirc;NG TƯỞNG = 1/3 GI&Aacute; THỊ TRƯỜNG - DUY NHẤT TRONG NĂM)</strong></p>\r\n<p>_________________T&igrave;nh trạng sản phẩm_____________________</p>\r\n<p>M&Aacute;Y MỚI FULLBOX,&nbsp;SẢN PHẨM L&Agrave; H&Agrave;NG CH&Iacute;NH H&Atilde;NG. M&Aacute;Y L&Agrave; H&Agrave;NG ZIN</p>\r\n<p>GIAO H&Agrave;NG TO&Agrave;N QUỐC, KIỂM TRA H&Agrave;NG THOẢI M&Aacute;I MỚI THANH TO&Aacute;N</p>\r\n<p>KH&Ocirc;NG Đ&Uacute;NG MẪU M&Atilde; TRẢ LẠI LU&Ocirc;N NHA.</p>\r\n<p style=\"margin-bottom: 12.0pt;\"><em>Đ/C 506 Quang Trung p10 G&ograve; Vấp</em><br /><em>Lh : 0868959747 - 0909809928</em><br /><em>web : 2tekvn.net - loakeodidong.net</em></p>\r\n<p>M&aacute;y cực đẹp c&ograve;n như mới nh&igrave;n l&agrave; th&iacute;ch .Cam đoan zin nguy&ecirc;n bản.&nbsp;<br />* V&igrave; h&agrave;ng nhập khẩu trực tiếp n&ecirc;n gi&aacute; cả cạnh tranh nhất ạ !<br />- H&agrave;ng m&igrave;nh b&aacute;n ra l&agrave; h&agrave;ng zin . M&igrave;nh cam kết. N&oacute;i kh&ocirc;ng với h&agrave;ng k&eacute;m chất lượng.<br />- M&aacute;y được bảo h&agrave;nh 12 th&aacute;ng ( Bao test 07 Ng&agrave;y, trong 07 ng&agrave;y, nếu m&aacute;y lỗi, đổi m&aacute;y mới,&nbsp;<em>HỖ TRỢ BẢO H&Agrave;NH PHẦN CỨNG 3 TH&Aacute;NG, 6 TH&Aacute;NG, 12 TH&Aacute;NG</em>).</p>\r\n<p>* ĐẶC BIỆT tặng PHỤ KIỆN (FULLBOX: CỐC, C&Aacute;P, PIN)</p>', 0, 0, NULL, 0);
INSERT INTO `product` VALUES (64, 'Google - Pixel 3a with 64GB Memory Cell Phone (Unlocked) - Just Black - G020G', 2, 20, NULL, 100000, 10141000, 20000000, '2020-01-06 03:19:01', '2020-01-21 01:01:00', '<h3 class=\"a-spacing-mini\">More to love with Pixel 3a</h3>\r\n<p><span class=\"a-text-bold\">3 years of security and OS updates.&nbsp;</span>Keep your phone protected against the latest threats and performing at its best.*</p>\r\n<p><span class=\"a-text-bold\">Keep your data protected.&nbsp;</span>The custom-made Titan M security chip helps secure the operating system and your most sensitive data, like passwords.**</p>\r\n<p><span class=\"a-text-bold\">Keep more of what you love.&nbsp;</span>Use the Quick Switch Adapter to transfer your messages, contacts, and photos to your new device.***</p>\r\n<p>*Android version updates for at least 3 years from when the device first became available on the Google Store. See g.co/pixel/updates for details.**See g.co/pixel/security for additional security information.***Some third-party apps and data may not be transferred automatically. Visit g.co/pixel/help for information.</p>', 0, 0, NULL, 0);
INSERT INTO `product` VALUES (65, 'Luminox Original Navy Seal Men\'s Watch Yellow Dial 3005 - Authorized Dealer', 5, 20, NULL, 1234, 123123, 696969, '2020-01-06 03:26:44', '2020-01-16 02:22:00', '<p><em><strong>about us</strong></em></p>\r\n<p>My Gift Stop has been selling brand name gift merchandise online since 2002. We are authorized dealer for many of the brands we carry. We offer a large selection of fine wristwatches, shoes, sunglasses, jewelry, and other gift items at significant savings. Shop confidently with us. Customer satisfaction is a top priority for us. 70,000 plus positive feedback is a testament to that commitment.</p>\r\n<p><em><strong>payment</strong></em></p>\r\n<p>We accept PayPal. Immediate payment is required to purchase this item. We generally ship within 24 hours after the payment is cleared. Note, we prefer to ship to your confirmed PayPal address. If your ship to address is not confirmed, additional verification will be performed and WILL delay the processing of your order.</p>\r\n<p><strong><em>shipping</em></strong></p>\r\n<p>Domestic (Continental US)</p>\r\n<p>Please allow 1 to 2 days for processing.</p>\r\n<p>Standard Shipping Estimated Delivery Date at the top of the listing is an estimate calculated by eBay based on our shipping record. However, it is not a guaranteed that you will receive your order on this date. Actual delivery will vary by generally happens between 2 and 7 business days for Standard Shipping. If you need your order urgently, please choose Expedited or One-Day shipping.</p>\r\n<p><em><strong>International</strong></em></p>\r\n<p>International customers please click the Shipping and payments tab to see shipping rate to your country. We ship via DHL and UPS with 1 to 5 days transit time to most regions of the world. However, at times, at our discretion, we may opt for a different shipping method including, but not limited to, USPS EMS for various reasons.</p>', 0, 0, NULL, 0);
INSERT INTO `product` VALUES (66, 'Laptop ASUS ROG Zephyrus S GX701GXR-HG142T (i7-9750H)', 1, 7, NULL, 500000, 84990000, 300000000, '2020-01-06 03:57:34', '2020-01-08 12:02:00', '<h2><span style=\"color: #000000; font-size: 12pt;\"><strong>Th&ocirc;ng số ASUS ROG Zephyrus S GX701GXR-HG142T</strong></span></h2>\r\n<table id=\"tblGeneralAttribute\" class=\"table table-bordered\" style=\"box-sizing: border-box; border-collapse: collapse; border-spacing: 0px; width: 100%; min-width: 500px; max-width: 100%; margin-bottom: 20px; border: 1px solid #eeeeee; color: #333333; font-family: Roboto, sans-serif; font-size: 13px; line-height: 20px; background-color: #ffffff;\">\r\n<tbody style=\"box-sizing: border-box;\">\r\n<tr class=\"row-info\" style=\"box-sizing: border-box;\">\r\n<td style=\"box-sizing: border-box; padding: 8px; vertical-align: top; border: 1px solid #eeeeee; width: 16.4203%; background-color: #f7f7f7 !important;\"><span style=\"color: #000000;\">CPU</span></td>\r\n<td style=\"box-sizing: border-box; padding: 8px; vertical-align: top; border: 1px solid #eeeeee; width: 76.5797%;\"><span style=\"color: #000000;\">Intel Core&nbsp;i7-9750H&nbsp;2.6GHz up to 4.5GHz 12MB</span></td>\r\n</tr>\r\n<tr class=\"row-info\" style=\"box-sizing: border-box;\">\r\n<td style=\"box-sizing: border-box; padding: 8px; vertical-align: top; border: 1px solid #eeeeee; width: 16.4203%; background-color: #f7f7f7 !important;\"><span style=\"color: #000000;\">RAM</span></td>\r\n<td style=\"box-sizing: border-box; padding: 8px; vertical-align: top; border: 1px solid #eeeeee; width: 76.5797%;\"><span style=\"color: #000000;\">32GB DDR4 2666MHz</span></td>\r\n</tr>\r\n<tr class=\"row-info\" style=\"box-sizing: border-box;\">\r\n<td style=\"box-sizing: border-box; padding: 8px; vertical-align: top; border: 1px solid #eeeeee; width: 16.4203%; background-color: #f7f7f7 !important;\"><span style=\"color: #000000;\">&Ocirc;̉ cứng</span></td>\r\n<td style=\"box-sizing: border-box; padding: 8px; vertical-align: top; border: 1px solid #eeeeee; width: 76.5797%;\"><span style=\"color: #000000;\">1TB SSD PCIE G3X4</span></td>\r\n</tr>\r\n<tr class=\"row-info\" style=\"box-sizing: border-box;\">\r\n<td style=\"box-sizing: border-box; padding: 8px; vertical-align: top; border: 1px solid #eeeeee; width: 16.4203%; background-color: #f7f7f7 !important;\"><span style=\"color: #000000;\">Card đồ họa</span></td>\r\n<td style=\"box-sizing: border-box; padding: 8px; vertical-align: top; border: 1px solid #eeeeee; width: 76.5797%;\"><span style=\"color: #000000;\">NVIDIA GeForce RTX 2080-MaxQ 8GB GDDR6</span></td>\r\n</tr>\r\n<tr class=\"row-info\" style=\"box-sizing: border-box;\">\r\n<td style=\"box-sizing: border-box; padding: 8px; vertical-align: top; border: 1px solid #eeeeee; width: 16.4203%; background-color: #f7f7f7 !important;\"><span style=\"color: #000000;\">M&agrave;n h&igrave;nh</span></td>\r\n<td style=\"box-sizing: border-box; padding: 8px; vertical-align: top; border: 1px solid #eeeeee; width: 76.5797%;\"><span style=\"color: #000000;\">17.3\" FHD (1920 x 1080) IPS Non-Glare,&nbsp;<strong>300Hz</strong>&nbsp;G-Sync, 3ms, 300nits,&nbsp;Pantone&reg; Validated, NanoEdge</span></td>\r\n</tr>\r\n<tr class=\"row-info\" style=\"box-sizing: border-box;\">\r\n<td style=\"box-sizing: border-box; padding: 8px; vertical-align: top; border: 1px solid #eeeeee; width: 16.4203%; background-color: #f7f7f7 !important;\"><span style=\"color: #000000;\">Cổng giao tiếp</span></td>\r\n<td style=\"box-sizing: border-box; padding: 8px; vertical-align: top; border: 1px solid #eeeeee; width: 76.5797%;\"><span style=\"color: #000000;\">3x USB 3.1, 1x USB 3.1 Gen 1 Type-C, 1x USB 3.1 Gen 2 Type-C (DisplayPort&trade; 1.4 and Power Delivery), HDMI</span></td>\r\n</tr>\r\n<tr class=\"row-info\" style=\"box-sizing: border-box;\">\r\n<td style=\"box-sizing: border-box; padding: 8px; vertical-align: top; border: 1px solid #eeeeee; width: 16.4203%; background-color: #f7f7f7 !important;\"><span style=\"color: #000000;\">Audio</span></td>\r\n<td style=\"box-sizing: border-box; padding: 8px; vertical-align: top; border: 1px solid #eeeeee; width: 76.5797%;\"><span style=\"color: #000000;\">2 x 2.5W Speaker with Smart AMP Technology, Array Microphones</span></td>\r\n</tr>\r\n</tbody>\r\n</table>', 0, 0, NULL, 0);
INSERT INTO `product` VALUES (67, 'Laptop Acer Predator Helios 300 PH315-52-78HH (i7-9750H)', 1, 7, 24, 100000, 100100000, 1000000000, '2020-01-06 03:59:55', '2020-01-31 01:02:00', '<h2><span style=\"font-size: 12pt; color: #000000;\"><strong>Th&ocirc;ng số Acer Predator Helios 300 PH315-52-78HH</strong></span></h2>\r\n<table id=\"tblGeneralAttribute\" class=\"table table-bordered\" style=\"box-sizing: border-box; border-collapse: collapse; border-spacing: 0px; width: 100%; min-width: 500px; max-width: 100%; margin-bottom: 20px; border: 1px solid #eeeeee; color: #333333; font-family: Roboto, sans-serif; font-size: 13px; line-height: 20px; background-color: #ffffff;\">\r\n<tbody style=\"box-sizing: border-box;\">\r\n<tr class=\"row-info\" style=\"box-sizing: border-box;\">\r\n<td style=\"box-sizing: border-box; padding: 8px; vertical-align: top; border: 1px solid #eeeeee; width: 18.5209%; background-color: #f7f7f7 !important;\"><span style=\"color: #000000;\">CPU</span></td>\r\n<td style=\"box-sizing: border-box; padding: 8px; vertical-align: top; border: 1px solid #eeeeee; width: 78.4791%;\"><span style=\"color: #000000;\">Intel Core&nbsp;i7-9750H&nbsp;2.6GHz up to 4.5GHz 12MB</span></td>\r\n</tr>\r\n<tr class=\"row-info\" style=\"box-sizing: border-box;\">\r\n<td style=\"box-sizing: border-box; padding: 8px; vertical-align: top; border: 1px solid #eeeeee; width: 18.5209%; background-color: #f7f7f7 !important;\"><span style=\"color: #000000;\">RAM</span></td>\r\n<td style=\"box-sizing: border-box; padding: 8px; vertical-align: top; border: 1px solid #eeeeee; width: 78.4791%;\"><span style=\"color: #000000;\">8GB DDR4 2666MHz&nbsp;(2x SO-DIMM socket, up to 32GB SDRAM)</span></td>\r\n</tr>\r\n<tr class=\"row-info\" style=\"box-sizing: border-box;\">\r\n<td style=\"box-sizing: border-box; padding: 8px; vertical-align: top; border: 1px solid #eeeeee; width: 18.5209%; background-color: #f7f7f7 !important;\"><span style=\"color: #000000;\">&Ocirc;̉ cứng</span></td>\r\n<td style=\"box-sizing: border-box; padding: 8px; vertical-align: top; border: 1px solid #eeeeee; width: 78.4791%;\"><span style=\"color: #000000;\">256GB SSD M.2 PCIE G3X4</span></td>\r\n</tr>\r\n<tr class=\"row-info\" style=\"box-sizing: border-box;\">\r\n<td style=\"box-sizing: border-box; padding: 8px; vertical-align: top; border: 1px solid #eeeeee; width: 18.5209%; background-color: #f7f7f7 !important;\"><span style=\"color: #000000;\">Card đồ họa</span></td>\r\n<td style=\"box-sizing: border-box; padding: 8px; vertical-align: top; border: 1px solid #eeeeee; width: 78.4791%;\"><span style=\"color: #000000;\">NVIDIA GeForce GTX 1660Ti 6GB&nbsp;GDDR6</span></td>\r\n</tr>\r\n<tr class=\"row-info\" style=\"box-sizing: border-box;\">\r\n<td style=\"box-sizing: border-box; padding: 8px; vertical-align: top; border: 1px solid #eeeeee; width: 18.5209%; background-color: #f7f7f7 !important;\"><span style=\"color: #000000;\">M&agrave;n h&igrave;nh</span></td>\r\n<td style=\"box-sizing: border-box; padding: 8px; vertical-align: top; border: 1px solid #eeeeee; width: 78.4791%;\"><span style=\"color: #000000;\">15.6\" FHD (1920 x 1080) IPS,&nbsp;Anti-Glare,&nbsp;144Hz, 3ms, 300nits</span></td>\r\n</tr>\r\n<tr class=\"row-info\" style=\"box-sizing: border-box;\">\r\n<td style=\"box-sizing: border-box; padding: 8px; vertical-align: top; border: 1px solid #eeeeee; width: 18.5209%; background-color: #f7f7f7 !important;\"><span style=\"color: #000000;\">Cổng giao tiếp</span></td>\r\n<td style=\"box-sizing: border-box; padding: 8px; vertical-align: top; border: 1px solid #eeeeee; width: 78.4791%;\"><span style=\"color: #000000;\">2x USB 3.1, 1x USB 3.1 Gen 2, 1x USB Type C (Thunderbolt), Mini Display Port, HDMI</span></td>\r\n</tr>\r\n</tbody>\r\n</table>', 0, 0, NULL, 0);
INSERT INTO `product` VALUES (68, 'Macbook Air 13\'\' 2019 128GB SSD (Sliver, Gold, Space Gray) New 100%', 1, 7, 24, 100000, 24980000, 100000000, '2020-01-06 04:05:49', '2020-01-07 01:44:00', '<h2 class=\"ty-product-block__description-title\">M&ocirc; tả t&oacute;m tắt đặc t&iacute;nh</h2>\r\n<div class=\"ty-product-block__description\">\r\n<div>\r\n<ul>\r\n<li>Retina display with True Tone</li>\r\n<li>1.6GHz dual-core 8th-generation Intel Core i5 processor with Turbo Boost up to 3.6GHz</li>\r\n<li>8GB 2133MHz LPDDR3 memory</li>\r\n<li>128GB SSD storage1</li>\r\n<li>Intel UHD Graphics 617</li>\r\n<li>Touch ID</li>\r\n<li>Force Touch trackpad</li>\r\n<li>Two Thunderbolt 3 ports</li>\r\n</ul>\r\n<h2 class=\"promo-title\">Th&ocirc;ng tin khuyến mại v&agrave; bảo h&agrave;nh</h2>\r\n<ul>\r\n<li>New 100%</li>\r\n<li>Nguy&ecirc;n Seal , Chưa active g&oacute;i bảo h&agrave;nh Apple.</li>\r\n</ul>\r\n</div>\r\n</div>', 1, 1, NULL, 0);
INSERT INTO `product` VALUES (69, 'ĐIỆN THOẠI VERTU SIGNATURE S GOLD FULL DIAMOND', 2, 7, 6, 100000, 30200000, 999999999, '2020-01-06 04:13:12', '2020-03-03 03:03:00', '<p><strong>Si&ecirc;u phẩm Vertu Signature S Yellow Gold Full Pave Baguette Diamonds</strong> t&iacute;ch hợp nhiều dịch vụ chuy&ecirc;n biệt ph&ugrave; hợp với kh&aacute;ch h&agrave;ng l&agrave; doanh nh&acirc;n với khả năng bảo mật tuyệt đối, thời lượng pin l&ecirc;n đến 2 ng&agrave;y th&iacute;ch hợp cho c&aacute;c chuyến c&ocirc;ng t&aacute;c, c&aacute;c buổi họp - hội thảo k&eacute;o d&agrave;i. Ngo&agrave;i ra, c&aacute;c dịch vụ đối với người d&ugrave;ng Vertu được hỗ trợ tr&ecirc;n to&agrave;n thế giới.</p>', 0, 0, NULL, 0);
INSERT INTO `product` VALUES (70, 'Supper GOOOOD dragon watch', 5, 7, NULL, 10000, 300000, 990000, '2020-01-06 04:16:42', '2020-01-07 03:03:00', '<p><strong>✅</strong>&nbsp;Shop cam kết sản phẩm giống h&igrave;nh 100%.</p>\r\n<p><strong>✅&nbsp;</strong>Ship COD to&agrave;n quốc (Giao h&agrave;ng v&agrave; thu tiền tận địa chỉ kh&aacute;ch h&agrave;ng).</p>\r\n<p><strong>✅ 100% ĐƯỢC KIỂM TRA H&Agrave;NG TRƯỚC KHI NHẬN</strong></p>\r\n<p><strong>✅&nbsp;</strong>C&oacute; quyền từ chối nhận h&agrave;ng nến kiểm tra h&agrave;ng kh&ocirc;ng giống hoặc bị lỗi</p>\r\n<p><strong>✅&nbsp;</strong>Thời&nbsp; gian giao h&agrave;ng nhanh ch&oacute;ng</p>', 1, 1, NULL, 0);
INSERT INTO `product` VALUES (71, 'Cute pink watch', 5, 22, NULL, 10000, 300000, 600000, '2020-01-06 04:18:56', '2020-01-11 06:02:00', '<h4>THUỘC T&Iacute;NH SẢN PHẨM</h4>\r\n<ul>\r\n<li><strong>Loại d&acirc;y:</strong>&nbsp;D&acirc;y da.</li>\r\n<li><strong>Mặt đồng hồ:</strong>&nbsp;Mặt tr&ograve;n.</li>\r\n<li><strong>Loại m&aacute;y:</strong>&nbsp;Pin (Quartz).</li>\r\n<li><strong>Đường k&iacute;nh mặt:</strong>&nbsp;32mm.</li>\r\n<li><strong>Độ chịu nước:</strong>&nbsp;3 ATM.</li>\r\n<li><strong>Kiểu kh&oacute;a:</strong>&nbsp;Kh&oacute;a c&agrave;i.</li>\r\n<li><strong>Giới t&iacute;nh:</strong>&nbsp;Nữ.</li>\r\n<li><strong>Chất liệu mặt k&iacute;nh:</strong>&nbsp;K&iacute;nh cứng.</li>\r\n<li><strong>Xuất xứ:</strong>&nbsp;Hồng K&ocirc;ng.</li>\r\n</ul>\r\n<p>&nbsp;</p>\r\n<p><em>ĐỒNG HỒ CUTE SI&Ecirc;U CẤP V&Ocirc; ĐỊCH VŨ TRỤ</em></p>', 0, 0, NULL, 0);
INSERT INTO `product` VALUES (72, 'Gold shiny watch', 5, 22, 24, 10000, 110000, 300000, '2020-01-06 04:21:56', '2020-01-09 01:01:00', '<h4>THUỘC T&Iacute;NH SẢN PHẨM</h4>\r\n<ul>\r\n<li><strong>Chất liệu mặt k&iacute;nh:</strong>&nbsp;K&iacute;nh cứng.</li>\r\n<li><strong>Kiểu kh&oacute;a:</strong>&nbsp;Kh&oacute;a bấm.</li>\r\n<li><strong>Mặt đồng hồ:</strong>&nbsp;Mặt tr&ograve;n.</li>\r\n<li><strong>Độ chịu nước:</strong>&nbsp;3 ATM.</li>\r\n<li><strong>Giới t&iacute;nh:</strong>&nbsp;Nữ.</li>\r\n<li><strong>Loại m&aacute;y:</strong>&nbsp;Pin (Quartz).</li>\r\n<li><strong>Loại d&acirc;y:</strong>&nbsp;D&acirc;y kim loại.</li>\r\n<li><strong>Đường k&iacute;nh mặt:</strong>&nbsp;31mm.</li>\r\n<li><strong>Xuất xứ:</strong>&nbsp;Hồng K&ocirc;ng.</li>\r\n</ul>\r\n<p>&nbsp;</p>\r\n<p>So lovelyyyyyyyyy!!!!</p>', 0, 0, NULL, 0);
INSERT INTO `product` VALUES (73, 'Black watch for girls', 5, 22, NULL, 100, 10000, 500000, '2020-01-06 04:27:56', '2020-01-10 01:01:00', '<h4>THUỘC T&Iacute;NH SẢN PHẨM</h4>\r\n<ul>\r\n<li><strong>Loại d&acirc;y:</strong>&nbsp;D&acirc;y da.</li>\r\n<li><strong>Mặt đồng hồ:</strong>&nbsp;Mặt tr&ograve;n.</li>\r\n<li><strong>Loại m&aacute;y:</strong>&nbsp;Pin (Quartz).</li>\r\n<li><strong>Đường k&iacute;nh mặt:</strong>&nbsp;36mm.</li>\r\n<li><strong>Độ chịu nước:</strong>&nbsp;3 ATM.</li>\r\n<li><strong>Kiểu kh&oacute;a:</strong>&nbsp;Kh&oacute;a c&agrave;i.</li>\r\n<li><strong>Giới t&iacute;nh:</strong>&nbsp;Nữ.</li>\r\n<li><strong>Chất liệu mặt k&iacute;nh:</strong>&nbsp;K&iacute;nh cứng.</li>\r\n<li><strong>Xuất xứ:</strong>&nbsp;Hồng K&ocirc;ng.</li>\r\n</ul>', 0, 0, NULL, 0);
INSERT INTO `product` VALUES (74, 'Camera Cute', 4, 22, NULL, 10000, 10000, 500000, '2020-01-06 04:30:19', '2020-01-06 11:11:00', '<h4>CHI TIẾT SẢN PHẨM</h4>\r\n<div>Cảm biến h&igrave;nh ảnh: GC0308<br />M&agrave;n h&igrave;nh hiển thị: 2.0 inch IPS độ n&eacute;t cao full-view m&agrave;n h&igrave;nh LCD<br />Ống k&iacute;nh: ống k&iacute;nh cố định, g&oacute;c 100 độ<br />Phương tiện lưu trữ: thu nhỏ thẻ TF, tối đa 32 GB<br />H&igrave;nh ảnh định dạng: JPG<br />M&aacute;y ảnh định dạng: JPEG<br />Độ ph&acirc;n giải Video: FULL HD 1920X1080<br />Chụp ảnh độ ph&acirc;n giải: 3264X2448<br />TFT M&agrave;n H&igrave;nh Hiển Thị: M&agrave;n H&igrave;nh 2.0 inch (720*320)<br />K&iacute;ch thước sản phẩm: 80X45X40mm</div>', 1, 1, NULL, 0);
INSERT INTO `product` VALUES (75, 'iPhone 4', 2, 22, NULL, 1000, 10000, 100000, '2020-01-06 04:34:16', '2020-01-06 07:55:00', '<h2>_________________T&igrave;nh trạng sản phẩm_____________________</h2>\r\n<h4>M&Aacute;Y MỚI FULLBOX,&nbsp;SẢN PHẨM L&Agrave; H&Agrave;NG CH&Iacute;NH H&Atilde;NG. M&Aacute;Y L&Agrave; H&Agrave;NG ZIN</h4>\r\n<p><strong>GIAO H&Agrave;NG TO&Agrave;N QUỐC, KIỂM TRA H&Agrave;NG THOẢI M&Aacute;I MỚI THANH TO&Aacute;N</strong></p>\r\n<p><strong>KH&Ocirc;NG Đ&Uacute;NG MẪU M&Atilde; TRẢ LẠI LU&Ocirc;N NHA.</strong></p>\r\n<p><strong>Đ/C 506 Quang Trung p10 G&ograve; Vấp</strong><br /><strong>Lh : 0868959747 - 0909809928</strong><br /><strong>web : 2tekvn.net - loakeodidong.net</strong></p>\r\n<p>M&aacute;y cực đẹp c&ograve;n như mới nh&igrave;n l&agrave; th&iacute;ch .Cam đoan zin nguy&ecirc;n bản.&nbsp;<br />* V&igrave; h&agrave;ng nhập khẩu trực tiếp n&ecirc;n gi&aacute; cả cạnh tranh nhất ạ !<br />- H&agrave;ng m&igrave;nh b&aacute;n ra l&agrave; h&agrave;ng zin . M&igrave;nh cam kết. N&oacute;i kh&ocirc;ng với h&agrave;ng k&eacute;m chất lượng.<br />- M&aacute;y được bảo h&agrave;nh 12 th&aacute;ng ( Bao test 07 Ng&agrave;y, trong 07 ng&agrave;y, nếu m&aacute;y lỗi, đổi m&aacute;y mới,&nbsp;<em>HỖ TRỢ BẢO H&Agrave;NH PHẦN CỨNG 3 TH&Aacute;NG, 6 TH&Aacute;NG, 12 TH&Aacute;NG</em>).</p>\r\n<p>* ĐẶC BIỆT tặng PHỤ KIỆN (FULLBOX: CỐC, C&Aacute;P, PIN)</p>', 1, 1, NULL, 0);
INSERT INTO `product` VALUES (76, 'House Camera', 4, 23, NULL, 10000, 220000, 5550000, '2020-01-06 04:37:40', '2020-01-06 07:55:00', '<h4>THUỘC T&Iacute;NH SẢN PHẨM</h4>\r\n<ul>\r\n<li><strong>Bảo h&agrave;nh:</strong>&nbsp;3 th&aacute;ng.</li>\r\n<li><strong>H&atilde;ng sản xuất:</strong>&nbsp;H&atilde;ng kh&aacute;c.</li>\r\n<li><strong>Ph&acirc;n loại camera:</strong>&nbsp;Camera IP.</li>\r\n<li><strong>Phương thức bảo h&agrave;nh:</strong>&nbsp;Bằng tem bảo h&agrave;nh.</li>\r\n</ul>', 1, 1, NULL, 0);
INSERT INTO `product` VALUES (77, 'Audi Q5', 6, 23, 7, 1000, 1016000, 10000000, '2020-01-06 04:42:02', '2020-01-07 07:05:00', '<h1 class=\"nm-el-hdl nm-el-hdl-01 nm-at-hdl-b\">Created for almost any landscape. The new Audi Q5.</h1>\r\n<p class=\"nm-el-pg nm-el-pg-01\">Don\'t leave anything to chance. Whether it comes to comfort, style, or dynamics, the Audi Q5 will win you over from the first moment. Expressive appearance, powerful drive, and pioneering technology. Your options are just as diverse. Every day anew &ndash; with the Audi Q5.</p>\r\n<p class=\"nm-el-pg nm-el-pg-01\">&nbsp;</p>\r\n<p class=\"nm-el-pg nm-el-pg-01\"><strong class=\"nm-el-hdl nm-el-hdl-03 nm-at-hdl-b\">Designed to move.</strong></p>\r\n<p class=\"nm-el-pg nm-el-pg-02\">Every detail of the Audi Q5 features the characteristic Q design and embodies momentum and superiority. This includes the distinctive bonnet and the gently sloping roof line as well as the outer mirrors mounted onto the shoulder and the narrow window line.</p>\r\n<p class=\"nm-el-pg nm-el-pg-01\"><a class=\"nm-layerLink nm-el-lk nm-el-lk-01 nm-at-lk-b nm-el-lk-ast \" title=\"More on the design of the new Audi Q5\" href=\"http://www.audi.vn/sea/web/vnen/models/q5/q5/layer/design.html\">More on the design of the new Audi Q5</a></p>', 0, 0, NULL, 0);
INSERT INTO `product` VALUES (78, 'Audi e-tron Sportback', 6, 23, NULL, 100, 1000000, 55555500, '2020-01-06 04:45:28', '2020-01-07 12:05:00', '<div class=\"gbp-h3 gbp-h3--n gbp-intro--copy\"><strong>Get ready for a thrilling performance!</strong> The all-electric Audi e-tron Sportback combines action-packed driving pleasure with exciting design, making it an electric vehicle that promises pure emotion.</div>', 0, 0, NULL, 0);
INSERT INTO `product` VALUES (79, 'Lamborghini Aventador S độc nhất Việt Nam', 6, 23, NULL, 100000, 20000000, 999999999, '2020-01-06 04:49:01', '2020-01-20 09:09:00', '<p class=\"\">Ng&agrave;y 2/1, đại gia Ho&agrave;ng Kim Kh&aacute;nh đ&atilde; quyết định mang si&ecirc;u b&ograve; <strong>Lamborghini Aventador S</strong> ra đường sau một thời gian vắng b&oacute;ng. Ngoại h&igrave;nh của chiếc Aventador S l&agrave; sự thay đổi lớn nhất trong lần xuất hiện n&agrave;y.</p>\r\n<p class=\"\">Cụ thể, phần th&acirc;n xe đ&atilde; được kho&aacute;c l&ecirc;n lớp decal mới mang phong c&aacute;ch xe đua với 3 t&ocirc;ng m&agrave;u v&agrave;ng, trắng v&agrave; đen đều ở dạng nh&aacute;m. Phần v&ograve;m b&aacute;nh trước xuất hiện th&ecirc;m decal số \"78\". Nhiều chi tiết bằng sợi carbon được bổ sung như cản trước, nắp capo, ốp h&ocirc;ng v&agrave; c&aacute;nh gi&oacute; cố định ph&iacute;a sau.</p>', 0, 0, NULL, 0);
INSERT INTO `product` VALUES (80, 'LAMBORGHINI AVENTADOR SVJ', 6, 23, NULL, 100000, 10000000, 999999999, '2020-01-06 04:53:28', '3000-03-03 03:31:00', '<h2><strong>OVERVIEW</strong></h2>\r\n<p>&nbsp;</p>\r\n<p>The future is unknown. It is a journey, an adventure. And above all, it is a challenge.<br />Lamborghini has never shied away from challenges, which is precisely why it created the new Aventador SVJ. To combine cutting-edge technology with extraordinary design, without ever coming to compromises.<br />In a future driven by technology, it&rsquo;s easy to lose track of emotions. But in the future we are shaping, real emotions won&rsquo;t be left behind. Because at the wheel, there will always be a person.<br />Aventador SVJ. Real emotions shape the future.</p>\r\n<p>&nbsp;</p>\r\n<h2><strong>EMOTION</strong></h2>\r\n<p>&nbsp;</p>\r\n<p>The Lamborghini driving experience isn&rsquo;t easy to put into words: a stupefying mix of exceptional performance, groundbreaking technology and perfect aerodynamics.<br />Yet there is one more element that is utterly indispensable for the future we envision: real emotions.&nbsp;<br />The vehicle&rsquo;s impeccable dynamics and the outstanding performance of the new 770 CV naturally-aspirated V12 engine combine with the mastery of a superior design, in which prized and exclusive materials forge a symbiosis with the car\'s ultra-lightweight body.<br />Because the future we have in mind can only exist when uncompromising aesthetic perfection meets unparalleled performance and thrill-inducing aerodynamics.</p>', 0, 0, NULL, 0);
INSERT INTO `product` VALUES (81, 'Vest Gile', 7, 24, NULL, 10000, 100000, 3000000, '2020-01-06 04:57:55', '2020-03-03 01:01:00', '<div class=\"ps-stock\">T&igrave;nh trạng:&nbsp;C&ograve;n h&agrave;ng</div>\r\n<div class=\"sep\">&nbsp;</div>\r\n<div class=\"row select-wraps product-attr\">\r\n<div class=\"col-md-12\">\r\n<p>Danh mục: Clothes</p>\r\n</div>\r\n</div>\r\n<div class=\"row select-wraps product-attr\">\r\n<div class=\"col-md-12\"><strong>Điểm nổi bật:</strong>\r\n<p>- Chất liệu vải &Acirc;u cao cấp nhập từ H&agrave;n Quốc, c&oacute; độ co gi&atilde;n nhẹ<br />- Kiểu d&aacute;ng 1 n&uacute;t trẻ trung, ve &aacute;o nhỏ thanh lịch, hiện đại<br />- Form slimfit H&agrave;n Quốc t&ocirc;n d&aacute;ng, thời thượng<br />- Bộ vest gồm &Aacute;o vest, &Aacute;o Gile v&agrave; Quần &acirc;u</p>\r\n</div>\r\n</div>', 0, 0, NULL, 0);
INSERT INTO `product` VALUES (82, 'Gray vest', 7, 24, NULL, 1000, 200000, 5000000, '2020-01-06 05:00:22', '2020-03-03 01:11:00', '<p><strong>Điểm nổi bật:</strong></p>\r\n<p>- Chất liệu vải &Acirc;u cao cấp nhập từ H&agrave;n Quốc, c&oacute; độ co gi&atilde;n nhẹ<br />- Ve &aacute;o nhỏ, phối t&uacute;i ngực v&agrave; 2 t&uacute;i trước chuẩn &Acirc;u<br />- Kiểu d&aacute;ng 1 n&uacute;t thanh lịch<br />- Form slimfit H&agrave;n Quốc t&ocirc;n d&aacute;ng, thời thượng<br />- Bộ vest gồm &Aacute;o vest, Gile v&agrave; Quần &acirc;u</p>', 0, 0, NULL, 0);
INSERT INTO `product` VALUES (83, 'Dress', 7, 24, NULL, 10000, 200000, 5000000, '2020-01-06 05:02:59', '2020-01-18 03:03:00', '<h4><em><sup>Đ&acirc;y l&agrave; loại vải c&oacute; độ bền m&agrave;u rất cao, chống k&eacute;o d&atilde;n v&agrave; x&ocirc; dạt, tuy nhi&ecirc;n khả năng chống nhăn v&agrave; thấm h&uacute;t mồ h&ocirc;i rất k&eacute;m do c&oacute; th&agrave;nh phần polyester kh&aacute; cao do vậy khi nhận h&agrave;ng kh&aacute;ch nhớ giặt v&agrave; ủi qua 1 lần đảm bảo sẽ rất rất đẹp chẳng kh&aacute;c g&igrave; h&agrave;ng shop 200k 300k đ&acirc;u ạ. Chất vải n&agrave;y do b&ecirc;n shop em tự đi chọn vải v&agrave; gia c&ocirc;ng số lượng lớn để tối ưu chi ph&iacute; n&ecirc;n kh&aacute;ch b&ecirc;n em cứ y&ecirc;n t&acirc;m ạ.</sup></em></h4>\r\n<h4><em><sup>C&oacute; thể n&oacute;i, thời gian gần đ&acirc;y, xu hướng qu&agrave; tặng cho bạn b&egrave; người th&acirc;n cũng c&oacute; phần thay đổi so với trước. Nếu khi xưa, những c&aacute;nh thiệp mang lại y&ecirc;u thương, th&igrave; b&acirc;y giờ, xu hướng tặng qu&agrave; mang t&iacute;nh thực tế lại thu h&uacute;t giới trẻ. Với những người th&acirc;n y&ecirc;u, tặng chiếc đầm thời trang gi&uacute;p cho bạn cảm gi&aacute;c m&igrave;nh lu&ocirc;n ở b&ecirc;n người ấy mỗi ng&agrave;y. Để t&igrave;m mua được những chiếc đầm cao cấp c&aacute;c bạn c&oacute; thể gh&eacute; qua gian h&agrave;ng của ch&uacute;ng t&ocirc;i với c&aacute;c kiểu&nbsp;đầm&nbsp;cập nhật li&ecirc;n tục, th&ocirc;ng tin chất liệu sản phẩm r&otilde; r&agrave;ng, gi&aacute; cả kh&ocirc;ng thể rẻ hơn. N&agrave;o, c&ugrave;ng ch&uacute;ng t&ocirc;i lựa chọn m&oacute;n qu&agrave; &yacute; nghĩa n&agrave;y cho người th&acirc;n y&ecirc;u của bạn nh&eacute;!</sup></em></h4>', 0, 0, NULL, 0);
INSERT INTO `product` VALUES (84, 'Skirt', 7, 24, NULL, 10000, 20000, 300000, '2020-01-06 05:05:10', '2021-03-03 01:01:00', '<div class=\"attrs-block\">\r\n<h4>THUỘC T&Iacute;NH SẢN PHẨM</h4>\r\n<ul>\r\n<li><strong>Chất vải:</strong>&nbsp;Kaki.</li>\r\n<li><strong>Chiều d&agrave;i v&aacute;y:</strong>&nbsp;Ngang gối.</li>\r\n<li><strong>Họa tiết:</strong>&nbsp;Trơn.</li>\r\n<li><strong>Phong c&aacute;ch:</strong>&nbsp;Dễ thương.</li>\r\n</ul>\r\n</div>\r\n<div class=\"details-block\">\r\n<h4>CHI TIẾT SẢN PHẨM</h4>\r\n<div>From dưới 55kg Size M, L</div>\r\n</div>', 0, 0, NULL, 0);
INSERT INTO `product` VALUES (85, 'Simple LOVEE', 7, 24, NULL, 100000, 600000, 8000000, '2020-01-06 05:06:44', '3000-05-05 05:05:00', '<h4>CHI TIẾT SẢN PHẨM</h4>\r\n<div>\r\n<p><strong><em>Ch&acirc;n v&aacute;y X&ograve;e cao cấp</em></strong></p>\r\n<p><strong>M&atilde; sản phẩm: VX-AP08</strong></p>\r\n<p>-Ch&acirc;n v&aacute;y x&ograve;e cao cấp k&egrave;m quần liền b&ecirc;n trong.</p>\r\n<p>&nbsp;- Thiết kế chuẩn n&ecirc;n khi mặc l&ecirc;n giống h&igrave;nh mẫu, che khuyết điểm d&aacute;ng tốt</p>\r\n<p>- Kiểu d&aacute;ng&nbsp; nhẹ nh&agrave;ng c&ograve;n gi&uacute;p thu nhỏ v&ograve;ng 2 v&agrave; khắc phục nhược điểm v&ograve;ng 3 khi&ecirc;m tốn cho người mặc.</p>\r\n<p>- Chất liệu cao cấp, tạo form d&aacute;ng chuẩn, ph&ugrave; hợp với mọi v&oacute;c d&aacute;ng.</p>\r\n<p>&nbsp;- Kh&ocirc;ng chỉ ph&ugrave; hợp với phong c&aacute;ch c&ocirc;ng sở thanh lịch, m&agrave; c&ograve;n gi&uacute;p bạn g&aacute;i th&ecirc;m trẻ trung, năng động, s&agrave;nh điệu mỗi khi xuống phố</p>\r\n<p>-Chất liệu vải ph&ugrave; hợp cho những t&iacute;n đồ thời trang th&iacute;ch sự thanh lịch, nữ t&iacute;nh</p>\r\n<p>-Thiết kế đơn giản, kh&ocirc;ng cầu kỳ nhưng vẫn tạo được form d&aacute;ng chuẩn, dịu d&agrave;ng, nữ t&iacute;nh, năng động, trẻ trung cho bạn g&aacute;i. Với ch&acirc;n v&aacute;y x&ograve;e cao cấp dễ d&agrave;ng kết hợp với &aacute;o sơ mi, &aacute;o kiểu,&aacute;o voan, sơ mi c&aacute;ch điệu, &aacute;o thun.... để đến c&ocirc;ng sở, đi học, đi chơi, .....</p>\r\n<p>-Dễ d&agrave;ng mix với nhiều phụ kiện thời trang xinh xắn: Mắt k&iacute;nh, gi&agrave;y cao g&oacute;t,sandal.&nbsp;giầy thể thao, &nbsp;t&uacute;i x&aacute;ch thời trang....</p>\r\n<p>- Ch&acirc;n v&aacute;y c&oacute; 5 size: K&iacute;ch thước: S, M, L, XL, XXL</p>\r\n</div>', 0, 0, NULL, 0);
INSERT INTO `product` VALUES (86, 'Surface Pro 6 ( Pro 2018 ) | Core i5 / RAM 8GB / SSD 128GB', 3, 7, NULL, 10, 100, 5000, '2020-01-07 02:59:52', '2020-01-17 01:01:00', '<h3 class=\"line-top\">Th&ocirc;ng tin sản phẩm v&agrave; bảo h&agrave;nh</h3>\r\n<div class=\"block_note_txt\">\r\n<ul>\r\n<li>\r\n<ul>\r\n<li><strong>M&Aacute;Y MỚI NEW SEAL 100%</strong></li>\r\n</ul>\r\n<ul>\r\n<li><strong>BẢO H&Agrave;NH 1 ĐỔI 1 TRONG 12 TH&Aacute;NG&nbsp;</strong><em>(<a href=\"https://vuongkhang.com/page/chinh-sach-bao-hanh.html\" target=\"_blank\" rel=\"noopener\">Xem chi tiết</a>)</em></li>\r\n<li><strong>MIỄN PH&Iacute;</strong>&nbsp;vận chuyển to&agrave;n quốc - Ship H&agrave; Nội, Hồ Ch&iacute; Minh chỉ trong&nbsp;<strong>30 ph&uacute;t</strong></li>\r\n<li><strong>Hỗ trợ c&agrave;i đặt phần mềm trọn đời</strong></li>\r\n<li><strong>Hỗ trợ từ xa qua&nbsp;TeamViewer&nbsp;</strong><em>(trong giờ h&agrave;nh ch&iacute;nh)</em></li>\r\n<li><strong>Phụ kiện:&nbsp;M&aacute;y, Sạc, Full Box</strong></li>\r\n</ul>\r\n</li>\r\n</ul>\r\n</div>\r\n<div class=\"block_note_txt\">Trong kho:&nbsp;<span class=\"kho kho-0\">C&ograve;n h&agrave;ng</span></div>', 0, 0, 100, 0);
INSERT INTO `product` VALUES (87, 'Samsung Galaxy Tab S6 (2019)', 3, 23, 22, 10, 220, 5000, '2020-01-07 03:41:44', '2020-03-03 01:01:00', '<div class=\"fs-dttop\">\r\n<h2>Th&ocirc;ng số kỹ thuật</h2>\r\n</div>\r\n<div class=\"fs-tsright\">\r\n<ul>\r\n<li><label>M&agrave;n h&igrave;nh :</label>10.5 inchs, 2560 x 1600 pixels</li>\r\n<li><label>Camera trước :</label>8.0 MP</li>\r\n<li><label>Camera sau :</label>Ch&iacute;nh 13 MP &amp; Phụ 5 MP</li>\r\n<li><label>CPU :</label>Qualcomm Snapdragon 855 8 nh&acirc;n</li>\r\n<li><label>GPU :</label>Adreno 640</li>\r\n<li><label>RAM :</label>6 GB</li>\r\n<li><label>Bộ nhớ trong :</label>128 GB</li>\r\n<li><label>Kết nối :</label>Wi-Fi: Wi-Fi 802.11 a/b/g/n, dual-band, Wi-Fi Direct, hotspot, Bluetooth: 5.0, A2DP, LE</li>\r\n<li><label>Hệ điều h&agrave;nh :</label>Android 9.0 (Pie)</li>\r\n<li><label>Xuất xứ :</label>Việt Nam</li>\r\n<li><label>Năm sản xuất :</label>2019</li>\r\n</ul>\r\n</div>', 0, 0, 200, 0);
INSERT INTO `product` VALUES (88, 'iPad Pro 11 WI-FI 4G 64GB', 3, 7, NULL, 10, 100, 5000, '2020-01-07 03:52:47', '2020-01-23 01:01:00', '<div class=\"fs-dttop\">\r\n<h2>Th&ocirc;ng số kỹ thuật</h2>\r\n</div>\r\n<div class=\"fs-tsright\">\r\n<ul>\r\n<li><label>M&agrave;n h&igrave;nh :</label>11.0 inches, 2388 x 1668 Pixels</li>\r\n<li><label>Camera trước :</label>7.0 MP</li>\r\n<li><label>Camera sau :</label>12.0 MP</li>\r\n<li><label>CPU :</label>Apple A12X Bionic (7 nm)</li>\r\n<li><label>GPU :</label>Apple GPU (7-core graphics)</li>\r\n<li><label>RAM :</label>4 GB</li>\r\n<li><label>Bộ nhớ trong :</label>64 GB</li>\r\n<li><label>Kết nối :</label>Wi-Fi: 802.11 a/b/g/n/ac, Bluetooth: v5.0</li>\r\n<li><label>Hệ điều h&agrave;nh :</label>iOS 12</li>\r\n</ul>\r\n</div>', 0, 0, 100, 1);
COMMIT;

-- ----------------------------
-- Table structure for review
-- ----------------------------
DROP TABLE IF EXISTS `review`;
CREATE TABLE `review` (
  `id_user` int(11) NOT NULL,
  `review` varchar(1000) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `time` datetime DEFAULT NULL,
  `reviewer` int(11) NOT NULL,
  `id_product` int(11) NOT NULL,
  `marks` int(1) DEFAULT NULL,
  PRIMARY KEY (`id_user`,`reviewer`,`id_product`) USING BTREE,
  KEY `fk_review_reviewer_idx` (`reviewer`) USING BTREE,
  KEY `fk_review_product` (`id_product`) USING BTREE,
  CONSTRAINT `fk_review_product` FOREIGN KEY (`id_product`) REFERENCES `product` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fk_review_user` FOREIGN KEY (`id_user`) REFERENCES `user` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fk_reviewer_user` FOREIGN KEY (`reviewer`) REFERENCES `user` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `status` bit(1) DEFAULT b'1',
  `fullname` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `phone` varchar(11) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `email` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `joindate` datetime DEFAULT NULL,
  `username` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `password` varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `gender` int(1) NOT NULL,
  `permission` int(1) NOT NULL DEFAULT '0',
  `request` int(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `username_UNIQUE` (`username`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of user
-- ----------------------------
BEGIN;
INSERT INTO `user` VALUES (1, b'0', 'thaianhvip', '0944026118', 'thaianh@gmail.co', '2020-01-08 22:01:03', 'thaianh', '$2a$10$VdYEIX7Jq/cOvw1mJfF2MOJIfMGacz1r1eC0A0fVqGHTo3sZoJ0tG', 0, 0, 1);
INSERT INTO `user` VALUES (2, b'1', 'thaiemcuiqwe', '0944026117', 'thaiem@gmail.com', '2020-01-14 22:01:37', 'thaiem', '$2a$10$O2ihTfrzG3xvjX0DlnEHTuQn7Kv4yT//jYAzl6wAMejUEZmVrtrE6', 0, 1, 0);
INSERT INTO `user` VALUES (3, b'1', 'thaianh1', '0944026116', 'as@gmail.com', '2020-01-14 22:04:08', 'thaianh1', '$2a$10$VdYEIX7Jq/cOvw1mJfF2MOJIfMGacz1r1eC0A0fVqGHTo3sZoJ0tG', 1, 1, 0);
INSERT INTO `user` VALUES (4, b'1', 'thaianh2', '0944026115', '123213@gmail.com', '2020-01-20 22:04:36', 'thaianh2', '$2a$10$VdYEIX7Jq/cOvw1mJfF2MOJIfMGacz1r1eC0A0fVqGHTo3sZoJ0tG', 0, 1, 0);
INSERT INTO `user` VALUES (5, b'1', 'lem', '0964351101', 'lem@gmail.com', '1999-06-12 00:00:00', 'lemdeptrai', '$2a$10$VdYEIX7Jq/cOvw1mJfF2MOJIfMGacz1r1eC0A0fVqGHTo3sZoJ0tG', 1, 1, 0);
INSERT INTO `user` VALUES (6, b'1', 'lem dep try', '123456', 'o0liebeo0o@gmail.com', NULL, 'lemdeptry', '$2a$10$VdYEIX7Jq/cOvw1mJfF2MOJIfMGacz1r1eC0A0fVqGHTo3sZoJ0tG', 0, 1, 0);
INSERT INTO `user` VALUES (7, b'1', 'Đỗ Thế Anh', '0904113942', 'nhoxtheanh@gmail.com', NULL, 'dotheanh', '$2a$10$B3Pxk1P0ybSGdN2TCtv5Mecz/aehej.RIQBDFHjx2Oht4ErdtbfT.', 1, 1, 0);
INSERT INTO `user` VALUES (8, b'1', 'Đỗ Thế Em hihi', '0904113942', 'nhoxtheem@gmail.com', NULL, 'dotheem', '$2a$10$qIbkqfKjHzHHEh/otJFuIOV39uC4rdKCz1u/CymSW/jAvGoE7IBZ2', 1, 1, 0);
INSERT INTO `user` VALUES (9, b'0', 'Đỗ Thế Chị', NULL, 'nhoxthechi@gmail.com', NULL, 'dothechi', '$2a$10$B3Pxk1P0ybSGdN2TCtv5Mecz/aehej.RIQBDFHjx2Oht4ErdtbfT.', 0, 1, 0);
INSERT INTO `user` VALUES (10, b'1', 'lem Nguyen', NULL, 'qweqwe@gmail.com', '2020-01-05 00:00:00', 'lemdeptry2', '$2a$10$sO35b9SfYKXgSBeko177FewKe9Ph//5oLOf4Ow6cNpmLTfvROz4ta', 1, 1, 0);
INSERT INTO `user` VALUES (14, b'1', 'aaaaaaa', '0911232111', 'aaaaaaaa@g.com', '2020-01-05 00:00:00', 'aaaaaaaa', '$2a$10$R.2q2fx0s9WwECqoB4yhouhq8KA7l1dfk4bGn9OZ3IeNGx0RK5pUW', 1, 1, 0);
INSERT INTO `user` VALUES (15, b'1', 'thaianhvip111', '0931467534', 'qweqwe11111@gmail.com', '2020-01-05 00:00:00', 'lemdeptry11111', '$2a$10$3wyZl.HmiOgkbmG6K5w7ceE.1Zo9WS4J/SkHMrfqTuALqzNvQgAG.', 1, 1, 0);
INSERT INTO `user` VALUES (16, b'0', 'thaianhvip111', '0931467534', 'qweqwe111111@gmail.com', '2020-01-05 00:00:00', 'lemdeptry111111', '$2a$10$6/8d62vvL0nw6txWfE74J.BNgR6JXhxNtG2.skFqFNQLZAQIEKhFm', 0, 1, 0);
INSERT INTO `user` VALUES (17, b'0', 'thaianhvip11111', '0931467534', 'qweqwe1111111@gmail.com', '2020-01-05 00:00:00', 'lemdeptry11111111', '$2a$10$thmPyuxUVy.rV1.OFnoZGeiU2PXH9lceGYSs75YZoVU4njX6Qp9Pq', 0, 1, 1);
INSERT INTO `user` VALUES (18, b'1', 'thaianhvip', '0931467534', 'qweqw22e@gmail.com', '2020-01-05 00:00:00', '3', '$2a$10$xakNoNi.J0f1g/JOJ72s3eVlbPrSMCHmRYxaWmEY.DLKn8bdV990q', 0, 1, 0);
INSERT INTO `user` VALUES (19, b'1', 'thaianhvip123', '0931467534', 'qweqwe123@gmail.com', '2020-01-05 00:00:00', 'lemdeptry123', '$2a$10$gWrH/pH0LZon.Iyi.55AZ.0lqC0pMrM84T6nrf.cDe8SFJLvqDR5W', 1, 1, 0);
INSERT INTO `user` VALUES (20, b'1', 'Đỗ Minh Trang', '0901234542', 'nhoxt.he.anh@gmail.com', '2020-01-06 00:00:00', 'dotrang', '$2a$10$eSPWeVW9UQZxKl.T2holJuzm3K3ldCesf7B/CDnQUBLBosadsdZpq', 1, 1, 0);
INSERT INTO `user` VALUES (22, b'1', 'Bùi Nguyễn Vĩnh Phương', '0904113942', 'nhoxthean.h@gmail.com', '2020-01-06 00:00:00', 'phuong', '$2a$10$6BDnQenvuE4sQMdqJkCEje/WYbdggEafoyBE4LG291ULWFVMQSPVm', 0, 1, 0);
INSERT INTO `user` VALUES (23, b'1', 'Nguyễn Hữu Gia Trí', '0904113942', 'nhox.theanh@gmail.com', '2020-01-06 00:00:00', 'nguyenhuugiatri', '$2a$10$.W8OXZoGiyB7ZPq7gqsHTuFhwAwQ8WXg5uhuog6NzLrp6MchKm50O', 1, 1, 0);
INSERT INTO `user` VALUES (24, b'1', 'Huỳnh Thái Anh', '0904113942', 'nhoxth.eanh@gmail.com', '2020-01-06 00:00:00', 'huynhthaianh', '$2a$10$zpzSLxSwLyDXuHnE9P70SOcn/3tkf0MBmWzG2Fb7jjHlhw8Re73Ym', 1, 1, 0);
COMMIT;

-- ----------------------------
-- Table structure for watchlist
-- ----------------------------
DROP TABLE IF EXISTS `watchlist`;
CREATE TABLE `watchlist` (
  `id_user` int(11) NOT NULL,
  `id_product` int(11) NOT NULL,
  PRIMARY KEY (`id_user`,`id_product`) USING BTREE,
  KEY `fk_watchList_product_idx` (`id_product`) USING BTREE,
  KEY `fk_watchlist_user` (`id_user`) USING BTREE,
  CONSTRAINT `fk_watchlist_product` FOREIGN KEY (`id_product`) REFERENCES `product` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fk_watchlist_user` FOREIGN KEY (`id_user`) REFERENCES `user` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of watchlist
-- ----------------------------
BEGIN;
INSERT INTO `watchlist` VALUES (7, 77);
INSERT INTO `watchlist` VALUES (7, 79);
INSERT INTO `watchlist` VALUES (7, 80);
INSERT INTO `watchlist` VALUES (7, 85);
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
