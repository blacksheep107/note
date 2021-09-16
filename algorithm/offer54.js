/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} k
 * @return {number}
 */
var res, num;
var inOrder = function (node) {
    if (node.right !== null ) inOrder(node.right);
    if (num <= 0)   return;
    num--;
    console.log(num, node.val)
    if (num == 0) {
        res = node.val;
        return ;
    }
    if (node.left !== null) inOrder(node.left);
}

var kthLargest = function(root, k) {
    num = k;
    inOrder(root)
    return res;
};