# this.$router
- 全局的路由实例，this.$router.push(name:'home',params:{参数})跳转
- this.$router.go(-1)后退
- this.$router.replace('/')替换当前页面
# this.$route
- this.$route.params取路由参数
# hash history
- hash有个#，#后面的不会去请求服务器，也就是不会刷新页面，路由切换时也不会。
- history没有#，会请求服务器，比如http://localhost:8080/pltk/index，刷新的时候会请求服务器index，服务器如果没做对应的返回前端就是404
- http://localhost:8080/pltk/#/index，hash方法就不会请求服务器#后面的东西。
- 遇到了404，解决的方法↑
- 为什么都用history模式，因为hash模式搜索引擎找不到，#后面的内容服务器不识别。搜索引擎会找meta标签里的东西来匹配。