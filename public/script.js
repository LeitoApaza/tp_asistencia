document.addEventListener('DOMContentLoaded', cargarCursos);

async function cargarCursos() {
   try {
      const response = await fetch('/api/cursos');
      const cursos = await response.json();

      const select = document.getElementById('select-curso');
      select.innerHTML = '<option value"">-Seleccionar Curso-</option>';

      cursos.forEach(curso => {
        const option = document.createElement('option');
        option.value = curso.id;
        option.textContent = `${curso.anio}° ${curso.division} - ${curso.especialidad}`;
        select.appendChild(option);

       });
    } catch(error) {
       mostrarMensaje('Error cargando cursos', 'error');
    }

}

async function cargarMaterias() {
   const cursoId = document.getElementById('select-curso').value;
   const materiaSelect = document.getElementById('select-materia');

   if (!cursoId) {
      materiaSelect.disabled = true;
      materiaSelect.innerHTML ='<option value="">-Primero elige un Curso-</option>';
      return;
   }

   try {
      const response = await fetch(`/api/materias/${cursoId}`);
      const materias = await response.json();

      materiaSelect.innerHTML = '<option value="">-Seleccionar Materia-</option>';
      materiaSelect.disabled = false;

      materias.forEach(materia => {
        const option = document.createElement('option');
        option.value = materia.id;
        option.textContent = materia.nombre;
        materiaSelect.appendChild(option);

      });

   } catch (error) {
      mostrarMensaje('Error cargando materias', 'error');
   }

} 

async function cargarAlumnos() {
  const materiaId = document.getElementById('select-materia').value;

  if (!materiaId) {
     document.getElementById('lista-alumnos').innerHTML = '<p>Selecciona una materia para ver los alumnos.</p>';
     document.getElementById('titulo-materia').style.display = 'none';
     document.querySelector('.btn-ver-asistencias').style.display = 'none';
     return;
  }

  try {
    const response = await fetch(`/api/alumnos/materia/${materiaId}`);
    const alumnos = await response.json();

    const lista = document.getElementById('lista-alumnos');

    if (alumnos.length ===0) {
       lista.innerHTML = '<p>No hay alumnos en esta materia.</p>';
       return;

    }
    
    const tituloDiv = document.getElementById('titulo-materia');
    const tituloTexto = document.getElementById('texto-titulo');
    tituloTexto.textContent = `${alumnos[0].anio}° ${alumnos[0].division} ${alumnos[0].especialidad} | ${alumnos[0].materia_nombre}}`;
    tituloDiv.style.display = 'block';

    document.querySelector('.btn-ver-asistencias').style.display = 'flex';

    lista.innerHTML ='';
    alumnos.forEach(alumno => {
       const div = document.createElement('div');
       div.className = 'alumno-item';
       div.innerHTML = `
       <div class="alumno-info">
         <strong>${alumno.nombre} ${alumno.apellido}</strong>
       </div>
       <div class="botones-asistencia">
        <button class="btn-presente" onclick="registrarAsistencia(${alumno.id}, 'P')">Presente</button>
        <button class="btn-ausente" onclick="registrarAsistencia(${alumno.id}, 'A')">Ausente</button>
        <button class="btn-tarde" onclick="registrarAsistencia(${alumno.id}, 'T')">Tarde</button>
        <button class="btn-ra" onclick="registrarAsistencia(${alumno.id}, 'RA')">Retiro Ant.</button>
       </div>

       `;
       lista.appendChild(div);
    });


   } catch (error) {
      mostrarMensaje('Error cargando alumnos', 'error');
   }

}

async function registrarAsistencia(alumnoId, tipo) {
   try {
     const response = await fetch('/api/asistencia', {
         method: 'POST',
         headers: {
        'Content-Type': 'application/json'
         },
         body: JSON.stringify({
         alumno_id: alumnoId,
         tipo: tipo
   
         })

        });

        const resultado = await response.json();

       if (resultado_success) {
           mostrarMensaje(`Asistencia registrada correctamente`, 'success');
           cargarAsistenciasHoy();

       } else {
           mostrarMensaje(`Error: ${resultado.error}`, 'error');
         }

   } catch (error) {
      mostrarMensaje('Error de conexion', 'error');
   } 

}

async function cargarAsistenciasHoy() {
   const materiaId = document.getElementById('select-materia').value;
   
   if (!materiaId){
       document.getElementById('asistencias-hoy').innerHTML = '<p>Selecciona una materia primero.</p>';
       return;
   }

   try {
    const response = await fetch(`/api/asistencia/hoy/materia/${materiaId}`);
    const asistencias = await response.json();

    const contenedor = document.getElementById('asistencias-hoy');

    if (asistencias.length === 0) {
       contenedor.innerHTML = '<p>No hay asistencias registradas hoy.</p>';
       return;
    }

    let html = '';
    asistencias.forEach(asistencia => {
       const claseEstado = `estado-${asistencia.tipo.toLowerCase()}`;
       const textoEstado = 
          asistencia.tipo === 'P' ? 'PRESENTE':
          asistencia.tipo === 'A' ? 'AUSENTE':
          asistencia.tipo === 'T' ? 'TARDE' :
          'RETIRO ANT';

        html += `
          <div class="asistencia-item">
           <div>
             <strong>${asistencia.nombre} ${asistencia.apellido}</strong>
              -<span class="${claseEstado}">${textoEstado}</span>
              </div>
              <div>${asistencia.hora}</div>
          </div>        
        
        `;
 
      });
      
      contenedor.innerHTML = html;

 } catch (error) {
   document.getElementById('asistencias-hoy').innerHTML = 
    '<p style="color: red;">Error cargando asistencias</p>';
 }

}

function mostrarMensaje(mensaje , tipo) {
   const divMensaje = document.getElementById('mensaje');
   divMensaje.textContent = mensaje;
   divMensaje.style.display= 'block';
   divMensaje.style.background = tipo === 'success' ? '#d4edda' : '#f8d7da';
   divMensaje.style.color = tipo === 'success' ? '#155724' : '#721c24' ;
   divMensaje.style.border = tipo === 'success' ? '1px solid #c3e6cb' : '1px solid #f5c6cb';
   
   setTimeout(() => {
      divMensaje.style.display = 'none';
   }, 3000);

}