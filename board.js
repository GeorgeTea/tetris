// 游戏画板相关的参数
const boardHeight = 20,
    boardWidth = 10,
    atomStateEnum = { empty: 'empty', temp: 'temp', full: 'full' };

// 初始化游戏区
function initBoard() {
    var rows = new Array(boardHeight);
    for (let i = 0; i <= boardHeight - 1; i++) {
        rows[i] = initRow();
    }
    return rows;
}

// 初始化某一行
function initRow() {
    var row = new Array(boardWidth);
    for (let i = 0; i <= boardWidth - 1; i++) {
        row[i] = { state: atomStateEnum.empty };
    }
    return { row: row };
}

// 修改某一行的状态
function changeRow(y, state) {
    var row = gameBoard.rows[boardHeight - y].row;
    for (let i = 0, len = row.length - 1; i <= len; i++) {
        row[i].state = state;
    }
}

// 修改某个原子块的状态
function changeAtom(y, x, state) {
    gameBoard.rows[boardHeight - y].row[x - 1].state = state;
}

function isAtomEmpty(y, x) {
    return gameBoard.rows[boardHeight - y].row[x - 1].state != atomStateEnum.full;
}

// 判断某个坐标是否在游戏画板内
function isInBoard(y, x) {
    return x >= 1 && y >= 1 && x <= boardWidth && y <= boardHeight;
}

// 判断某一行是否满足删除条件
function needRemove(y) {
    var row = gameBoard.rows[y].row;
    for (let i = 0, len = row.length - 1; i <= len; i++) {
        if (row[i].state == atomStateEnum.empty) {
            return false;
        }
    }
    return true;
}

// 删除多行
function remove(linesNeedRemove) {
    var removeLength = linesNeedRemove.length,
        idxRemove = 0, //待删除行数的指针
        idxOri = boardHeight - 1; //全部行数的指针
    for (let i = boardHeight - 1; i >= removeLength; i--) {
        // 找到全部行中非待删除的行，idxRemove等于偏移量
        while (linesNeedRemove[idxRemove] == idxOri) {
            idxRemove++;
            idxOri--;
        }
        // 将当前行偏移量的行，复制到当前行
        gameBoard.rows[i].row = gameBoard.rows[i - idxRemove].row;
        idxOri--;
    }
    // 补充空白行
    for (let i = 0, len = removeLength; i <= len - 1; i++) {
        gameBoard.rows[i] = initRow();
    }
}

// 刷新画板（删除符合条件的行，计算分数）
function update() {
    var linesNeedRemove = []; // 自画板下往上
    for (let i = boardHeight - 1; i >= 0; i--) {
        if (needRemove(i)) {
            linesNeedRemove.push(i);
        }
    }
    if (linesNeedRemove.length > 0) {
        remove(linesNeedRemove);
        addScore(linesNeedRemove.length);
    }
}