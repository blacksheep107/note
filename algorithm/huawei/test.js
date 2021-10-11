
process.stdin.resume();
process.stdin.setEncoding('utf-8');
let input = '';
process.stdin.on('data', (data) => {
    input += data;
});
process.stdin.on('end', () => {
    let inputArray = input.split('\n');
    /**
     * 待实现函数，在此函数中填入答题代码
     * doFunc()
     */
    let strs = inputArray[0].split(' ');
    let counts = 0;
    for (let i=0;i<strs.length;i++) {
        if (!)   continue;
        counts+=strs[i].length;
    }
    let ans = counts/strs.length;
    ans = Math.round(parseFloat(ans)*100)/100;
    console.log(ans);
    process.exit();
});
