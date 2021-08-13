# 每个路由展示不同标题
- hik的框架
- 在router.config.js里加title
- router里的index.js里，meta加上title，上面的参数也要改，在跳转到error前面加上
```
    if(to.meta.title){
      document.title=to.meta.title;
    }
    next()
```