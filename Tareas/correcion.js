// variables globales
let usuario = [];
// obtener referencia del DOM a los elementos del HTML principales
const form = document.getElementById('formUsuario');
const tabla = document.getElementById('tablaUsuarios');
const inputArchivo = document.getElementById('importarJSON');
const btnDescargar = document.getElementById('descargarBtn');

function generarID() {
    return usuario.length > 0 ? Math.max(...usuario.map(u => u.id)) + 1 : 1;
}

// Eventos del formulario
form.addEventListener('submit', function (e) {
    e.preventDefault();
    const nombre = document.getElementById('nombre').value.trim();
    const email = document.getElementById('correo').value.trim();
    // AGREGAR NUEVO USUARIO AL ARRAY CON EL ID GENERADO
    usuario.push({ 
        id: generarID(), 
        nombre, 
        email 
    });
    form.reset();
    mostrarUsuarios();
});

// FUncion de visualizacion
// mostrar todos los usuarios en la tabla
// recorrer acda usuario en el array y crear una fila en la tabla con sus datos
// crear la fila con los datos para la edicion y eliminacion de cada usuario
// agregar boton para eliminar y asignar evento para eliminarlo del array y actualizar la tabla

function mostrarUsuarios() {
    tabla.innerHTML = '';
    usuario.forEach((user, index) => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${user.id}</td>
            <td contenteditable onblur="editarCampo(${index}, 'nombre',this.textContent)">${user.nombre}</td>
            <td contenteditable onblur="editarCampo(${index}, 'correo',this.textContent)">${user.email}</td>
            <td>
                <button onclick="eliminarUsuario(${user.id})">Eliminar</button>
            </td>
        `
        tabla.appendChild(fila);    
    });
}

function editarCampo(index, campo, valor) {
    usuario[index][campo] = valor.trim();
}

function eliminarUsuario(id) {
    const index = usuario.findIndex(user => user.id === id);
    if (index !== -1 && confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
        usuario.splice(index, 1);
        mostrarUsuarios();
    }
}

// Funciones para importar y exportar JSON
inputArchivo.addEventListener('change', function (e) {
    const archivo = e.target.files[0];
    const lector = new FileReader();

    lector.onload = function (e) {
        try {
            const datos = JSON.parse(e.target.result);
            if (Array.isArray(datos)) {
                usuario = datos;
                mostrarUsuarios();
            } else {
                alert('El archivo JSON no contiene un array de usuarios.');
            }
        } catch (error) {
            alert('Error al importar el archivo JSON: ' + error.message);
        }
    };

    lector.readAsText(archivo);
});

// agregamos un evento al boton de descargar para generar un archivo JSON con el contenido del 
// array de usuarios y descargarlo al hacer clic en el boton
btnDescargar.addEventListener('click', function() {
    const contenidoJSON = JSON.stringify(usuario, null, 2);
    // creacion de un blob con el contenido JSON
    // blob es un objeto que representa un archivo de datos, en este caso el contenido JSON
    const blob = new Blob([contenidoJSON], { type: 'application/json' });
    // crear un enlace para descargar el blob
    const url = URL.createObjectURL(blob);
    // crear un enlace de descarga <a> y similar un clic para iniciar la descarga
    const a = document.createElement('a');
    a.href = url;
    a.download = 'usuarios.json';
    a.click();
    // liberar el objeto URL después de la descarga
    URL.revokeObjectURL(url);
});