class Nodo {
    constructor(data) {
        this.data = data;   
        this.next = null; 
        this.prev = null; 
    }
}

class ListaEnlazada {
    constructor() {
        this.cabeza = null;
        this.cola = null;
        this.longitud = 0;
    }
    agregarCabeza(data) {
        const nuevoNodo = new Nodo(data);
        if (this.cabeza) {
            this.cabeza.prev = nuevoNodo;
            nuevoNodo.next = this.cabeza;
        } else {
            this.cola = nuevoNodo; 
        }
        this.cabeza = nuevoNodo;
        this.longitud++;
    }
    quitarCola() {
        if (!this.cola) return null; 
        const colaEliminada = this.cola;
        if (this.cabeza === this.cola) {
            this.cabeza = null;
            this.cola = null;
        } else {
            this.cola = this.cola.prev;
            this.cola.next = null;
        }
        this.longitud--;
        return colaEliminada.data;
    }
    convertirAArray() {
        const arr = [];
        let nodoActual = this.cabeza;
        while (nodoActual) {
            arr.push(nodoActual.data);
            nodoActual = nodoActual.next;
        }
        return arr;
    }
}

const canvas = document.getElementById('gameCanvas'); 
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score-actual');
const rankingListElement = document.getElementById('ranking-list');
const nivelElement = document.getElementById('nivel-actual');
const menuOverlay = document.getElementById('menu-overlay');
const startButton = document.getElementById('start-button');
const playerNameInput = document.getElementById('player-name-input');
const saveButton = document.getElementById('save-button');
const loadButton = document.getElementById('load-button');

const gridSize = 20; 
const tileSize = canvas.width / gridSize; 
let hollowHead, hornetBodyImg, comidaBuenaImg, comidaTrampaImg; 

let serpiente = new ListaEnlazada(); 
let direccion = 'derecha';
let comidaAumento = {}; 
let trampas = []; 
let gameLoop; 
let score = 0;
let nivel = 1;
let velocidad = 150; 
let playerName = "";
let ranking = [];

function limpiarCanvas() {
    ctx.fillStyle = 'black'; 
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function dibujarCuadricula() {
    ctx.strokeStyle = '#222'; ctx.lineWidth = 1;
    for (let x = 0; x <= canvas.width; x += tileSize) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
    }
    for (let y = 0; y <= canvas.height; y += tileSize) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke();
    }
}

function dibujarSerpiente() {
    const segmentos = serpiente.convertirAArray();
    segmentos.forEach((segmento, index) => {
        if (index === 0) { 
            ctx.drawImage(hollowHead, segmento.x * tileSize, segmento.y * tileSize, tileSize, tileSize);
        } else { 
            ctx.drawImage(hornetBodyImg, segmento.x * tileSize, segmento.y * tileSize, tileSize, tileSize);
        }
    });
}

function dibujarItems() {
    ctx.drawImage(comidaBuenaImg, comidaAumento.x * tileSize, comidaAumento.y * tileSize, tileSize, tileSize);
    
    trampas.forEach(trampa => {
        ctx.drawImage(comidaTrampaImg, trampa.x * tileSize, trampa.y * tileSize, tileSize, tileSize);
    });
}

function dibujarRankingInicial() {
    rankingListElement.innerHTML = ''; 
    ranking = JSON.parse(localStorage.getItem('snakeRanking')) || [];
    if (ranking.length > 0 && (ranking[0].nombre === undefined || typeof ranking[0].nombre !== 'string')) {
        ranking = [];
        localStorage.setItem('snakeRanking', '[]');
    }
    ranking.sort((a, b) => b.score - a.score); 
    if (ranking.length === 0) {
        rankingListElement.innerHTML = '<li>Juega para clasificar</li>';
    } else {
        ranking.forEach((item, index) => {
            rankingListElement.innerHTML += `<li>${index + 1}. ${item.nombre} - ${item.score}</li>`;
        });
    }
}

function actualizarUI() {
    scoreElement.innerText = score;
    nivelElement.innerText = `Nivel: ${nivel}`;
}

