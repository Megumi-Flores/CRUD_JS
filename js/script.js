//Variables para Persona
var Nombre, Ap_Paterno, Ap_Materno;
//Creando la base de datos cliente
const db = window.openDatabase('data', '1.0', 'data', 1 * 1024 * 1024);
//Eventos Click
document.getElementById("crear").addEventListener("click", crearPersona);//Boton crear
document.getElementById("borrar_todo").addEventListener("click", borrarTodo);//Boton Borrar todo
//Crea la tabla Persona dentro de la BD
db.transaction(t => t.executeSql(
    'create table if not exists persona (p_nombre TEXT, p_ap_paterno TEXT, p_ap_materno TEXT)'
));
//Recibe los datos del formulario a las variables
function leerPersona(){
    Nombre = document.getElementById('nombre').value;
    Ap_Paterno = document.getElementById('ap_paterno').value;
    Ap_Materno = document.getElementById('ap_materno').value;
}
//Inserta las variables a la tabla Persona
function crearPersona(){
    leerPersona();
    db.transaction(t => t.executeSql(
        'insert into persona values (?, ?, ?)', [Nombre, Ap_Paterno, Ap_Materno]
    ));
    mostrarPersona();
}
//Muestra en consola los datos de la tabla Persona
function mostrarPersona(){
    db.transaction(t => t.executeSql(
        'select * from persona', [], (t, result) => console.log(result.rows)
    ));
}
//Borra todos los datos de la tabla Persona
function borrarTodo(){
    db.transaction(t => t.executeSql(
        'delete from persona'
    ));
    mostrarPersona();
}