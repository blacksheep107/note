- js只有字符串数据类型，没有二进制数据类型。（所以sort是按字典序排的？）nodejs提供一个与String对等的全局构造函数Buffer来提供对二进制数据的操作。var bin=new Buffer([0x68,0x65,0x6c]); Buffer与字符串类似，可用length，也可直接访问下标，可用toString('utf-8')与字符串互相转换。反过来var bin=new Buffer('hello','utf-8');
- 字符串是只读的，对字符串的任何修改得到的都是新的字符串，原字符串不变，Buffer像是可以做指针操作的C语言数组，可以直接访问下标[0]修改，slice方法返回的也不是新的Buffer，而是指向原Buffer中间某个位置的指针。
- 想赋值一个Buffer，应该new一个Buffer，然后用.copy方法复制，这是申请一块新的内存，然后把内存中的数据复制过去。如果用=，应该是直接指向原地址。
dup.copy(bin); 把dup的内容复制给bin，new Buffer(bin.length)，要初始化长度。
