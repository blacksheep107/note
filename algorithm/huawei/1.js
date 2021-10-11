
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
    let strs = inputArray[0].split(':');
    if (strs.length!==8) {
        console.log('error');
    }else{
        let ans = [],
            flag = 0;
        for (let i=0;i<8;i++) {
            let str = strs[i];
            if (str.length>4) {
                console.log('error');
                process.exit();
            }
            let tmp = str;
            if (parseInt(str) === 0) {
                ans.push(0);
            }else{
                while (tmp[0] == '0') {
                    tmp = tmp.slice(1);
                }
                ans.push(tmp);
            }
        }
        for (let i=1;i<ans.length;i++) {
            if (ans[i] == 0 && (ans[i-1] == 0||ans[i-1] == '')) {
                ans[i] = '';
                ans[i-1] = '';
                flag = 1;
            } else if (ans[i] == 0 && ans[i-1]!=0 && ans[i-1]!='' && flag) {
                break;
            }
        }
        for (let i=1;i<ans.length;i++) {
            if (ans[i] === '' &&ans[i-1]==='') {
                ans.splice(i,1);
            }
        }
        console.log(ans.join(':'));
    }
    process.exit();
});
