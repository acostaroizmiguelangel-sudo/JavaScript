function burbuja(lista) {
    let n = lista.length;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (lista[j] > lista[j + 1]) {
                [lista[j], lista[j + 1]] = [lista[j + 1], lista[j]];
            }
        }
    }
}

const readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout
});

let datos = [];
let count = 0;

console.log("Hola, ingrese 5 números y serán ordenados:");

function pedirNumero() {
    if (count < 5) {
        readline.question(`Ingrese el número ${count + 1}: `, (num) => {
            datos.push(parseInt(num));
            count++;
            pedirNumero();
        });
    } else {
        console.log("\nEstos son los datos antes de ordenar:");
        console.log(datos);

        burbuja(datos);

        console.log("Estos son los datos después de ordenar:");
        console.log(datos);

        readline.close();
    }
}

pedirNumero();
