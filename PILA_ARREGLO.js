class PilaArreglo {
    constructor(tamanoMax = 100) {
        this.maxSize = tamanoMax;
        this.stack = new Array(this.maxSize);
        this.top = -1;
    }

    isEmpty() {
        return this.top === -1;
    }

    isFull() {
        return this.top === this.maxSize - 1;
    }

    push(item) {
        if (this.isFull()) {
            console.error("Error: Stack Overflow");
            return;
        }
        this.stack[++this.top] = item;
    }

    pop() {
        if (this.isEmpty()) {
            console.error("Error: Stack Underflow");
            return -1;
        }
        const item = this.stack[this.top];
        this.top--;
        return item;
    }

    peek() {
        if (this.isEmpty()) {
            console.error("Pila vacía");
            return -1;
        }
        return this.stack[this.top];
    }
}

const pila = new PilaArreglo();
pila.push(10);
pila.push(20);
pila.push(30);

console.log(`Elemento superior: ${pila.peek()}`);
console.log(`Extrae elemento: ${pila.pop()}`);
console.log(`Nuevo elemento superior: ${pila.peek()}`);