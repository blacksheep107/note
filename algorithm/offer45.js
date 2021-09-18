/**
 * @param {number[]} nums
 * @return {string}
 */
var minNumber = function(nums) {
    return nums.sort((a, b)=>{return (String(a)+String(b))-(String(b)+String(a))}).join('')
};