webpack使用步骤
---
https://www.webpackjs.com/guides/getting-started/#%E5%9F%BA%E6%9C%AC%E5%AE%89%E8%A3%85

https://www.cnblogs.com/singledogpro/p/12030550.html


- 创建并打开文件夹 mkdir webpack-demo && cd webpack-demo
- npm init -y
- npm install webpack webpack-cli --save-dev
- 创建新文件夹src存放js文件，dist文件夹存放HTML等文件
- 调整package.json文件，确保安装包是私有的"private":true，并移除main入口，以防意外发布代码。
- script标签之间存在隐式依赖关系，使用script引入src存在隐患，在index.js文件执行之前，还依赖页面中引入的lodash。使用这种方式管理JavaScript项目会有一些问题：
	- 无法立即体现，脚本的执行依赖于外部扩展库。
	- 如果依赖不存在，或者引入顺序错误，应用程序将无法正常执行。
	- 如果依赖被引入但并没有使用，浏览器将被迫下载无用代码。
	- 因此需要webpack来管理这些脚本。
- import _ from "lodash";在index.js中引用
- 创建一个bundle文件
	- src源代码是用于书写和编辑的代码，dist分发代码是构建过程产生的代码最小化和优化后的输出目录，最终将在浏览器中加载。
	- 要在index.js中打包import lodash依赖，要先在本地安装library，npm install --save lodash
	- 已通过import引入lodash，所以将script引入删除，修改body中的script来加载bundle，而不是原始的/src文件。
	- 在这个设置中，index.js显示要求引入的lodash必须存在，然后将它绑定为_，通过声明模块所需的依赖，webpack能够利用这些信息去构件依赖图，然后使用图生成一个优化过的，会以正确顺序执行的bundle。
	- 执行npx webpack，会将我们的脚本作为入口起点，然后输出为main.js。
- 模块，export和import在webpack能提供开箱即用的支持。
- 使用一个配置文件，大多数项目需要很复杂的配置，比在终端中手动输入大量命令要高效的多。
	- 添加webpack.config.js文件，用文件的形式将输入输出文件夹配置好，module.exports={entry:'',output:{path:'',filename:''}}，entry是打包文件入口，output是打包文件出口。
	- output对象的path属性必须是绝对路径，所以要引入路径依赖包path，该包有个方法，path.resolve(__dirname,'dist')可以将相对路径转为绝对路径，其中__dirname指的是该配置文件的上一级路径。引入path包：const path=require('path')
	- 运行webpack指令，在dist文件夹下获得打包好的包。
	- 由于使用的npm指令对js项目进行管理，直接用webpack指令会造成混乱，后期webpack指令过于繁琐或配置更改后，webpack指令容易出错，所以将通过的指令映射到package.json文件。在script属性下添加指令键值对，即key:value，由于webpack是打包指令，设定key为build，value为webpack。
	- npm run build运行。然后再index.html内用script引入输出的文件。
	- 直接在CLI使用webpack指令，使用的是**全局**安装的webpack包，不同项目的webpack版本不同，强行用webpack会导致打包错误，在package.json的script添加webpack指令属于使用**本地**webpack。
	- webpack 指定入口 指定出口