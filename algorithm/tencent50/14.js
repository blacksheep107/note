/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function(strs) {
    let tmp = strs[0];
    for(let i=1;i<strs.length;i++) {
        let str = strs[i];
        let s1 = 0, s2 = 0;
        for(;s1<tmp.length,s2<str.length;s1++,s2++) {
            if(tmp[s1]!==str[s2]) {
                tmp = tmp.slice(0, s1);
                break;
            }
        }
        if(s1<tmp.length&&s2===str.length) {
            tmp = str;
        }
        if(tmp==="")    break;
        // console.log(str, tmp);
    }
    return tmp;
};