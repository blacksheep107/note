- map方法将数组所有成员依次传入参数，然后把每一次的执行结果组成一个新数组返回。
    ```
    var numbers=[1,2,3];
    var newarray=numbers.map(function(n){
        return n+1;
    });
    ```
- map方法接受一个函数作为参数，调用函数时，map方法向他传入三个参数，当前成员、当前位置、数组本身。elem,index,arr
- map方法还可以接受第二个参数，用来绑定函数内部的this变量。将函数内部的this变量指向某个对象。
- 如果数组有空位，map的回调函数不会再这个位置执行，会跳过。undefined和null不跳。