// 记分规则
const scoreRules = { 1: 1, 2: 3, 3: 6, 4: 10 };

function addScore(lines) {
    score.number += scoreRules[lines];
    if (score.number / 10 >= score.level + 1) {
        levelUp();
    }
}

function levelUp() {
    if (score.level < speedLevel.length - 1) {
        score.level++;
        refreshGameSpeed();
    }
}