CREATE DATABASE sistema_asistencia;
USE sistema_asistencia;

CREATE TABLE profesores (
 id INT AUTO_INCREMENT PRIMARY KEY,
 nombre VARCHAR(100) NOT NULL,
 apellido VARCHAR(100) NOT NULL,
 
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

