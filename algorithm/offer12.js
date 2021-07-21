/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
 board = [["C","A","A"],["A","A","A"],["B","C","D"]], word = "AAB"

var dfs=function(board,word,i,j,k){    // i行k列，对应到第k个字符
    console.log(board,i,j,k);
    if(i>=board.length||j>=board[0].length||i<0||j<0||board[i][j]!=word[k])   return false;
    if(k==word.length-1)   return true;
    board[i][j]='';
    let res=dfs(board,word,i+1,j,k+1)||dfs(board,word,i-1,j,k+1)||dfs(board,word,i,j+1,k+1)||dfs(board,word,i,j-1,k+1);
    board[i][j]=word[k];    // 一定要复原，之前没找到路还是设为空后面的路也找不到
    return res;
 }
var exist = function(board, word) {
    for(let i=0;i<board.length;i++){
        for(let j=0;j<board[0].length;j++){
            if(dfs(board,word,i,j,0))   return true;
        }
    }
    return false;
};
console.log((exist(board,word)));