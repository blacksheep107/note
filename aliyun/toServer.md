https://www.cnblogs.com/paul123/p/11065720.html
- 服务器上有dist.zip文件后（rar不方便解压）
- zip linux解压方式：apt-get install unzip, unzip 文件名，解压完成，有dist文件夹。
- 更改nginx配置，使其显示这个网页。cd /usr/local/nginx/conf/, vi nginx.conf
- 在nginx.conf文件中：
    ```
    // 在server对象里改为自己要的端口，默认为80
    listen 80;

    // 同样的配置前端打包地址：root为vue打包后存放在服务器的地址
    location / {
        root /usr/local/dist;
        index index.html index.htm;
    }
// location如果指定一个特定的url，要用别名alias，root是指定目录的上级目录
location /weibo {
	alias	/usr/local/weibo;
	index	index.html index.htm;
}

    // 同样的配置后端接口地址： proxy_pass为后端接口地址
    # 解决跨域
    location /api {
        # 后台api接口地址
        proxy_pass http://127.0.0.1:3000;
        proxy_redirect default; # 设置主机头和客户端真实地址，以便服务器获取客户端真实IP
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
    ```
- 重启nginx：
/usr/local/nginx/sbin/nginx -s reload
- 不同项目部署，最后是用换端口号解决的，另开一个server，配置两个location发现内部的资源请求不会带上前缀，这个应该要在项目里配置路由前缀。