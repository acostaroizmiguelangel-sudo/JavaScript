function swap(arr, j, k) {
  let temp = arr[j];
  arr[j] = arr[k];
  arr[k] = temp;
}

function partition(arr, low, high) {
  let pivot = arr[high];
  let j = low - 1;

  for (let k = low; k < high; k++) {
    if (arr[k] <= pivot) {
      j++;
      swap(arr, j, k);
    }
  }
  swap(arr, j + 1, high);
  return j + 1;
}

function quicksort(arr, low, high) {
  if (low < high) {
    let pi = partition(arr, low, high);
    quicksort(arr, low, pi - 1);
    quicksort(arr, pi + 1, high);
  }
}

let numeros = [];
for (let i = 0; i < 20; i++) {
  numeros.push(Math.floor(Math.random() * 100) + 1);
}

console.log("El arreglo antes de ordenarlo:");
console.log(numeros);

let n = numeros.length;
quicksort(numeros, 0, n - 1);

console.log("\nEl arreglo después de ordenarlo:");
console.log(numeros);