- window.nacigator属性指向一个包含浏览器和系统信息的Navigator对象，脚本通过它了解用户的环境信息。
Navigator对象的属性
---
- userAgent返回浏览器的User Agent字符串，即浏览器的厂商和版本信息。一般不用它识别浏览器，因为麻烦。但它可以识别手机浏览器，测试是否包含mobi字符串。
- plugins返回一个类似数组对象，成员是Plugin实例对象，表示浏览器安装的插件。
- platform返回用户操作系统信息。
- online表示用户是否在线。离线会触发offline事件。
- language返回浏览器的首选语言，languages返回用户可接受的语言。
- geolocation返回一个Geolocation对象，包含用户地理位置信息。只在HTTPS协议下可用。
- cookieEnabled表示浏览器的cookie功能是否打开。
Navigator对象的方法
---
- javaEnabled，能否运行java Applet小程序。
- sendBeacon用户向服务器异步发送数据。
Navigator的实验性属性
---
- deviceMemory返回计算机内存数量。
- hardwareConcurrency返回用户计算机上可用的逻辑处理器的数量。
- connection返回一个对象，包含当前网络连接的相关信息。downlink有效带宽估计值Mbps，downlinkMax当前连接的最大下行链路速度，effectiveType连接的等效类型，rtt当前连接的估计有效往返时间，saveData用户是否设置了浏览器的减少数据使用量选项，type当前连接的介质类型。
Screen
---
- Screen对象表示当前窗口所在的屏幕。window.screen
- height，width，availHeight=height-系统组件的高度，pixelDepth屏幕的色彩位数，colorDepth别名，orientation返回屏幕方向的对象。