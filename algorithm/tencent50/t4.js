// let line = readline().split(":");
line = 'You say that you love rain,but you open your umbrella when it rain:rain'.split(":")
let word = line[1],
    sentence = line[0],
    ans = 0;
for (let i=0;i<sentence.length-word.length+1;i++) {
    let tmp = sentence.slice(i, i+word.length);
    if (tmp === word) {
        ans++;
    }
}
console.log(ans)