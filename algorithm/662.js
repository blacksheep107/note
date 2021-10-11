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
 * @return {number}
 */
var widthOfBinaryTree = function(root) {
    let queue = [];
    let curdepth = 0,
        left = BigInt(0),
        ans = BigInt(0);
    queue.push([root, 0, BigInt(0)]);
    while (queue.length>0) {
        let node = queue.shift();
        if (node[0] !== null) {
            queue.push([node[0].left, node[1]+1, BigInt(node[2]*BigInt(2))]);
            queue.push([node[0].right, node[1]+1, BigInt(node[2]*BigInt(2)+BigInt(1))]);
            if (curdepth !== node[1]) {
                curdepth = node[1];
                left = node[2]; // 新一层起始位置
            }
            ans = BigInt(node[2]-left+BigInt(1)) > ans?BigInt(node[2]-left+BigInt(1)):ans;
        }
    }
    return ans;
};