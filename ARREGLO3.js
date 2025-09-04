let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];

console.log("Valores que están en el arreglo:");
for (let i = 0; i < arr.length; i++) {
    console.log(`Índice ${i} : ${arr[i]}`);
}

let n = parseInt(prompt("¿Qué número quieres ingresar?"));
let posi = parseInt(prompt("¿En qué posición quieres que lo ponga?"));

arr.splice(posi, 0, n);

console.log("\nYa actualizado:");
for (let i = 0; i < arr.length; i++) {
    console.log(`Índice ${i} : ${arr[i]}`);
}
