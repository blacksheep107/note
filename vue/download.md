# 下载zip文件
- 接口里要加headers和responseType
```
function download(data){
  return http({
    method:'post',
    url:'/wjwyq/taskHumanInfo/download',
    data,
    responseType:'blob',
    headers:{
      'Content-Type':'application/json; application/octet-stream'
    }
  })
}
```
- 通过添加a链接节点，自动点击来下载。
```
download(data).then().catch(err=>{
    let url=window.URL.createObjectURL(new Blob([err.data],{type:'application/zip'}));
    let link=document.createElement('a');
    link.style.display='none';
    link.href=url;
    document.body.appendChild(link);
    link.click();
    URL.revokeObjectURL(url);
})
```