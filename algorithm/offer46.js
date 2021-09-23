/**
 * @param {number} num
 * @return {number}
 */
var translateNum = function(num) {
    num = String(num);
    let ans = 1,    // 答案
        f1 = 0,     // f(i-1)
        f2 = 0;     // f(i-2)
    for (let i=0;i<num.length;i++) {
        f2 = f1;
        f1 = ans;
        ans = f1;
        if (i == 0) continue;
        let two = parseInt(num[i-1]+num[i]);
        if (two>=10 && two <=25) {
            ans += f2;
        }
    }
    return ans;
};