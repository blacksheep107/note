let toRoute = readline().split(','),
    stopRoute = readline().split(','),
    lightNums = readline().split(','),
    points = readline().split(',');
let map = {},
    arr = [];
for (let i=0; i<toRoute.length; i++) {
    let ans = parseInt(toRoute[i]) / 10 +
        parseInt(stopRoute[i]) / 2 +
        parseInt(lightNums[i]) * 0; // 50%概率
    map[i] = ans;
    arr.push({
        ans: ans,
        no: i,
        point: parseInt(points[i]),
        light: parseInt(lightNums[i]),
    });
}
arr.sort((a,b)=>{
    return a.ans-b.ans;
})
let minAns = arr[0].ans,
    ans = arr[0];
for (let i=1;i<arr.length;i++) {
    if (arr[i].ans - minAns < 60) {
        if (arr[i].point>ans.point)  ans = arr[i];
        if (arr[i].light<ans.light) ans = arr[i];
    } else {
        break;
    }
}
console.log(ans.no+1+','+ans.ans);
