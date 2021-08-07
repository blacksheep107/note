/**
 * @param {number} n
 * @return {number[]}
 */
 var printNumbers = function(n) {
    // 最大的n位十进制
    let ans=1;
    for(let i=0;i<n;i++)    ans*=10;
    let arr=[];
    for(let i=1;i<ans;i++)  arr.push(i);
    console.log(arr);
    return arr;
};
printNumbers(3);