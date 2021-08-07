// /**
//  * @param {number} n
//  * @return {number}
//  */
//  n=120;
//  // 动态规划
//  const max=(...args)=>args.reduce((a,b)=>a>b?a:b);
//  var cuttingRope = function(n) {
//     let dp=new Array(n).fill(BigInt(1));
//     dp[2]=BigInt(1);
//     dp[3]=BigInt(2);
//     for(let i=3;i<=n;i++){
//         // i是剪掉剩下的长度
//         for(let j=2;j<=i-2;j++){
//             // j试探接下来要剪的长度，剪1没意义
//             dp[i]=max(dp[i], BigInt(j)*max(dp[i-j],BigInt(i-j)));
//             // 剪掉j后剩下的i-j可以剪也可以不剪，看dp和不剪哪个大
//         }
//     }
//     return BigInt(dp[n])%(1000000007n);
// };
//  console.log(cuttingRope(n))

// 贪心更快，剪成3可以达到最大。证明我放弃了。
 const max=(...args)=>args.reduce((a,b)=>a>b?a:b);
 var cuttingRope = function(n) {
     if(n<4)    return n-1;
     if(n==4)  return n;
     let res=BigInt(1);
     while(n>4){
        n-=3;
        res*=BigInt(3);
     }
     res*=BigInt(n);
     return res%BigInt(1000000007);
};
console.log(cuttingRope(10))
