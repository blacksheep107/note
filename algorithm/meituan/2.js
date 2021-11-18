let n = readInt();
let arr = [];
for (let i = 1;i<=n;i++) arr.push(i);
let ans = [];
function check(a) {
    for (let i=0;i<n;i++) {
        if (a[i] === i+1)   return false;
    }
    return true;
}
function fun(x){
    if (x === n-1) {
        if (check(arr)) ans.push([...arr]);
    }else{
        let set = new Set();
        for (let i=x; i<n; i++) {
            [arr[i], arr[x]] = [arr[x], arr[i]];
            fun(x+1);
            [arr[i], arr[x]] = [arr[x], arr[i]];
        }
    }
}
fun(0);
console.log(ans.length);
ans.sort((a,b)=>{
    return parseInt(a.join(''))-parseInt(b.join(''));
})
ans.forEach(item=>{
    console.log(item.join(' '));
})
