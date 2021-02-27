http://www.hicss.net/use-margin-or-padding/
- margin：边界，元素周围生成额外的空白区，“空白区”指其他元素不能出现且父元素背景可见的区域。
- padding：内边距，留白，边框偏离内容正文的距离，位于元素框的边界与内容区之间。
- 何时使用margin：需要在border外侧添加空白时，空白处不需要背景色，上下相连的两个box之间的空白需要相互抵消时，如15px+20px的margin，将得到20px的空白。
- 何时使用padding：需要在border内侧添加空白时，空白处需要背景色时，上下相连的两个box之间的空白，希望等于两者之和时，如15px+20px的padding，将得到35px的空白。
- margin用来隔开元素与元素间的间距，padding用来隔开元素与内容的间距。margin用于布局分开元素使元素间互不相干，padding用于让内容与元素之间有一段距离。
