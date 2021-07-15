# 部署nodejs接口到服务器上
https://www.cnblogs.com/tuspring/p/14340457.html
```
// nodejs代码
const http=require('http');
const hostname='0.0.0.0';
const port=3000;
const server=http.createServer((req,res)=>{
    res.statusCode=200;
    res.setHeader('Content-Type','text-plain');
    res.end('Hello World\n');
});
server.listen(port,hostname,()=>{
    console.log(`Server running at http://${hostname}:${port}/`);
})
```
- 文件命名为helloworld.js，用putty放到服务器上。
- 用pm2配置接口。
- 切换更高的node版本:nvm install 8.16.0，版本低pm2会报Unexpected Syntax Error。
- npm install -g pm2
- 找到helloworld.js文件，pm2 start helloworld.js，部署完成。
- 然后就可以访问公网ip:3000，http://120.78.155.149:3000/ 运行接口。
- 有依赖包时会出错，先node mongodb.js看一下代码有没有问题。
- 报没有包就用npm install -S安装，应该把package.json一起传上来吧。
- 报了个BigInt的错，不知道为什么，node版本升到14.16.0就没事了。
- 要访问 120.78.155.149:3001/api/get 才行。
- 在nodejs文件里把listen端口换成80，本地就可以不用3001正常访问。
- 在nginx配置里还有问题，先把location里面的端口改成80。