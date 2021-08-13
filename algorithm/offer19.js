/**
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
var match=function(s,p,i,j){
    // i-1和j-1匹配
    if(i==0)    return false;
    if(p[j-1]=='.')  return true;
    return s[i-1]==p[j-1];
}
 var isMatch = function(s, p) {
     let m=s.length;
     let n=p.length;
     let f=new Array(m+1);
     for(let i=0;i<m+1;i++){
         f[i]=new Array(n+1).fill(false);
     }
     f[0][0]=true;
     for(let i=0;i<=m;++i){
         for(let j=1;j<=n;++j){
            if(p[j-1]=='*'){
                f[i][j]=f[i][j-2];  // 0个字符匹配
                if(match(s,p,i,j-1)){
                    f[i][j]=f[i][j]||f[i-1][j];
                }
            }else{
                if(match(s,p,i,j)){
                    f[i][j]=f[i-1][j-1];
                }
            }
         }
     }
     return f[m][n];
};
console.log(isMatch('aa','a'));