let n = readInt();
let a = [],
    b = [];
for (let i=0;i<n-1;i++) {
    let tmp = readInt();
    a.push(tmp);
}
for (let i=0;i<n-1;i++) {
    let tmp = readInt();
    b.push(tmp);
}
let ans = new Array(n).fill(0);
for (let i=0;i<n;i++) {
    if (i === 0)    ans[0] = 1;
    else{
        ans[i] = a[i-1]*ans[b[i-1]-1];
    }
}
console.log(ans.join(' '));
