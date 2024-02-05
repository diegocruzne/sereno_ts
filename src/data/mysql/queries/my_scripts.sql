create database serenazgo;
use serenazgo;

SHOW VARIABLES LIKE 'version%';

-------------------------- Tipo de usuario --------------------------
create table tipo_usu(
	id_tipo_us int auto_increment primary key,
    nombre_tipo VARCHAR(50) NOT NULL
);

SELECT * FROM tipo_usu;


-------------------------- Usuario --------------------------
create table usuario(
	id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    dni VARCHAR(8) NOT NULL,
    nombre VARCHAR(40) NOT NULL,
    apellido VARCHAR(40) NOT NULL,
    nacimiento DATE NOT NULL,
    contrasena VARCHAR(200) NOT NULL,
    correo VARCHAR(50),
    direccion VARCHAR(100),  
    telefono VARCHAR(20),
    sexo VARCHAR(20) NOT NULL,
    adicional VARCHAR(50),
    foto VARCHAR(50),
    fk_tipo_us INT,
    FOREIGN KEY (fk_tipo_us) REFERENCES tipo_usu(id_tipo_us)
);

SELECT id_usuario FROM usuario WHERE dni = '' OR correo = '' OR telefono = '9876543211';
alter table usuario alter column foto set default 'D:\Proyectos\front_sereno\src\assets\users';
-- Insertar datos en la tabla usuario
INSERT INTO usuario (dni, nombre, apellido, nacimiento, contrasena, correo, direccion, telefono, sexo, adicional, foto, fk_tipo_us)
VALUES
('87654321', 'Karla', 'Nuñez', '1995-03-25', '$10$o/GHMkLW5SaCNBUt.PsHAehniih57XI97uWqWJvs.hIVPy1E6Ehlu', 
'karla@example.com', 'Plaza Central 789', '555-7777', 'femenino', 'Más información', 'foto3.jpg', 3);

DELETE FROM usuario WHERE id_usuario >= 15 AND id_usuario <= 100;

UPDATE usuario SET fk_tipo_us = 1 WHERE id_usuario = 1;
select * from usuario where id_usuario = 22;
select * from usuario order by id_usuario desc;
DESCRIBE usuario;

UPDATE usuario SET dni = ?, nombre = ?, apellido = ?, nacimiento = ?, correo = ?, direccion = ?, telefono = ?, sexo = ?, contrasena = ?, fk_tipo_us = ?
WHERE id_usuario = ?;
-------------------------- Turno --------------------------
CREATE TABLE turno (
    id_turno INT NOT NULL,
    turno VARCHAR(200) NOT NULL,
    PRIMARY KEY (id_turno)
); 
select * from turno;
insert into turno (id_turno, turno) values (3, 'Madrugada');


-------------------------- Tipo de unidad --------------------------
CREATE TABLE tipo_unidad (
    id_tipo_unidad INT AUTO_INCREMENT PRIMARY KEY,
    tipo_unidad VARCHAR(200) NOT NULL
);

SELECT * FROM tipo_unidad;
INSERT INTO tipo_unidad (tipo_unidad) VALUES ('Camión');


-------------------------- Unidad -----------------------------
CREATE TABLE unidad (
    id_unidad INT AUTO_INCREMENT PRIMARY KEY,
    placa VARCHAR(15) NOT NULL,
    descripcion VARCHAR(50),
    estado BOOLEAN NOT NULL DEFAULT 1,
    fk_tipo_unidad INT,
    imagen VARCHAR(250) DEFAULT 'unidad.jpg',
    UNIQUE (placa),
    FOREIGN KEY (fk_tipo_unidad) REFERENCES tipo_unidad (id_tipo_unidad)
);

SELECT * FROM unidad;

INSERT INTO unidad (placa, descripcion, fk_tipo_unidad)
VALUES ('xyz-123', 'sin descripción', 1);

SELECT unidad.id_unidad,
CONCAT(tipo_unidad.tipo_unidad, ' - ', unidad.placa) as unidad_list,
STRING_AGG(patrullaje.id_patrullaje, ', ') AS patrullajes_pertenecientes
FROM unidad LEFT JOIN patrullaje ON unidad.id_unidad = patrullaje.fk_unidad
INNER JOIN tipo_unidad ON unidad.fk_tipo_unidad = tipo_unidad.id_tipo_unidad
GROUP BY unidad.id_unidad, CONCAT(tipo_unidad.tipo_unidad, ' - ', unidad.placa)
ORDER BY CONCAT(tipo_unidad.tipo_unidad, ' - ', unidad.placa);

-------------------------- Patrullaje --------------------------
CREATE TABLE patrullaje (
    id_patrullaje INT AUTO_INCREMENT PRIMARY KEY,
    descripcion VARCHAR(200),
    fk_turno INT NOT NULL,
    fk_unidad INT NOT NULL,
    fecha_creacion DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    estado TINYINT NOT NULL DEFAULT 1
);
ALTER TABLE patrullaje ADD CONSTRAINT fk_turno FOREIGN KEY (fk_turno) REFERENCES turno (id_turno);
ALTER TABLE patrullaje ADD CONSTRAINT fk_unidad FOREIGN KEY (fk_unidad) REFERENCES unidad (id_unidad);

