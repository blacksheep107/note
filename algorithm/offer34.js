/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} target
 * @return {number[][]}
 */
var pathSum = function(root, target) {
    var res=[], stack=[];
    function dfs(root, target) {
        if (root===null)    return;
        target-=root.val;
        stack.push(root.val);
        if (target==0 && root.left===null && root.right===null) {
            res.push([...stack]);   // 深拷贝
        }
        dfs(root.left, target);
        dfs(root.right, target);
        stack.pop();    // 回到上一层
    }
    dfs(root, target);
    return res;
};
