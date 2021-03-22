- exports.count=count; 在exports对象导出了一个公有方法。
- var count=require('./util/counter'); 用于在当前模块加载和使用别的模块，传入路径，返回一个模块导出对象，js扩展名可省略，可导入json文件。
- exports对象是当前模块的导出对象，用于导出模块公有方法和属性，别的模块require的就是当前模块的exports对象。
- module对象可以访问当前模块的一些相关信息，最多的用途是替换当前模块的导出对象。
	```
	modele.exports=function(){
		console.log('hello');
	}
	```
	模块默认到处对象被替换为一个函数。
- 模块初始化，一个模块中的js代码仅在模块第一次被使用时执行一次，并在执行过程中初始化模块的导出对象，之后缓存起来的导出对象被重复利用。也就是一个模块如果被require多次，都是同样的一个对象。
- 主模块：通过CLI参数传给nodejs的模块。
