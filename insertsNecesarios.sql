-- INSERT NECESARIOS
INSERT INTO `tipo_parque` (`cod_tipo`, `descripcion`) VALUES ('1', 'Nacionales');
INSERT INTO `tipo_parque` (`cod_tipo`, `descripcion`) VALUES ('2', 'Independientes');

INSERT INTO `servicio` (`cod_servicio`,`descripcion`) VALUES ('1','estacionamiento');
INSERT INTO `servicio` (`cod_servicio`,`descripcion`) VALUES ('2','baños');
INSERT INTO `servicio` (`cod_servicio`,`descripcion`) VALUES ('3','camping');
INSERT INTO `servicio` (`cod_servicio`,`descripcion`) VALUES ('4','venta alimentos');
INSERT INTO `servicio` (`cod_servicio`,`descripcion`) VALUES ('5','cabalgatas');

INSERT INTO `parque` VALUES ('1','1','Torres del Paine','+569 1234 5678','torrespaine@gmail.com','300','1','Lun-Dom 8-19hrs','https://torresdelpaine.com/','https://www.aspticket.cl/','El Parque Nacional Torres de Paine es el parque nacional más importante de Chile. Se encuentra cerca de Los Andes, en el externo sur de Chile, en la Región de Magallanes y la Antártica chilena. Está situado a 154 kilómetros al noroeste de Puerto Natales y a 399 kilómetros de Punta Arenas. El parque está ubicado en el lado este del Glaciar Grey. Hasta 1959, cuando fue fundado como Parque Nacional de Turismo Lago Grey, la principal actividad de la zona era la ganadería. Entonces tenía poca presencia turísticas, la cual aumentaría después de esa fecha. En abril de 1970 añadió 11.000 nuevas hectáreas a su terreno protegido. Fue entonces cuando adoptó el nombre de Parque Nacional de Torres del Paine. En 1978 fue declarado Reserva de la Biosfera por la Unesco.');
INSERT INTO `parque` VALUES ('2','2','Cerro Manquehue','+569 8765 4321', 'cerromanquehue@gmail.com','100','1','Lun-Dom 8-19hrs',null,null,'El cerro Manquehue es un ícono dentro de las rutas de trekking en Santiago. Su privilegiada posición dentro de la ciudad sumado a la increíble vista desde su cumbre, dan como resultado que es una de las 10 rutas de más visitadas en la Región Metropolitana. Todos los días de la semana y a cualquier hora, es posible encontrarnos con gente subiendo y bajando el Manquehue.');