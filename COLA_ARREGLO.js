class ColaArreglo {
    constructor(tamanoMax = 5) {
        this.maxSize = tamanoMax;
        this.queue = new Array(this.maxSize);
        this.front = -1;
        this.rear = -1;
    }

    isFull() {
        return (this.front === 0 && this.rear === this.maxSize - 1) || (this.front === this.rear + 1);
    }

    isEmpty() {
        return this.front === -1;
    }

    enqueue(elemento) {
        if (this.isFull()) {
            console.error("Error: Cola desbordada (Overflow)");
            return;
        }
        
        if (this.front === -1) this.front = 0;
        this.rear = (this.rear + 1) % this.maxSize;
        this.queue[this.rear] = elemento;
    }

    dequeue() {
        if (this.isEmpty()) {
            console.error("Error: Cola subdesbordada (Underflow)");
            return null;
        }
        
        let elemento = this.queue[this.front];
        if (this.front === this.rear) {
            this.front = -1;
            this.rear = -1;
        } else {
            this.front = (this.front + 1) % this.maxSize;
        }
        return elemento;
    }

    peek() {
        if (this.isEmpty()) {
            console.error("Cola vacía");
            return null;
        }
        return this.queue[this.front];
    }
}

const cola = new ColaArreglo(5);
cola.enqueue(10);
cola.enqueue(20);
cola.enqueue(30);

console.log(`Elemento frontal: ${cola.peek()}`);
console.log(`Elimina elemento: ${cola.dequeue()}`);
console.log(`Nuevo elemento frontal: ${cola.peek()}`);

cola.enqueue(40);
cola.enqueue(50);
cola.enqueue(60);
console.log(`Elimina elemento: ${cola.dequeue()}`);