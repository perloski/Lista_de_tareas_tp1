//para que el usuario pueda ingresar valores
const prompt = require('prompt-sync')();
let lista= []; //el arreglo donde vamos a poner las tareas

function menuPrincipal(){
    let opcion;
    do {
        limpiarPantalla();
        console.log("---------------------");
        console.log("===LISTA DE TAREAS===");
        console.log("---------------------");
        console.log("¿Que deseas hacer?\n");
        console.log("[1] Ver mis tareas");
        console.log("[2] Buscar una tarea");
        console.log("[3] Agregar una tarea");
        console.log("[0] Salir\n");
        opcion = parseInt(prompt("> "));

        switch(opcion){
            case 0:
                console.log("\nSaliendo . . .");
            break;
            case 1:
                limpiarPantalla();
                console.log("\n->Usted escogio Ver Tareas");
                if (verificarListaVacia(lista)==1){
                    console.log("\nNo hay tareas mostrar en la lista.\n");
                    esperarTeclaParaContinuar();
                } else {
                menuVerTareas();
            }
            break;
            case 2:
                limpiarPantalla();
                console.log("->Usted escogio Buscar una tarea");
                if (verificarListaVacia(lista)==1){
                    console.log("\nNo hay tareas para buscar en la lista.\n");
                    esperarTeclaParaContinuar();
                } else {
                buscarTarea(lista);
            }
            break;
            case 3:
                limpiarPantalla();
                console.log("->Usted eligio Agregar una tarea.\n");
                recopilarDatos(); 
                esperarTeclaParaContinuar();
            break;
            default: console.log("Ingrese un valor el 0 al 3");
        }


    } while (opcion!=0);
}
function crearTarea(){
    let tarea={
        titulo: "sin titulo",
        descripcion: "sin descripcion",
        estado: 1,
        creacion: "n/a",
        ultimaEdicion: "n/a",
        vencimiento: "n/a",
        dificultad: 1,
    }
return tarea;
}
function recopilarDatos(){
    let titulo, descripcion, estado, creacion, ultimaEdicion, vencimiento, dificultad;

    titulo=prompt("1.Ingresa el titulo: ");
    while (titulo==""|| titulo==null){ //nos aseguramos de que tenga titulo
        titulo=prompt("1.Ingresa el titulo. No puede estar vacio: ");
    }

    descripcion= prompt("2.Ingrese la descripcion o presione enter para omitir: ");

    estado= parseInt(prompt("3.Estado ([1]Pendiente/ [2]En curso/ [3]Terminada/ [4]Cancelada): "));
    while (estado>=5 || estado<=0){//controles
        estado= parseInt(prompt("3.Estado ([1]Pendiente/ [2]En curso/ [3]Terminada/ [4]Cancelada): ")) ;
    } 

    creacion=prompt("4.Desea que la tarea contenga fecha de creacion? [1] Si / [Enter] No, omitir. ");
    vencimiento=prompt("5.Desea que la tarea contenga fecha de Vencimiento? [1] Si / [Enter] No, omitir. ");
    if (vencimiento==1){
        vencimiento=obtenerFechaVencimiento();
    }
    dificultad= parseInt(prompt("6.Dificultad [1]/[2]/[3]. "));
    while (dificultad>=4 || dificultad<=0){//controles
        dificultad= parseInt(prompt("6.Dificultad [1]/[2]/[3]. ")) ;
    } 
    asignarDatos(titulo, descripcion, estado, creacion, vencimiento, dificultad);
}
function asignarDatos(titulo, descripcion, estado, creacion, vencimiento, dificultad){
    let tarea=crearTarea();
    tarea.titulo=titulo; 
    if (descripcion==""||descripcion==null){ //si se omitio la descripcion
        tarea.descripcion="Sin Descripcion";
    } else{
        tarea.descripcion=descripcion;
    }
    if (estado==undefined|| estado == null || estado == NaN){
        tarea.estado=1;
    } else {
        tarea.estado=estado;
    }
    if(creacion==1){
        tarea.creacion= obtenerFecha();
    }

    tarea.dificultad=dificultad; 
    agregarTarea(tarea);
}
function obtenerFecha(){
    let fecha = new Date(); 
    
    let dia = fecha.getDate(); 
    let mes = fecha.getMonth() + 1; 
    let anio = fecha.getFullYear(); 
    
    let diaFormateado = String(dia).padStart(2, '0');
    let mesFormateado = String(mes).padStart(2, '0');
    
    let fechaFormato = `${diaFormateado}/${mesFormateado}/${anio}`;
    
    return fechaFormato;
}


