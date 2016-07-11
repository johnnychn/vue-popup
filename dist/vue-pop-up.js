!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.VuePopUp=e():t.VuePopUp=e()}(this,function(){return function(t){function e(n){if(o[n])return o[n].exports;var i=o[n]={exports:{},id:n,loaded:!1};return t[n].call(i.exports,i,i.exports,e),i.loaded=!0,i.exports}var o={};return e.m=t,e.c=o,e.p="/dist/",e(0)}([function(t,e,o){var n,i;o(6),n=o(1),i=o(4),t.exports=n||{},t.exports.__esModule&&(t.exports=t.exports["default"]),i&&(("function"==typeof t.exports?t.exports.options||(t.exports.options={}):t.exports).template=i)},function(t,e){"use strict";function o(t){var e="("+t+")",o=Function;return new o("return "+e)()}if(Object.defineProperty(e,"__esModule",{value:!0}),!window.Smart)throw"vue-popup required smart.js";var n=window.Smart,i=n.Css,r=(n.Event,n._),s="vue-popup-shake-animation",p=n.Animations.create({"10%, 90%":{transform:"translate3d(-2px, 0, 0)"},"20%, 80%":{transform:"translate3d(4px, 0, 0)"},"30%, 50%, 70%":{transform:"translate3d(-8px, 0, 0)"},"40%, 60%":{transform:"translate3d(8px, 0, 0)"}});n.Css.createCssStyle("."+s,{"animation-name":p.name,"animation-duration":".82s","animation-timing-function":"cubic-bezier(0.36,0.07,0.19,0.97)","animation-iteration-count":"1"},"px"),e["default"]={props:{content:{type:String,"default":""},show:{type:Boolean,"default":!1},shake:{type:Boolean,"default":!1},title:{type:String,"default":"Popup"},maskClose:{type:Boolean,"default":!0},closeButton:{type:Boolean,"default":!0},confirmButton:{type:String,"default":"OK"},cancelButton:{type:String,"default":"Cancel"},transitionObject:{type:String,"default":"{transition:{transition:'all .4s cubic-bezier(.35,1.43,.56,1.02)',opacity:1,scale:1,'transition-delay': '.2s'},enter:{'transition-delay': '.2s',opacity:0,scale:1.2},leave:{transition:'all .35s cubic-bezier(.46,.05,.77,-0.4)','transition-delay': '.0s',opacity:0,scale:0.8}}"},zIndex:{"default":100},closeColor:{type:String,"default":"#000"},titleColor:{type:String,"default":"#000"},titleBackground:{type:String,"default":"#fff"},titleBorderBottom:{type:String,"default":"1px solid #ddd"},contentBackground:{type:String,"default":"#fff"},buttonColor:{type:String,"default":"#000"},buttonBackground:{type:String,"default":"#fff"},buttonBorder:{type:String,"default":"1px solid #666"},boxShadow:{type:String,"default":"0 2px 3px #666"},maskBackground:{type:String,"default":"rgba(0, 0, 0, 0.6)"},titleAlign:{type:String,"default":"left"}},data:function(){var t=new Date,e=Date.UTC(t.getFullYear(),t.getMonth(),t.getDate(),t.getHours(),t.getMinutes(),t.getSeconds(),t.getMilliseconds())+r.random(0,99999999);return{pop:!1,mask_click:!1,panel_transition:"vue-popup-panel-trans-"+e,mask_transition:"vue-popup-mask-trans-"+e}},methods:{shakeEffect:function(){this.shake=!0},maskClick:function(){var t=this;t.mask_click||(t.maskClose?t.close():t.shakeEffect()),t.mask_click=!1},panelClick:function(){this.mask_click=!0},close:function(){this.show=!1,this.shake=!1,this.$dispatch("popup-close",this.show)},confirm:function(){this.$dispatch("popup-confirm",this.show)},cancel:function(){this.$dispatch("popup-cancel",this.show),this.close()}},computed:{footer:function(){return""!=this.confirmButton||""!=this.cancelButton}},created:function(){var t=o(this.transitionObject);this.shake=!1,t.transition["transform-origin"]="50% 50%";var e=this.panel_transition,i=t.ext||"px";delete t.ext,r.each(t,function(t,o){n.Css.createSmartCssStyle("."+e+"-"+o,t,i)}),e=this.mask_transition;var s={transition:{opacity:1,transition:"all .4s ease","transition-delay":".0s"},leave:{opacity:0,"transition-delay":".3s"},enter:{opacity:0,"transition-delay":".0s"}};r.each(s,function(t,o){n.Css.createSmartCssStyle("."+e+"-"+o,t,i)});var p=this.__proto__.constructor;p.transition(e,{afterLeave:function(t){this.pop=!1},beforeEnter:function(t){this.pop=!0}}),this.pop=this.show},watch:{shake:function(t,e){var o=this;1==t&&(o.shaking_iv=setTimeout(function(){o.shake=!1},820))},show:function(t,e){if(1==t){var o={height:this.$el.querySelector(".vue-popup-panel").clientHeight,width:this.$el.querySelector(".vue-popup-panel").clientWidth},n={height:this.$el.querySelector(".vue-popup-mask").clientHeight,width:this.$el.querySelector(".vue-popup-mask").clientWidth};o.width=parseInt(o.width);var r={"margin-top":0,"overflow-x":"hidden"};r.width=o.width,o.height<n.height-60?(r["margin-top"]=(n.height-o.height)/2,r["margin-bottom"]=30):(r["margin-top"]=30,r["margin-bottom"]=30),this.$el.querySelector(".vue-popup-scroll").scrollTop=0,i.smartCss(this.$el.querySelector(".vue-popup-panel"),r,"px")}}}}},function(t,e,o){e=t.exports=o(3)(),e.push([t.id,".vue-popup{position:absolute;top:0;left:0;width:100%;height:100%;font-family:Helvetica Neue Light,HelveticaNeue-Light,Helvetica Neue,Calibri,Helvetica,Arial,sans-serif}.vue-popup>.vue-popup-scroll{position:fixed;top:0;left:0;width:100%;height:100%;overflow-y:auto;-webkit-overflow-scrolling:touch}.vue-popup>.vue-popup-mask{position:absolute;left:0;top:0;width:100%;height:100%}.vue-popup>.vue-popup-scroll>.vue-popup-panel{background:#fff;margin:0 auto;border-radius:10px;width:90%;max-width:400px;position:relative}.vue-popup>.vue-popup-scroll>.vue-popup-panel>.content{padding:10px}.vue-popup>.vue-popup-scroll>.vue-popup-panel>.vue-popup-title{box-sizing:content-box;padding:10px 10px 6px;font-weight:600}.vue-popup>.vue-popup-scroll>.vue-popup-panel>.close-button{position:absolute;right:4px;top:4px;font-size:16px;cursor:pointer;padding:5px 10px;user-select:none;-webkit-user-select:none;-ms-user-select:none;-moz-user-select:none;outline:none}.vue-popup>.vue-popup-scroll>.vue-popup-panel>.vue-popup-footer{height:52px;padding-right:10px}.vue-popup>.vue-popup-scroll>.vue-popup-panel>.vue-popup-footer>.vue-popup-btn{display:block;margin:4px;padding:5px 20px;float:right;border-radius:6px;cursor:pointer;user-select:none;-webkit-user-select:none;-ms-user-select:none;-moz-user-select:none;outline:none}",""])},function(t,e){t.exports=function(){var t=[];return t.toString=function(){for(var t=[],e=0;e<this.length;e++){var o=this[e];o[2]?t.push("@media "+o[2]+"{"+o[1]+"}"):t.push(o[1])}return t.join("")},t.i=function(e,o){"string"==typeof e&&(e=[[null,e,""]]);for(var n={},i=0;i<this.length;i++){var r=this[i][0];"number"==typeof r&&(n[r]=!0)}for(i=0;i<e.length;i++){var s=e[i];"number"==typeof s[0]&&n[s[0]]||(o&&!s[2]?s[2]=o:o&&(s[2]="("+s[2]+") and ("+o+")"),t.push(s))}},t}},function(t,e){t.exports=' <div class=vue-popup v-show=pop :style="{\'z-index\': zIndex}"> <div :style={background:maskBackground} :transition=mask_transition class=vue-popup-mask v-show=show></div> <div class=vue-popup-scroll @click=maskClick() v-show=show :transition=panel_transition> <div class=vue-popup-panel :class="{\'vue-popup-shake-animation\':shake==true}" @click=panelClick() :style={background:contentBackground,boxShadow:boxShadow}> <div :style="{color:titleColor,background:titleBackground,\'border-bottom\':titleBorderBottom,textAlign:titleAlign}" class=vue-popup-title v-show="title!=\'\'">{{title}} </div> <div class=close-button v-show=closeButton @click=close()> <svg version=1.1 id=vue-popup-title-close xmlns=http://www.w3.org/2000/svg xmlns:xlink=http://www.w3.org/1999/xlink x=0px y=0px width=12px height=12px viewBox="0 0 512 512" enable-background="new 0 0 512 512" xml:space=preserve><path d=M507.331,411.33c-0.002-0.002-0.004-0.004-0.006-0.005L352.003,256l155.322-155.325c0.002-0.002,0.004-0.003,0.006-0.005c1.672-1.673,2.881-3.627,3.656-5.708c2.123-5.688,0.912-12.341-3.662-16.915L433.952,4.674c-4.574-4.573-11.226-5.783-16.914-3.66c-2.08,0.775-4.035,1.984-5.709,3.655c0,0.002-0.002,0.003-0.004,0.005L256.001,160L100.677,4.675c-0.002-0.002-0.003-0.003-0.005-0.005c-1.673-1.671-3.627-2.88-5.707-3.655c-5.69-2.124-12.341-0.913-16.915,3.66L4.676,78.049c-4.574,4.574-5.784,11.226-3.661,16.914c0.776,2.08,1.985,4.036,3.656,5.708c0.002,0.001,0.003,0.003,0.005,0.005L160.001,256L4.676,411.326c-0.001,0.002-0.003,0.003-0.004,0.005c-1.671,1.673-2.88,3.627-3.657,5.707c-2.124,5.688-0.913,12.341,3.661,16.915l73.374,73.373c4.575,4.574,11.226,5.784,16.915,3.661c2.08-0.776,4.035-1.985,5.708-3.656c0.001-0.002,0.003-0.003,0.005-0.005l155.324-155.325l155.324,155.325c0.002,0.001,0.004,0.003,0.006,0.004c1.674,1.672,3.627,2.881,5.707,3.657c5.689,2.123,12.342,0.913,16.914-3.661l73.373-73.374c4.574-4.574,5.785-11.228,3.662-16.915C510.212,414.957,509.003,413.003,507.331,411.33z fill={{closeColor}} /> </svg> </div> <div class=content> <slot>{{{content}}}</slot> </div> <div class=vue-popup-footer v-show=footer> <div :style={color:buttonColor,background:buttonBackground,border:buttonBorder} class=vue-popup-btn v-show="cancelButton!=\'\'" @click=cancel()>{{cancelButton}} </div> <div :style={color:buttonColor,background:buttonBackground,border:buttonBorder} class=vue-popup-btn v-show="confirmButton!=\'\'" @click=confirm()>{{confirmButton}} </div> </div> </div> </div> </div> '},function(t,e,o){function n(t,e){for(var o=0;o<t.length;o++){var n=t[o],i=c[n.id];if(i){i.refs++;for(var r=0;r<i.parts.length;r++)i.parts[r](n.parts[r]);for(;r<n.parts.length;r++)i.parts.push(a(n.parts[r],e))}else{for(var s=[],r=0;r<n.parts.length;r++)s.push(a(n.parts[r],e));c[n.id]={id:n.id,refs:1,parts:s}}}}function i(t){for(var e=[],o={},n=0;n<t.length;n++){var i=t[n],r=i[0],s=i[1],p=i[2],a=i[3],u={css:s,media:p,sourceMap:a};o[r]?o[r].parts.push(u):e.push(o[r]={id:r,parts:[u]})}return e}function r(t,e){var o=h(),n=m[m.length-1];if("top"===t.insertAt)n?n.nextSibling?o.insertBefore(e,n.nextSibling):o.appendChild(e):o.insertBefore(e,o.firstChild),m.push(e);else{if("bottom"!==t.insertAt)throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");o.appendChild(e)}}function s(t){t.parentNode.removeChild(t);var e=m.indexOf(t);e>=0&&m.splice(e,1)}function p(t){var e=document.createElement("style");return e.type="text/css",r(t,e),e}function a(t,e){var o,n,i;if(e.singleton){var r=g++;o=v||(v=p(e)),n=u.bind(null,o,r,!1),i=u.bind(null,o,r,!0)}else o=p(e),n=l.bind(null,o),i=function(){s(o)};return n(t),function(e){if(e){if(e.css===t.css&&e.media===t.media&&e.sourceMap===t.sourceMap)return;n(t=e)}else i()}}function u(t,e,o,n){var i=o?"":n.css;if(t.styleSheet)t.styleSheet.cssText=x(e,i);else{var r=document.createTextNode(i),s=t.childNodes;s[e]&&t.removeChild(s[e]),s.length?t.insertBefore(r,s[e]):t.appendChild(r)}}function l(t,e){var o=e.css,n=e.media,i=e.sourceMap;if(n&&t.setAttribute("media",n),i&&(o+="\n/*# sourceURL="+i.sources[0]+" */",o+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(i))))+" */"),t.styleSheet)t.styleSheet.cssText=o;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(o))}}var c={},d=function(t){var e;return function(){return"undefined"==typeof e&&(e=t.apply(this,arguments)),e}},f=d(function(){return/msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase())}),h=d(function(){return document.head||document.getElementsByTagName("head")[0]}),v=null,g=0,m=[];t.exports=function(t,e){e=e||{},"undefined"==typeof e.singleton&&(e.singleton=f()),"undefined"==typeof e.insertAt&&(e.insertAt="bottom");var o=i(t);return n(o,e),function(t){for(var r=[],s=0;s<o.length;s++){var p=o[s],a=c[p.id];a.refs--,r.push(a)}if(t){var u=i(t);n(u,e)}for(var s=0;s<r.length;s++){var a=r[s];if(0===a.refs){for(var l=0;l<a.parts.length;l++)a.parts[l]();delete c[a.id]}}}};var x=function(){var t=[];return function(e,o){return t[e]=o,t.filter(Boolean).join("\n")}}()},function(t,e,o){var n=o(2);"string"==typeof n&&(n=[[t.id,n,""]]);o(5)(n,{});n.locals&&(t.exports=n.locals)}])});
//# sourceMappingURL=vue-pop-up.js.map