/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
var spiralOrder = function(matrix) {
    if (matrix.length==0||matrix[0].length==0)  return [];
    let rows=matrix.length,columns=matrix[0].length;
    let answer=[];
    let left=0,right=columns-1,top=0,bottom=rows-1;
    while (left<=right&&top<=bottom) {
        for (let column=left;column<=right;column++){
            // 上 走到底
            answer.push(matrix[top][column]);
        }
        for (let row=top+1;row<=bottom;row++){
            // 右 走到底
            answer.push(matrix[row][right]);
        }
        if (left<right&&top<bottom){
            for (let column=right-1;column>left;column--){
                // 下 差一格到底
                answer.push(matrix[bottom][column]);
            }
            for (let row=bottom;row>top;row--){
                // 左 走到底
                answer.push(matrix[row][left]);
            }
        }
        [left,right,top,bottom]=[left+1,right-1,top+1,bottom-1];
    }
    return answer;
};
