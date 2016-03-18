#[译]解读background-size

[原文：by CHRIS COYIER](https://css-tricks.com/almanac/properties/b/background-size/)

CSS中的background-size是background众多属性中最常用、也是最复杂的属性之一。这个属性很多的变化，你可以使用不同的语法，适用于不同的场景。如下基本例子：

`html {
  background: url(greatimage.jpg);
  background-size: 300px 100px;
}`

这是为background-size设置两个值语法的例子。有四种方式来设置该属性：
  * 关键字(the keyword syntax)
  * 一个数值(the one-value syntax)
  * 两个数值(the two-value syntax)
  * 多背景语法(the multiple background syntax)

##Keywords

除了默认值`auto`之外，还可以使用`cover`和`contain`来设置background-size

![cover and contain](./cover-and-contain.jpg)

###cover

保证图片覆盖整个容器，有可能会有图片的拉伸或者图片的某一边有部分的裁剪

###contain

保证在容器中完整显示整个图片，有可能会导致容器的一侧或者底部空白

###默认值auto

根据图片的实际大小和长宽比自动计算大小

##One Value

如果只设置一个值（eg:`background-size:400px`），那么该值为设置`width`，而`height`会被设置为`auto`。这里你可以使用所有的CSS size 单位，包括像素（`px`）、百分比（%）、`em`、viewport单位等。

##Two Values

如果设置两个值，那么第一个值设置背景图的`width`，第二个设置`height`。这里你也可以和单值时一样使用所有的度量单位。

##Multiple Images

也可以组合使用上述的方法，同时可以使用来设置多背景图片，设置多个背景图片大小只需要简单的在属性值之间添加逗号`,`

`html {
  background: url(greatimage.jpg), url(wonderfulimage.jpg);
  background-size: 300px 100px, cover;
  /* first image is 300x100, second image covers the whole area */
}`

使用多图片时需要考虑图片的堆叠顺序。
