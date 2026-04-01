let productos = [
    {nombre: "Playera", precio: 150},
    {nombre: "Pantalon", precio: 300},
    {nombre: "Tenis", precio: 1500},
    {nombre: "Gorra", precio: 150}
];
let carrito = [];
let opcion;

/*
1-4 productos
5- agregar producto nuevo 
6- mostrar total del carrito
7- salir
*/

do{
    opcion = prompt(mostrarMenu());
    opcion = parseInt(opcion);
    //VERIFICAR SI LA OPCION ES VALIDA
    if(isNaN(opcion)||opcion < 1 || opcion > productos.length + 5){
        console.log("Opcion no valida, por favor ingrese una opcion valida");
    }else if(opcion >= 1 && opcion <= productos.length){
        agregarCarrito(productos[opcion - 1]);
    }else if(opcion === productos.length + 1){
        agregarProductoNuevo();
    }else if(opcion === productos.length + 2){
        mostrarCarritoTotal();
    }else if(opcion === productos.length + 3){
        eliminarDelCarrito();
    }
}while(opcion !== productos.length + 4);
console.log("Gracias por su compra, hasta luego");

function mostrarMenu(){
    let menu = "¿Que producto desea agregar?\nProductos:\n";

    // productos.forEach((producto, index) => {
    //     menu += `${index + 1}.- ${producto.nombre}: $${producto.precio}\n`;
    // });

    for(let i = 0; i <productos.length; i++){
        menu += (i+1)+".- "+ productos[i].nombre + " - $" + productos[i].precio + "\n";
    }

    menu += `\n${productos.length + 1}- Agregar producto nuevo\n`;
    menu += `${productos.length + 2}- Mostrar total del carrito\n`;
    menu += `${productos.length + 3}- Eliminar producto del carrito\n`
    menu += `${productos.length + 4}- Salir\n`;
    return menu;
}

function agregarCarrito(producto){
    carrito.push(producto);
    console.log(`Producto ${producto.nombre} agregado al carrito`);
}

function mostrarCarritoTotal(){
    if(carrito.length === 0){
        alert("El carrito esta vacio");
    }else{
        let carritoMensaje = "Productos en el carrito:\n";
        let total = 0
        for(let i = 0; i < carrito.length; i++){
            carritoMensaje += (i+1)+".- "+ carrito[i].nombre +" - $"+carrito[i].precio + "\n";
            total += carrito[i].precio;
        }
        carritoMensaje += "\n Total: $"+total;
        console.log(carritoMensaje);
    }
}

function agregarProductoNuevo(){
    let nombre = prompt("Ingrese el nombre del producto");
    let precio = prompt("Ingrese el precio del producto");
    precio = parseInt(precio);    
    if(isNaN(precio) || precio <= 0){
        console.log("Precio no valido, por favor ingrese un precio valido");
    }else if(nombre.trim() === ""){
        console.log("Nombre no valido, por favor ingrese un nombre valido");
    }else{
        let nuevoProducto = {nombre: nombre, precio: precio};
        productos.push(nuevoProducto);
        console.log(`Producto ${nombre} agregado a la lista de productos`);
    }
}

function eliminarDelCarrito(producto){
    if(carrito.length === 0){
        alert("El carrito esta vacio");
    }else{
        let eliminar = prompt("Ingrese el numero del producto que desea eliminar del carrito");
        eliminar = parseInt(eliminar);
        if(isNaN(eliminar) || eliminar < 1 || eliminar > carrito.length){
            console.log("Numero de producto no valido");
        }else{
            let productoEliminado = carrito.splice(eliminar - 1, 1)[0];
            console.log(`Producto ${productoEliminado.nombre} eliminado del carrito`);
        }
    }
}