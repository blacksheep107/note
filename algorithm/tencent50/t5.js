let tree=JSON.parse(readline());
let c1 = parseInt(readline());
let c2 = parseInt(readline());
// let tree = {"id":1,"zIndex":1,"children":[{"id":2,"zIndex":3,"children":[{"id":4,"zIndex":11}]},{"id":3,"zIndex":3,"children":[{"id":6,"zIndex":9}]}]}
// let c1 = 4
// let c2=6
let path1, path2;
var dfs = function (root, path) {
    if (root === undefined) return;
    path.push({
        id: root.id,
        zIndex: root.zIndex
    });
    if (root.id == c1) {
        path1 = [...path];
    }
    if (root.id == c2) {
        path2 = [...path];
    }
    if (path1!==undefined&&path2!==undefined)   return;
    if (root.children===undefined)  return;
    for (let i=0;i<root.children.length;i++) {
        dfs(root.children[i], path);
    }
}
dfs(tree, []);
let father = 0; // 共同父节点层级
for (let i=0, j=0;i<path1.length||j<path2.length;i++,j++) {
    if (i==path1.length) {
        father = i-1;break;
    }
    if (j==path2.length) {
        father = j-1;break;
    }
    if (path1[i].id==path2[j].id) {
        father = i;
    }
}
let flag = 1;
// console.log(path1);
// console.log(path2);

for (let i=father, j=father;i<path1.length||j<path2.length;i++,j++) {
    if (i==path1.length)    i--;
    if (path1[i].zIndex > path2[j].zIndex) {
        flag = 0;
        console.log('yes');
        break;
    }
}
if (flag) console.log('no');
