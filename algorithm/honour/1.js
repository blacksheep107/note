// let line = readline();
let line = 'A={1,3,5},B={2,4,6},R=1';
line = line.split('=');
let A = line[1].slice(1, line[1].length-3).split(',');
let B = line[2].slice(1, line[2].length-3).split(',');
let R = parseInt(line[3]);
// console.log(A, B, R)
for (let i=0;i<A.length;i++)    A[i] = parseInt(A[i]);
for (let i=0;i<B.length;i++)    B[i] = parseInt(B[i]);
let i = 0, ans = [], j = 0;
for (;i<A.length;i++) {
    for (;j<B.length;j++) {
        if (B[j]>=A[i]) {
            ans.push([A[i], B[j]]);
            break;
        }
    }
    for (let k = j+1; k<B.length; k++) {
        if (B[k] - A[i] <= R) {
            ans.push([A[i], B[k]]);
        }
    }
}
let str = ans.join(')(');
console.log('('+str+')');
