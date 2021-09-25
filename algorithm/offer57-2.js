/**
 * @param {number} target
 * @return {number[][]}
 */
var findContinuousSequence = function(target) {
    let ans = [],
        tmp = [],
        cnt = 0;
    for (let i=1;i<=parseInt(target/2)+1;i++) {
        cnt+=i;
        tmp.push(i);
        // console.log(cnt, tmp)
        while (cnt>target) {
            cnt-=tmp[0];
            tmp.shift();
        }
        if (cnt === target) {
            ans.push([...tmp]);
            while (cnt>target) {
                cnt-=tmp[0];
                tmp.shift();
            }
        }
    }
    return ans;
};
// console.log(findContinuousSequence(9))