function obtenerFechaVencimiento() {
    const regexFecha = /^(\d{2})\/(\d{2})\/(\d{4})$/;
    let fechaValida = false;
    let fechaVencimiento;

    while (!fechaValida) {
        fechaVencimiento = prompt("Ingrese la fecha de vencimiento en el formato DD/MM/YYYY:");
        const match = fechaVencimiento.match(regexFecha);

        if (match) {
            const dia = parseInt(match[1], 10);
            const mes = parseInt(match[2], 10) - 1; 
            const año = parseInt(match[3], 10);
            const fecha = new Date(año, mes, dia);

            // se supone que verifica que el día, mes y año coincidan después de la fecha de creacion, pero no me funcionaaaa
            if (fecha.getFullYear() === año && fecha.getMonth() === mes && fecha.getDate() === dia) {
                fechaValida = true;
            } else {
                console.log("La fecha ingresada no es válida. Inténtelo de nuevo.");
            }
        } else {
            console.log("El formato de la fecha es incorrecto. Debe ser DD/MM/YYYY.");
        }
    }
    return fechaVencimiento;
}
function agregarTarea(tarea){
    lista.push(tarea);
    console.log("\n¡Datos guardados!\n");
}
function menuVerTareas(){
    console.log("\n¿Que tareas deseas ver?\n");
    console.log("[1] Todas");
    console.log("[2] Pendientes");
    console.log("[3] En curso");
    console.log("[4] Terminadas");
    console.log("[0] Volver");

    let opcion= parseInt(prompt("\n> "));

    switch (opcion){
        case 0:
            limpiarPantalla();
            return;
        break;
        case 1:
            limpiarPantalla();
            console.log("\n->Usted eligio Ver todas las tareas\n");
            mostrarTareas(lista);
            menuVerDetallesDeTarea();
        break;
        case 2:
            limpiarPantalla();
            console.log("\n->Usted eligio Ver sus tareas pendientes\n");
            mostrarTareasPendientes(lista);
            menuVerDetallesDeTarea();
        break;
        case 3:
            limpiarPantalla();
            console.log("\n->Usted eligio Ver sus tareas En curso\n");
            mostrarTareasEnCurso(lista);
            menuVerDetallesDeTarea();
  
            break;
        case 4:
            limpiarPantalla();
            console.log("\n->Usted eligio Ver sus tareas en curso\n");
            mostrarTareasTerminadas(lista);
            menuVerDetallesDeTarea();
            break;
        default: console.log("Escoja una opcion del 0 al 4");
    }
}
function verificarListaVacia(lista){
    if (lista.length === 0) {
        return 1;
    }
    return 0;
}
function mostrarTareas(lista){
    for (let i=0; i < lista.length; i++ ){
        let tarea = lista[i];
        console.log(`[${i+1}] ${tarea.titulo}`);
    }
}
function mostrarTareasEnCurso(lista){
    let hayTareasEnCurso = false;

    for (let i=0; i < lista.length; i++ ){
        let tarea = lista[i];
        if (tarea.estado==2){
            console.log(`[${i+1}] ${tarea.titulo}`);
        }
        hayTareasEnCurso= true;
    }

    if (hayTareasEnCurso==false){
        console.log("No hay tareas en curso para mostrar.\n");
    }
}
function mostrarTareasPendientes(lista){
    let hayPendientes= false;

    for (let i=0; i < lista.length; i++ ){
        let tarea = lista[i];
        if (tarea.estado==1){
            console.log(`[${i+1}] ${tarea.titulo}`);
            hayPendientes = true;
        } 
    }

    if(hayPendientes==false){
        console.log("No hay tareas pendientes para mostrar.\n");
    }
}
function mostrarTareasTerminadas(lista){
    let hayTerminadas= false;

    for (let i=0; i < lista.length; i++ ){
        let tarea = lista[i];
        if (tarea.estado==3){
            console.log(`[${i+1}] ${tarea.titulo}`);
            hayTerminadas = true;
        }
        
    }

    if (hayTerminadas==false){
        console.log("No hay tareas en curso para mostrar.\n");
    }
}
function imprimirTareas(tarea){
    console.log(`${tarea.titulo}`);
    console.log(`\n${tarea.descripcion}`);
    console.log(`\nEstado: \t${tarea.estado}`);
    console.log(`Creacion: \t${tarea.creacion}`);
    console.log(`Ult edición: \t${tarea.ultimaEdicion}`);
    console.log(`Vencimiento: \t${tarea.vencimiento}`);
    console.log(`Dificultad: \t${tarea.dificultad}`);
    console.log("-----------------------\n");
return;
}

