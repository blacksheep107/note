// 峰值元素

function findTop(arr) {
    let ans = [],
        flag = 0;
    if (arr.length === 0)   return null;
    // else if (arr.length === 1)  return 0;
    let max = arr[0],
        maxAns = 0;
    for (let i = 1;i<arr.length-1;i++) {
        if (arr[i]>arr[i-1]&&arr[i]>arr[i+1]) {
            return i;
            // ans.push(i);    // 下标
            // flag = 1;
        }
        if (max<arr[i]) {
            max = arr[i];
            maxAns = i;
        }
    }
    return max>arr[arr.length-1]?maxAns:arr.length-1;
    // if (max < arr[arr.length-1]) {
    //     max = arr[arr.length-1];
    //     maxAns = arr.length-1;
    // }
    // // if (flag)   return ans;
    // // 单调
    // return maxAns;
}
//
// function findTop(arr) {
//     let ans = [],
//     flag = 0;
//     if (arr.length === 0)   return null;
//     else if (arr.length === 1)  return 0;
//     let max = arr[0],
//         maxAns = 0;
//
// }
console.log(findTop([2,1,5,10,9]))
console.log(findTop([0]))
console.log(findTop([4,3,2,5]))
console.log(findTop([4,3,2,1]))
console.log(findTop([1,2,3,4]))
console.log(findTop([2,3,1,4,1,5,1,2,1,2,1]))
console.log(findTop([]))
console.log(findTop([2,1,3]))
console.log(findTop([3,3,3]))
console.log(findTop([3,1,4,1,5,1,2,1,2,1]))

