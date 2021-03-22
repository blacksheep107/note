回调
---
- 异步编程依靠回调来实现。
- js本身是单线程运行的！不存在异步执行的概念。但可以让函数创建一个别的线程或进程，并与js主线程并行，并在运行完后通知主线程。（通过接口请求一些数据时是异步的？DOM操作也是异步的？所以有时候才会有undefined赋值，微信小程序中request是异步请求。）
- 设置为同步加载: script.async=false;程序会停在此处，等待加载完成。但下载是异步的，还是有可能出现undefined，可以往全局挂一个加载成功标志。
https://segmentfault.com/q/1010000005630545?_ea=903562
- setTimeout是JS规范之外的，由运行环境提供的特殊函数，可以创建一个平行线程后返回。fs.readFile也是异步的。
- 在同步方式下，可以直接用一个函数的输出作为另一个函数的输入；异步方式下，函数执行结果不是通过返回值，而是通过回调函数传递，可以通过一个回调函数嵌套另一个回调函数。
    ```
    fn2('input', function (output2) {
        fn1(output2, function (output1) {
            // Do something.
        });
    });
    ```
- 圆括号运算符：函数后紧跟一堆圆括号就会立刻调用这个函数。
https://www.kancloud.cn/zep-tsang/javascript/716723
- 数组遍历，如果函数时异步执行的，就不能保证每个元素都被处理完毕。如果数组成员必须**一个接一个串行**处理：
    ```
    let result = []
    let arr = [1, 2, 3, 4, 5, 6, 7]

    // 自定义异步函数, 为了简单说明问题
    // 这里简单的调用回调函数即可
    // 实际开发根据项目需求改动
    function async(item, fn) {
    setTimeout(function () {
        fn(item)
    }, 1000)
    }

    // ()前面最好加个操作符, 避免报错
    ~(function next(i, len, callback) {

    if (i < len) {
        // 调用异步API, 串行处理, 最后执行callback
        async(arr[i], function (value) {
        console.log(i)
        result[i] = value
        next(i + 1, len, callback)
        })
    } else {
        // 保证所有数组元素都处理完毕
        // 最后调用回调函数
        callback(result)
    }
    
    })(0, arr.length, function (result) {
    // 回调函数处理结果result
    console.log(result)
    })

    console.log('开始next函数')
    ```
- 数组元素不一定要一个接一个处理，但需要所有元素都处理完再执行操作。
    ```
    let result = []
    let arr = [1, 2, 3, 4, 5, 6, 7]

    // 自定义异步函数, 为了简单说明问题
    // 这里简单的调用回调函数即可
    // 实际开发根据项目需求改动
    function async(item, fn) {
    setTimeout(function () {
        fn(item)
    }, 1000)
    }

    // ()前面最好加个操作符, 避免报错
    ~(function (i, len, count, callback) {
    // 并行版本进来先创建并发执行的闭包
    // 每个闭包内都有一个回调函数, 去判断数组元素是否全部处理完毕
    for (; i < len; i++) {
        (function (n) {
        async(arr[n], function (value) {
            console.log(n)
            result[n] = value
            // 此时元素已经处理了
            // 所以count必须先自加, 再对比值
            if (++count === len) callback()
        })
        })(i)
    }
    })(0, arr.length, 0, function () {
    console.log(result)
    })

    console.log('开始next函数')
    ```
- async函数中的setTimeout函数里必须要加一个function闭包，不明白为什么，要不直接养成这个习惯吧感觉没坏处。