function menuVerDetallesDeTarea(){
    console.log("\nDesea ver los detalles de alguna?");
    console.log("Ingrese el titulo para verla o 0 para volver") 
    let opcionDetalle=prompt(">");

    if (opcionDetalle=="0"){
        limpiarPantalla();
        menuPrincipal();
    } else {
        
        for (let i=0; i < lista.length; i++ ){

            let tarea = lista[i];
            if (opcionDetalle==tarea.titulo){
                limpiarPantalla();
                console.log("Esta es la tarea que elegiste\n");
                imprimirTareas(tarea);
                MenuEditarTarea(tarea);
            } 
        }
    }
          
}



function MenuEditarTarea(tarea){

    let opcionEditar;
    console.log ("Desea editar la tarea? Presione 1 para editar o 0 para volver al menu");
    opcionEditar = parseInt(prompt("> "));

    switch (opcionEditar){
        case 0:
            menuPrincipal();
        break;
        case 1:
            limpiarPantalla();
            console.log("->Usted eligio Editar la Tarea\n");
            console.log("-Escoje el atributo que desees cambiar");
            console.log("1. Titulo");
            console.log("2. Descripcion");
            console.log("3. Estado");
            console.log("4. Vencimiento");
            console.log("5. Dificultad");
            let edicion=parseInt(prompt(">"));

            switch (edicion){
                case 1:
                    tarea.titulo=prompt("Ingrese el nuevo titulo para la tarea: ");
                    break;
                case 2:
                    tarea.descripcion=prompt("Ingrese la nueva descripcion para la tarea: ");
                    break;
                case 3:
                    tarea.estado=prompt("Ingrese el nuevo estado de la tarea. [1] Pendiente /[2] En curso [3] Terminada");
                    break;
                case 4:
                    tarea.vencimiento=prompt("Ingrese la nueva fecha de vencimiento para la tarea. Formato DD/MM/YYYY");
                    obtenerFechaVencimiento();
                    break;
                case 5:
                    tarea.dificultad=prompt("Ingrese la nueva dificultad de la tarea. [1 al 3]. ");
                    break;
                default: console.log("Elija una opcion valida");
                break;
            }
            
        break;
        default: console.log("Elija una opcion valida");
        break;
    }
}

function buscarTarea(lista){
    console.log ("Ingrese el titulo de la tarea que desea buscar");
    tituloBuscar=prompt("> ");

    for (let i=0; i < lista.length; i++ ){
        let tarea = lista[i];
        if (tituloBuscar==tarea.titulo){
            console.log("\nEstas son las tareas que coinciden con tu busqueda");
            console.log("-----------------------");
            console.log(`-->Tarea [${i+1}]`);
            imprimirTareas(tarea);
            esperarTeclaParaContinuar();
        } else {
            console.log("No se encontro coincidencias para la busqueda");
            esperarTeclaParaContinuar();
        }
    }
}
function limpiarPantalla() {
    console.clear();
}
function esperarTeclaParaContinuar() {
    console.log("Presiona cualquier tecla para continuar...");
    prompt("");  
}
menuPrincipal();

