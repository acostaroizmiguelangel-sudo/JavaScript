var numSelected = null;
var tilSelected = null;
var errors = 0;
var vidas = 5;
var currentDifficulty = "muy-facil";
var currentLevel = 0;
var board = null;
var solucion = null;
var boardSpacesLeft = 0;


const DIFFICULTY_ORDER = ["muy-facil", "facil", "medio", "dificil", "muy-dificil"];


const puzzles = {
    "muy-facil": [
        {
            board: [
                "--74916-5",
                "2---6-3-9",
                "-----7-1-",
                "-586----4",
                "--3----9-",
                "--62--187",
                "9-4-7---2",
                "67-83----",
                "81--45---"
            ],
            solucion: [
                "387491625",
                "241568379",
                "569327418",
                "758619234",
                "123784596",
                "496253187",
                "934176852",
                "675832941",
                "812945763"
            ]
        },
        {
            board: [
                "53--7----",
                "6--195---",
                "-98----6-",
                "8---6---3",
                "4--8-3--1",
                "7---2---6",
                "-6----28-",
                "---419--5",
                "----8--79"
            ],
            solucion: [
                "534678912",
                "672195348",
                "198342567",
                "859761423",
                "426853791",
                "713924856",
                "961537284",
                "287419635",
                "345286179"
            ]
        }
    ],
    "facil": [
        {
            board: [
                "-9--7----",
                "7-3-1-5--",
                "6---8-9--",
                "-3-8---2-",
                "--1-9---5",
                "---4-2---",
                "8-5---6--",
                "5-4-9-1--",
                "---3--5-"
            ],
            solucion: [
                "492576138",
                "875319426",
                "361482975",
                "538147692",
                "719625384",
                "246938751",
                "187254369",
                "654793182",
                "923861547"
            ]
        }
    ],
    "medio": [
        {
            board: [
                "8-3-1-5--",
                "1-------9",
                "-52-8---4",
                "---6---8-",
                "1-9---2--",
                "-3---6---",
                "6---4-27-",
                "1-------8",
                "--9-7-3-2"
            ],
            solucion: [
                "893617524",
                "176542983",
                "452389716",
                "347265198",
                "218974365",
                "695138247",
                "924753681",
                "761829453",
                "538491276"
            ]
        },
        {
            board: [
                "-4-1-----",
                "--3-5---8",
                "-2-7-4-9-",
                "-1-6---7-",
                "9---3-5--",
                "8-5---1--",
                "2-1-3-8-7",
                "---7-9--6",
                "-----6---"
            ],
            solucion: [
                "946182753",
                "137956284",
                "852374196",
                "418635972",
                "795421368",
                "623897514",
                "261538479",
                "379214865",
                "584769132"
            ]
        },
        {
            board: [
                "--7-6---3",
                "--3-8-4-1",
                "-8-----2-",
                "--6-1-5--",
                "-9---3---",
                "4-7-9-8--",
                "---1----8",
                "-2-4-9-5-",
                "3---9-1--"
            ],
            solucion: [
                "297168543",
                "536824917",
                "841957263",
                "368145729",
                "975382146",
                "124679358",
                "713596482",
                "682413597",
                "459781632"
            ]
        },
        {
            board: [
                "---1-2-6-",
                "-4---7---",
                "7-6-5----",
                "---3-8---",
                "---9---5-",
                "9---6-2--",
                "4-1-------",
                "3-8-1---5",
                "---7-9-4-"
            ],
            solucion: [
                "583172469",
                "149638725",
                "726459183",
                "812367594",
                "395841672",
                "674925831",
                "957283146",
                "231794568",
                "468519273"
            ]
        },
        {
            board: [
                "-9---8-1-",
                "---2---3-",
                "1-8-3--4-",
                "3-9---4-5",
                "---9-4---",
                "-4---3-7-",
                "-8---6---",
                "---7---5-",
                "-3-5-2-9-"
            ],
            solucion: [
                "693478215",
                "457219638",
                "128635947",
                "379861425",
                "815924763",
                "246753891",
                "582196374",
                "964387152",
                "731542896"
            ]
        }
    ],
    "dificil": [
        {
            board: [
                "---5-9---",
                "-2-3---1-",
                "7-----2--",
                "--5---6--",
                "---4-2---",
                "--1---9--",
                "--6-----1",
                "-5---8-3-",
                "---1-6---"
            ],
            solucion: [
                "163529478",
                "528347619",
                "749681253",
                "285913647",
                "937462185",
                "614875923",
                "876234591",
                "451798236",
                "392156847"
            ]
        },
        {
            board: [
                "--9------",
                "2--1-3--6",
                "-4---6---",
                "---7-2-1-",
                "1-3---5-8",
                "-8-4-9---",
                "---8---4-",
                "8--6-5--3",
                "------7--"
            ],
            solucion: [
                "639587421",
                "278143956",
                "541296387",
                "956732814",
                "123468579",
                "784159632",
                "317825946",
                "892641753",
                "465379281"
            ]
        },
        {
            board: [
                "-----1-3-",
                "---7-2-8-",
                "8--3---4-",
                "2-7---5--",
                "---8-5---",
                "--6---7-4",
                "-1---3--6",
                "-7-5-9---",
                "-6-4-----"
            ],
            solucion: [
                "624851937",
                "139742685",
                "857396142",
                "247918563",
                "391865274",
                "586237194",
                "418273596",
                "792584317",
                "963124875"
            ]
        },
        {
            board: [
                "--5-1-3--",
                "---2-3---",
                "-7-8---6-",
                "--4---8--",
                "8---9---1",
                "--2---6--",
                "-9---7-2-",
                "---3-4---",
                "--8-2-4--"
            ],
            solucion: [
                "485619372",
                "169273548",
                "273845169",
                "914762853",
                "836495721",
                "752138694",
                "391587426",
                "627354918",
                "548921637"
            ]
        },
        {
            board: [
                "-1-7---9-",
                "--8---3--",
                "---3-9-7-",
                "--2-3-8--",
                "1-------6",
                "--7-6-2--",
                "-6-5-2---",
                "--4---7--",
                "-2---7-4-"
            ],
            solucion: [
                "513728694",
                "648159327",
                "279346815",
                "492631857",
                "185274936",
                "367895241",
                "761542389",
                "854913762",
                "923687541"
            ]
        }
    ],
    "muy-dificil": [
        {
            board: [
                "--53-----",
                "8------2-",
                "-7--1-5--",
                "4---53--1",
                "-1--7---6",
                "--32---8-",
                "-6-5----9",
                "--4----3-",
                "-----97--"
            ],
            solucion: [
                "145327698",
                "839654127",
                "672918543",
                "496185372",
                "218376459",
                "357492816",
                "923561784",
                "581743269",
                "764289135"
            ]
        }
    ]
};


