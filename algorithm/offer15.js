/**
 * @param {number} n - a positive integer
 * @return {number}
 */
 var hammingWeight = function(n) {
     let res=0;
    while(n){
        n&=n-1; // 异或
        res++;
    }
    return res;
};
console.log(hammingWeight(00000000000000000000000000001011));