function dibujarEstadoInicial() {
    limpiarCanvas();
    dibujarCuadricula();
    spawnItems(); 
    dibujarItems(); 
    dibujarSerpiente();
}

function generarPosicionSegura() {
    let posValida = false;
    let x, y;
    while (!posValida) {
        x = Math.floor(Math.random() * gridSize); 
        y = Math.floor(Math.random() * gridSize); 
        
        let chocaSerpiente = false;
        for (const segmento of serpiente.convertirAArray()) {
            if (segmento.x === x && segmento.y === y) {
                chocaSerpiente = true; break;
            }
        }
        
        if (!chocaSerpiente) {
            posValida = true;
        }
    }
    return {x, y};
}

function spawnItems() {
    comidaAumento = generarPosicionSegura();
    
    trampas = []; 
    
    let numeroDeTrampas = nivel * 2; // ¡Más difícil!

    for (let i = 0; i < numeroDeTrampas; i++) {
        let nuevaTrampa = generarPosicionSegura();
        while ((nuevaTrampa.x === comidaAumento.x && nuevaTrampa.y === comidaAumento.y) || 
               (trampas.some(t => t.x === nuevaTrampa.x && t.y === nuevaTrampa.y))) {
            nuevaTrampa = generarPosicionSegura();
        }
        trampas.push(nuevaTrampa);
    }
}

function setVelocidad() {
    clearInterval(gameLoop);
    velocidad = Math.max(50, 150 - (nivel - 1) * 15);
    gameLoop = setInterval(main, velocidad);
}

function resetSerpiente(longitud = 5) {
    serpiente = new ListaEnlazada();
    direccion = 'derecha';
    for (let i = 0; i < longitud; i++) {
        serpiente.agregarCabeza({x: 6 + i, y: 10}); 
    }
}

function checkLevelUp() {
    if (serpiente.longitud >= 15) {
        nivel++;
        score += 1000; 
        resetSerpiente(5); 
        setVelocidad(); 
        spawnItems(); 
        actualizarUI();
    }
}

function moverSerpiente() {
    const cabezaActual = serpiente.cabeza.data;
    const nuevaCabeza = { ...cabezaActual }; 
    
    if (direccion === 'derecha') nuevaCabeza.x += 1;
    else if (direccion === 'izquierda') nuevaCabeza.x -= 1;
    else if (direccion === 'abajo') nuevaCabeza.y += 1;
    else if (direccion === 'arriba') nuevaCabeza.y -= 1; 

    if (nuevaCabeza.x < 0) nuevaCabeza.x = gridSize - 1;
    if (nuevaCabeza.x >= gridSize) nuevaCabeza.x = 0;
    if (nuevaCabeza.y < 0) nuevaCabeza.y = gridSize - 1;
    if (nuevaCabeza.y >= gridSize) nuevaCabeza.y = 0;
    
    serpiente.agregarCabeza(nuevaCabeza);

    if (nuevaCabeza.x === comidaAumento.x && nuevaCabeza.y === comidaAumento.y) {
        score += 100; 
        spawnItems(); 
        checkLevelUp(); 
    } 
    else if (trampas.some(t => t.x === nuevaCabeza.x && t.y === nuevaCabeza.y)) {
        score -= 200;
        if (serpiente.longitud > 1) { 
            serpiente.quitarCola(); 
        }
        spawnItems(); 
    }
    else {
        serpiente.quitarCola(); 
    }
    actualizarUI();
}

function checkearColisiones() {
    const cabeza = serpiente.cabeza; 
    const cabezaData = cabeza.data; 
    for (let nodo = cabeza.next; nodo; nodo = nodo.next) {
        if (cabezaData.x === nodo.data.x && cabezaData.y === nodo.data.y) {
            return true; 
        }
    }
    return false;
}

function gameOver() {
    clearInterval(gameLoop); 
    ranking.push({ nombre: playerName, score: score });
    ranking.sort((a, b) => b.score - a.score);
    ranking = ranking.slice(0, 5);
    localStorage.setItem('snakeRanking', JSON.stringify(ranking));
    alert(`¡GAME OVER, ${playerName}! \nTu score: ${score}`);
    document.location.reload();
}

