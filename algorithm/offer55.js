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
// var getHeight = function (node) {
//     if (node === null)  return 0;
//     return Math.max(getHeight(node.left), getHeight(node.right))+1;
// }
// var flag = true;
// var dfs = function (node) {
//     console.log(node.val, getHeight(node.left), getHeight(node.right))
//     if (Math.abs(getHeight(node.left)-getHeight(node.right)) > 1) {
//         flag = false;
//         return ;
//     }
//     if (node.left !== null)  dfs(node.left);
//     if (node.right !== null)  dfs(node.right);
// }
// var isBalanced = function(root) {
//     flag = true;
//     if (root == null)   return true;
//     dfs(root);
//     return flag;
// };

var height = function (node) {
    if (node === null)  return 0;
    let leftHeight = height(node.left);
    let rightHeight = height(node.right);
    if (leftHeight === -1 || rightHeight === -1 || Math.abs(leftHeight-rightHeight)>1) {
        return -1;
    }else {
        return Math.max(height(node.left), height(node.right))+1;
    }
}
var isBalanced = function (root) {
    return height(root) !== -1;
}