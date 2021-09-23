/**
 * @param {number[][]} grid
 * @return {number}
 */
var maxValue = function(grid) {
    let m = grid.length,
        n = grid[0].length;
    for (let i=1;i<n;i++)   grid[0][i]+=grid[0][i-1];
    for (let i=1;i<m;i++)   grid[i][0]+=grid[i-1][0];
    for (let i=1;i<m;i++) {
        for (let j=1;j<n;j++) {
                grid[i][j] += Math.max(grid[i-1][j], grid[i][j-1]);
        }
    }
    console.log(grid)
    return grid[m-1][n-1];
};