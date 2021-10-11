/**
 * @param {string} str
 * @return {number}
 */
var strToInt = function(str) {
    // str = str.trim().split('');
    // if (str.length == 0)    return 0;
    // let res = 0, bndry = Math.pow(2,31)-1;
    // let sign = 1, i = 1;
    // if (str[0] == '-')  sign = -1;
    // else if (str[0] !=='+')   i = 0;
    // for (;i<str.length;i++) {
    //     if (str[i]<'0'||str[i]>'9') break;
    //     res = (str[i] - '0') + res*10;
    //     if (res>bndry||res==bndry&&str[i]>'7')  return sign===1?Math.pow(2,31)-1:-Math.pow(2,31);
    // }
    // return sign*res;
    let matchStr = str.trim().match(/^[+-]?\d+/);
    console.log(matchStr)
    if (!matchStr)  return 0;
    if (matchStr >= Math.pow(2,31)) return Math.pow(2,31)-1;
    if (matchStr <= -Math.pow(2,31)) return -Math.pow(2,31);
    return matchStr[0];
};