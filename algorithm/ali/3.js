async function getImg(url) {
    return new Promise(resolve => {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    resolve();
                }
            }
        }
        // setTimeout(()=>{
        //     console.log(url);
        //     resolve();
        // },1000);
    })
}
async function loadImg(imgArr) {
    for (let i = 0; i < imgArr.length; i++) {
        await getImg(imgArr[i]);
    }
}
loadImg(['url1', 'url2', 'url3'])
