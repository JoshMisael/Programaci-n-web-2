var numero1 = parseInt(prompt("ingresa un numero"));
var numero2 = parseInt(prompt("ingresa otro numero"));

if(numero1 == numero2){
    console.log("Los numeros son iguales")
}else{
    if(numero1 < numero2){
        console.log("El numero mayor es: "+ numero1+" que "+numero2)
        }else  
    {
    console.log("El numero menor es: "+ numero2+" que "+numero1)
}
}