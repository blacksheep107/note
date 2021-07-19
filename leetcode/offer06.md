- JavaScript函数构建树节点时要有new
- 记住结束循环条件，传入的数组为空时结束。前中序数组长度肯定一样的。
- 根节点初始化取前序遍历的第一个，然后再中序遍历里找根节点，以此区分左子树和右子树。
- 把左子树的前序和中序递归构建，左子树就是根节点的左儿子，右子树同样。
```
// 输入前序中序遍历，构建二叉树
preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]
function TreeNode(val){
    this.val=val;
    this.left=this.right=null;
}
var buildTree = function(preorder, inorder) {
    if(preorder.length==0)  return null;    // 少了这个会死循环
    let root=new TreeNode(preorder[0]);
    let rootInMiddle=inorder.indexOf(root.val);
    root.left=buildTree(preorder.slice(1,rootInMiddle+1),inorder.slice(0,rootInMiddle));
    root.right=buildTree(preorder.slice(rootInMiddle+1,preorder.length),inorder.slice(rootInMiddle+1,inorder.length));
    return root;
};
// 递归法
buildTree(preorder,inorder)
```