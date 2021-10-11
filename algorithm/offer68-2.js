/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
var lowestCommonAncestor = function(root, p, q) {
    if (root === null || p == root || q == root)    return root;
    let left = lowestCommonAncestor(root.left, p, q);   // 左子树是否有要找的
    let right = lowestCommonAncestor(root.right, p, q);
    // 不在左子树则一定在右子树，不在右子树则一定在左子树，两个节点在两边，则只有根会是共同祖先
    return left === null ? right: (right === null ? left: root)
};