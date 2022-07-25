-- MySQL dump 10.13  Distrib 8.0.29, for macos12 (x86_64)
--
-- Host: 127.0.0.1    Database: group_dev
-- ------------------------------------------------------
-- Server version	8.0.29

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Posts`
--

DROP TABLE IF EXISTS `Posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Posts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(500) NOT NULL,
  `UserId` int DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `message` varchar(900) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `UserId` (`UserId`),
  CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `Users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Posts`
--

LOCK TABLES `Posts` WRITE;
/*!40000 ALTER TABLE `Posts` DISABLE KEYS */;
INSERT INTO `Posts` VALUES (1,'Bienvenue à tous !',5,'http://localhost:3000/images/forum-g6bb56436e_1280.jpg1658756251237.jpg','Nous avons le plaisir de lancer aujourd\'hui, le tout nouveau réseau social de la société. Cet outil est là pour vous,. N\'hésitez pas à en échanger, discuter, partager avec vos collègues ! ','2022-07-25 13:37:31','2022-07-25 13:37:31'),(2,'Vacances !!!!',4,'http://localhost:3000/images/villadetonystark-imgprofil.jpeg1658757679423.jpg','Plus que quelques jours avant les vacances et cette année, j\'ai décidé de m\'offrir une petite pause bien méritée, dans un petit paradis','2022-07-25 14:01:19','2022-07-25 14:01:19'),(3,'Objet trouvé',2,'http://localhost:3000/images/21292.jpeg1658758088009.jpg','Trouvé ces clés, aujourd\'hui dans la salle de pause. Je les ai déposé au service RH','2022-07-25 14:08:08','2022-07-25 14:08:08'),(4,'Service P.I - Arrivé de Sam',3,'http://localhost:3000/images/istockphoto-180819641-612x612.jpeg1658758568460.jpg','Le service Protection Incendie a le plaisir de vous annoncer l\'arrivée d\'un nouveau stagiaire, Sam, dans notre service pour une durée de 6 semaines. Merci de lui réserver l\'accueil chaleureux dont vous avez l\'habitude','2022-07-25 14:16:08','2022-07-25 14:16:08'),(5,'Clés retrouvés !',5,NULL,'Merci à James d\'avoir rapporté mes clés au service RH ! ','2022-07-25 14:17:33','2022-07-25 14:31:49');
/*!40000 ALTER TABLE `Posts` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-07-25 16:53:41
