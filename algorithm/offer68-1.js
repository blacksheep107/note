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
// var flag = 0;
// var route1 = [],
//     route2 = [];
// var dfs = function (node, p, q, route) {
//     // console.log(node.val, route)
//     route.push(node);
//     if (node.val == p) {
//         flag++;
//         route1 = [...route];
//     }
//     if (node.val == q) {
//         flag++;
//         route2 = [...route];
//     }
//     // console.log(flag, route1, route2)
//     if (flag === 2) return;
//     if (node.left !== null) dfs(node.left, p, q, route);
//     if (node.right !== null) dfs(node.right, p, q, route);
//     route.pop();
// }
// var lowestCommonAncestor = function(root, p, q) {
//     flag =0;
//     route1 = [];
//     route2 = [];
//     dfs(root, p.val, q.val, []);
//     // console.log(route1, route2)
//     let ans = 0;
//     for (let i=Math.min(route1.length, route2.length)-1;i>=0; i--) {
//         if (route1[i].val === route2[i].val) {
//             ans = route1[i];
//             break;
//         }
//     }
//     return ans;
// };

// 搜索树
var lowestCommonAncestor = function(root, p, q) {
    while (true) {
        if (root.val === p.val || root.val === q.val || (p.val > root.val && q.val < root.val) ||
            (p.val < root.val && q.val > root.val))   return root;
        else if (p.val > root.val) {
            root = root.right;
        }
        else if (p.val < root.val) {
            root = root.left;
        }
    }
};