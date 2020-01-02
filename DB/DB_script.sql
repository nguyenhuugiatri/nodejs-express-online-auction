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

 Date: 03/01/2020 00:55:48
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
  `password` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `username_UNIQUE` (`username`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of admin
-- ----------------------------
BEGIN;
INSERT INTO `admin` VALUES (1, 'lem', 'nguyenhuugiatri@gmail.com', '0964351101', 'lemdeptrai', 'lemquadeptrai');
COMMIT;

-- ----------------------------
-- Table structure for auctionedproduct
-- ----------------------------
DROP TABLE IF EXISTS `auctionedproduct`;
CREATE TABLE `auctionedproduct` (
  `id_user` int(11) NOT NULL,
  `id_product` int(11) NOT NULL,
  PRIMARY KEY (`id_user`,`id_product`) USING BTREE,
  KEY `fk_aucproduct_product_idx` (`id_product`) USING BTREE,
  CONSTRAINT `fk_aucProduct_product` FOREIGN KEY (`id_product`) REFERENCES `product` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fk_aucProduct_user` FOREIGN KEY (`id_user`) REFERENCES `user` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of auctionedproduct
-- ----------------------------
BEGIN;
INSERT INTO `auctionedproduct` VALUES (1, 1);
INSERT INTO `auctionedproduct` VALUES (2, 1);
INSERT INTO `auctionedproduct` VALUES (3, 2);
INSERT INTO `auctionedproduct` VALUES (1, 3);
COMMIT;

-- ----------------------------
-- Table structure for auctionhistory
-- ----------------------------
DROP TABLE IF EXISTS `auctionhistory`;
CREATE TABLE `auctionhistory` (
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
-- Records of auctionhistory
-- ----------------------------
BEGIN;
INSERT INTO `auctionhistory` VALUES (1, '2020-01-02 00:21:53', 1000, 1);
INSERT INTO `auctionhistory` VALUES (2, '2020-01-02 00:22:34', 1200, 2);
INSERT INTO `auctionhistory` VALUES (3, '2020-01-02 00:22:53', 4000, 3);
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
INSERT INTO `ban` VALUES (4, 1);
COMMIT;

-- ----------------------------
-- Table structure for biddingproduct
-- ----------------------------
DROP TABLE IF EXISTS `biddingproduct`;
CREATE TABLE `biddingproduct` (
  `id_user` int(11) NOT NULL,
  `id_product` int(11) NOT NULL,
  PRIMARY KEY (`id_user`,`id_product`) USING BTREE,
  KEY `fk_bidding_product_idx` (`id_product`) USING BTREE,
  KEY `fk_bidding_user` (`id_user`) USING BTREE,
  CONSTRAINT `fk_bidding_product` FOREIGN KEY (`id_product`) REFERENCES `product` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fk_bidding_user` FOREIGN KEY (`id_user`) REFERENCES `user` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of biddingproduct
-- ----------------------------
BEGIN;
INSERT INTO `biddingproduct` VALUES (1, 1);
INSERT INTO `biddingproduct` VALUES (2, 1);
INSERT INTO `biddingproduct` VALUES (3, 2);
COMMIT;

-- ----------------------------
-- Table structure for category
-- ----------------------------
DROP TABLE IF EXISTS `category`;
CREATE TABLE `category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of category
-- ----------------------------
BEGIN;
INSERT INTO `category` VALUES (1, 'Laptop');
INSERT INTO `category` VALUES (2, 'Smartphone');
INSERT INTO `category` VALUES (3, 'Tablet');
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
INSERT INTO `image` VALUES (1, 'sr1_1');
INSERT INTO `image` VALUES (1, 'sr1_2');
INSERT INTO `image` VALUES (1, 'sr1_3');
INSERT INTO `image` VALUES (2, 'sr2_1');
INSERT INTO `image` VALUES (2, 'sr2_2');
INSERT INTO `image` VALUES (2, 'sr2_3');
INSERT INTO `image` VALUES (3, 'lem');
INSERT INTO `image` VALUES (3, 'sr3_1');
INSERT INTO `image` VALUES (3, 'sr3_2');
INSERT INTO `image` VALUES (3, 'sr3_3');
INSERT INTO `image` VALUES (44, 'wwwww');
INSERT INTO `image` VALUES (45, 'lku');
INSERT INTO `image` VALUES (49, '2020-01-02 07:36:19-2.jpeg');
INSERT INTO `image` VALUES (52, '\'2020-01-02 07:39:29-2.jpeg\'');
INSERT INTO `image` VALUES (53, '2020-01-02 07:40:11-2.jpeg');
INSERT INTO `image` VALUES (55, '/uploads/1/2020-01-02 07:42:42-2.jpeg');
INSERT INTO `image` VALUES (56, '/uploads/1/2020-01-02 08:38:44-1.jpeg');
INSERT INTO `image` VALUES (56, '/uploads/1/2020-01-02 08:38:44-2.jpeg');
INSERT INTO `image` VALUES (57, '/uploads/1/2020-01-02 08:38:44-1.jpeg');
INSERT INTO `image` VALUES (57, '/uploads/1/2020-01-02 08:38:44-2.jpeg');
INSERT INTO `image` VALUES (57, '/uploads/1/2020-01-02 08:42:41-2.jpeg');
COMMIT;

-- ----------------------------
-- Table structure for parameter
-- ----------------------------
DROP TABLE IF EXISTS `parameter`;
CREATE TABLE `parameter` (
  `sell_product_cost` int(11) DEFAULT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
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
  PRIMARY KEY (`id`) USING BTREE,
  KEY `fk_product_category_idx` (`category`) USING BTREE,
  KEY `fk_product_bidder_idx` (`id_bidder`) USING BTREE,
  KEY `fk_product_seller` (`id_seller`) USING BTREE,
  CONSTRAINT `fk_product_bidder` FOREIGN KEY (`id_bidder`) REFERENCES `user` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fk_product_category` FOREIGN KEY (`category`) REFERENCES `category` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fk_product_seller` FOREIGN KEY (`id_seller`) REFERENCES `user` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=58 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of product
-- ----------------------------
BEGIN;
INSERT INTO `product` VALUES (1, 'Acer Nitro 5', 1, 1, 2, 1000, 10000, 20000, '2020-01-01 22:05:21', '2020-01-14 22:05:24', 'LAPTOP vip', 0);
INSERT INTO `product` VALUES (2, 'Macbook Pro 2019', 1, 3, 4, 1000, 15000, 20000, '2020-01-01 22:06:26', '2020-01-15 22:06:29', 'LAPTOP cùi', 0);
INSERT INTO `product` VALUES (3, 'Asus ROG', 1, 2, 1, 1000, 10000, 20000, '2020-01-01 22:07:23', '2020-01-14 22:07:26', 'LAPTOP vip', 0);
INSERT INTO `product` VALUES (4, 'Iphone', 2, 4, 3, 200, 1200, 3000, '2020-01-02 00:17:21', '2020-01-24 00:17:27', 'Iphone đẹp', 0);
INSERT INTO `product` VALUES (5, 'xiaomi', 2, 1, NULL, 120, 1000, 1200, '2020-01-02 15:24:33', '2020-01-02 15:24:36', NULL, 0);
INSERT INTO `product` VALUES (6, 'xiaomi poco', 2, 1, NULL, 5, 10, 10, '2020-01-02 03:36:46', '2020-02-01 11:01:00', NULL, 0);
INSERT INTO `product` VALUES (7, 'xiaomi poco', 2, 1, NULL, 5, 10, 20, '2020-01-02 03:37:23', '2020-02-01 11:01:00', NULL, 0);
INSERT INTO `product` VALUES (8, 'xiaomi poco', 2, 1, NULL, 5, 10, 20, '2020-01-02 03:38:37', '2020-02-01 11:01:00', NULL, 0);
INSERT INTO `product` VALUES (9, 'xiaomi poco', 2, 1, NULL, 5, 10, 20, '2020-01-02 03:39:08', '2020-02-01 11:01:00', NULL, 0);
INSERT INTO `product` VALUES (10, 'xiaomi poco', 2, 1, NULL, 5, 10, 20, '2020-01-02 03:39:56', '2020-02-01 11:01:00', NULL, 0);
INSERT INTO `product` VALUES (11, 'xiaomi poco', 2, 1, NULL, 5, 10, 20, '2020-01-02 03:40:43', '2020-02-01 11:01:00', NULL, 0);
INSERT INTO `product` VALUES (12, 'xiaomi poco', 2, 1, NULL, 5, 10, 20, '2020-01-02 03:41:31', '2020-02-01 11:01:00', NULL, 0);
INSERT INTO `product` VALUES (13, 'xiaomi poco', 2, 1, NULL, 5, 10, 20, '2020-01-02 03:42:01', '2020-02-01 11:01:00', NULL, 0);
INSERT INTO `product` VALUES (14, 'xiaomi poco', 2, 1, NULL, 5, 10, 20, '2020-01-02 03:42:11', '2020-02-01 11:01:00', NULL, 0);
INSERT INTO `product` VALUES (15, '123', 2, 1, NULL, 123, 123, 123, '2020-01-02 03:42:39', '2311-12-21 12:11:00', NULL, 0);
INSERT INTO `product` VALUES (16, '123', 2, 1, NULL, 123, 123, 123, '2020-01-02 03:42:48', '2311-12-21 12:11:00', NULL, 0);
INSERT INTO `product` VALUES (17, '123', 2, 1, NULL, 123, 123, 123, '2020-01-02 03:43:30', '2311-12-21 12:11:00', NULL, 0);
INSERT INTO `product` VALUES (18, 'xiaomi poco2', 2, 1, NULL, 123, 123, 321, '2020-01-02 03:44:07', '2020-12-12 11:11:00', NULL, 0);
INSERT INTO `product` VALUES (19, 'xiaomi poco2', 2, 1, NULL, 123, 123, 321, '2020-01-02 03:45:05', '2020-12-12 11:11:00', NULL, 0);
INSERT INTO `product` VALUES (20, 'xiaomi poco2', 2, 1, NULL, 123, 123, 321, '2020-01-02 04:17:58', '2020-12-12 11:11:00', NULL, 0);
INSERT INTO `product` VALUES (21, '213', 3, 1, NULL, 321, 23, 12, '2020-01-02 05:19:22', '0003-03-12 12:02:00', NULL, 0);
INSERT INTO `product` VALUES (22, 'xiaomi poco2', 2, 1, NULL, 123, 123, 321, '2020-01-02 05:40:09', '2020-12-12 11:11:00', NULL, 0);
INSERT INTO `product` VALUES (23, 'xiaomi poco2', 2, 1, NULL, 123, 123, 321, '2020-01-02 05:43:34', '2020-12-12 11:11:00', NULL, 0);
INSERT INTO `product` VALUES (24, '213', 3, 1, NULL, 321, 23, 12, '2020-01-02 05:48:50', '0003-03-12 12:02:00', NULL, 0);
INSERT INTO `product` VALUES (25, '213', 3, 1, NULL, 321, 23, 12, '2020-01-02 05:49:33', '0003-03-12 12:02:00', NULL, 0);
INSERT INTO `product` VALUES (26, '123', 2, 1, NULL, 13, 123, 123, '2020-01-02 05:50:34', '2020-12-31 12:00:00', NULL, 0);
INSERT INTO `product` VALUES (27, '123', 2, 1, NULL, 13, 123, 123, '2020-01-02 05:51:02', '2020-12-31 12:00:00', NULL, 0);
INSERT INTO `product` VALUES (28, 'xiaomi poco2', 2, 1, NULL, 123, 123, 321, '2020-01-02 05:52:16', '2020-12-12 11:11:00', NULL, 0);
INSERT INTO `product` VALUES (29, 'xiaomi poco2', 2, 1, NULL, 123, 123, 321, '2020-01-02 05:52:39', '2020-12-12 11:11:00', NULL, 0);
INSERT INTO `product` VALUES (30, 'xiaomi poco2', 2, 1, NULL, 123, 123, 321, '2020-01-02 05:52:53', '2020-12-12 11:11:00', NULL, 0);
INSERT INTO `product` VALUES (31, 'xiaomi poco2', 2, 1, NULL, 123, 123, 321, '2020-01-02 05:53:17', '2020-12-12 11:11:00', NULL, 0);
INSERT INTO `product` VALUES (32, '123', 2, 1, NULL, 13, 123, 123, '2020-01-02 05:53:42', '2020-12-31 12:00:00', NULL, 0);
INSERT INTO `product` VALUES (33, 'xiaomi poco2', 2, 1, NULL, 123, 123, 321, '2020-01-02 06:00:15', '2020-12-12 11:11:00', NULL, 0);
INSERT INTO `product` VALUES (34, '123', 2, 1, NULL, 13, 123, 123, '2020-01-02 06:05:18', '2020-12-31 12:00:00', NULL, 0);
INSERT INTO `product` VALUES (35, '123', 2, 1, NULL, 13, 123, 123, '2020-01-02 06:05:43', '2020-12-31 12:00:00', NULL, 0);
INSERT INTO `product` VALUES (36, '123', 2, 1, NULL, 13, 123, 123, '2020-01-02 06:06:30', '2020-12-31 12:00:00', NULL, 0);
INSERT INTO `product` VALUES (37, '123', 2, 1, NULL, 13, 123, 123, '2020-01-02 06:06:43', '2020-12-31 12:00:00', NULL, 0);
INSERT INTO `product` VALUES (38, '123', 2, 1, NULL, 13, 123, 123, '2020-01-02 06:07:39', '2020-12-31 12:00:00', NULL, 0);
INSERT INTO `product` VALUES (39, '32', 2, 1, NULL, 1, 123, 122, '2020-01-02 06:27:25', '2020-12-21 12:01:00', NULL, 0);
INSERT INTO `product` VALUES (40, 'lrm', 1, 1, 1, 122, 12, 2, '2020-01-02 19:13:07', '2020-01-25 19:13:11', NULL, 0);
INSERT INTO `product` VALUES (41, 'dwq', 2, 1, NULL, 1, 12, 14, '2020-01-02 07:18:25', '2020-12-01 12:05:00', NULL, 0);
INSERT INTO `product` VALUES (42, 'dwq', 2, 1, NULL, 1, 12, 14, '2020-01-02 07:19:37', '2020-12-01 12:05:00', NULL, 0);
INSERT INTO `product` VALUES (43, 'xiaomi poco2', 2, 1, NULL, 123, 123, 321, '2020-01-02 07:25:57', '2020-12-12 11:11:00', NULL, 0);
INSERT INTO `product` VALUES (44, 'xiaomi poco2', 2, 1, NULL, 123, 123, 321, '2020-01-02 07:28:04', '2020-12-12 11:11:00', NULL, 0);
INSERT INTO `product` VALUES (45, 'xiaomi poco2', 2, 1, NULL, 123, 123, 321, '2020-01-02 07:31:47', '2020-12-12 11:11:00', NULL, 0);
INSERT INTO `product` VALUES (46, 'xiaomi poco2', 2, 1, NULL, 123, 123, 321, '2020-01-02 07:32:29', '2020-12-12 11:11:00', NULL, 0);
INSERT INTO `product` VALUES (47, 'xiaomi poco2', 2, 1, NULL, 123, 123, 321, '2020-01-02 07:33:42', '2020-12-12 11:11:00', NULL, 0);
INSERT INTO `product` VALUES (48, 'xiaomi poco2', 2, 1, NULL, 123, 123, 321, '2020-01-02 07:34:08', '2020-12-12 11:11:00', NULL, 0);
INSERT INTO `product` VALUES (49, 'xiaomi poco2', 2, 1, NULL, 123, 123, 321, '2020-01-02 07:36:19', '2020-12-12 11:11:00', NULL, 0);
INSERT INTO `product` VALUES (50, 'xiaomi poco2', 2, 1, NULL, 123, 123, 321, '2020-01-02 07:38:27', '2020-12-12 11:11:00', NULL, 0);
INSERT INTO `product` VALUES (51, 'xiaomi poco2', 2, 1, NULL, 123, 123, 321, '2020-01-02 07:39:05', '2020-12-12 11:11:00', NULL, 0);
INSERT INTO `product` VALUES (52, 'xiaomi poco2', 2, 1, NULL, 123, 123, 321, '2020-01-02 07:39:29', '2020-12-12 11:11:00', NULL, 0);
INSERT INTO `product` VALUES (53, 'xiaomi poco2', 2, 1, NULL, 123, 123, 321, '2020-01-02 07:40:11', '2020-12-12 11:11:00', NULL, 0);
INSERT INTO `product` VALUES (54, 'xiaomi poco2', 2, 1, NULL, 123, 123, 321, '2020-01-02 07:42:10', '2020-12-12 11:11:00', NULL, 0);
INSERT INTO `product` VALUES (55, 'xiaomi poco2', 2, 1, NULL, 123, 123, 321, '2020-01-02 07:42:42', '2020-12-12 11:11:00', NULL, 0);
INSERT INTO `product` VALUES (56, 'xiaomi poco', 2, 1, NULL, 2, 12, 15, '2020-01-02 08:38:44', '2021-12-01 12:01:00', NULL, 0);
INSERT INTO `product` VALUES (57, 'xiaomi poco', 2, 1, NULL, 2, 12, 15, '2020-01-02 08:42:41', '2021-12-01 12:01:00', '<p style=\"text-align: right;\">asdasdasdasdasdasdas</p>\r\n<div id=\"eJOY__extension_root\" style=\"all: unset;\">&nbsp;</div>', 0);
COMMIT;

-- ----------------------------
-- Table structure for review
-- ----------------------------
DROP TABLE IF EXISTS `review`;
CREATE TABLE `review` (
  `id_user` int(11) NOT NULL,
  `review` varchar(1000) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `time` datetime NOT NULL,
  `reviewer` int(11) NOT NULL,
  `marks` int(1) DEFAULT NULL,
  PRIMARY KEY (`id_user`,`reviewer`,`time`) USING BTREE,
  KEY `fk_review_reviewer_idx` (`reviewer`) USING BTREE,
  CONSTRAINT `fk_review_user` FOREIGN KEY (`id_user`) REFERENCES `user` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fk_reviewer_user` FOREIGN KEY (`reviewer`) REFERENCES `user` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of review
-- ----------------------------
BEGIN;
INSERT INTO `review` VALUES (1, 'Người bán ngu vl', 0, '2020-01-02 00:27:41', 1, 1);
COMMIT;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `status` bit(1) DEFAULT NULL,
  `fullname` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `phone` varchar(11) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `email` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `dob` datetime DEFAULT NULL,
  `username` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `password` varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `gender` bit(1) NOT NULL,
  `permission` bit(1) NOT NULL DEFAULT b'0',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `username_UNIQUE` (`username`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of user
-- ----------------------------
BEGIN;
INSERT INTO `user` VALUES (1, b'0', 'thaianhvip', '0944026118', 'thaianh@gmail.co', '2020-01-08 22:01:03', 'thaianh', '123123123', b'0', b'0');
INSERT INTO `user` VALUES (2, b'0', 'thaiemcui', '0944026117', 'thaiem@gmail.com', '2020-01-14 22:01:37', 'thaiem', '123123123', b'0', b'0');
INSERT INTO `user` VALUES (3, b'0', 'thaianh1', '0944026116', 'as@gmail.com', '2020-01-14 22:04:08', 'thaianh1', '123123123', b'1', b'0');
INSERT INTO `user` VALUES (4, b'0', 'thaianh2', '0944026115', '123213@gmail.com', '2020-01-20 22:04:36', 'thaianh2', '123123123', b'0', b'0');
INSERT INTO `user` VALUES (5, b'1', 'lem', '0964351101', 'lem@gmail.com', '1999-06-12 00:00:00', 'lemdeptrai', 'lemquadeptrai', b'1', b'1');
INSERT INTO `user` VALUES (6, NULL, 'lem dep try', NULL, 'lemdeptry@gmail.com', NULL, 'lemdeptry', '$2a$10$VdYEIX7Jq/cOvw1mJfF2MOJIfMGacz1r1eC0A0fVqGHTo3sZoJ0tG', b'0', b'0');
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
INSERT INTO `watchlist` VALUES (1, 1);
INSERT INTO `watchlist` VALUES (2, 1);
INSERT INTO `watchlist` VALUES (3, 2);
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
