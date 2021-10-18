/**
 * @param {string} s
 * @return {string[]}
 */
var reverse = function (arr, start, end) {
    let left = start, right = end-1;
    while (left<right) {
        [ arr[left], arr[right] ] = [ arr[right], arr[left]];
        left++;
        right--;
    }
}
var permutation = function(s) {
// 保证右边是降序的
    // 1 2 3 4 5
    // 1 2 3 5 4
    // 从后往前，找到第一个升序对，保证要换掉的高位是最低的
    // 从后往前，找到第一个大于升序对前面那个的，保证要替换过去的是最小的（保证右边是降序
    let arr = Array.from(s).sort(); // 升序
    let ans = [];
    ans.push(arr.join(''));
    while (1) {
        let i = arr.length-1;
        let flag = 1;
        for (;i>=1;i--) {
            if (arr[i]>arr[i-1]){
                i--;
                flag = 0;
                break;
            }
        }
        if (flag) break;
        let j = arr.length-1;
        let jflag = 1;
        for (;j>=0;j--) {
            if (arr[i]<arr[j]) {
                jflag = 0;
                break;
            }
        }
        if (jflag) break;
        [ arr[i], arr[j] ] = [ arr[j], arr[i] ];
        reverse(arr, i+1, arr.length);
        // 替换后的右边逆序，
        ans.push(arr.join(''));
    }
    return ans;
};
console.log(permutation('abc'))
