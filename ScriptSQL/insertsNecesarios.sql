-- INSERT NECESARIOS
INSERT INTO `tipo_parque` (`cod_tipo`, `descripcion`) VALUES ('1', 'Nacionales'), ('2', 'Independientes');

INSERT INTO `servicio` (`cod_servicio`,`descripcion`) VALUES ('1','estacionamiento'), ('2','baños'), ('3','camping'), ('4','venta alimentos'), ('5','cabalgatas');

INSERT INTO `estado_ruta` (`cod_estado_ruta`, `descripcion`) VALUES ('1', 'Habilitada'), ('2', 'En mantención'), ('3', 'Fuera de servicio'), ('4', 'Trabajos en la ruta');

INSERT INTO `parque` (`cod_parque`,`cod_tipo`,`nombre`,`direccion`,`telefono`,`email`,`aforo`,`estado`,`horario`,`pagina_web`,`url_reserva`,`descripcion`) VALUES 
('1','1','Torres del Paine','Puerto Natales','(56-61) 2238581','torrespaine@gmail.com','300','1','Lun-Dom 8-19hrs','https://torresdelpaine.com/','https://www.aspticket.cl/','El Parque Nacional Torres de Paine es el parque nacional más importante de Chile. Se encuentra cerca de Los Andes, en el externo sur de Chile, en la Región de Magallanes y la Antártica chilena. Está situado a 154 kilómetros al noroeste de Puerto Natales y a 399 kilómetros de Punta Arenas. El parque está ubicado en el lado este del Glaciar Grey.'),
('2','2','Cerro Manquehue','Vía Roja 10300, Lo Curro','+569 8765 4321', 'cerromanquehue@gmail.com','100','1','Lun-Dom 8-19hrs',null,null,'El cerro Manquehue es un ícono dentro de las rutas de trekking en Santiago. Su privilegiada posición dentro de la ciudad sumado a la increíble vista desde su cumbre, dan como resultado que es una de las 10 rutas de más visitadas en la Región Metropolitana. Todos los días de la semana y a cualquier hora, es posible encontrarnos con gente subiendo y bajando el Manquehue.'),
('3','1','Monumento Natural Paposo Norte','Paposo, Taltal, Antofagasta', '+565 5238 3332', 'antofagasta.oirs@conaf.cl','80','1', 'Lun-Dom 8-19hrs',null,null, 'La unidad Monumento Natural Paposo Norte está ubicada administrativamente en la costa de la región, provincia y comuna de Antofagasta. Se ubica a 65 km al norte del poblado de Paposo. Su superficie es de 7.915.41 hectáreas. Fue creada el 26 de diciembre del 2013'),
('4','1','Parque Nacional Río Clarillo','Río Clarillo', '+56 8920 7016', 'carlos.valdenegro@conaf.cl','120','1', 'Lun-Dom 7-18hrs',null,null, 'La unidad Río Clarillo está ubicada en la comuna de Pirque, provincia Cordillera de la Región Metropolitana. Fue creada en 1982.'),
('5','1','Reserva Nacional Alacalufes', 'Magallanes y la Antártica Chilena', '+566 1241 1438', 'magallanes.oirs@conaf.cl', '100','1', 'Lun-Dom 8-20hrs',null,null, 'La Reserva Nacional Alacalufes (actualmente Parque Nacional Kawésqar) está ubicada en la Región de Magallanes y Antártica Chilena, comprende los archipiélagos occidentales de las provincias de Última Esperanza y Magallanes. Fue creada el 22 de julio de 1969 por D.S. Nº 263 del Ministerio de Agricultura.'),
('6','1','Reserva Nacional Laguna Torca', 'Ruta Cinco Sur, San Bernardo, Región Metropolitana', '+567 1222 4461', 'talca.oirs@conaf.cl', '100','1', 'Lun-Dom 7-18hrs',null,null, 'La unidad Laguna Torca está ubicada en la Región del Maule, provincia de Curico, comuna de Vichuquén. Fue creada el día 17 de octubre de 1985 por decreto: n.º 128, del Ministerio de Agricultura.');

INSERT INTO `estado` (`cod_estado`,`descripcion`) VALUES ('1','habilitado'), ('2','deshabilitado');

INSERT INTO `personal_app_tipo` (`cod_personal_app_tipo`,`descripcion`) VALUES ('1','admin');

INSERT INTO `personal_app` (`cod_personal_app`,`cod_personal_app_tipo`,`cod_estado`,`rut`,`nombres`,`apellidos`,`direccion`,`telefono`,`email`,`password`,`fech_crea`,`fech_mod`) VALUES ('1','1','1','1','ADMIN','ADMIN',NULL,NULL,'admintodorutas@gmail.com','admin123',NULL,NULL);