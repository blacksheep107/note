/**
 * @param {number[]} nums
 * @return {boolean}
 */
var isStraight = function(nums) {
    let max = 0,
        min = 14,
        map = {};
    for (let i=0;i<nums.length;i++) {
        if (nums[i] === 0)  continue;
        if (map[nums[i]]!==undefined) return false;
        map[nums[i]] = 1;
        max = Math.max(max, nums[i]);
        min = Math.min(min, nums[i]);
    }
    if (max-min>=5) return false;
    return true;
};