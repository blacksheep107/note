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