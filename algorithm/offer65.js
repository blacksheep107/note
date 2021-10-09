/**
 * @param {number} a
 * @param {number} b
 * @return {number}
 */
var add = function(a, b) {
    while (b!=0) {
        let c = (a&b)<<1;   // 进位
        a ^= b; // 无进位和
        b = c;
    }
    return a;
};