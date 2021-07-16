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
# 去掉端口号
- 120.78.155.149:3001/api/get才能访问。
- 在nginx.conf里加上
```
   server {  
       listen       80;  
       server_name  localhost;  
	   proxy_set_header Host $host:$server_port;  
       proxy_set_header X-Real-IP $remote_addr;  
       proxy_set_header REMOTE-HOST $remote_addr;  
       proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;  
		location / {  
		proxy_pass http://127.0.0.1:3001/;  
       }  
   }  
```
- 之后reboot重启，nginx配置才生效。
- 可以用120.78.155.149/api/get访问。

- 访问的时候，加了端口号可以正常访问，不加端口号会报跨域？
- 同域要求域名，端口，协议都相同。
- axios.default.baseURL的地址要加端口号。

- 用公司的脚手架打包后，资源加载不出来，应该是一定要用内网，那就不能部署到自己的服务器上了。
