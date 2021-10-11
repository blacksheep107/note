/**
 * @param {number} k
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(k, prices) {
    if (!prices.length) return 0;
    let length = prices.length;
    if (k>=length/2) {
        return maxProfitk(prices);
    }
    let dp = new Array(k+1);
    for (let i=0;i<k+1;i++) {
        dp[i] = new Array(2).fill(0);
    }
    for (let i=1;i<=k;i++) {
        dp[i][1] = -prices[0];
    }
    for (let i=1;i<length;i++) {
        for (let j=k;j>0;j--) {
            dp[j][0] = Math.max(dp[j][0], dp[j][1]+prices[i]);
            dp[j][1] = Math.max(dp[j][1], dp[j-1][0]-prices[i]);
        }
    }
    console.log(dp)
    return dp[k][0];
};
var maxProfitk = function (prices) {
    if (!prices.length) return 0;
    let p0 = 0, p1 = -prices[0];
    let length = prices.length;
    for (let i=1;i<length;i++) {
        let newp0 = Math.max(p0, p1+prices[i]);
        let newp1 = Math.max(p1, p0-prices[i]);
        p0 = newp0;
        p1 = newp1;
    }
    return p0;
};
console.log(maxProfit(2, [3,2,6,5,0,3]))