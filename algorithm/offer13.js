var get = function(x){
    let res=0;
    while(x){
        res+=x%10;
        x=parseInt(x/10);
    }
    return res;
}
var movingCount = function(m, n, k) {
    let c=0;
    let arr=[[]];
    if(k==0)    return  1;
    for(let i=0;i<m;i++){
        arr[i]=[];
        a[0][0]=1;
        for(let j=0;j<n;j++){
            if(i==0&&j==0||get(i)+get(j)>k) continue;
            if(i>=1)    arr[i][j]|=arr[i-1][j];
            if(j>=1)    arr[i][j]|=arr[i][j-1];
        }
    }
    return c;
};
console.log(movingCount(16,18,4));