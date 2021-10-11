/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
    let ans = 1;  // 一个字符最后出现的位置
    if (s === '')   return 0;
    for (let i=0;i<s.length;i++) {
        let r = i,
            map = {};
        while (1) {
            if (map[s[r]] === undefined) {
                map[s[r]] = r;
                ans = Math.max(ans, r-i+1);
                // console.log(ans, s[i], s[r]);
                r++;
                if (r>=s.length)    break;
            }else {
                if (s[r] === s[r-1]) i = r-1;
                break;
            }
        }
    }
    return ans;
};