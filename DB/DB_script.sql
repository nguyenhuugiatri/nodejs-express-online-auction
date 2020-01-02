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

 Date: 02/01/2020 00:31:01
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
INSERT INTO `image` VALUES (3, 'sr3_1');
INSERT INTO `image` VALUES (3, 'sr3_2');
INSERT INTO `image` VALUES (3, 'sr3_3');
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
  `currentPrice` float NOT NULL,
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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of product
-- ----------------------------
BEGIN;
INSERT INTO `product` VALUES (1, 'Acer Nitro 5', 1, 1, 2, 1000, 10000, 20000, '2020-01-01 22:05:21', '2020-01-14 22:05:24', 'LAPTOP vip', 0);
INSERT INTO `product` VALUES (2, 'Macbook Pro 2019', 1, 3, 4, 1000, 15000, 20000, '2020-01-01 22:06:26', '2020-01-15 22:06:29', 'LAPTOP cùi', 0);
INSERT INTO `product` VALUES (3, 'Asus ROG', 1, 2, 1, 1000, 10000, 20000, '2020-01-01 22:07:23', '2020-01-14 22:07:26', 'LAPTOP vip', 0);
INSERT INTO `product` VALUES (4, 'Iphone', 2, 4, 3, 200, 1200, 3000, '2020-01-02 00:17:21', '2020-01-24 00:17:27', 'Iphone đẹp', 0);
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
  `password` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `gender` bit(1) NOT NULL,
  `permission` bit(1) NOT NULL DEFAULT b'0',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `username_UNIQUE` (`username`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of user
-- ----------------------------
BEGIN;
INSERT INTO `user` VALUES (1, b'0', 'thaianhvip', '0944026118', 'thaianh@gmail.co', '2020-01-08 22:01:03', 'thaianh', '123123123', b'0', b'0');
INSERT INTO `user` VALUES (2, b'0', 'thaiemcui', '0944026117', 'thaiem@gmail.com', '2020-01-14 22:01:37', 'thaiem', '123123123', b'0', b'0');
INSERT INTO `user` VALUES (3, b'0', 'thaianh1', '0944026116', 'as@gmail.com', '2020-01-14 22:04:08', 'thaianh1', '123123123', b'0', b'0');
INSERT INTO `user` VALUES (4, b'0', 'thaianh2', '0944026115', '123213@gmail.com', '2020-01-20 22:04:36', 'thaianh2', '123123123', b'0', b'0');
INSERT INTO `user` VALUES (5, b'1', 'lem', '0964351101', 'lem@gmail.com', '1999-06-12 00:00:00', 'lemdeptrai', 'lemquadeptrai', b'1', b'1');
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
