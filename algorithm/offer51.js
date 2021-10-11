/**
 * @param {number[]} nums
 * @return {number}
 */
var merge = function (nums, tmp, l, r) {
    if (l>=r)   return 0;
    let m = parseInt((l+r)/2);
    let res = merge(nums, tmp, l, m)+merge(nums, tmp, m+1,r);
    let i = l,
        j = m+1;
    for (let k=l;k<=r;k++)  tmp[k] = nums[k];
    // console.log(tmp, l, m,  r);
    for (let k=l;k<=r;k++) {
        if (i === m+1) {
            nums[k] = tmp[j++];
        }else if (j === r+1 || tmp[i]<=tmp[j]) {
            nums[k] = tmp[i++];
        }else{
            // 逆序
            nums[k] = tmp[j++];
            res+=(m-i+1);
        }
    }
    return res;
}
var reversePairs = function(nums) {
    let tmp = [...nums];
    return merge(nums, tmp, 0, nums.length-1);
};
console.log(reversePairs([7,5,6,4]));