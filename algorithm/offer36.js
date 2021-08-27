/**
 * // Definition for a Node.
 * function Node(val,left,right) {
 *    this.val = val;
 *    this.left = left;
 *    this.right = right;
 * };
 */
/**
 * @param {Node} root
 * @return {Node}
 */
var treeToDoublyList = function(root) {
    // 中序遍历
    var head = null, pre = null;
    var dfs = function (node) {
        if (node == null)   return;
        dfs(node.left);
        if (pre !== null)   pre.right = node;
        else    head = node;    // 第一层
        node.left = pre;
        pre = node; // pre往下层
        dfs(node.right);
    }
    if (root == null)   return null;
    dfs(root);
    head.left = pre;
    pre.right = head;
    return head;
};
