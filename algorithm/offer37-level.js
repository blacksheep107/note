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
// 层序遍历
var serialize = function(root) {
    if (root === null)  return '';
    let ans = [];
    let arr = [];
    arr.push(root);
    while (arr.length>0) {
        if (arr[0] === null) {
            ans.push('n');
            arr.shift();
            continue;
        }
        ans.push(arr[0].val);
        arr.push(arr[0].left);
        arr.push(arr[0].right);
        arr.shift();
    }
    return ans.join(',');
};
/**
 * Decodes your encoded data to tree.
 *
 * @param {string} data
 * @return {TreeNode}
 */
var deserialize = function(data) {
    if (data == '') return null;
    let arr=data.split(',');
    if (arr.length === 0)   return [];
    let queue = []; // 节点
    let root = new TreeNode(arr[0]);    // 根节点
    arr.shift();
    queue.push(root);
    while (queue.length>0&&arr.length>0) {
        let node = queue.shift();
        if (arr[0] !== null) {
            node.left = arr[0] === 'n'?null: new TreeNode(arr[0]);
            if (node.left!==null)   queue.push(node.left);
        }
        arr.shift();
        if (arr[0] !== null) {
            node.right = arr[0] === 'n'?null: new TreeNode(arr[0]);
            if (node.right!==null)   queue.push(node.right);
        }
        arr.shift();
    }
    return root;
};

/**
 * Your functions will be called as such:
 * deserialize(serialize(root));
 */
