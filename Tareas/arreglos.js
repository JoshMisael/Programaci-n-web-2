let nombres = [];

mostrarMenu();

function mostrarMenu(){
    let opcion;
    
    do {
        opcion = prompt(`
        OPCIONES DISPONIBLES:
        1. Agregar un nombre
        2. Mostrar los nombres
        3. Salir
        ELIGE UNA OPCIÓN:
    `);

        switch(opcion){
            case "1":
                console.log("se esta agregando nombre");
                agregarNombre();
                break;
            case "2":
                console.log("se estan mostrando nombres");
                mostrarNombres();
                break;
            case "3":
                alert("Hasta luego");
                break;
            default:
                alert("Opción no válida. Por favor, elige una opción del 1 al 3.");
                break;
        }
    } while(opcion !== "3");
    
}



function agregarNombre(){
    let nombre = prompt("Ingrese un nombre:");
    if(nombre){
        nombres.push(nombre);
        alert(`Nombre "${nombre}" agregado correctamente`);
    }else{
        alert("No se ingresó ningún nombre. Por favor, intenta de nuevo.");
    }
}

function mostrarNombres(){
    if(nombres.length === 0){
        alert("No hay nombres para mostrar");
    }else{
        let mensaje = "Nombres almacenados\n";
        nombres.forEach((nombre, index) => {
            mensaje += `${index + 1} .- ${nombre}\n`;
        });
        alert(mensaje);
    }
}