/**
 * @param {number[]} postorder
 * @return {boolean}
 */
var fun = function (postorder, i, j) {
    if (i>=j)   return true;
    let p=i;
    while (postorder[p]<postorder[j])   p++;    // 左子树结束
    let leftindex = p;
    while (postorder[p]>postorder[j])  p++; // 右子树结束
    return p===j && fun(postorder, i, leftindex-1) && fun(postorder, leftindex, j-1);
}
var verifyPostorder = function(postorder) {
    return fun(postorder, 0, postorder.length-1);
};
