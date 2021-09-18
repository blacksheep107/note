/**
 * @param {number} n
 * @return {number}
 */
var findNthDigit = function(n) {
    let digit = 1,
        start = 1,
        count = 9;
    while (n > count) {
        n-=count;
        start*=10;
        digit++;
        count = digit*start*9;
    }
    let num = start + (n-1)/digit;
    return String(num).charAt((n-1)%digit)-'0';
};