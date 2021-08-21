/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} A
 * @param {TreeNode} B
 * @return {boolean}
 */
var isSame = function (t1,t2) {
    if (t2==null)   return true;
    if (!t1||t1.val!=t2.val)    return false;
    return isSame(t1.left,t2.left)&&isSame(t1.right,t2.right);
}
var isSubStructure = function(A, B) {
    return ((A!==null && B!==null) && (isSame(A,B)||isSubStructure(A.left,B)||isSubStructure(A.right,B)));
};
