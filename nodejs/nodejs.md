- nodejs是一个js脚本解析器，任何操作系统下安装nodejs实质上都是把nodejs执行程序复制到一个目录，然后保证这个目录在系统PATH环境变量下，以便终端可以使用node命令。
- node_modules目录，用于存放模块。
- NODE_PATH环境变量，与PATH相似，允许通过它来指定额外的模块搜索路径，Windows用；分割路径。
- 包：js模块的基本单位是单个js文件，多个子模块组成包，在组成一个包的子模块中需要一个入口模块，入口模块的导出对象被作为包的导出对象。
	入口模块距离
	```
	var head=require('./head');
	var body=require('./body');
	exports.create=function(name){
		return{
			name:name,
			head=head.create(),
			body=body.create()
		};
	};
	```
在其他模块里使用包时需要加载包的入口模块，require入口模块即可。
- 当模块的文件名是index.js时，加载模块时可以使用模块所在**目录**的路径代替模块文件路径。于是就只要require包的路径，看起来更像是这个目录被当成单个模块使用了。怪不得大火举例子都用index，可能是这个原因。
- package.json，自定义入口模块的文件名和存放位置。如果不用index命名也可以在package.json里设置路径，也可以直接访问包名。
- 不想在node后面加很多路径，想直接运行。Linux和Windows不同，只记了Windows。
node-echo.js存在PATH环境变量指定的目录里，假设是C:\Users\user\bin目录，在该目录下新建一个node-echo.cmd文件，内容：@node "C:\User\user\bin\node-echo.js" %*。然后就能在任何目录下使用node-echo命令了。
- 工程目录。一般提供命令行模式和api模式。
	```
	- /home/user/workspace/node-echo/   # 工程目录
    - bin/                          # 存放命令行相关代码
        node-echo
    + doc/                          # 存放文档
    - lib/                          # 存放API相关代码
        echo.js
    - node_modules/                 # 存放三方包
        + argv/
    + tests/                        # 存放测试用例
    package.json                    # 元数据文件
    README.md                       # 说明文件
	```
- 通过node_modules目录直接使用第三方包名加载模块。定义了package.json后，node-echo目录也可以被当做一个包使用。
- npm是包管理工具，可以在npm服务器下载第三方包，也可以自己上传。下载后放在node_modules目录中，可以直接通过require('包名')访问，无需指定路径。如果要下指定版本的包，npm install argv@\<version\>
- 可以在package.json中指明第三方包依赖，属性为"dependencies":{"argv":"0.0.2"}，这样处理后就可以在工程目录下用npm install命令一次性安装所有指定的第三方包。
- 后加-g表示全局安装