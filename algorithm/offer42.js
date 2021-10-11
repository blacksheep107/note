/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function(nums) {
    let dp = [nums[0]];
    for (let i=1; i<nums.length; i++) {
        dp[i] = nums[i];
        if (dp[i-1] > 0)    dp[i]+=dp[i-1];
    }
    console.log(dp)
    return Math.max(...dp)
};