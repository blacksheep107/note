/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var maxSlidingWindow = function(nums, k) {
    let arr = [],
        ans = [];
    if (!nums.length || !k) return [];
    if (k === 1)    return nums;
    arr.push(0);
    for (let i=1;i<nums.length;i++) {
        console.log(arr.map(item=>nums[item]), nums[i-k], ans)
        if (i-k>=0&&arr[0] ===i-k)   arr.shift();
        if (nums[i] < nums[arr[arr.length-1]])   arr.push(i);
        else {
            while (nums[i] >= nums[arr[arr.length-1]]) arr.pop();
            arr.push(i);
        }
        if (i>=k-1)   ans.push(nums[arr[0]]);
    }
    return ans;
};
console.log(maxSlidingWindow([-7,-8,7,5,7,1,6,0], 4))