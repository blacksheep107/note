function toCurrency(arr) {
    let ans = [...new Set(arr)].sort((a,b)=>{
        return b-a;
    });
    return Number(ans.join('')).toLocaleString();
}
console.log(toCurrency([ 7, 8, 3, 5, 1, 2, 4, 3, 1 ]));
// console.log(toCurrency([]));
