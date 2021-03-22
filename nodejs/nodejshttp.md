网络编程
---
http://nodejs.org/api/http.html
- nodejs内置http模块，实现一个http服务器。
    ```
    var http=require('http');
    http.createServer(function(request,response){
        response.writeHead(200,{'Content-type':'text-plain'});
        response.end('Hello World');
    }).listen(8124);
    ```
    访问127.0.0.1:8124就能看淡Hello World
- http提供两种使用方式。作为服务器，创建一个http服务器，监听http客户端请求并返回响应。作为客户端，发起一个http请求，获取服务器响应。
- 调用.createServer方法创建一个服务器，然后调用.listen方法监听端口，之后每当来了一个客户端请求，创建服务器时传入的回调函数就被调用一次。是事件机制。
- http请求本质上是数据流，由请求头headers和请求体body组成。http模块创建的http服务器在接收到完整的请求头后，会调用回调函数，在回调函数中，可以使用request对象访问请求头数据，还能把request对象当做一个只读数据流来访问请求体数据。
- http响应也是数据流，由响应头和响应体组成。
- 在回调函数中，可以用response对象写入响应头数据，还能把response对象当做一个只写数据流来写入响应体数据。
HTTPS
---
- https与http模块类似，区别在于https需要处理SSL证书。
- https.createServer(options,function(request,response){});
比http多一个options对象。
options={
    key:fs.readFileSync(./ssl/default.key'),
    cert:fs.readFileSync('./ssl/default.cer')
}
cert:证书
通过key和cert字段指定https服务器使用的私钥和公钥。
- nodejs支持SNI(Server Name Indication)技术，可以根据https客户端请求使用的域名，动态使用不同整数，因此同一个https服务器可以使用多个域名。
- SNI是TLS的扩展，用来解决一个服务器有多个域名的情况。允许客户端在发起SSL握手请求时，提交请求的hostname信息，使服务器能切换到正确的域名并返回相应的证书。
- 可以为https服务器添加多组证书
    ```
    server.addCountext('foo.com',{
        key:fs.readFileSync('./ssl/foo.cm.key'),
        cert:fs.readFileSync('./ssl/foo.com.cer')
    });
    ```
- 如果目标服务器使用的SSL证书不是从机构买的，默认情况下https会拒绝连接，在options里加入rejectUnauthorized:false字段可以禁用对证书有效性的检查。
URL
---
- url模块。可解析、生成、拼接url。
- .parse方法将一个url字符串转为url对象。
- .format方法把一个url对象转为url字符串。
- .resolve方法可用于拼接url
Query String
---
- querystring模块用于实现url参数字符串与参数对象的互相转换。
querystring.parse('foo=bar&baz=qux&baz=quux&corge');
{ foo: 'bar', baz: ['qux', 'quux'], corge: '' }
Zlib
---
- zlib模块提供数据压缩和解压功能
NET
---
- net模块用于创建socket服务器或客户端
- socket搭建一个http服务器，这个服务器返回相同的响应。
- 本地服务器的话，host就写'localhost'