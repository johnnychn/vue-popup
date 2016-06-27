# vue-popup
popup for vue.js

require [underscore](https://github.com/jashkenas/underscore) and [css-builder](https://github.com/johnnyGoo/css-builder)

# setting
mask-close Boolean true

z-index default 100

title string default '';

title-color string default '#000';

title-background string default '#fff';

title-border string default '#000';

title-border-bottom string default '#000';

close-button Boolean true;

close-color string default '#fff';

content-background string default '#000';

content string default '';

button-background string default '#337ab7';

button-color string default '#fff';

button-border string default '1px solid #2e6da4';

confirm-button string default 'OK';

cancel-button string default 'Cancel';

popup Object default  {show: false, shaking: false};

transition-object string default "{transition:{transition:'all .4s cubic-bezier(.35,1.43,.56,1.02)',opacity:1,scale:1,'transition-delay': '.2s',},enter:{'transition-delay': '.2s',opacity:0,y:100},leave:{'transition-delay': '.0s',opacity:0,y:20,scale:1}}";



#Event
#####popup-close
* callback on close

#####popup-confirm
* callback on confirm

#####popup-cancel
* callback on cancel


#Excample
* html
`<vue-popup close-color="#000" title-color="#fff" title-background="#337ab7" title-border-bottom="1px solid #2e6da4" content-background="#fff" button-background="#337ab7" button-color="#fff" button-border="1px solid #2e6da4" :popup.sync="popup" transition-object="{transition:{transition:'all .4s cubic-bezier(.35,1.43,.56,1.01)',opacity:1,scale:1,'transition-delay': '.2s',},enter:{'transition-delay': '.2s',opacity:0,y:100,scale:1},leave:{'transition-delay': '.0s',opacity:0,y:100,scale:1}}" content=" 到松<br/>" :mask-close=false :close-button=true confirm-button='确认' cancel-button='取消' z-index="100"></vue-popup>`
* js
`new Vue({el: '#example',data: {msg: 'aaa', picked: '1122', popup: {show: false,shaking:false},popup2: {show: false,shaking:false}}, events: {
             'popup-confirm': function (obj) {
                 // 事件回调内的 `this` 自动绑定到注册它的实例上
               //  obj.show=false;
                 obj.shaking=true;
                console.log(obj)
             }
         }
     });`




#License

The MIT License (MIT)

Copyright (c) 2015 Michael Villar

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
