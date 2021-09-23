/**
 * @param {number} n
 * @return {number}
 */
var nthUglyNumber = function(n) {
    let ans = [1],
        a2 = 0,
        a3 = 0,
        a5 = 0; // 未乘5的坐标
    for (let i=2;i<=n;i++) {
        let m2 = ans[a2]*2,
            m3 = ans[a3]*3,
            m5 = ans[a5]*5,
            tmp = Math.min(m2, m3, m5);
        ans.push(tmp);
        if (tmp === m2) a2++;
        if (tmp === m3) a3++;
        if (tmp === m5) a5++;
    }
    return ans[ans.length-1];
};
console.log(nthUglyNumber(7))