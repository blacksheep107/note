/**
 * @param {number} n
 * @return {number}
 */
n=10;
// 动态规划
 var cuttingRope = function(n) {
    let dp=[];
    for(let i=1;i<=n;i++)   dp[i]=1;
    dp[3]=2;
    for(let i=3;i<=n;i++){
        // i是剪掉剩下的长度
        for(let j=2;j<=i-2;j++){
            // j试探接下来要剪的长度，剪1没意义
            dp[i]=Math.max(dp[i], j*Math.max(dp[i-j],i-j));
            // 剪掉j后剩下的i-j可以剪也可以不剪，看dp和不剪哪个大
        }
    }
    return dp[n];
};
console.log(cuttingRope(n))