/**
 * @param {number} n
 * @return {number}
 */
 var fib = function(n) {
    let f=[];
    f[0]=0;f[1]=1;
    for(let i=2;i<=n;i++)   f[i]=(f[i-1]+f[i-2])%1000000007;
    return f[n];
};
console.log(fib(81)%1000000007)
