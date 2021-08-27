/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

/**
 * Encodes a tree to a single string.
 *
 * @param {TreeNode} root
 * @return {string}
 */
var serialize = function(root) {
    return funs(root, []).join(',');
};
var funs = function (root, ans) {
    if (root === null)  ans.push('n');
    else {
        ans.push(root.val);
        ans = funs(root.left, ans);
        ans = funs(root.right, ans);
    }
    return ans;
}
/**
 * Decodes your encoded data to tree.
 *
 * @param {string} data
 * @return {TreeNode}
 */
var deserialize = function(data) {
    let arr=data.split(',');
    console.log(arr);
    var dfs = function () {
        if (arr[0] === 'n') {
            arr.shift();
            return null;
        }
        let root = new TreeNode(parseInt(arr[0]));
        arr.shift();
        root.left = dfs();
        root.right = dfs();
        return root;
    }
    return dfs();
};

/**
 * Your functions will be called as such:
 * deserialize(serialize(root));
 */
