//const vue = require('vue');
const
    speedLevel = [1000, 800, 600, 400, 200],
    gameStateEnum = { init: 'init', running: 'running', suspend: 'suspend', end: 'end' };

var tetromino, run, gameState = gameStateEnum.init;

var app = new Vue({
    el: '#app',
    data: {
        message: 'Hello Tetris!'
    }
});

var gameBoard = new Vue({
    el: '#gameBoard',
    data: initBoard()
});

var score = new Vue({
    el: '#score',
    data: {
        number: 0
    }
});

var startGame = new Vue({
    el: '#opBtn',
    data: {
        buttonName: gameStateEnum.init,
    },
    methods: {
        opBtnHandler: function(event) {
            if (gameState === gameStateEnum.init) {
                run = setInterval(start, 200);
                gameState = gameStateEnum.running;
            }
        }
    }
});

function start() {
    // TODO 此处待重构为面向对象式调用
    if (!tetromino || tetromino.fixed === true) {
        // 当前无未放置的方块
        if (!createTetromino()) {
            over();
            console.log('game over');
        }
    } else {
        // 当前有未放置的方块
        down();
    }
}

function over() {
    clearInterval(run);
    gameState = gameStateEnum.end;
}

function isRunning() {
    return gameState === gameStateEnum.running;
}