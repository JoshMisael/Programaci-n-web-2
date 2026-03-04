let numeroMaquina = Math.floor(Math.random()*(10-1))+1;

console.log(numeroMaquina);

let numeroUser =parseInt(prompt("Adivina el Numero entre 1 y 10: "));

let  vidas = 3;

while( numeroMaquina !== numeroUser && vidas > 1){
    vidas--;
    numeroUser = parseInt(prompt("Intenta Nuevamente: "))
}

if(numeroMaquina === numeroUser){
    console.log("Ganaste");
    alert("Ganaste");
}else{
    console.log("Perdiste - El numero es: "+numeroMaquina);
    alert("Perdiste - El numero es: "+numeroMaquina);
}