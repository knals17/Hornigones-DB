-- MySQL dump 10.13  Distrib 8.0.13, for Win64 (x86_64)
--
-- Host: localhost    Database: electron_crud
-- ------------------------------------------------------
-- Server version	8.0.13

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `proveedores`
--

DROP TABLE IF EXISTS `proveedores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `proveedores` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(45) NOT NULL,
  `rif` varchar(20) DEFAULT NULL,
  `Material` varchar(45) NOT NULL,
  `precio` decimal(11,2) NOT NULL,
  `cantidad` decimal(5,1) DEFAULT '0.0',
  `saldo` decimal(12,2) DEFAULT '0.00',
  `factor` decimal(2,1) DEFAULT '0.0',
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `proveedores`
--

LOCK TABLES `proveedores` WRITE;
/*!40000 ALTER TABLE `proveedores` DISABLE KEYS */;
INSERT INTO `proveedores` VALUES (1,'Octavio Ramos','j235311549','Granza',2000.00,0.0,0.00,2.0),(2,'Luis Canales','23531154','Granza',90000.00,0.0,0.00,0.0),(3,'Pedro Perez','78125612','Granza',30000.00,0.0,0.00,0.0),(4,'Cristaleria','7456354','Piedra',3500.00,0.0,0.00,0.0),(5,'Cristaleria','2452534','Granza',3000.00,0.0,0.00,0.0),(6,'Jose Hernandez','1231241','Flete',4000.00,0.0,0.00,0.0),(7,'Jose Martinez','123456789','Agua',10000.00,0.0,0.00,0.0),(8,'Cerro Azul','12423545','Cemento',0.00,0.0,0.00,0.0),(9,'Jose Hernadez Cemento','123545','Flete',10000.00,0.0,0.00,0.0);
/*!40000 ALTER TABLE `proveedores` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-02-07 11:22:29
