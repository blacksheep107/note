/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    let i=0, j=nums.length-1;
    while (i<j) {
        let tmp = nums[i]+nums[j];
        if (tmp === target) {
            return [nums[i], nums[j]];
        }
        if (tmp>target) j--;
        else    i++;
    }
};