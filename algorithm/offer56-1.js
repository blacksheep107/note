/**
 * @param {number[]} nums
 * @return {number[]}
 */
var singleNumbers = function(nums) {
    let xor = 0;
    for (let i=0;i<nums.length;i++) {
        xor^=nums[i];
    }
    let pos = 1;
    while ((pos&xor) === 0) {
        pos<<=1;    // 1左移
    }
    let x = nums.filter(num=>num&pos).reduce((cur,next)=>cur^next,0);
    let y = nums.filter(num=>(num&pos)===0).reduce((cur,next)=>cur^next,0);
    console.log(nums.filter(num=>num&pos))
    console.log(nums.filter(num=>(num&pos)===0))
    return [x,y];
};
console.log(singleNumbers([4,1,4,6]))