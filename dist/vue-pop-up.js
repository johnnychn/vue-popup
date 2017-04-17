!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.VuePopUp=t():e.VuePopUp=t()}(this,function(){return function(e){function t(n){if(o[n])return o[n].exports;var i=o[n]={exports:{},id:n,loaded:!1};return e[n].call(i.exports,i,i.exports,t),i.loaded=!0,i.exports}var o={};return t.m=e,t.c=o,t.p="/dist/",t(0)}([function(e,t,o){var n,i;o(6),n=o(1),i=o(4),e.exports=n||{},e.exports.__esModule&&(e.exports=e.exports["default"]),i&&(("function"==typeof e.exports?e.exports.options||(e.exports.options={}):e.exports).template=i)},function(e,t){"use strict";function o(e){var t="("+e+")",o=Function;return new o("return "+t)()}Object.defineProperty(t,"__esModule",{value:!0});var n=0;if(!window.Smart)throw"vue-popup required smart.js";var i=window.Smart,s=i.Css,r=i.Event,p=i._,a="vue-popup-shake-animation",u=i.Animations.create("vue-popup-shake-animation--keyframe",{"10%, 90%":{transform:"translate3d(-2px, 0, 0)"},"20%, 80%":{transform:"translate3d(4px, 0, 0)"},"30%, 50%, 70%":{transform:"translate3d(-8px, 0, 0)"},"40%, 60%":{transform:"translate3d(8px, 0, 0)"}});i.Css.createSmartCssStyle("."+a,{"animation-name":u.name,"animation-duration":".82s","animation-timing-function":"cubic-bezier(0.36,0.07,0.19,0.97)","animation-iteration-count":"1"},"px"),t["default"]={props:{content:{type:String,"default":""},show:{type:Boolean,"default":!1},shake:{type:Boolean,"default":!1},title:{type:String,"default":""},maskClose:{type:Boolean,"default":!0},closeButton:{type:Boolean,"default":!0},confirmButton:{type:String,"default":"OK"},cancelButton:{type:String,"default":"Cancel"},transitionObject:{type:String,"default":"{transition:{transition:'all .4s cubic-bezier(.35,1.43,.56,1.02)',opacity:1,scale:1,'transition-delay': '.2s'},enter:{'transition-delay': '.2s',opacity:0,scale:1.2},leave:{transition:'all .35s cubic-bezier(.46,.05,.77,-0.4)','transition-delay': '.0s',opacity:0,scale:0.8}}"},zIndex:{"default":100},closeColor:{type:String,"default":"#000"},titleStyle:{type:Object,"default":function(){return{color:"#000",background:"#fff",borderBottom:"1px solid #ddd",textAlign:"left",fontWeight:0}}},popupPanelStyle:{type:Object,"default":function(){return{background:"#fff",boxShadow:"0 2px 3px #666",width:"400px"}}},cancelStyle:{type:Object,"default":function(){return{color:"#000",background:"#fff",border:"1px solid #666"}}},confirmStyle:{type:Object,"default":function(){return{color:"#000",background:"#fff",border:"1px solid #666"}}},maskBackground:{type:String,"default":"rgba(0, 0, 0, 0.6)"},maxHeight:{type:String,"default":""},size:{type:Object,"default":function(){return{width:400,height:300}}}},data:function(){var e=(new Date,n++);return{pop:!1,mask_click:!1,panel_transition:"vue-popup-panel-trans-"+e,mask_transition:"vue-popup-mask-trans-"+e}},methods:{shakeEffect:function(){this.shake=!0},maskClick:function(){var e=this;e.mask_click||(e.maskClose?e.close():e.shakeEffect()),e.mask_click=!1},panelClick:function(){this.mask_click=!0},close:function(){this.show=!1,this.shake=!1,this.$dispatch("popup-close",this.show)},confirm:function(){this.$dispatch("popup-confirm",this.show)},cancel:function(){this.$dispatch("popup-cancel",this.show),this.close()},updateSize:function(){if(1==this.show){var e={height:this.$el.querySelector(".vue-popup-panel").clientHeight,width:this.$el.querySelector(".vue-popup-panel").clientWidth},t={height:this.$el.querySelector(".vue-popup-mask").clientHeight,width:this.$el.querySelector(".vue-popup-mask").clientWidth};e.width=parseInt(e.width);var o={"margin-top":0,"overflow-x":"hidden"};e.height<t.height-60?(o["margin-top"]=(t.height-e.height)/2,o["margin-bottom"]=30):(o["margin-top"]=30,o["margin-bottom"]=30),this.$el.querySelector(".vue-popup-scroll").scrollTop=0,s.smartCss(this.$el.querySelector(".vue-popup-panel"),o,"px")}}},computed:{footer:function(){return""!=this.confirmButton||""!=this.cancelButton}},created:function(){var e=o(this.transitionObject);this.shake=!1,e.transition["transform-origin"]="50% 50%";var t=this.panel_transition,n=e.ext||"px";delete e.ext,p.each(e,function(e,o){i.Css.createSmartCssStyle("."+t+"-"+o,e,n)}),t=this.mask_transition;var s={transition:{opacity:1,transition:"all .4s ease","transition-delay":".0s"},leave:{opacity:0,"transition-delay":".3s"},enter:{opacity:0,"transition-delay":".0s"}};p.each(s,function(e,o){i.Css.createSmartCssStyle("."+t+"-"+o,e,n)});var a=this.__proto__.constructor;a.transition(t,{afterLeave:function(e){this.pop=!1},beforeEnter:function(e){this.pop=!0}}),this.pop=this.show,this.show&&(this.removeResize=r.windowEvent("resize",this.updateSize))},ready:function(){if(this.popupPanelStyle.width=this.size.width+"px",this.show){this.show=!1;var e=this;i.ready(function(){setTimeout(e.updateSize,10),e.show=!0})}},watch:{shake:function(e,t){var o=this;1==e&&(o.shaking_iv=setTimeout(function(){o.shake=!1},820))},show:function(e,t){e?(this.updateSize(),this.removeResize&&this.removeResize(),this.removeResize=r.windowEvent("resize",this.updateSize)):this.removeResize()},"size.width":function(e,t){this.popupPanelStyle.width=parseInt(e)+"px",console.log(this.popupPanelStyle),this.updateSize()},"size.height":function(e,t){this.updateSize()}}}},function(e,t,o){t=e.exports=o(3)(),t.push([e.id,".vue-popup{position:absolute;top:0;left:0;width:100%;height:100%;font-family:Helvetica Neue Light,HelveticaNeue-Light,Helvetica Neue,Calibri,Helvetica,Arial,sans-serif}.vue-popup>.vue-popup-scroll{overflow-y:auto;-webkit-overflow-scrolling:touch}.vue-popup>.vue-popup-mask,.vue-popup>.vue-popup-scroll{position:fixed;top:0;left:0;width:100%;height:100%}.vue-popup>.vue-popup-scroll>.vue-popup-panel{background:#fff;margin:0 auto;border-radius:10px;position:relative}.vue-popup>.vue-popup-scroll>.vue-popup-panel>.content{padding:10px;box-sizing:border-box}.vue-popup>.vue-popup-scroll>.vue-popup-panel>.vue-popup-title{box-sizing:content-box;padding:10px 10px 6px}.vue-popup>.vue-popup-scroll>.vue-popup-panel>.close-button{position:absolute;right:4px;top:4px;font-size:16px;cursor:pointer;padding:5px 10px;user-select:none;-webkit-user-select:none;-ms-user-select:none;-moz-user-select:none;outline:none}.vue-popup>.vue-popup-scroll>.vue-popup-panel>.vue-popup-footer{height:52px;padding-right:10px}.vue-popup>.vue-popup-scroll>.vue-popup-panel>.vue-popup-footer>.vue-popup-btn{display:block;margin:4px;padding:5px 20px;float:right;border-radius:6px;cursor:pointer;user-select:none;-webkit-user-select:none;-ms-user-select:none;-moz-user-select:none;outline:none}",""])},function(e,t){e.exports=function(){var e=[];return e.toString=function(){for(var e=[],t=0;t<this.length;t++){var o=this[t];o[2]?e.push("@media "+o[2]+"{"+o[1]+"}"):e.push(o[1])}return e.join("")},e.i=function(t,o){"string"==typeof t&&(t=[[null,t,""]]);for(var n={},i=0;i<this.length;i++){var s=this[i][0];"number"==typeof s&&(n[s]=!0)}for(i=0;i<t.length;i++){var r=t[i];"number"==typeof r[0]&&n[r[0]]||(o&&!r[2]?r[2]=o:o&&(r[2]="("+r[2]+") and ("+o+")"),e.push(r))}},e}},function(e,t){e.exports=" <div class=vue-popup v-show=pop :style=\"{'z-index': zIndex}\"> <div :style={background:maskBackground} :transition=mask_transition class=vue-popup-mask v-show=show></div> <div class=vue-popup-scroll @click=maskClick() v-show=show :transition=panel_transition> <div class=vue-popup-panel :class=\"{'vue-popup-shake-animation':shake==true}\" @click=panelClick() :style=popupPanelStyle> <div :style=titleStyle class=vue-popup-title v-show=\"title!=''\">{{title}} </div> <div class=close-button v-show=closeButton @click=close()> <svg version=1.1 id=vue-popup-title-close xmlns=http://www.w3.org/2000/svg xmlns:xlink=http://www.w3.org/1999/xlink x=0px y=0px width=12px height=12px viewBox=\"0 0 512 512\" enable-background=\"new 0 0 512 512\" xml:space=preserve><path d=M507.331,411.33c-0.002-0.002-0.004-0.004-0.006-0.005L352.003,256l155.322-155.325c0.002-0.002,0.004-0.003,0.006-0.005c1.672-1.673,2.881-3.627,3.656-5.708c2.123-5.688,0.912-12.341-3.662-16.915L433.952,4.674c-4.574-4.573-11.226-5.783-16.914-3.66c-2.08,0.775-4.035,1.984-5.709,3.655c0,0.002-0.002,0.003-0.004,0.005L256.001,160L100.677,4.675c-0.002-0.002-0.003-0.003-0.005-0.005c-1.673-1.671-3.627-2.88-5.707-3.655c-5.69-2.124-12.341-0.913-16.915,3.66L4.676,78.049c-4.574,4.574-5.784,11.226-3.661,16.914c0.776,2.08,1.985,4.036,3.656,5.708c0.002,0.001,0.003,0.003,0.005,0.005L160.001,256L4.676,411.326c-0.001,0.002-0.003,0.003-0.004,0.005c-1.671,1.673-2.88,3.627-3.657,5.707c-2.124,5.688-0.913,12.341,3.661,16.915l73.374,73.373c4.575,4.574,11.226,5.784,16.915,3.661c2.08-0.776,4.035-1.985,5.708-3.656c0.001-0.002,0.003-0.003,0.005-0.005l155.324-155.325l155.324,155.325c0.002,0.001,0.004,0.003,0.006,0.004c1.674,1.672,3.627,2.881,5.707,3.657c5.689,2.123,12.342,0.913,16.914-3.661l73.373-73.374c4.574-4.574,5.785-11.228,3.662-16.915C510.212,414.957,509.003,413.003,507.331,411.33z fill={{closeColor}} /> </svg> </div> <div class=content :style=\"{maxHeight:maxHeight,overflow:'auto',height:size.height+'px',width:size.width+'px'}\"> <slot>{{{content}}}</slot> </div> <div class=vue-popup-footer v-show=footer> <div :style=cancelStyle class=vue-popup-btn v-show=\"cancelButton!=''\" @click=cancel()>{{cancelButton}} </div> <div :style=confirmStyle class=vue-popup-btn v-show=\"confirmButton!=''\" @click=confirm()>{{confirmButton}} </div> </div> </div> </div> </div> "},function(e,t,o){function n(e,t){for(var o=0;o<e.length;o++){var n=e[o],i=c[n.id];if(i){i.refs++;for(var s=0;s<i.parts.length;s++)i.parts[s](n.parts[s]);for(;s<n.parts.length;s++)i.parts.push(a(n.parts[s],t))}else{for(var r=[],s=0;s<n.parts.length;s++)r.push(a(n.parts[s],t));c[n.id]={id:n.id,refs:1,parts:r}}}}function i(e){for(var t=[],o={},n=0;n<e.length;n++){var i=e[n],s=i[0],r=i[1],p=i[2],a=i[3],u={css:r,media:p,sourceMap:a};o[s]?o[s].parts.push(u):t.push(o[s]={id:s,parts:[u]})}return t}function s(e,t){var o=f(),n=g[g.length-1];if("top"===e.insertAt)n?n.nextSibling?o.insertBefore(t,n.nextSibling):o.appendChild(t):o.insertBefore(t,o.firstChild),g.push(t);else{if("bottom"!==e.insertAt)throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");o.appendChild(t)}}function r(e){e.parentNode.removeChild(e);var t=g.indexOf(e);t>=0&&g.splice(t,1)}function p(e){var t=document.createElement("style");return t.type="text/css",s(e,t),t}function a(e,t){var o,n,i;if(t.singleton){var s=m++;o=v||(v=p(t)),n=u.bind(null,o,s,!1),i=u.bind(null,o,s,!0)}else o=p(t),n=l.bind(null,o),i=function(){r(o)};return n(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap)return;n(e=t)}else i()}}function u(e,t,o,n){var i=o?"":n.css;if(e.styleSheet)e.styleSheet.cssText=x(t,i);else{var s=document.createTextNode(i),r=e.childNodes;r[t]&&e.removeChild(r[t]),r.length?e.insertBefore(s,r[t]):e.appendChild(s)}}function l(e,t){var o=t.css,n=t.media,i=t.sourceMap;if(n&&e.setAttribute("media",n),i&&(o+="\n/*# sourceURL="+i.sources[0]+" */",o+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(i))))+" */"),e.styleSheet)e.styleSheet.cssText=o;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(o))}}var c={},d=function(e){var t;return function(){return"undefined"==typeof t&&(t=e.apply(this,arguments)),t}},h=d(function(){return/msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase())}),f=d(function(){return document.head||document.getElementsByTagName("head")[0]}),v=null,m=0,g=[];e.exports=function(e,t){t=t||{},"undefined"==typeof t.singleton&&(t.singleton=h()),"undefined"==typeof t.insertAt&&(t.insertAt="bottom");var o=i(e);return n(o,t),function(e){for(var s=[],r=0;r<o.length;r++){var p=o[r],a=c[p.id];a.refs--,s.push(a)}if(e){var u=i(e);n(u,t)}for(var r=0;r<s.length;r++){var a=s[r];if(0===a.refs){for(var l=0;l<a.parts.length;l++)a.parts[l]();delete c[a.id]}}}};var x=function(){var e=[];return function(t,o){return e[t]=o,e.filter(Boolean).join("\n")}}()},function(e,t,o){var n=o(2);"string"==typeof n&&(n=[[e.id,n,""]]);o(5)(n,{});n.locals&&(e.exports=n.locals)}])});
//# sourceMappingURL=vue-pop-up.js.map