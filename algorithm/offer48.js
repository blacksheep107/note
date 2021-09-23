/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
    if (s === "")   return 0;
    let dp = new Array(s.length).fill(1),
        map = {},
        left = -1,
        res = 1;
    map[s[0]] = 0;
    for (let i=1;i<s.length;i++) {
        if (map[s[i]]!==undefined) {
            left = map[s[i]];
        }else{
            left = -1;
        }
        map[s[i]] = i;
        if (dp[i-1]<i-left) dp[i] = dp[i-1]+1;
        else dp[i] = i-left;
        if (res<dp[i])  res = dp[i];
    }
    return res;
};
console.log(lengthOfLongestSubstring('abcabcbb'))