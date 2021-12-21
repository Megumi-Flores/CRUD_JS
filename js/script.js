//Variables para Persona
var Nombre, Ap_Paterno, Ap_Materno;
//Eventos Click
document.getElementById("crear").addEventListener("click", crearPersona);
document.getElementById("borrar_todo").addEventListener("click", borrarTodo);
document.getElementById("actualizar").addEventListener("click", actualizarPersona);
//Creando la base de datos cliente
const db = window.openDatabase('data', '1.0', 'data', 1 * 1024 * 1024);
//Crea la tabla Persona
db.transaction(t => t.executeSql(
    'create table if not exists persona (p_nombre TEXT, p_ap_paterno TEXT, p_ap_materno TEXT)'
));
mostrarPersona();
//Recibe los datos del formulario en las variables
function leerPersona() {
    Nombre = document.getElementById('nombre').value;
    Ap_Paterno = document.getElementById('ap_paterno').value;
    Ap_Materno = document.getElementById('ap_materno').value;
}
//Inserta las variables a la tabla Persona
function crearPersona() {
    leerPersona();
    db.transaction(t => t.executeSql(
        'insert into persona values (?, ?, ?)', [Nombre, Ap_Paterno, Ap_Materno]
    ));
    location.reload();
    mostrarPersona();
    document.getElementById("nombre").value = "";
    document.getElementById("ap_paterno").value = "";
    document.getElementById("ap_materno").value = "";
}
//Muestra en consola los datos de la tabla Persona
function mostrarPersona2() {
    db.transaction(t => t.executeSql(
        'select * from persona', [], (t, result) => console.log(result.rows)
    ));
}
//Muestra en consola los datos de la tabla Persona
function mostrarPersona() {
    db.transaction(t => t.executeSql(
        'select * from persona', [], function (t, results) {
            var tbody = document.getElementById("tbody");
            for (i = 0; i < results.rows.length; i++) {
                var row = results.rows.item(i);
                tbody.innerHTML += "<tr><td>" + (i + 1) + "</td><td>" + row.p_nombre + "</td><td>" + row.p_ap_paterno + "</td><td>" + row.p_ap_materno + '</td><td><button id="editar ' + (i + 1) + '" onclick="editarPersona()">Editar</button></td><td><button id="borrar">Borrar</button></td></tr>';
            }
        }
    ));
}
//Borra todos los datos de la tabla Persona
function borrarTodo() {
    db.transaction(t => t.executeSql(
        'delete from persona'
    ));
    location.reload();
    mostrarPersona();
}
function editarPersona() {
    document.getElementById('crear').style.display = 'none';
    document.getElementById('borrar_todo').style.display = 'none';
    document.getElementById('actualizar').style.display = '';
}
function actualizarPersona() {
    document.getElementById('crear').style.display = '';
    document.getElementById('borrar_todo').style.display = '';
    document.getElementById('actualizar').style.display = 'none';
}
