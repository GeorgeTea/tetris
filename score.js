// 记分规则
const scoreRules = { 1: 1, 2: 3, 3: 6, 4: 10 };

function addScore(lines) {
    score.number += scoreRules[lines];
}