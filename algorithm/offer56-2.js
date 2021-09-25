/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNumber = function(nums) {
    let counts = new Array(32).fill(0);
    nums.forEach(num=>{
        for (let i=0;i<32;i++) {
            counts[i]+=num&1;
            num>>>=1;
        }
    });
    let res = 0, m = 3;
    for (let i=counts.length-1;i>=0;i--) {
        res<<=1;
        res|=counts[i]%3;
    }
    return res;
};
console.log(singleNumber([3,4,3,3]))