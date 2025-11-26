CREATE DATABASE sistema_asistencia;
USE sistema_asistencia;

CREATE TABLE profesores (
 id INT AUTO_INCREMENT PRIMARY KEY,
 nombre VARCHAR(100) NOT NULL,
 apellido VARCHAR(100) NOT NULL
);

CREATE TABLE cursos (
id INT AUTO_INCREMENT PRIMARY KEY,
anio VARCHAR(50) NOT NULL,
division VARCHAR(50) NOT NULL,
especialidad VARCHAR(50)
);

CREATE TABLE materias (
id INT AUTO_INCREMENT PRIMARY KEY,
nombre VARCHAR(100) NOT NULL,
curso_id INT,
profesor_id INT,
FOREIGN KEY (curso_id) REFERENCES cursos(id),
FOREIGN KEY (profesor_id) REFERENCES profesores(id)
);

CREATE TABLE alumnos (
id INT AUTO_INCREMENT PRIMARY KEY,
nombre VARCHAR(100) NOT NULL,
apellido VARCHAR(100) NOT NULL,
materia_id INT,
FOREIGN KEY (materia_id) REFERENCES materias(id)
);

CREATE TABLE asistencias (
id INT AUTO_INCREMENT PRIMARY KEY,
alumno_id INT NOT NULL,
tipo ENUM ('P', 'T', 'A', 'RA') NOT NULL,
fecha DATE NOT NULL,
hora TIME NOT NULL,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
FOREIGN KEY (alumno_id) REFERENCES alumnos(id)
);

INSERT INTO profesores (nombre, apellido) VALUES
('Santiago', 'Trini'),
('Camila', 'De la Puente'),
('Bel', 'Reynoso'),
('Alexis', 'De Reyes'),
('Mariana', 'Garcia'),
('Viviana', 'Bartucci'),
('Guillermo', 'Di tieri'),
('Marcelo', 'Garcia'),
('Javier', 'Diaz'),
('Mariana', 'Villaldo');

INSERT INTO cursos (anio, division, especialidad) VALUES 
 ('4', '4', 'Computacion'),
 ('4', '3', 'Computacion'),
 ('4', '2', 'Computacion'),
 ('4', '6', 'Computacion'),
 ('5', '2', 'Automotor'),
 ('4', '1', 'Computacion'),
 ('5', '6', 'Computacion'),
 ('5', '5', 'Computacion'),
 ('6', '2', 'Automotor'),
 ('6', '1', 'Computacion');

 INSERT INTO materias (nombre, curso_id, profesor_id) VALUES
 ('Proyecto Informatico',1, 1),
 ('Laboratorio de Algoritmos y Estructura de Datos',2, 2),
 ('Logica',3, 3),
 ('Organizacion de Computadoras',4, 4),
 ('Ingles',5, 5),
 ('Historia',6, 6),
 ('Geografia',7, 7),
 ('Lengua',8, 8),
 ('Base de Datos',9, 9),
 ('Matematica',10, 10);
 
INSERT INTO alumnos (nombre, apellido, materia_id) VALUES
('Luis', 'Gonzalez', 1),
('Ana', 'Rodríguez', 1),
('Carlos', 'Fernandez', 1),
('Javier', 'Martinez', 1),
('Diego', 'Perez', 1),
('Miguel', 'Díaz', 1),
('Elena', 'Torres', 1),
('Gabriel', 'Romero', 1),
('Anabel', 'Castañeda', 1),
('Valería', 'Soto', 1),
('Victor', 'Aguillar', 2),
('Ariel', 'Alvarez', 2),
('Leonel', 'Apaza', 2),
('Lucas', 'Brem', 2),
('Erik', 'Cornejo', 2),
('Alexis', 'Prado', 2),
('Esteban', 'Quispe', 2),
('Marcos', 'Maddonni', 2),
('Fausto', 'Venguria', 2),
('Kevin', 'Flores', 2),
('Cesar', 'Palacios', 3),
('Emilio', 'Salas', 3),
('Eduardo', 'Navarro', 3),
('Jose', 'Jimenez', 3),
('Isabel', 'Ibarra', 3),
('Agustín', 'Alonso', 3),
('Alberto', 'Paredes', 3),
('Gloria', 'Rios', 3),
('Cristian', 'Lara', 3),
('Humberto', 'Baez', 3),
('Lorena', 'Bravo', 4),
('Matías', 'Peralta', 4);