window.onload = function() {
    loadProgress();
    startGame();
}


function loadProgress() {
    let savedData = JSON.parse(localStorage.getItem("sudokuProgress"));

    if (savedData) {
        currentDifficulty = savedData.difficulty;
        currentLevel = savedData.level;
    }
}


function saveProgress() {
    localStorage.setItem("sudokuProgress", JSON.stringify({
        difficulty: currentDifficulty,
        level: currentLevel
    }));
}

function startGame() {
    errors = 0;
    vidas = 5;
    boardSpacesLeft = 0;
    document.getElementById("errors").innerText = errors;

    let puzzleData = puzzles[currentDifficulty][currentLevel];

    if (puzzleData) {
        board = puzzleData.board;
        solucion = puzzleData.solucion;

        let diffText = currentDifficulty.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
        let levelText = "Nivel " + (currentLevel + 1);
        document.getElementById("current-level-display").innerText = diffText + " - " + levelText;

        setGame();
        dibujarvidas();

    } else {
        document.getElementById("board").innerHTML = "<h2>¡Felicidades! Has completado todos los niveles.</h2>";
        document.getElementById("digits").innerHTML = "";
        document.getElementById("current-level-display").innerText = "¡Juego Completado!";
    }
}

function setGame() {
    document.getElementById("board").innerHTML = "";
    document.getElementById("digits").innerHTML = "";

    for (let i = 1; i <= 9; i++) {
        let number = document.createElement("div");
        number.id = i;
        number.innerText = i;
        number.addEventListener("click", selectNumber);
        number.classList.add("number");
        document.getElementById("digits").appendChild(number);
    }

    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();

            if (board[r][c] != "-") {
                tile.innerText = board[r][c];
                tile.classList.add("tile-start");
            } else {
                boardSpacesLeft++;
            }

            if (r == 2 || r == 5) {
                tile.classList.add("horizontal-line");
            }
            if (c == 2 || c == 5) {
                tile.classList.add("vertical-line");
            }

            tile.addEventListener("click", selectTile);
            tile.classList.add("tile");
            document.getElementById("board").appendChild(tile);
        }
    }
}

function selectNumber() {
    if (numSelected) {
        numSelected.classList.remove("number-selected");
    }
    numSelected = this;
    numSelected.classList.add("number-selected");
}

function selectTile() {
    if (numSelected) {
        if (this.classList.contains("tile-start")) {
            return;
        }

        if (this.innerText != "") {
            return;
        }

        let coords = this.id.split("-");
        let r = parseInt(coords[0]);
        let c = parseInt(coords[1]);

        if (solucion[r][c] == numSelected.id) {
            this.innerText = numSelected.id;
            boardSpacesLeft--;

            if (boardSpacesLeft == 0) {
                goToNextLevel();
            }

        } else {
            errors += 1;
            document.getElementById("errors").innerText = errors;
            if (errors > 0 && errors % 5 == 0) {
                vidas--;
                handleLifeLoss();
            }
        }
    }
}

function goToNextLevel() {
    setTimeout(function() {
        alert("¡Nivel completado! Cargando siguiente nivel...");

        currentLevel++;

        if (currentLevel >= puzzles[currentDifficulty].length) {
            let difficultyIndex = DIFFICULTY_ORDER.indexOf(currentDifficulty);
            difficultyIndex++;

            if (difficultyIndex < DIFFICULTY_ORDER.length) {
                currentDifficulty = DIFFICULTY_ORDER[difficultyIndex];
                currentLevel = 0;
            } else {
                // El jugador ha ganado, startGame() se encargará del mensaje
            }
        }

        saveProgress();
        startGame();

    }, 500);
}


function dibujarvidas() {
    let livesContainer = document.getElementById("contador-corazones");
    livesContainer.innerHTML = "";

    for (let i = 0; i < vidas; i++) {
        let heartEmoji = document.createElement("span");
        heartEmoji.innerText = "❤️";
        heartEmoji.style.fontSize = "30px";
        heartEmoji.style.margin = "0 3px";
        livesContainer.appendChild(heartEmoji);
    }
}

function handleLifeLoss() {
    dibujarvidas();
    if (vidas <= 0) {
        setTimeout(function() {
            alert("¡Game Over! Te has quedado sin vidas. El nivel se reiniciará.");
            startGame();
        }, 200);
    }
}