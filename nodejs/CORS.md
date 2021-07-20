# 跨域问题
https://blog.csdn.net/marendu/article/details/103733286
- 在服务端加上
```
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1')
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});
```
- 在vue.config.js配置代理，不要用axios.default.baseUrl（只是字符串拼接？）。proxy字段的target配置ip地址，一个项目可能有不同的后端，在这里配置不同target。
- https://blog.csdn.net/qq_27053493/article/details/97462300 axios源码。
- target写接口域名，secure如果是https接口需要配置这个参数，changeOrigin需要跨域配置
- 代理类似中间商，开启代理原理就是在本地创建一个虚拟服务器，发送请求数据，同时接收请求的数据。利用服务器和服务器间交互，不会有跨域问题。
- proxy配置（Vue3中vue.config.js）
```
devServer:{
    proxy:{
        "/api":{
            target:'http://www.abc.com',
            wx:false,   // 是否启用websocket
            changeOrigin:true,  // 是否开启代理，在本地创建一个虚拟服务端，然后发送请求，并同时接收请求。
            pathRewrite:{   // 重写匹配的字段
                "^/api":"/api"
            }
        }
    }
}
```
- 在创建axios时，baseURL也写成"/api"，这样就和代理的pathRewrite匹配上了。一般不配这个，直接用。
- 配置完后，虚拟服务器请求地址就是代理的target地址了，这样就没有跨域。但在本地看到的还是localhost
- http://www.ruanyifeng.com/blog/2016/04/cors.html
- CORS基本流程：对于简单请求，浏览器直接发出CORS请求，就是在头信息中增加一个Origin字段，Origin:http://api.aa.com
- Origin说明本次请求来自哪个源（协议+域名+端口，有一个不同就是跨域），服务器根据Origin决定是否同意这次请求。
- 如果Origin的源不在许可范围内，服务器会返回一个正常的HTTP响应，这个响应头没包含Access-Control-Allow-Origin字段，就是出错了，可以被XMLHTTPRequest的onerror回调捕获（状态码可能是200）
- 如果Origin指定的域名在许可范围内，服务器返回的响应会多出几个头信息字段。
```
Access-Control-Allow-Origin:http://api.aa.com   // 必须有，它的值要么是请求时的Origin值，要么是*（接受任意域名的请求）
Access-Control-Allow-Credentials:true   // 是否允许发送cookie，只能设为true，如果服务器不需要浏览器发送cookie，删除这个字段即可。注意设为true时，Access-Control-Allow-Origin必须指定一个确定的域名，不能为*。之前做接口的时候两个一起设置过，删掉这个cookie的就没事了。
Access-Control-Expose-Headers:FooBar    // XMLHTTPRequest对象的getResponseHeader方法能拿到的字段，这里能拿到FooBar
Content-Type:text/html;charset=utf-8
```