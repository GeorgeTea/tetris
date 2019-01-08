const
    speedLevel = [1000, 800, 600, 400, 200],
    gameStateEnum = {
        init: { btnName: '开始', key: 'init' },
        running: { btnName: '暂停', key: 'running' },
        suspend: { btnName: '继续', key: 'suspend' },
        end: { btnName: '重新开始', key: 'end' }
    };

var tetromino, run, gameState = gameStateEnum.init;

var app = new Vue({
    el: '#app',
    data: {
        message: 'Hello Tetris!'
    }
});

var gameBoard = new Vue({
    el: '#gameBoard',
    data: { rows: initBoard() }
});

var score = new Vue({
    el: '#score',
    data: {
        number: 0
    }
});

var opBtn = new Vue({
    el: '#opBtn',
    data: {
        buttonName: gameState.btnName,
    },
    methods: {
        opBtnHandler: function (event) {
            switch (gameState) {
                case (gameStateEnum.end):
                    gameBoard.rows = initBoard();
                case (gameStateEnum.init):
                case (gameStateEnum.suspend):
                    gameState = gameStateEnum.running;
                    run = setInterval(start, 200);
                    break;
                case (gameStateEnum.running):
                    gameState = gameStateEnum.suspend;
                    clearInterval(run);
                    break;
            }
            opBtn.buttonName = gameState.btnName;
        }
    }
});

function start() {
    // TODO: 此处待重构为面向对象式调用
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
    opBtn.buttonName = gameState.btnName;
}

function isRunning() {
    return gameState === gameStateEnum.running;
}