/**
 * @param {number} k
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(k, prices) {
    if (!prices.length) return 0;
    let length = prices.length;
    let dp = new Array(length);
    for (let i=0;i<length;i++) {
        dp[i] = new Array(k+1);
        for (let j=0;j<k+1;j++) {
            dp[i][j] = new Array(2).fill(0);
        }
    }
    for (let i=1;i<=k;i++) {
        dp[0][i][1] = -prices[0];
    }
    for (let i=1;i<length;i++) {
        for (let j=k;j>0;j--) {
            dp[i][j][0] = Math.max(dp[i-1][j][0], dp[i-1][j][1]+prices[i]);
            dp[i][j][1] = Math.max(dp[i-1][j][1], dp[i-1][j-1][0]-prices[i]);
        }
    }
    return dp[length-1][k][0];
};
console.log(maxProfit(2, [3,2,6,5,0,3]))