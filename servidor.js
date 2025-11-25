const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');



const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(morgan('combined'));
app.use(express.static('public'));

const connection = mysql.createConnection({
   host: 'localhost',
   user: 'root',
   password: '',
   database: 'sistema_asistencia',
   port: 3306
});

connection.connect((err) => {
  if (err) {
    console.error('Error Conectado a Mysql', err);
     return;
     
  }
   console.log('Conectado a Mysql - Base: sistema_asistencia');

});

app.get('/', (req, res) => {
   res.sendFile(path.join(__dirname, 'public', 'index.html'));

});

app.get('/api/cursos', (req, res) => {
    const query = 'SELECT * FROM cursos ORDER BY anio, division';

        connection.query(query, (err, results) => {
       if (err) {
         console.error('Error en consulta cursos:', err);
         res.status(500).json({error: 'Error del servidor'});
         return;
       }
       res.json(results);

   });

});

app.get('/api/materias/:curso_id', (req, res) => {
  const query = `
     SELECT m.*, p.nombre as profesor_nombre, p.apellido as profesor_apellido
     FROM materias m
     LEFT JOIN profesores p ON m.profesor_id = p.id
     WHERE m.curso_id = ?
     ORDER BY m.nombre
     
     `;

  connection.query(query, [req.params.curso_id], (err, results) => {
     if (err) {
      console.error('Error en consulta materias', err);
      console.error('Detalle del error', err.sqlMessage);
      res.status(500).json({error: 'Error del servidor'});
      return;
     }
       res.json(results);

  });

});


app.get('/api/alumnos/materia/:materia_id', (req, res) => {
  const materiaId = req.params.materia_id;

  const query = `
      SELECT
       a.id, a.nombre, a.apellido,
       m.nombre as materia_nombre,
       c.anio, c.division, c.especialidad,
       p.nombre as profesor_nombre, p.apellido as profeso_apellido
       FROM alumnos a
       LEFT JOIN materias m ON a.materia_id = m.id
       LEFT JOIN cursos c ON m.curso_id = c.id
       LEFT JOIN profesores p ON m.profesor_id = p.id
       WHERE a.materia_id = ?
       ORDER BY a.apellido, a.nombre

        `;
    
  connection.query(query, [materiaId],(err, results) => {
      if (err) {
          console.error('Error en consulta alumnos:', err);
          res.status(500).json({error: 'Error del Servidor'});
          return;
      }
      res.json(results);

  });

});

app.post('/api/asistencia', (req, res) => {
   const { alumno_id, tipo} = req.body;

   if (!alumno_id || !tipo) {
        return res.status(400).json({error: 'Faltan datos requeridos'});
    }
 
   const fecha = new Date().toISOString().split('T')[0];
   const hora = new Date().toTimeString().split('')[0];
   
   const query = 'INSERT INTO asistencias (alumno_id, tipo, fecha, hora) VALUES (?, ?, ?, ?)';

   connection.query(query, [alumno_id, tipo, fecha, hora], (err, results) => {
     if (err) {
        console.error('Error registrando asistencia:', err);
        res.status(500).json({error: 'Error del servidor'});
        return;

      } 
      res.json({
        success: true,
        message: 'Asistencia registrada',
        id: results.insertId
      });  
   
    });

});

app.get('/api/asistencias/hoy/materia/:materia_id', (req, res) => {
   const materiaId = req.params.materia_id;  
   const hoy = new Date().toISOString().split('T')[0];

    const query = `
     SELECT  
      a.nombre, a.apellido,
      ast.tipo, ast.hora
      FROM asistencias ast
      JOIN alumnos a ON ast.alumnos_id = a.id
      WHERE ast.fecha = ? AND a.materia_id = ?
      ORDER BY ast.hora DESC 
      `;
       
  connection.query(query, [hoy, materiaId], (err, results) => {
     if (err) {
        console.error('Error obteniendo asistencias:', err);
        res.status(500).json({error: 'Error del Servidor'});
        return;    
      }
      res.json(results);

  }); 

});

app.listen(PORT, () => {
 console.log('Servidor ejecutandose en https://localhost:${PORT}');
});