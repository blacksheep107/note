var func = function (n,x,y) {
    let arr = new Set();
    arr.add(1);
    let p1 = 1,
        p2 = 1;
    if (x==1||y==1) n--;
    while (arr.size<=n) {
        let m1 = p1*x,
            m2 = p2*y;
        if (m1<m2) {
            arr.add(m1);
            p1++;
        }else{
            arr.add(m2);
            p2++;
        }
    }
    let ans = arr.get(n)
    return ans;
}
// var n;
// n = readline();
// while (n--) {
//     let line;
//     while(line=readline()){
//         var lines = line.split(" ");
//         console.log(func(...lines));
//     }
// }

console.log(func(4,2,3));