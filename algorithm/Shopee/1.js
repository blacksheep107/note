
/**
 * Note: 类名、方法名、参数名已经指定，请勿修改
 *
 *
 *
 * @param matrix int整型二维数组 1或0的二维数组
 * @return int整型
 */
function isSquare(matrix, i, j, length) {
    for (let k = i;k<i+length;k++) {
        for (let q = j;q<j+length;q++) {
            if (matrix[k][q]!=1)    return false;
        }
    }
    return true;
}
function maxSquare(matrix) {
    // write code here
    matrix = [[1,0,1,0,0],[1,0,1,1,1],[1,1,1,1,1],[1,0,0,1,0]];
    let ans = 1;
    for (let i=0;i<matrix.length;i++) {
        for (let j=0;j<matrix[0].length;j++) {
            let maxL = Math.min(matrix.length-i, matrix[0].length);
            for (let l = 2;l<maxL;l++) {
                if (isSquare(matrix, i, j, l)&&l>ans)   ans = l*l;
            }
        }
    }
    return ans;
}
module.exports = {
    maxSquare : maxSquare
};
