/**
 * @param {number} n
 * @param {number} m
 * @return {number}
 */
var lastRemaining = function(n, m) {
    let f = [];
    f[1] = 0;
    for (let i=2;i<=n;i++) {
        f[i] = (f[i-1] + m) % i;
    }
    return f[n];
};