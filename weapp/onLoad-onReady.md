https://developers.weixin.qq.com/miniprogram/dev/framework/app-service/page-life-cycle.html
https://developers.weixin.qq.com/ebook?action=get_post_info&volumn=1&lang=zh_CN&book=miniprogram&docid=0004eec99acc808b00861a5bd5280a
https://developers.weixin.qq.com/miniprogram/dev/reference/api/App.html
- 原来文档里是有原理的，面试官姐姐没说错。只是它在公众平台的教程上我没看到
- 页面构造器Page()：宿主环境提供Page构造器来注册一个小程序页面。
- 页面初次加载时，微信客户端给Page派发onLoad事件，
- onLoad->onShow->onReady
- 初次进入小程序：微信客户端初始化宿主环境，同时从网络或本地缓存中获取小程序代码包，把它注入宿主环境，初始化完毕后客户端给App实例派发**onLaunch**事件
- 暂时离开小程序调用onHide
- 重新回到小程序调用onShow
- 