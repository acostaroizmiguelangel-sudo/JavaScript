function inserccion(a) {
    for (let i = 1; i < a.length; i++) {
        let temp = a[i];
        let j = i - 1;
        while (j >= 0 && temp < a[j]) {
            a[j + 1] = a[j];
            j--;
        }
        a[j + 1] = temp;
    }
}

function printArr(a) {
    console.log(a.join(" "));
}

let a = [70, 15, 2, 51, 60];
console.log("Esta es la lista antes de ordenarla:");
printArr(a);
inserccion(a);
console.log("La lista despues de ordenarla:");
printArr(a);
