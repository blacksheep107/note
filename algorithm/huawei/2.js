
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
    var Node = function (name, pre, suf) {
        this.pre = pre;
        this.name = name;
        this.suf = suf;
        if (this.pre === undefined) this.pre = null;
        if (this.suf === undefined) this.suf = [];
    }
    let n = parseInt(inputArray[0]);
    let name = inputArray[1];
    let map = {};
    if (n === 1) {
        if (inputArray[2].split(' ')[0] === name) {
            console.log(1);
        }else{
            console.log(0);
        }
        process.exit();
    }
    for (let i=2;i<n+2;i++) {
        let info = inputArray[i].split(' ');
        if (map[info[0]]!==undefined) {
            if (info[2]!='null') {
                if (map[info[2]] === undefined) {
                    map[info[2]] = new Node(info[2], null, []);
                }
                map[info[0]].suf.push(info[2]);
            }
            let pre = info[1] == 'null' ? null:info[1];
            if (map[info[1]] === undefined) {
                map[info[1]] = new Node(info[1], null, []);
            }
            map[info[0]].pre = info[1];
            // console.log(map[info[0]],0);
        }else {
            let pre = info[1]==='null'?null:info[1],
                suf = info[2]==='null'?null:info[2];
            if (pre!=null&&map[pre] === undefined) {
                map[pre] = new Node(pre, '', []);
            }
            if (suf!=null&&map[suf] === undefined) {
                map[suf] = new Node(suf, '', []);
            }
            map[info[0]] = new Node(info[0], pre, [suf]);
            // console.log(map[info[0]], 1);
        }
    }
    let p = map[name],
        ans = 1;
    if (p == undefined) {
        console.log(0);
        process.exit();
    }
    if (p.pre == 'null' || p.pre==null) ans = 0;
    while (p!==undefined) {
        ans++;
        p = map[p.pre];
        if (p===undefined||p.pre=='null'||p.pre==null) break;
    }
    var depth = function (node) {
        // console.log(node, 'dep');
        if (node.suf.length==0)  return 0;
        return Math.max(...node.suf.map(item=>{
            return depth(map[item])+1;
        }))
    }
    console.log(ans+depth(map[name]));
    process.exit();
});
// 4
// device1
// device1 device2 device3
// device2 null device1
// device3 device1 device4
// device4 device3 null
// 8
// d3
// d1 null d2
// d2 d1 d3
// d2 d1 d5
// d2 d1 d4
// d3 d2 null
// d4 d2 null
// d5 d2 d6
// d6 d5 null
// zhangzhanjun对所有人说说： 09:46 AM
// 、
// 计算链路长度
//
// 在数据链路中，每个设备都有数据流入设备和流出设备，流入流出关系通过一个表格记录，请根据给出的记录表，计算出该设备所属链路的最大长度
//
// 解答要求
// 时间限制: 1000ms, 内存限制: 32MB
// 输入
// 第1行输入为关系记录的数量N，N<=100
// 第2行输入为待计算所属链路的最大长度的设备D
从第3至N+2行输入为关系记录，每一行关系记录按照设备ID，流入设备ID，流出设备ID空格字符分隔。每个设备都有自己的关系记录。

输出
对于每组测试数据，输出D所属链路的最大长度
