let carrito = [];

if (confirm("Bienvenido a Walmart. ¿Deseas comprar frutas?")) {

    let continuar = true;

    while (continuar) {
        let opcion = prompt(
            "Selecciona una fruta:\n" +
            "1. Manzana \n" +
            "2. Plátano \n" +
            "3. Naranja \n" +
            "4. Sandia \n" +
            "5. Pera \n" +
            "6. Uva "
        );

        switch (opcion) {
            case "1":
            case "manzana":
            case "Manzana":
                carrito.push("Manzana");
                console.log("Agregaste Manzana");
                break;
            case "2":
            case "platano":
            case "Platano":
                carrito.push("Plátano");
                console.log("Agregaste Plátano");
                break;
            case "3":
            case "Naranja":
            case "naranja":
                carrito.push("Naranja");
                console.log("Agregaste Naranja");
                break;
            case "4":
            case "sandia":
            case "Sandia":
                carrito.push("Sandia");
                console.log("Agregaste Sandia");
                break;
            case "5":
            case "Pera":
            case "pera":
                carrito.push("Pera");
                console.log("Agregaste Pera");
                break;
            case "6":
            case "uva":
            case "Platano":
                carrito.push("Uva");
                console.log("Agregaste Uva");
                break;
            default:
                console.log("Opción no válida");
        }

        continuar = confirm("¿Deseas seguir comprando algo mas?");
    }

    // Resumen final
    console.log("Resumen de compra: ");

    let resumen = {};

    carrito.forEach(function(fruta) {
    console.log(fruta);
    });

} else {
    console.log("Hasta luego, gracias vuelva pronto a Walmart ");
}