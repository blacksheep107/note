/*
 * function ListNode(x){
 *   this.val = x;
 *   this.next = null;
 * }
 */

/**
 * 代码中的类名、方法名、参数名已经指定，请勿修改，直接返回方法规定的值即可
 *
 * @param k int整型
 * @param a ListNode类 表示数串
 * @return long长整型
 */
function solve( k ,  a ) {
    // write code here
    let arr = [];
    let p = a;
    while (p!==null) {
        arr.push(p.val);
        p = p.next;
    }
    // let arr = [2,1,3,4,5];
    arr.sort((a,b)=>a-b);
    let x = arr[arr.length-2],
        y = arr[arr.length-1],
        i = arr.length-2;
    let ans = (x^y)*k+(x*y);
    if (k === 0)    return ans;
    else if (k>0) {
        while (x^y===0&&i>0) x = arr[--i];
        ans = Math.max(ans, (x^y)*k+(x*y));
    } else {
        x = arr[0];
        y = arr[1];
        i = 2;
        ans = (x^y)*k+(x*y);
    }

    return ans;
}
// console.log(solve(0))
module.exports = {
    solve : solve
};