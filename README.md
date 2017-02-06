# vue-popup
popup for vue.js

[DEMO](http://htmlpreview.github.io/?https://github.com/johnnyGoo/vue-popup/blob/master/index.html)

require [underscore](https://github.com/jashkenas/underscore) and [css-builder](https://github.com/johnnyGoo/css-builder)

# setting
| 名称                    |类型               |默认       | 说明                                     |
| ----------------------- | ----------------- | -------- | ---------------------------------------- |
| show                    |Boolean            |false      | 是否显示|
| shake                   |Boolean            |false      | 是否震动窗口|
|mask-close               |Boolean            |true      | 点击空白处是否关闭                                        |
|z-index                  |Number/String      |100       | z-index                                  |
|title-style              |Obejct             |{}|  标题样式                                       |
|close-button             |Boolean            |true      | 是否现实关闭按钮                           |
|close-color              |String             |'#fff'    | 关闭按钮颜色                              |
|content-background       |String             |'#000'    | 内容背景颜色                              |
|content                  |String             |""        | 内容 支持html                              |
|confirm-style           |Obejct             |{}       | 确认按钮样式                                        |
|cancel-style            |Obejct             |{}       | 取消按钮样式                                        |

|confirm-button           |String             |'OK'       | 确认按钮文字                                        |
|cancel-button            |String             |'Cancel'       | 取消按钮文字                                        |
|popup                    |String             |{show: false, shaking: false}       |  控制popUp对象                                        |
|transition-object        |String             |{transition:{transition:'all .4s cubic-bezier(.35,1.43,.56,1.02)',opacity:1,scale:1,'transition-delay': '.2s'},enter:{'transition-delay': '.2s',opacity:0,scale:1.2},leave:{'transition-delay': '.0s',opacity:0,scale:0.8}}       | transition 对象 ,详见CssBuilder                                      |
|box-shadow               |string             |'0 2px 3px #000'| 窗口投影
|mask-background          |string             |'rgba(0,0,0,0.6)'| 蒙板背景





#Event
| 名称                    |说明                |
| ----------------------- | ----------------- |
| popup-close             |callback on close  |
| popup-confirm           |callback on confirm|
| popup-cancel            |callback on cancel |


#Example
* html
```html
  <vue-pop-up title="确认?" :show.sync="popup2.show" :shake.sync="popup2.shake"  @popup-close="close" @popup-cancel="cancel"  @popup-confirm="confirm" z-index="10000"
                z-index="100">
         Do this?
     </vue-pop-up>
```


