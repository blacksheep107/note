// let a = gets(),
//     b = gets();
// let a = '836301827355500',
//     b = '19484736327373904';
let a = '836301827355500',
    b = '19484736327373904';
let add = function (a,b) {
    let ans = [],
        i = a.length-1,
        j = b.length-1,
        tmp = 0;
    while (i>=0&&j>=0) {
        let t = parseInt(a[i])+parseInt(b[j])+tmp;
        if (t>9) {
            tmp = Math.floor(t/10);
            t%=10;
        } else {
            tmp = 0;
        }
        ans.unshift(t);
        i--;j--;
    }
    while (i>=0) {
        let t = parseInt(a[i])+tmp;
        if (t>9) {
            tmp = Math.floor(t/10);
            t%=10;
        } else {
            tmp = 0;
        }
        ans.unshift(t);
        i--;
    }
    while (j>=0) {
        let t = parseInt(b[j])+tmp;
        if (t>9) {
            tmp = Math.floor(t/10);
            t%=10;
        } else {
            tmp = 0;
        }
        ans.unshift(t);
        j--;
    }
    console.log(a+'+'+b+'='+ans.join(''));
    return ans.join('');
}
let multipleOne = function (single, a) {
    let ans = [],
        tmp = 0;
    for (let i = a.length-1;i>=0;i--) {
        let t = single*parseInt(a[i])+tmp;
        if (t>9) {
            tmp = Math.floor(t/10);
            t%=10;
        } else {
            tmp = 0;
        }
        ans.unshift(t);
    }
    if (tmp!==0)    ans.unshift(tmp);
    console.log(single+'*'+a+'='+ans.join(''))
    return ans.join('');
}
let multiple = function (a,b) {
    let ans = '0';
    for (let i = a.length-1;i>=0;i--) {
        let num = parseInt(a[i]);
        if (ans == 0) ans = add(ans, multipleOne(num, b));
        else ans =  add(ans, multipleOne(num, b)+'0');
    }
    return ans;
}
console.log(multiple(a,b))
// print(ans.join(''));
