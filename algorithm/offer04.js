matrix=[
    [1,   4,  7, 11, 15],
    [2,   5,  8, 12, 19],
    [3,   6,  9, 16, 22],
    [10, 13, 14, 17, 24],
    [18, 21, 23, 26, 30]
  ];
// [1,20]
// [21,22]
target=5;
// 二叉搜索树，右上角为根节点
var findNumberIn2DArray = function(matrix, target) {
    if(!matrix||matrix.length==0) return false;
    let i=0,j=matrix[0].length-1;
    while(i<matrix.length&&j>=0){
        if(target==matrix[i][j])    return true;
        else if(target>matrix[i][j])    i++;
        else    j--;
    }
    return false;
};
console.log(findNumberIn2DArray(matrix,target))
