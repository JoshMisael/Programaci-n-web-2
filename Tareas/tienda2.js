// Arreglo donde se guardaran los productos que el cliente agregue al carrito de compras
const carrito = [];

// definimos la clase producto donde se definen los productos que se van a vender en la tienda
class Producto {
    constructor(nombre, precio) {
        this.nombre = nombre;
        this.precio = precio;
    }
}

// funcion para agregar productos al carrito de compras
function agregarProducto(carrito, producto, cantidad) {
    // buscamos si el producto ya existe en el carrito
    const indice = carrito.findIndex(item => item.producto.nombre === producto.nombre && item.producto.precio === producto.precio);
    
    if (indice !== -1) {
        // si el producto ya existe, actualizamos la cantidad
        carrito[indice].cantidad += cantidad;
    } else {
        // si el producto no existe, lo agregamos al carrito
        carrito.push({ producto, cantidad });
    }

    // actualizar la vista del carrito de compras
    mostrarCarrito(carrito);

}

function mostrarCarrito(carrito) {
    const listaCarrito = document.getElementById('carrito');
    listaCarrito.innerHTML = '';

    carrito.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.producto.nombre} - $${item.producto.precio.toFixed(2)} x ${item.cantidad}`;
        listaCarrito.appendChild(li);
    });
}

// evento para agregar productos al carrito de compras
document.getElementById('formulario').addEventListener('submit', 
    function(event) {
        event.preventDefault(); // evitar que el formulario se envíe y recargue la página
        
        const nombreProducto = document.getElementById('nombre').value.trim();
        const precioProducto = parseFloat(document.getElementById('precio').value);
        const cantidadProducto = parseInt(document.getElementById('cantidad').value);

        // crear un nuevo objeto producto con los datos ingresados del formulario
        const producto = new Producto(nombreProducto, precioProducto);

        // agregar el producto al carrito de compras
        agregarProducto(carrito, producto, cantidadProducto);

        // limpiar los campos del formulario
        document.getElementById('formulario').reset();
});

