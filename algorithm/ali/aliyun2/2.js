const a = ['1', 2, false, ['a[b]c', 'd,e,f', [3], [[4]]], [{g: 5}]];
let ans = [];
function flatten(arr) {
    /* 代码实现 */
    for (let i = 0; i < arr.length; i++) {
        if (Array.isArray(arr[i])) {
            flatten(arr[i]);
        } else {
            ans.push(arr[i]);
        }
    }
    return ans;
}
console.log(flatten(a))
