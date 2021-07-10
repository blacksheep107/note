- vue webpack项目文件配置：
![](https://img2020.cnblogs.com/blog/1956720/202107/1956720-20210710150605828-1887590854.png)
- index.html是主页，一般只定义一个空节点，内容通过Vue组件填充。
- App.Vue：根组件，一个vue页面通常由三部分组成：模板，js，样式
    - template模板，只能包含一个父节点，即顶层div只有一个，\<router-view>类似一个插槽，跳转到某个路由时，该路由下的页面就在这个插槽中渲染显示。（写原生的时候菜单栏控制页面渲染用的是display:none，是不是也是用这个实现？）
    - script，vue用export default导出，可以包含data，声明周期，方法等。
    - style标签包裹，默认是全局的，如果定义在作用域内要写成\<style scoped>
    - 如果要引入外部css文件，首先给项目安装css-loader包，在命令行输入npm install css-loader，安装完成后可以在style标签下import所需的css文件。这样可以把style下的css也封装起来。
- main.js入口文件主要引入vue框架、根组件、路由，并定义vue实例。
- router文件夹下的index.js为路由配置文件，默认定义一个路径为/的路由，该路由对应的页面是name的组件，在url访问http://localhost:8080/#/时就渲染这个组件。先引入组件再设置路由。
- 打包：查看package.json的script属性下打包命令，是build，命令行输入npm run build
    - 注意打包前在config文件夹下面的index.js里，把build下的assetsPublicPath的路径值由/改为./，因为在项目路径下的index.html在根目录下，现在要求与static同级，需要匹配css和js的绝对路径。不做这个页面会不显示。
- 引入element-ui
    - npm安装：-S即--save，包名会被保存在package.json的dependencies里面，在生产环境下这个包的依赖依然存在。-D即--dev（生产），包名，会被注册在package.json的DevDependencies里，仅在开发环境下用这个包。
    - package-lock.json是锁定安装时的包的版本号，保证所有人npm install时依赖是一致的。在npm install时生成一份文件，用以记录当前状态下实际安装的各个包的版本号，每次安装依赖就锁定在安装的这个版本。
    - 输入npm i element-ui -S安装，在main.js里写入：
    ```
        import ElementUI from 'element-ui'
        import 'element-ui/lib/theme-chalk/index.css'
        Vue.use(ElementUI)
    ```
    全局引入，之后在组件里就能直接使用。
- 打包前在build文件夹下util.js文件下添加publicPath:'../../'解决部署到服务器后ElementUI图标不显示问题。
![](https://img2020.cnblogs.com/blog/1956720/202107/1956720-20210710170825141-825045692.png)
