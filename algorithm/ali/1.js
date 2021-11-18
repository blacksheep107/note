function searchMatrix(matrix, value) {
    // 二叉搜索树
    let i = 0,
        j = matrix[0].length-1;
    while (i >= 0 && i < matrix.length && j >= 0 && j < matrix[0].length) {
        // console.log(matrix[i][j]);
        if (matrix[i][j] === value) {
            return true;
        } else if (matrix[i][j] > value) {
            j--;
        } else if (matrix[i][j] < value) {
            i++;
        }
    }
    return false;
}
console.log(searchMatrix([
    [2, 4, 5 , 9],
    [10, 13, 15, 21],
    [23, 31, 33, 51]
], 2))
