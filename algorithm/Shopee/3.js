let line = gets()
// let line = '[1, [2,3],[4, [5, 6]]]'
// line = line.split(',')
// for (let i=0;i<line.length;i++) {
//     for (let j=0;j<line[i].length;j++) {
//         line[i] = line[i].trim();
//         if (line[i][j] == '['||line[i][j] == ']') {
//             line[i] = line[i].slice(0, j)+line[i].slice(j+1);
//             j--
//         }
//     }
// }
let ans = [];
let dfs = function (obj) {
    if (Array.isArray(obj)) {
        for (let i=0;i<obj.length;i++)  dfs(obj[i]);
    } else {
        ans.push(obj);
    }
}
dfs(line);
print(ans)
// console.log(ans)
