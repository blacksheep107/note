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
 * @param {number} targetSum
 * @return {number}
 */
var ans = 0;
var dfs = function(node, path, value, targetSum) {
    // console.log(path, value);
    if(value === targetSum) {
        if(!(path.length===0&&targetSum===0&&node.val!==0))
            ans++;
    }
    let tmp = value;
    for(let i=0;i<path.length-1;i++) {
        tmp-=path[i];
        if(tmp === targetSum) {
            ans++;break;
        }
    }
    
    if(node === null)   return;
    path.push(node.val);
    // console.log(path, value);
    dfs(node.left, [...path], value+node.val, targetSum);
    dfs(node.right, [...path], value+node.val, targetSum);
}
var pathSum = function(root, targetSum) {
    if(root === null)   return 0;
    ans = 0;
    dfs(root, [], 0, targetSum);
    return Math.floor(ans/2);
};