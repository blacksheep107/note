
/**
 * @param {string} s
 * @return {character}
 */
// var firstUniqChar = function(s) {
//     let map = {},
//         ans = ' ',
//         arr = s.split('');
//     arr.forEach(item=>{
//         map[item]=map[item]=== undefined?1:map[item]+1;
//     });
//     for (let i=0;i<arr.length;i++) {
//         if (map[arr[i]] == 1) {
//             ans = arr[i];
//             break;
//         }
//     }
//     return ans;
// };
var firstUniqChar = function(s) {
    // new Array().fill({这个fill里面的是浅拷贝！每个数组元素都被绑在同一个对象上了，不要这样初始化对象数组！})
    let chars = [];
        arr = s.split(''),
        a = 'a'.charCodeAt(0);
    for (let i=0;i<26;i++) {
        chars.push({
            firstPos: null,
            count: 0
        })
    }
    arr.forEach((item, index)=>{
        let tmp = item.charCodeAt(0) - a;
        if (chars[tmp].firstPos === null) {
            chars[tmp].firstPos = index;
        }
        chars[tmp].count++;
    });
    let ans = ' ',
        pos = arr.length;
    for (let i=0;i<26;i++) {
        if (chars[i].count==1 && chars[i].firstPos<=pos) {
            ans = String.fromCharCode(i+a);
            pos = chars[i].firstPos;
        }
    }
    return ans;
};