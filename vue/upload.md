# el-upload上传图片
```html
  <el-upload
    action=''
    ref='upload'
    :multiple='false'
    :limit=1
    :http-request='uploadPic'
    :show-file-list='false'
    class='avatar-uploader'
  >
    <img v-if="editData.imageUrl" :src="editData.imageUrl" class="avatar">
    <i v-else class="h-icon-add avatar-uploader-icon"></i>
  </el-upload>
```
```vue
    uploadPic(files) {
      let formData = new FormData();
      formData.append('file', files.file);
      console.log(formData.get('file'))
      api.uploadPictures({
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(res=>{
        if (res.code == 0) {
          this.$message.success('上传成功');
          this.editData.imageUrl = res.data;
        }
      })
    },
```
```css
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
```
