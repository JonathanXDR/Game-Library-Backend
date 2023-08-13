-- -------------------------------------------------------------
-- TablePlus 5.4.0(505)
--
-- https://tableplus.com/
--
-- Database: game-library
-- Generation Time: 2023-08-13 17:26:39.5740
-- -------------------------------------------------------------


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


DROP TABLE IF EXISTS `game`;
CREATE TABLE `game` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `year` int(11) DEFAULT NULL,
  `rating` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `game` (`id`, `name`, `year`, `rating`) VALUES
('1', 'Super Mario', 1985, 9),
('10', 'Sonic the Hedgehog', 1991, 8),
('2', 'The Legend of Zelda', 1986, 10),
('3', 'Minecraft', 2011, 8),
('4', 'Tetris', 1984, 7),
('5', 'Doom', 1993, 9),
('6', 'Pac-Man', 1980, 7),
('7', 'Street Fighter II', 1991, 8),
('8', 'Final Fantasy VII', 1997, 10),
('9', 'Metroid', 1986, 9);

INSERT INTO `user` (`id`, `username`, `password`) VALUES
('1', 'jonathan_russ', '$2a$10$pI9k47Ugd/u1PJ0Y1smtz.NNl/0ooSbEmM21GVzQeSUiUHpWvJKre'),
('2', 'username', '$2a$10$GuvQCEzYPC4rsht7OriHPuohNy4wlNopatcizt6Yqf8PWkg58MpGq');



/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;