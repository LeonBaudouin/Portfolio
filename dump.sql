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

-- Listage de la structure de la table portfolio_development. courses
CREATE TABLE IF NOT EXISTS `courses` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL DEFAULT '',
  `date` varchar(100) NOT NULL DEFAULT '',
  `description` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

-- Listage des données de la table portfolio_development.courses : ~0 rows (environ)
/*!40000 ALTER TABLE `courses` DISABLE KEYS */;
REPLACE INTO `courses` (`id`, `name`, `date`, `description`) VALUES
	(1, 'Bac Scientifique', '2015-2017', 'J’ai obtenu le Bac S avec mention Bien au lycée Hector Berlioz à Vincennes. Les deux années que j’ai passées en filière scientifique m’ont permis de me forger une rigueur et une logique qui me sont très utiles aujourd’hui. C’est durant cette période que j’ai consacré beaucoup de temps à me former au Motion Design.'),
	(2, 'Stage Mikros', 'Aout 2018', 'J’ai effectué un Stage d’un mois au sein de la société de Post-production Mikros Image en tant que Motion Designer. Cette expérience m’a permis de découvrir le milieu de la post-production en tant qu’élément au sein de cette industrie. De plus, j’ai pu me familiariser avec un milieu professionnel.'),
	(3, 'DUT MMI', '2017-2019', 'MMI (Métiers du Multimédia et de l’Internet) est une formation pluridisciplinaire que je suis actuellement à l’IUT de Champs sur Marne. En plus de me faire découvrir le monde passionnant du web, elle m’a permis d\'expérimenter et de mettre à profit mes connaissances à travers des dizaines de projets.');
/*!40000 ALTER TABLE `courses` ENABLE KEYS */;

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
  `is_featured` tinyint(4) NOT NULL DEFAULT '0',
  `is_lab` tinyint(4) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

