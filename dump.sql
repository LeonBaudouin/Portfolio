-- --------------------------------------------------------
-- Hôte :                        localhost
-- Version du serveur:           5.7.24 - MySQL Community Server (GPL)
-- SE du serveur:                Win64
-- HeidiSQL Version:             10.2.0.5599
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- Listage de la structure de la table portfolio_development. projects
CREATE TABLE IF NOT EXISTS `projects` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL DEFAULT '',
  `type` varchar(50) NOT NULL DEFAULT '',
  `gallery_image` varchar(50) NOT NULL DEFAULT '',
  `high_res_featured_image` varchar(50) NOT NULL DEFAULT '',
  `low_res_featured_image` varchar(50) NOT NULL DEFAULT '',
  `url` varchar(150) NOT NULL DEFAULT '',
  `description` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

-- Listage des données de la table portfolio_development.projects : ~1 rows (environ)
/*!40000 ALTER TABLE `projects` DISABLE KEYS */;
REPLACE INTO `projects` (`id`, `name`, `type`, `gallery_image`, `high_res_featured_image`, `low_res_featured_image`, `url`, `description`) VALUES
	(1, 'Glint', 'Jeu vidéo', 'GalleryGlint.jpg', 'Glint_1920.png', 'Glint_800.png', 'https://www.glintgame.fr', 'Glint est mon projet tutoré de 2ème année de DUT MMI. Ce projet réunit une équipe de cinq autres étudiants. Nous nous sommes fixé l’objectif ambitieux de créer un jeu vidéo. La production inclut, la création d’une charte graphique, de sprites, d’animations, d’opérations de communication mais surtout du développement du jeu en lui-même.');
/*!40000 ALTER TABLE `projects` ENABLE KEYS */;

-- Listage de la structure de la table portfolio_development. projects_skills_relation
CREATE TABLE IF NOT EXISTS `projects_skills_relation` (
  `project_id` int(11) DEFAULT NULL,
  `skill_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Listage des données de la table portfolio_development.projects_skills_relation : ~2 rows (environ)
/*!40000 ALTER TABLE `projects_skills_relation` DISABLE KEYS */;
REPLACE INTO `projects_skills_relation` (`project_id`, `skill_id`) VALUES
	(1, 1),
	(1, 2);
/*!40000 ALTER TABLE `projects_skills_relation` ENABLE KEYS */;

-- Listage de la structure de la table portfolio_development. skills
CREATE TABLE IF NOT EXISTS `skills` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL DEFAULT '',
  `logo` varchar(50) NOT NULL DEFAULT '',
  `skill_set` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

-- Listage des données de la table portfolio_development.skills : ~2 rows (environ)
/*!40000 ALTER TABLE `skills` DISABLE KEYS */;
REPLACE INTO `skills` (`id`, `name`, `logo`, `skill_set`) VALUES
	(1, 'C#', 'Csharp.svg', NULL),
	(2, 'Unity', 'Unity.svg', NULL);
/*!40000 ALTER TABLE `skills` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
