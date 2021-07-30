var get = function(x){
    let res=0;
    while(x){
        res+=x%10;
        x=parseInt(x/10);
    }
    return res;
}
var movingCount = function(m, n, k) {
    let c=1;
    let arr=[[]];
    if(k==0)    return  1;
    for(let i=0;i<m;i++){
        arr[i]=[];
        arr[0][0]=1;
        for(let j=0;j<n;j++){
            // 只会从左边和上面来
            // 本身不能到达 continue
            if(i==0&&j==0||get(i)+get(j)>k) continue;
            if(i>=1)    arr[i][j] |= arr[i-1][j];
            if(j>=1)    arr[i][j] |= arr[i][j-1];
            if(arr[i][j])   c++;
        }
    }
    return c;
};
m = 3, n = 1, k = 0
console.log(movingCount(m,n,k));