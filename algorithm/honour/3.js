//let s = '7,11'.split(',');
let s = readline().split(',');
let room = parseInt(s[0]),
    person = parseInt(s[1]);
let surplus = 0,
    allow = room * 5;
let f = 1;
let all = new Set();
let dfs = function (ans, i, j, k) {
    if(i>=j||i<k||j>=ans.length)    return;
    for (;j<room;j++) {
        [ans[i], ans[j]] = [ans[j], ans[i]];
        // console.log(ans.join(','), k, i, j);
        all.add(ans.join(','));
        f++
        dfs(ans, i-1, j, k);
        [ans[i], ans[j]] = [ans[j], ans[i]];
        dfs(ans, i-1, j, k);
    }
    // [ans[i], ans[j]] = [ans[j], ans[i]];
    // console.log(ans.join(','));
    // all.add(ans.join(','));
    // f++;
    // dfs(ans, i-1, j, k);
    // [ans[i], ans[j]] = [ans[j], ans[i]];
    // dfs(ans, i-1, j, k);
}

if (allow <= person) {
    surplus = person - allow;
    console.log(surplus);
    let ans = new Array(room).fill(5).join(',');
    console.log(ans);
} else {
    console.log(0);
    let ave = Math.floor(person / room);
    let ans = new Array(room).fill(ave);
    let p = person % room;
    for (let i=0;i<p;i++)   ans[i] ++;
    // console.log(ans.join(','))
    all.add(ans.join(','));
    for (let k=0;k<p;k++) {
        dfs(ans, p-1+k, p+k, k);
        // console.log(f);
        [ans[k], ans[k+p]] = [ans[k+p], ans[k]];
    }
    console.log([...all].join('\n'))
//     for (let k = 0;k<p+1;k++) {
//         // 空几间做几轮
//         for (let i=p-1+k;i>=k;i--) {
//             // 每个多一个人的房间找新房间
//             for (let j=p+k;j<room;j++) {
//                 if(ans[j] == ave) {
//                     [ans[i], ans[j]] = [ans[j], ans[i]];
//                     console.log(ans.join(','), k, i, j);
//                     f++
//                     [ans[i], ans[j]] = [ans[j], ans[i]];
//                 }
//             }
//         }
//         console.log(ans.join(','), '**');
//         [ans[k], ans[k+p]] = [ans[k+p], ans[k]];
//         console.log(ans.join(','), '**');
//     }
// console.log(f)
}
