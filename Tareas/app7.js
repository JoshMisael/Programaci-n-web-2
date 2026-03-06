let opcionUser = prompt(`
    Elija una opcion:
    1: Semana
    2: Peliculas
    3: Juegos
    4: Dias de las semanas
    `);

switch (opcionUser){
    case "1":
        console.log("1984");
        break;
    case "2":
        console.log("Matrix");
        break;
    case "3":
        console.log("Minecraft");
        break;
    case "4":
        console.log("Lunes, Martes, Miercoles, Jueves, Viernes, Sabado, Domingo");
    default:
        console.log("No valido");

}