-- Listage des données de la table portfolio_development.projects : ~5 rows (environ)
/*!40000 ALTER TABLE `projects` DISABLE KEYS */;
REPLACE INTO `projects` (`id`, `name`, `type`, `gallery_image`, `high_res_featured_image`, `low_res_featured_image`, `url`, `description`, `is_featured`, `is_lab`) VALUES
	(1, 'Glint Game', 'Jeu vidéo', 'GalleryGlint.jpg', 'Glint_1920.png', 'Glint_800.png', 'https://www.glintgame.fr', 'Glint est mon projet tutoré de 2ème année de DUT MMI. Ce projet réunit une équipe de cinq autres étudiants. Nous nous sommes fixé l’objectif ambitieux de créer un jeu vidéo. La production inclut, la création d’une charte graphique, de sprites, d’animations, d’opérations de communication mais surtout du développement du jeu en lui-même.\r\n\r\nJ\'ai ainsi assuré le rôle de développeur logiciel. Je me suis formé en autodidacte au C#, au développement Unity, aux principes de POO avancé. Je me suis spécialisé dans le développement de l’Interface Utilisateur. Ça inclut les menus, les modifications des touches de jeu, le HUD, la gestion des textes (changement de langue par exemple). Unity ne m’a pas facilité la tâche, il ne dispose pas encore de beaucoup d’outils pour manipuler l’UI.', 0, 0),
	(2, 'Portrait Chinois', 'Site Web', 'GalleryPortraitChinois.jpg', '', '', './portrait/', 'Ce projet est mon premier site web. Il s’agit d’un Portrait Chinois one-page. Le concept, en 2 mots, est d’associer sa personnalité avec un thème. Ce site web est donc construit autour de la formule consacrée “Si j’étais… je serais…”. Ce projet est une première expérience dans le monde du web à la fois en développement et en design.\r\n\r\nDurant la conception graphique, la maquette a été revue plusieurs fois avant d’avoir un résultat qui me convient. Chaque “pages“ correspondant à une facette de ma personnalité, j’ai décidé de donner un thème de couleur particulier à chacune d’elles. En ce qui concerne le développement, le site étant one-page, j’ai créé une navigation entièrement encapsulée par du Javascript. J’ai utilisé jQuery en pour manipuler le DOM avec facilité. J’ai aussi ajouté un canvas HTML5, une technologie qui m’a intéressée très tôt.', 0, 0),
	(3, 'CV Interactif', 'Site Web', 'GalleryCVInteractif.png', 'CV_1920.png', 'CV_800.png', './cv/', 'La fin de la 1ère année de DUT approchant et afin de proposer une alternative au CV traditionnel, j’ai réalisé un CV web. Ce dernier avait un triple enjeu : expliquer mon parcours et mon profil, montrer mes compétences techniques par le code et ma personnalité par le design du site.\r\n\r\nJ’ai basé le design du site sur des leitmotivs propres au motion design. J’ai pensé chaque élément avec une animation associée. j’ai trouvé intéressant jouer avec la dichotomie technique / créatif avec les couleurs et les polices d’écriture. Ce projet fut une occasion idéale pour m’initier au CSS avancé. J’ai expérimenté les animations complexes, les transform3d, les pseudos-éléments, les variables CSS et parfois même tout ça en même temps.', 0, 0),
	(4, 'Call Me', 'Motion Design', 'GalleryCallMe.png', 'CallMe_1920.png', 'CallMe_800.png', 'https://www.youtube.com/watch?v=GK1ZqDCcR6Q', 'Alors que je fais du Motion Design depuis 2015, début 2017, je me lance sur un projet de Kinetic Typography sur la musique Call Me, de Shinedown. En effet, bien qu’ayant souvent travaillé sur des animations de textes et des animations musicales, je n’aie jamais associé les deux. Cette musique m’a paru idéale car les paroles et le rythme, notamment au sein du générique, m’inspiraient beaucoup.\r\n\r\nJ’ai donc axé mon animation sur l’opposition vertu / vice, avec l\'utilisation et l’alternance du noir et du blanc. Mais ce parti pris a aussi été une grande contrainte : il fallait donner vie aux paroles qu’en noir et blanc. Pour ce faire, j’ai redoublé de créativité en allant chercher dans le mouvement ou la déconstruction des mots ( “Same” qui se décompose en particules, “Saint” qui émet un halo de lumière,... ).', 0, 0),
	(5, 'Hexagone', 'Motion Design', 'GalleryHexagon.jpg', '', '', 'https://www.youtube.com/watch?v=THNxEycy0jM', 'En décembre 2017, je découvre l’univers du Generative Design avec notamment le compte twitter @BeesAndBombs. Cet univers qui allie mes deux passions, le motion design et le développement, m’a beaucoup inspiré. Je me suis donc lancé dans la conception d’HEXAGONE, ma dernière animation musicale à ce jour.\r\n\r\nPour cette animation, je voulais travailler avec l’environnement 3D de After Effects avec notamment le plug-in Trapcode Particular. Cette animation a aussi nécessité un travail de synesthésie car j’ai essayé d’adapter au mieux les mouvements à l’ambiance et aux subtilités de la musique.', 0, 0);
/*!40000 ALTER TABLE `projects` ENABLE KEYS */;

