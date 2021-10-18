<<<<<<< Updated upstream
/**
 * @param {number[]} arr
 * @param {number} k
 * @return {number[]}
 */
function getRandom(l, r){
    return Math.floor(Math.random()*(r-l)+l);
}
var partiton = function (arr, l, r, k){
    if (l>=r)   return arr.slice(0, k);
    let i=l,
        j=r;
    let random = getRandom(l, r);
    [arr[l], arr[random]] = [arr[random], arr[l]]
    while (i<j) {
        while (i<j && arr[j]>=arr[l])   j--;
        while (i<j && arr[i]<=arr[l])   i++;
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    [arr[i], arr[l]] = [arr[l], arr[i]];
    if (i>k)    return partiton(arr, l, i-1, k);
    else if (i<k)   return partiton(arr,i+1, r, k);
    else {
        return arr.slice(0, i);
    }
}
var getLeastNumbers = function(arr, k) {
    return partiton(arr, 0, arr.length-1, k)
};
// console.log(getLeastNumbers([0,0,1,2,4,2,2,3,1,4], 8))
=======
/**
 * @param {number[]} arr
 * @param {number} k
 * @return {number[]}
 */
// 快排
var getLeastNumbers = function(arr, k) {
};
>>>>>>> Stashed changes