function main() {
    moverSerpiente(); 

    if (checkearColisiones()) { 
        gameOver(); 
        return; 
    }
    
    limpiarCanvas();
    dibujarCuadricula(); 
    dibujarItems(); 
    dibujarSerpiente();
}

function guardarPartida() {
    if (!gameLoop) return; 
    const serpienteArray = serpiente.convertirAArray();
    const gameState = {
        serpiente: serpienteArray,
        direccion: direccion,
        comidaAumento: comidaAumento,
        trampas: trampas, 
        score: score,
        nivel: nivel,
        velocidad: velocidad,
        playerName: playerName
    };
    localStorage.setItem('snakeSaveGame', JSON.stringify(gameState));
    alert("Partida Guardada");
}

function cargarPartida() {
    const savedState = JSON.parse(localStorage.getItem('snakeSaveGame'));
    if (!savedState) {
        alert("No hay partida guardada");
        return;
    }
    serpiente = new ListaEnlazada();
    savedState.serpiente.reverse().forEach(segmento => {
        serpiente.agregarCabeza(segmento);
    });
    direccion = savedState.direccion;
    comidaAumento = savedState.comidaAumento;
    trampas = savedState.trampas; 
    score = savedState.score;
    nivel = savedState.nivel;
    velocidad = savedState.velocidad;
    playerName = savedState.playerName;
    
    actualizarUI();
    menuOverlay.style.display = 'none';
    clearInterval(gameLoop);
    gameLoop = setInterval(main, velocidad);
    
    limpiarCanvas();
    dibujarCuadricula(); 
    dibujarItems(); 
    dibujarSerpiente();
}

function cargarImagen(src) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = () => reject(new Error(`Error al cargar la imagen: ${src}`));
        img.src = src;
    });
}

function iniciarJuego() {
    playerName = playerNameInput.value || "Player 1";
    actualizarUI();
    menuOverlay.style.display = 'none'; 
    setVelocidad(); 
}

window.onload = async function() {
    dibujarRankingInicial(); 
    resetSerpiente(5); 
    
    try {
        [hollowHead, hornetBodyImg, comidaBuenaImg, comidaTrampaImg] = await Promise.all([
            cargarImagen('hollow-cabeza.png'), 
            cargarImagen('hornet-cuerpo.png'),
            cargarImagen('mascara-comida.png'), 
            cargarImagen('pincho-trampa.png')  
        ]);
        
        dibujarEstadoInicial(); 

    } catch (error) {
        console.error(error);
        alert("¡ERROR, BRO! No pude cargar las imágenes. " +
              "Asegúrate de que los archivos se llamen EXACTO: \n" +
              "1. hollow-cabeza.png\n" +
              "2. hornet-cuerpo.png\n" +
              "3. mascara-comida.png\n" +
              "4. pincho-trampa.png\n" +
              "Y que estén en la misma carpeta que el HTML.");
    }
};

startButton.addEventListener('click', iniciarJuego);
saveButton.addEventListener('click', guardarPartida);
loadButton.addEventListener('click', cargarPartida);
document.addEventListener('keydown', cambiarDireccion);

function cambiarDireccion(evento) {
    if (!gameLoop) return; 

    const teclaPresionada = evento.key.toLowerCase();
    const yendoArriba = (direccion === 'arriba');
    const yendoAbajo = (direccion ==='abajo');
    const yendoDerecha = (direccion === 'derecha');
    const yendoIzquierda = (direccion === 'izquierda');

    if ((teclaPresionada === 'w' || teclaPresionada === 'arrowup') && !yendoAbajo) {
        direccion = 'arriba';
    } 
    else if ((teclaPresionada === 's' || teclaPresionada === 'arrowdown') && !yendoArriba) {
        direccion = 'abajo';
    }
    else if ((teclaPresionada === 'a' || teclaPresionada === 'arrowleft') && !yendoDerecha) {
        direccion = 'izquierda';
    }
    else if ((teclaPresionada === 'd' || teclaPresionada === 'arrowright') && !yendoIzquierda) {
        direccion = 'derecha';
    }
}