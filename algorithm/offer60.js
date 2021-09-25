/**
 * @param {number} n
 * @return {number[]}
 */
var dicesProbability = function(n) {
    let dp = new Array(6).fill(1/6);
    for (let i=2;i<=n;i++) {
        let tmp = new Array(5*i+1).fill(0); // 新加入一个骰子可能有的点数组合
        for (let j=0;j<dp.length;j++) { // 每个点数组合对下一个排列的贡献
            for (let k=0;k<6;k++) {
                tmp[j+k]+=dp[j]/6;
            }
        }
        dp = tmp;   // 浅拷贝 tmp没被释放，下一个循环的tmp是新的
    }
    return dp;
};