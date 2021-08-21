/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */

var levelOrder = function(root) {
    // 层序遍历
    let arr=[],ans=[];
    if (root==null) return ans;
    ans.push(root.val);
    if (root.left!==null)  arr.push(root.left);
    if (root.right!==null) arr.push(root.right);
    while (arr.length>0){
        ans.push(arr[0].val);
        if (arr[0].left!==null) arr.push(arr[0].left);
        if (arr[0].right!==null) arr.push(arr[0].right);
        arr.shift();
    }
    return ans;
};
