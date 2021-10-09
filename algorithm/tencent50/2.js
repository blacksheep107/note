/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function(l1, l2) {
    let h1 = l1,
        h2 = l2,
        num1 = [],
        num2 = [];
    while (h1!==null) {
        num1.unshift(h1.val);
        h1 = h1.next;
    }
    while (h2!==null) {
        num2.unshift(h2.val);
        h2 = h2.next;
    }
    num1 = BigInt(num1.join(''));
    num2 = BigInt(num2.join(''));
    console.log(num1, num2);
    let ans = String(num1+num2).split('');
    let head = new ListNode(ans[ans.length-1]);
    let pre = head;
    for (let i=ans.length-2;i>=0;i--) {
        let tmp = new ListNode(ans[i]);
        pre.next = tmp;
        pre = tmp;
    }
    return head;
};