let arr = [64, 25, 12, 22, 11];

for (let i = 0; i < arr.length - 1; i++) {
    let min_idx = i;
    for (let j = i + 1; j < arr.length; j++) {
        if (arr[j] < arr[min_idx]) {
            min_idx = j;
        }
    }

    [arr[i], arr[min_idx]] = [arr[min_idx], arr[i]];
}

console.log("Ya arreglado:", arr);