select * from patrullaje;
select * from turno;

INSERT INTO patrullaje (descripcion, fk_turno, fk_unidad) VALUES ('grupo', 1, 1);

SELECT id_patrullaje, patrullaje.descripcion, turno.turno, unidad.placa, tipo_unidad.tipo_unidad,
CASE
	WHEN patrullaje.estado = 1 THEN 'Activo'
	WHEN patrullaje.estado = 0 THEN 'Inactivo'
END AS estado, COUNT(sereno.id_sereno) AS num_sere
FROM patrullaje LEFT JOIN sereno ON patrullaje.id_patrullaje = sereno.fk_patrullaje
INNER JOIN turno ON patrullaje.fk_turno = turno.id_turno
INNER JOIN unidad ON patrullaje.fk_unidad = unidad.id_unidad
INNER JOIN tipo_unidad ON unidad.fk_tipo_unidad = tipo_unidad.id_tipo_unidad
GROUP BY id_patrullaje, patrullaje.descripcion, turno.turno, unidad.placa, tipo_unidad.tipo_unidad, estado
ORDER BY num_sere ASC;

SELECT * FROM patrullaje;

-------------------------- Sereno --------------------------
CREATE TABLE sereno (
    id_sereno INT AUTO_INCREMENT PRIMARY KEY,
    dni VARCHAR(8) NOT NULL,
    nombre VARCHAR(50) NOT NULL,
    apellidos VARCHAR(50) NOT NULL,
    genero TINYINT NOT NULL,
    celular VARCHAR(20),
    correo VARCHAR(30),
    direccion VARCHAR(30),
    nacimiento DATE NOT NULL,
    imagen VARCHAR(100),
    fk_patrullaje INT NULL,
    CONSTRAINT FK_Sereno_Patrullaje FOREIGN KEY(fk_patrullaje) REFERENCES patrullaje(id_patrullaje)
);

SELECT * FROM sereno;

SELECT id_sereno, dni, nombre, apellidos, genero, celular, correo, direccion, nacimiento, imagen, 
YEAR(CURDATE()) - YEAR(nacimiento) AS edad, 
fk_patrullaje from sereno;

INSERT INTO sereno (dni, nombre, apellidos, genero, celular, correo, direccion, nacimiento)
VALUES ('75115452', 'diego', 'cruz', 1, '945098055', 'diego@gmail.com', 'calle 123', '1996-12-30');

UPDATE sereno SET imagen = 'user.png' WHERE id_sereno = 5;

-------------- Tipo de delitos ----------
CREATE TABLE tipo_delito(
	id_tipo_delito INT AUTO_INCREMENT PRIMARY KEY,
    tipo_delito VARCHAR(50)
);

SELECT * FROM tipo_delito;

----------------- Delito -------------------
CREATE TABLE delito(
	id_delito INT AUTO_INCREMENT PRIMARY KEY,
    delito VARCHAR(60),
    tipo_delito_fk INT NOT NULL,
    CONSTRAINT FK_TIPO_DELITO FOREIGN KEY(tipo_delito_fk) REFERENCES tipo_delito(id_tipo_delito)
);

SELECT * FROM tipo_delito;
SELECT * FROM delito;

SELECT td.tipo_delito AS tipo_delito, d.id_delito AS id, d.delito AS nombre
FROM tipo_delito td JOIN delito d ON td.id_tipo_delito = d.tipo_delito_fk;

-------------------------- Persona ------------------------
CREATE TABLE persona(
	id_persona INT AUTO_INCREMENT PRIMARY KEY,
    dni CHAR(8) UNIQUE NOT NULL,
    nombres VARCHAR(50) NOT NULL,
    apellidos VARCHAR(50) NOT NULL,
    fecha_naci DATE NOT NULL,
    sexo VARCHAR(20) NOT NULL,
    direccion VARCHAR(30) NULL,
    telefono VARCHAR(30) NULL,
    correo VARCHAR(30) NULL
);

SELECT * FROM persona;

-------------------- Denuncia -------------------------
CREATE TABLE denuncia(
	id_denuncia INT AUTO_INCREMENT PRIMARY KEY,
    detalles VARCHAR(500) NULL,
    direccion VARCHAR(150) NOT NULL,
    fecha DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    delito_fk INT NOT NULL REFERENCES delito(id_delito),
    denunciante_fk INT NULL REFERENCES persona(id_persona),
    usuario_fk INT NOT NULL REFERENCES usuario(id_usuario),
    patrullaje_fk INT NULL REFERENCES patrullaje(id_patrullaje)
);

ALTER TABLE denuncia ADD estado VARCHAR(50) NOT NULL;

INSERT INTO denuncia (detalles, direccion, fecha, delito_fk, denunciante_fk, usuario_fk, patrullaje_fk, lat, lng)
VALUES
('Robo de celular', 'Calle 10 # 20-30',  '2023-12-01 18:00:00', 1, NULL, 1, NULL, -6.771574591486471, -79.83866337221008);

SELECT * FROM denuncia order by id_denuncia desc;

UPDATE denuncia SET estado = 'atendido' WHERE id_denuncia = 67;









