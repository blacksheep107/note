# 组件样式
- styles接受一个字符串数组，既可以指定多组样式。这些样式只对当前组件生效，不会用于模板中的子组件和投影进来的组件(ng-content)。
- Shadow DOM样式范围引入的特殊选择器：
  - **:host**，每个组件会关联一个宿主元素，模板会渲染到宿主元素中。:host可用于创建针对宿主元素自身的样式，而不是针对宿主内部的元素。
    - 以组件的宿主元素为目标。当active类应用在宿主元素上时，宿主元素的内容变成粗体。
  ```css
  :host {
    font-style: italic;
  }
  :host(.active) {
    font-weight: bold;
  }
  ```
  - **:host-context**，在当前组件宿主元素的祖先节点中查找CSS类，直到文档的根节点为止，它只能和其他选择器组合使用。
    - 只有当组件的某个祖先元素有active类时，才会把组件内部的所有文本设为斜体。
  ```css
  :host-context(.active) {
    font-style: italic;
  }
  ```
  - 任何带有**::ng-deep**的样式都会变成全局样式，如果不带上:host，该样式会污染其他组件。
  ```css
  :host ::ng-deep h3 {
    font-style: italic;
  }
  ```
  - /deep/组合器的两个别名：>>>和::ng-deep，vue里也有这种方式
    - /deep/和>>>选择器只能用在仿真(emulated)模式下
    - ShadowDOM中的刺穿组合器已经弃用，统一用::ng-deep来兼容
- CSS预处理器，在angular.json里配置build下的options下添加
