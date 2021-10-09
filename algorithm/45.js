/**
 * @param {number[]} nums
 * @return {number}
 */
var jump = function(nums) {
    let maxPos = 0,
        step = 0,
        end = 0;
    for(let i=0;i<nums.length-1;i++) {
        maxPos = Math.max(maxPos, i+nums[i]);
        // 在到end（边界）之前能跳到的最大位置，数组元素是可以跳跃的最大长度，所以边界内的都可以跳
        if(i === end) {
            // 边界内的所有跳跃中能跳到的最远位置
            end = maxPos;
            step++;
        }
    }
    return step;
};