// 定义方块类型与键盘事件
const tetrominos = [
    [0xcc00],//方块
    [0x4444, 0xf0],//长条
    [0x4e00, 0x4c40, 0xe400, 0x4640],//T块
    [0x88c0, 0x2e0, 0x6220, 0xe800],//L
    [0x2260, 0xe200, 0xc880, 0x8e0],//逆L
    [0xc600, 0x4c8],//Z
    [0x6c00, 0x8c40],//逆Z
],
    keycom = {
        "38": "rotate()",
        "40": "down()",
        "37": "left()",
        "39": "right()"
    };

// 创建新的方块
function createTetromino() {
    tetromino = {};
    tetromino.new = {};
    let _cube = tetrominos[~~(Math.random() * tetrominos.length)];
    let _index = ~~(Math.random() * _cube.length);
    tetromino.new.index = _index;
    tetromino.new.cube = _cube;
    tetromino.new.position = { y: boardHeight, x: 5 };
    if (!isAvailablePosition(tetromino.new)) {
        return false;
    }
    drawTetromino(tetromino);
    return true;
}

// 清除方块
function clearTetromino(tetromino) {
    updateTetromino(tetromino.old, atomStateEnum.empty);
}

// 绘制方块
function drawTetromino(tetromino) {
    updateTetromino(tetromino.new, atomStateEnum.temp);
}

// 固定方块
function fixTetromino(tetromino) {
    updateTetromino(tetromino.old, atomStateEnum.full);
    tetromino.fixed = true;
}

// 将方块的表达方式从16进制转换为2进制，长度补位为16
function _getCube(tetromino){
    let cube = parseInt(tetromino.cube[tetromino.index]).toString(2);
    return ' '.repeat(16 - cube.length) + cube;
}

// 更新方块所在区域的画板状态
function updateTetromino(tetromino, state) {
    let cube = _getCube(tetromino);
    for (let i = 0; i <= 3; i++) {
        for (let j = 0; j <= 3; j++) {
            if (cube.charAt(i * 4 + j) == '1') {
                changeAtom(tetromino.position.y - i, tetromino.position.x + j, state);
            }
        }
    }
}

// 检查方块位置是否合法
// 不超出画板范围，画板位置无已有方块
function isAvailablePosition(tetromino) {
    let cube = _getCube(tetromino);
    for (let i = 0; i <= 3; i++) {
        for (let j = 0; j <= 3; j++) {
            var x = tetromino.position.x + j;
            var y = tetromino.position.y - i;
            if (cube.charAt(i * 4 + j) == '1' && (!isInBoard(y, x) || !isAtomEmpty(y, x))) {
                return false;
            }
        }
    }
    return true;
}

// 方块变形
function rotate() {
    if (!canMove()) {
        return;
    }
    tetromino.old = JSON.parse(JSON.stringify(tetromino.new));
    tetromino.new.index = (tetromino.new.index + 1) % (tetromino.new.cube.length)
    if (isAvailablePosition(tetromino.new)) {
        clearTetromino(tetromino);
        drawTetromino(tetromino);
    } else {
        tetromino.new = JSON.parse(JSON.stringify(tetromino.old));
    }
}

// 方块下降
function down() {
    if (!canMove()) {
        return;
    }
    tetromino.old = JSON.parse(JSON.stringify(tetromino.new));
    tetromino.new.position = { y: tetromino.new.position.y - 1, x: tetromino.new.position.x };
    if (isAvailablePosition(tetromino.new)) {
        clearTetromino(tetromino);
        drawTetromino(tetromino);
    } else {
        // 固定方块
        fixTetromino(tetromino);
        // 刷新画板
        // TODO: 此处待重构为面向对象式调用 
        update();
    }
}

// 方块左移
function left() {
    if (!canMove()) {
        return;
    }
    tetromino.old = JSON.parse(JSON.stringify(tetromino.new));
    tetromino.new.position = { y: tetromino.new.position.y, x: tetromino.new.position.x - 1 };
    if (isAvailablePosition(tetromino.new)) {
        clearTetromino(tetromino);
        drawTetromino(tetromino);
    } else {
        tetromino.new = tetromino.old;
    }
}

// 方块右移
function right() {
    if (!canMove()) {
        return;
    }
    tetromino.old = JSON.parse(JSON.stringify(tetromino.new));
    tetromino.new.position = { y: tetromino.new.position.y - 1, x: tetromino.new.position.x + 1 };
    if (isAvailablePosition(tetromino.new)) {
        clearTetromino(tetromino);
        drawTetromino(tetromino);
    } else {
        tetromino.new = tetromino.old;
    }
}

function canMove() {
    return isRunning() && tetromino && !tetromino.fixed;
}

document.addEventListener('keydown', function (e) {
    eval(keycom[e.keyCode]);
});