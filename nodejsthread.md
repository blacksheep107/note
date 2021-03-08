进程管理
---
http://nodejs.org/api/process.html
- process不是内置模块，是全局变量。
- child_process是内置模块
- cluster模块是对child_process模块的进一步封装，用于解决单进程nodejs web服务器无法充分利用多核CPU的问题。
- 终端下的cp命令：cp -r source/* target目录拷贝（Unix系统）
- 子进程是异步运行的，通过回调函数返回结果。
    ```
    const util=require('util');
    const child_process=require('child_process');
    function copy(src,dst,callback){
        child_process.exec(
            util.format('cp -r %s/* %s'),callback
        );
    }
    ```
应用场景
---
- process.argv获取命令行参数，node执行程序路径和主模块文件路径占用argv[0]和argv[1]的位置，所以要slice(2)处理。
- 退出程序。正常退出状态码为0，异常不为0，process.exit(1)
- 控制输入输出。nodejs有标准输入、输出、错误流。process.stdin, process.stdout, process.stderr
- 降权。在root权限下运行存在安全隐患，要把权限降下来。
- process.env属性返回一个包含用户环境信息的变量。
- kill方法是用来给进程发送消息的。
- 创建nodejs子进程, 子进程之间通信
    ```
    /* parent.js */
    var child = child_process.spawn('node', [ 'child.js' ], {
            stdio: [ 0, 1, 2, 'ipc' ]//在options.stdio字段中通过ipc开启了一条ipc通道（进程间通信）
        });
    //之后就可以给监听子进程对象的message事件接收来自子进程的消息，并通过.send方法给子进程发消息
    child.on('message', function (msg) {
        console.log(msg);
    });

    child.send({ hello: 'hello' });

    /* child.js */
    //子进程可以在process对象上监听message事件来接收来自父进程的消息，并通过.send向父进程发消息。
    process.on('message', function (msg) {
        msg.hello = msg.hello.toUpperCase();
        process.send(msg);
    });
    ```
- 守护daemon进程一般用于监控工作进程的运行状态，在工作进程不正常退出时重启工作进程，保障工作进程不间断运行。
    ```
    /* daemon.js */
    function spawn(mainModule) {
        var worker = child_process.spawn('node', [ mainModule ]);

        worker.on('exit', function (code) {
            if (code !== 0) {
                spawn(mainModule);
            }
        });
    }

    spawn('worker.js');
    ```