-- Listage de la structure de la table portfolio_development. projects_skills_relation
CREATE TABLE IF NOT EXISTS `projects_skills_relation` (
  `project_id` int(11) DEFAULT NULL,
  `skill_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Listage des données de la table portfolio_development.projects_skills_relation : ~13 rows (environ)
/*!40000 ALTER TABLE `projects_skills_relation` DISABLE KEYS */;
REPLACE INTO `projects_skills_relation` (`project_id`, `skill_id`) VALUES
	(1, 10),
	(1, 11),
	(2, 14),
	(2, 15),
	(2, 2),
	(2, 4),
	(2, 17),
	(3, 14),
	(3, 2),
	(3, 4),
	(4, 12),
	(5, 12),
	(5, 15);
/*!40000 ALTER TABLE `projects_skills_relation` ENABLE KEYS */;

-- Listage de la structure de la table portfolio_development. skills
CREATE TABLE IF NOT EXISTS `skills` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL DEFAULT '',
  `logo` varchar(50) NOT NULL DEFAULT '',
  `skill_set` int(11) DEFAULT NULL,
  `parent_skill` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `skill_set` (`skill_set`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=latin1;

-- Listage des données de la table portfolio_development.skills : ~17 rows (environ)
/*!40000 ALTER TABLE `skills` DISABLE KEYS */;
REPLACE INTO `skills` (`id`, `name`, `logo`, `skill_set`, `parent_skill`) VALUES
	(1, 'HTML', 'HTML.svg', 1, NULL),
	(2, 'CSS', 'CSS.svg', 1, NULL),
	(3, 'Sass', 'Sass.svg', 1, 2),
	(4, 'Javascript', 'JS.svg', 1, NULL),
	(5, 'Typescript', 'TS.svg', 1, 4),
	(6, 'Webpack', 'Webpack.svg', 1, NULL),
	(7, 'PHP', 'PHP.svg', 2, NULL),
	(8, 'MySQL', 'MySQL.svg', 2, NULL),
	(9, 'NodeJS', 'NodeJS.svg', 2, NULL),
	(10, 'C#', 'Csharp.svg', 3, NULL),
	(11, 'Unity', 'Unity.svg', 3, NULL),
	(12, 'After Effects', 'Ae.svg', 4, NULL),
	(13, 'Premiere', 'Pr.svg', 4, NULL),
	(14, 'Photoshop', 'Ps.svg', 5, NULL),
	(15, 'Illustrator', 'Ai.svg', 5, NULL),
	(16, 'Indesign', 'Id.svg', 6, NULL),
	(17, 'jQuery', 'jQuery.svg', 1, NULL);
/*!40000 ALTER TABLE `skills` ENABLE KEYS */;

-- Listage de la structure de la table portfolio_development. skill_sets
CREATE TABLE IF NOT EXISTS `skill_sets` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(150) DEFAULT NULL,
  `description` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

-- Listage des données de la table portfolio_development.skill_sets : ~6 rows (environ)
/*!40000 ALTER TABLE `skill_sets` DISABLE KEYS */;
REPLACE INTO `skill_sets` (`id`, `name`, `description`) VALUES
	(1, 'Développement Front-End', 'En plus de maîtriser les langages standard du développement front-end ( HTML, CSS et Javascript ), j’utilise des outils plus avancés tels que Typescript, SASS et Webpack. Je connais aussi la méthode OOCSS.'),
	(2, 'Développement Back-End', 'Bien que le développement back-end ne soit pas ma spécialité, je connais bien PHP natif et MySQL. J\'apprend actuellement Node.js et j’ai l’intention de me former à Laravel et Symphony, deux framework PHP.'),
	(3, 'Développement Jeu-Vidéo', 'Pour mon projet tutoré de 2ème année MMI, je me suis formé au C# et au moteur de jeu Unity. Je connais donc les principes de développement orienté objet avancés Tels que les principes SOLID.'),
	(4, 'Motion Design', 'J’ai découvert le Motion Design en 2015 avec After Effects, c’est donc un logiciel que je maîtrise. J’utilise aussi Premiere Pro pour mes animations longues. Ces connaissances sont complétées par mon expérience en effets spéciaux.'),
	(5, 'Web Design', 'Pour chacun de mes sites web, je réalise en premier lieux une maquette complète et détaillée afin d’être efficace et rigoureux lors du développement. Je réalise mes maquettes avec Photoshop et Illustrator.'),
	(6, 'Print Design', 'Ma formation m’a amené à me former à Indesign. Par la suite, ces compétences m’ont permis de réaliser des revues et mes rapports.');
/*!40000 ALTER TABLE `skill_sets` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
