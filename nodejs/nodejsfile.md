nodejs文件操作
---
- 小文件拷贝。nodejs内置fs模块。
    fs.writeFileSync(dst,fs.readFileSync(src));
- process是一个全局变量，可通过process.argv获得命令行参数，由于argv[0]固定等于nodejs执行程序的绝对路径，argv[1]固定等于主模块的绝对路径，因此第一个命令行参数从argv[2]开始。用process.argv.slice(2)获得命令行参数。
- 大文件拷贝。一次性把所有文件内容读取到内存再一次性写入磁盘不适合大文件，只能读一点写一点。
fs.createReadStream(src).pipe(fs.createWriteStream(dst))
用createReadStream创建一个源文件的只读数据流，并使用createWriteStream创建一个目标文件的只写数据流，并用pipe方法将两个数据流连接起来。
- fs模块提供的api基本上分三类，文件属性读写：fs.stat(获取文件信息，传入文件路径和回调函数), fs.chmod, fs.chown，文件内容读写：fs.readFile, fs.readdir, fs.writeFile, fs.mkdir等，底层文件操作：fs.open, fs.read, fs.write, fs.close等。都能通过回调函数返回结果。
- readFile是异步，有对应的同步版本，在后面加个Sync
- 路径Path，nodejs提供path内置模块。
- path.normalize将传入路径转换为标准路径，path.join将传入的多个路径拼接为标准路径，path,extname获得文件扩展名。
- 遍历目录。遇到子目录就去遍历子目录，遇到一个文件就去处理文件。
    ```
    var fs=require('fs');
    var path=require('path');
    function travel(dir,callback){
        fs.readdirSync(dir).forEach(function(file){
            var pathname=path.join(dir,file);
            if(fs.statSync(pathname).isDirectory()){
                travel(pathname,callback);
            }else{
                callback(pathname);
            }
        })
    }
    ```
    还有一种异步的，没看懂
- BOM用于标记一个文件使用Unicode编码，本身是一个Unicode字符("\uFEFF")，位于文本头部，如果读取文件时不去掉就会有问题。
- GBK转utf-8,GBK编码不在nodejs支持范围内，一般用iconv-lite这个三方包转换编码。iconv=require('iconv-lite'); iconv.decode(bin,'gbk');
- 不知道要读取的文件用哪种编码，可用单字节编码保存。
str=fs.readFileSync(pathname, 'binary'; 
fs.writeFileSync(pathname, str, 'binary');
- 不要用拼接字符串方式来处理路径，用path模块。