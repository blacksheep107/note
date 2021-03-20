异常处理
---
- try catch 只能用于同步执行的代码。异常会沿着代码执行路径一路冒泡，直到遇到一个try语句被捕获。异步函数（如setTimeout）会打断代码执行路径，异步函数执行过程中产生的异常冒泡到执行路径被打断的位置时，如果一直没有遇到try语句，就作为全局异常抛出。
- 所以要在异常冒泡到断点之前用try语句捕获异常，并通过回调函数传递被捕获的异常。比如在异步函数开始就用。
- 因此nodejs回调函数第一个参数都是err。
- 如果回调函数嵌套多了，异常处理也得每层都放进去，就很丑。
- nodejs的解决方案是域Domain，可以简化异步代码的异常处理。
- 一个域就是一个js运行环境，在一个运行环境中，如果一个异常没有被捕获，将作为一个全局异常被抛出。
- nodejs提供捕获全局异常的方法。
    ```
    process.on('uncaughtException',function(err){
        console.log(err.message);
    });
    ```
- 采用回调函数传递异常，会在每个嵌套前面都有一个trycatch。可以在处理一个请求时，用domain模块创建一个子域，在子域内运行的代码可以随意抛出异常，这些异常可以通过子域对象的error事件统一捕获。
    ```
    const domain=require('domain');
    const http=require('http');
    function async(request,callback){
        async(request,function(data){
            callback(data);
        });
    }
    http.createServer(function(request,response){
        var d=domain.create();
        d.on('error',function(){
            response.writeHead(500);
            response.end();
        });
        d.run(function(){
            async(request,function(data){
                response.writeHead(200);
                response.end();
            });
        });
    });
    ```
- 陷阱。捕获到异常应在处理完异常后立即重启程序，而不是让程序继续运行，发生异常后程序处于一个不确定的运行状态，如果不立即退出，程序可能会发生严重内存泄漏。