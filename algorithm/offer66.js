
/**
 * @param {number[]} a
 * @return {number[]}
 */
var constructArr = function(a) {
    let ans = new Array(a.length).fill(1);
        left = 1,
        right = 1;
    for (let i=0;i<a.length;i++) {
        ans[i] *= left;
        left *= a[i];
        ans[a.length-i-1] *= right;
        right *= a[a.length-i-1];
    }
    return ans;
};
// 实际上就是维护左右两边的值，每个ans元素乘左边和右边的值