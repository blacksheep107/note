/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var levelOrder = function(root) {
    let arr=[],ans=[],flag=1;
    if (root===null)    return [];
    arr.push(root);
    while (arr.length!=0) {
        let tmp=[];
        let len=arr.length;
        for (let i=0;i<len;i++){
            tmp.push(arr[i].val);
            if (arr[i].left!==null) arr.push(arr[i].left);
            if (arr[i].right!==null)    arr.push(arr[i].right);
        }
        if (flag)   ans.push(tmp);
        else ans.push(tmp.reverse());
        flag=!flag;
        for (let i=0;i<len;i++) arr.shift();
    }
    return ans;
};
