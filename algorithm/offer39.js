/**
 * @param {number[]} nums
 * @return {number}
 */
var majorityElement = function(nums) {
    // 注意不是传统意义的众数！！是超过半数的数
    let count = 0;
    let index;
    for (let i=0;i<nums.length;i++) {
        if (count == 0) index = nums[i];
        if (nums[i] === index)  count++;
        else    count--;
    }
    return index;
};
