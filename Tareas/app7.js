let opci = prompt(`
    Elija un dia de la semana:
    1. Lunes
    2. Martes
    3. Miercoles
    4. Jueves
    5. Viernes
    6. Sabado 
    7. Viernes
    `);

switch(opci){
    case "1":
        console.log("Has elegido la opcion Lunes");
        break;
    case "2":
        console.log("Has elegido la opcion Martes");
        break;
    case "3":
        console.log("Has elegido la opcion Miercoles");
        break;
    case "4":
        console.log("Has elegido la opcion Jueves");
        break;
    case "5":
        console.log("Has elegido la opcion Viernes");
        break;                 
    case "6":
        console.log("Has elegido la opcion Sabado");
        break;
    case "7":
        console.log("Has elegido la opcion Domingo");
        break;             
    default:
        console.log("Opcion no valida");
        break;
}