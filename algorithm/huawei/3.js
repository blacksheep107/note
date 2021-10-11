
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
    let n = parseInt(inputArray[0]);
    let ans = BigInt(0);
    let arr = inputArray[1].split(' ');
    for (let i=0;i<n-1;i++) {
        let min = parseInt(arr[i]),
            max = parseInt(arr[i]);
        for (let j=i+1;j<n;j++) {
            if (parseInt(arr[j])>max) max = arr[j];
            if (parseInt(arr[j])<min) min = arr[j];
            // console.log(max, min, i, j, (max-min)*(j-i+1))
            ans+=BigInt((max-min)*(j-i+1));
            ans%=BigInt(1000000007);
        }
    }
    console.log(parseInt(ans));
    process.exit();
});
