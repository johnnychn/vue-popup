# vue-popup
popup for vue.js

require [underscore](https://github.com/jashkenas/underscore) and [css-builder](https://github.com/johnnyGoo/css-builder)

# setting
| 名称                    |类型               |默认       | 说明                                     |
| ----------------------- | ----------------- | -------- | ---------------------------------------- |
|mask-close               |Boolean            |true      | 点击空白处是否关闭                                        |
|z-index                  |Number/String      |100       | z-index                                  |
|title                    |String             |""        | 标题 如果''隐藏标题                               |
|title-color              |String             |'#000'    | 标题颜色                            |
|title-background         |String             |'#fff'    | 标题背景颜色                                        |
|title-border-bottom      |String             |'1px solid #f0f0f0'|  标题下边框                                        |
|close-button             |Boolean            |true      | 是否现实关闭按钮                           |
|close-color              |String             |'#fff'    | 关闭按钮颜色                              |
|content-background       |String             |'#000'    | 内容背景颜色                              |
|content                  |String             |""        | 内容 支持html                              |
|button-background        |String             |'#337ab7' | 按钮背景                             |
|button-color             |String             |'#fff'       |  按钮颜色                                         |
|button-border            |String             |'1px solid #2e6da4'       |  按钮边框                                         |
|confirm-button           |String             |'OK'       | 确认按钮文字                                        |
|cancel-button            |String             |'Cancel'       | 取消按钮文字                                        |
|popup                    |String             |{show: false, shaking: false}       |  控制popUp对象                                        |
|transition-object        |String             |{transition:{transition:'all .4s cubic-bezier(.35,1.43,.56,1.02)',opacity:1,scale:1,'transition-delay': '.2s',},enter:{'transition-delay': '.2s',opacity:0,y:100},leave:{'transition-delay': '.0s',opacity:0,y:20,scale:1}}       | transition 对象 ,详见CssBuilder                                      |



#Event
| 名称                    |说明                |
| ----------------------- | ----------------- |
| popup-close             |callback on close  |
| popup-confirm           |callback on confirm|
| popup-cancel            |callback on cancel |


#Excample
* html
```html
<vue-popup close-color="#000" title-color="#fff" title-background="#337ab7" title-border-bottom="1px solid #2e6da4"
                content-background="#fff" button-background="#337ab7" button-color="#fff" button-border="1px solid #2e6da4"
                 :popup.sync="popup"
                transition-object="{transition:{transition:'all .4s cubic-bezier(.35,1.43,.56,1.01)',opacity:1,scale:1,'transition-delay': '.2s',},enter:{'transition-delay': '.2s',opacity:0,y:100,scale:1},leave:{'transition-delay': '.0s',opacity:0,y:100,scale:1}}"
                content=" 到松<br/> 到松<br/> 到松<br/> 到松<br/> 到松<br/>
         <img src='http://p5.img.cctvpic.com/nettv/newgame/2012/0420/20120420115108971.jpg' style='width: 100%'>
     到松<br/> 到松<br/>  到松<br/> 到松<br/> 到松<br/> 到松<br/>" :mask-close=false :close-button=true confirm-button='确认'
                cancel-button='取消' z-index="100">

     </vue-popup>
```
* js
```js new Vue({
         el: '#example',
         data: {msg: 'aaa', picked: '1122', popup: {show: false,shaking:false},popup2: {show: false,shaking:false}},
         events: {
             'popup-confirm': function (obj) {
                 // 事件回调内的 `this` 自动绑定到注册它的实例上
               //  obj.show=false;
                 obj.shaking=true;
                console.log(obj)
             }
         }
     });
```



#License

The MIT License (MIT)

Copyright (c) 2015 Michael Villar

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
