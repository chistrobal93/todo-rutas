CREATE TABLE `personal_app` (
  `cod_personal_app` int PRIMARY KEY AUTO_INCREMENT,
  `cod_personal_app_tipo` int,
  `cod_estado` int,
  `rut` int NOT NULL,
  `nombres` varchar(50) NOT NULL,
  `apellidos` varchar(50) NOT NULL,
  `direccion` varchar(50),
  `telefono` varchar(20),
  `email` varchar(100) NOT NULL,
  `password` varchar(20) NOT NULL,
  `fech_crea` date,
  `fech_mod` date
);

CREATE TABLE `personal_app_tipo` (
  `cod_personal_app_tipo` int PRIMARY KEY AUTO_INCREMENT,
  `descripcion` varchar(30) NOT NULL
);

CREATE TABLE `registro_llamada` (
  `cod_llamada` int PRIMARY KEY AUTO_INCREMENT,
  `cod_personal_app` int,
  `telefono` varchar(20) NOT NULL,
  `fech_ini` datetime NOT NULL,
  `fech_fin` datetime NOT NULL,
  `nom_cli` varchar(30)
);

CREATE TABLE `registro_correo` (
  `cod_correo` int PRIMARY KEY AUTO_INCREMENT,
  `cod_personal_app` int,
  `email` varchar(100) NOT NULL,
  `fecha` datetime NOT NULL
);

CREATE TABLE `estado` (
  `cod_estado` int PRIMARY KEY AUTO_INCREMENT,
  `descripcion` varchar(30) NOT NULL
);

CREATE TABLE `personal_parque` (
  `cod_personal` int PRIMARY KEY AUTO_INCREMENT,
  `cod_parque` int,
  `cod_personal_parque_tipo` int,
  `cod_estado` int,
  `rut` int NOT NULL,
  `nombres` varchar(50) NOT NULL,
  `apellidos` varchar(50) NOT NULL,
  `direccion` varchar(50),
  `telefono` varchar(20),
  `email` varchar(100) NOT NULL,
  `password` varchar(20) NOT NULL,
  `fech_crea` date,
  `fech_mod` date
);

CREATE TABLE `personal_parque_tipo` (
  `cod_personal_parque_tipo` int PRIMARY KEY AUTO_INCREMENT,
  `descripcion` varchar(30) NOT NULL
);

CREATE TABLE `parque` (
  `cod_parque` int PRIMARY KEY AUTO_INCREMENT,
  `cod_tipo` int,
  `nombre` varchar(100) NOT NULL,
  `direccion` varchar(50) NOT NULL,
  `telefono` varchar(20) NOT NULL,
  `email` varchar(100) NOT NULL,
  `aforo` int NOT NULL,
  `estado` int NOT NULL,
  `horario` varchar(300) NOT NULL,
  `pagina_web` varchar(150),
  `url_reserva` varchar(255),
  `descripcion` text
);

CREATE TABLE `tipo_parque` (
  `cod_tipo` int PRIMARY KEY AUTO_INCREMENT,
  `descripcion` varchar(15)
);

CREATE TABLE `servicio_parque` (
  `cod_servicio_parque` int PRIMARY KEY AUTO_INCREMENT,
  `cod_parque` int,
  `cod_servicio` int
);

CREATE TABLE `servicio` (
  `cod_servicio` int PRIMARY KEY AUTO_INCREMENT,
  `descripcion` varchar(30) NOT NULL
);

CREATE TABLE `mapa` (
  `cod_mapa` int PRIMARY KEY AUTO_INCREMENT,
  `cod_parque` int,
  `mapa` varchar(100)
);

CREATE TABLE `ruta` (
  `cod_ruta` int PRIMARY KEY AUTO_INCREMENT,
  `cod_mapa` int,
  `cod_estado_ruta` int,
  `nombre` varchar(50) NOT NULL,
  `distancia` double,
  `dificultad` int
);

CREATE TABLE `estado_ruta` (
  `cod_estado_ruta` int PRIMARY KEY AUTO_INCREMENT,
  `descripcion` varchar(30) NOT NULL
);

CREATE TABLE `noticia` (
  `cod_noticia` int PRIMARY KEY AUTO_INCREMENT,
  `titulo` varchar(50) NOT NULL,
  `texto` varchar(500) NOT NULL,
  `fech_crea` date
);

ALTER TABLE `personal_app` ADD FOREIGN KEY (`cod_personal_app_tipo`) REFERENCES `personal_app_tipo` (`cod_personal_app_tipo`);

ALTER TABLE `registro_llamada` ADD FOREIGN KEY (`cod_personal_app`) REFERENCES `personal_app` (`cod_personal_app`);

ALTER TABLE `registro_correo` ADD FOREIGN KEY (`cod_personal_app`) REFERENCES `personal_app` (`cod_personal_app`);

ALTER TABLE `personal_app` ADD FOREIGN KEY (`cod_estado`) REFERENCES `estado` (`cod_estado`);

ALTER TABLE `personal_parque` ADD FOREIGN KEY (`cod_estado`) REFERENCES `estado` (`cod_estado`);

ALTER TABLE `personal_parque` ADD FOREIGN KEY (`cod_personal_parque_tipo`) REFERENCES `personal_parque_tipo` (`cod_personal_parque_tipo`);

ALTER TABLE `personal_parque` ADD FOREIGN KEY (`cod_parque`) REFERENCES `parque` (`cod_parque`);

ALTER TABLE `parque` ADD FOREIGN KEY (`cod_tipo`) REFERENCES `tipo_parque` (`cod_tipo`);

ALTER TABLE `servicio_parque` ADD FOREIGN KEY (`cod_parque`) REFERENCES `parque` (`cod_parque`);

ALTER TABLE `servicio_parque` ADD FOREIGN KEY (`cod_servicio`) REFERENCES `servicio` (`cod_servicio`);

ALTER TABLE `mapa` ADD FOREIGN KEY (`cod_parque`) REFERENCES `parque` (`cod_parque`);

ALTER TABLE `ruta` ADD FOREIGN KEY (`cod_mapa`) REFERENCES `mapa` (`cod_mapa`);

ALTER TABLE `ruta` ADD FOREIGN KEY (`cod_estado_ruta`) REFERENCES `estado_ruta` (`cod_estado_ruta`);