/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isSame = function (A,B) {
    if (A===null&&B===null)   return true;
    if (A!==null&&B!==null&&A.val!=B.val||A==null||B==null)   return false;
    return isSame(A.left,B.right)&&isSame(A.right,B.left);
}
var isSymmetric = function(root) {
    return isSame(root,root)
};
