/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
    let min = prices[0],
        ans = 0;
    for (let i=0;i<prices.length;i++) {
        if (prices[i]<min)  min = prices[i];
        ans = Math.max(ans, prices[i] - min);
    }
    return ans;
};