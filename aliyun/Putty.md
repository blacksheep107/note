- 使用Putty
- 下载Putty：https://www.chiark.greenend.org.uk/~sgtatham/putty/?spm=5176.2020520101.0.0.33bf4df5vxE4Nu
- 下载后打开Putty所在文件夹![](https://img2020.cnblogs.com/blog/1956720/202107/1956720-20210710174746795-1024953070.png)
- 可以用Putty远程连接云服务器，用户名和密码。
在云服务器管理控制台里的一个实例，选择“更多”，选择“实例配置”，选择“连接帮助”
![](https://img2020.cnblogs.com/blog/1956720/202107/1956720-20210710174908945-2124682261.png)
- 用提供的用户名和自己设定的密码登录（在之前控制台里直接选远程登录的时候有让设定一个密码）
- 登录后和在控制台的远程登录操作都是一样的。
- 用Putty上传文件到ECS
- 在Putty安装文件夹里使用PSFTP
- 输入open 120.78.155.149（公网ip地址）
- 输入用户名和密码
- 用lcd C:\Users\chenman\Desktop\test\play切换本地的目录地址
- 用cd 切换服务器上的目录
- 用put 文件名上传文件到服务器。
- 用get 文件名下载文件。