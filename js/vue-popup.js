/*!
 * vue-popup v0.0.1 (https://github.com/johnnyGoo/vue-popup)
 * Author: Johnny chen
 *
 * Copyright 2013-2015 Johnny chen
 */

if (typeof _ === 'undefined') {
    throw new Error('vue-popup requires underscore');
}
if (typeof Vue === 'undefined') {
    throw new Error('vue-popup requires vue 1.x');
}
(function () {
    /*
     * 替代js本身的 eval,避免编译错误
     * */
    function stringToObj(v) {
        var estr = ('(' + v + ')');
        var Fn = Function;  //一个变量指向Function，防止有些前端编译工具报错
        return new Fn('return ' + estr)();
    }

    var shake_class_name = 'vue-popup-shake-animation';

    var anim = CssBuilder.Animations.create({
        '10%, 90%': {transform: 'translate3d(-2px, 0, 0)'},
        '20%, 80%': {transform: 'translate3d(4px, 0, 0)'},
        '30%, 50%, 70%': {transform: 'translate3d(-8px, 0, 0)'},
        '40%, 60%': {transform: 'translate3d(8px, 0, 0)'}
    });

    CssBuilder.createCssObject('.' + shake_class_name, {
        'animation-name': anim.name,
        'animation-duration': '.82s',
        'animation-timing-function': 'cubic-bezier(0.36,0.07,0.19,0.97)',
        'animation-iteration-count': '1'
    }, 'px');

// 注册
    Vue.component('vue-popup', {
        // 声明 props
        props: {

            content: {
                type: String,
                default: ''
            },
            popup: {
                type: Object,
                default: function () {
                    return {show: false, shaking: false}
                }
            },
            title: {
                type: String,
                default: ''
            },
            maskClose: {
                type: Boolean,
                default: true
            },
            closeButton: {
                type: Boolean,
                default: true
            },
            confirmButton: {
                type: String,
                default: 'OK'
            },
            cancelButton: {
                type: String,
                default: 'Cancel'
            },
            transitionObject: {
                type: String,
                default: "{transition:{transition:'all .4s cubic-bezier(.35,1.43,.56,1.02)',opacity:1,scale:1,'transition-delay': '.2s'},enter:{'transition-delay': '.2s',opacity:0,scale:1.2},leave:{transition:'all .35s cubic-bezier(.46,.05,.77,-0.4)','transition-delay': '.0s',opacity:0,scale:0.8}}"
            },
            zIndex: {
                default: 100
            },
            closeColor: {type: String, default: "#000"},
            titleColor: {type: String, default: "#000"},
            titleBackground: {type: String, default: "#fff"},
            titleBorderBottom: {type: String, default: "1px solid #ddd"},
            contentBackground: {type: String, default: "#fff"},
            buttonColor: {type: String, default: "#000"},
            buttonBackground: {type: String, default: "#fff"},
            buttonBorder: {type: String, default: "1px solid #666"},
            boxShadow: {type: String, default: "0 2px 3px #666"},
            maskBackground: {type: String, default: "rgba(0, 0, 0, 0.6)"},
            titleAlign: {type: String, default: "left"}

        },
        data: function () {

            var d = new Date();
            var unid = Date.UTC(d.getFullYear()
                    , d.getMonth()
                    , d.getDate()
                    , d.getHours()
                    , d.getMinutes()
                    , d.getSeconds()
                    , d.getMilliseconds()) + _.random(0, 99999999);


            return {
                pop: false,
                mask_click: false,
                panel_transition: 'vue-popup-panel-trans-' + unid,
                mask_transition: 'vue-popup-mask-trans-' + unid
            }
        },
        // prop 可以用在模板内
        // 可以用 `this.msg` 设置
        template: '<div class="vue-popup"  v-show="pop" :style="{\'z-index\': zIndex}"><div :style="{background:maskBackground}" :transition="mask_transition" class="vue-popup-mask" v-show="popup.show" ></div>' +
        '<div class="vue-popup-scroll" @click="maskClick()" v-show="popup.show" :transition="panel_transition" >' +
        '<div class="vue-popup-panel" :class="{\'vue-popup-shake-animation\':popup.shaking==true}" @click="panelClick()" :style="{background:contentBackground,boxShadow:boxShadow}" ><div :style="{color:titleColor,background:titleBackground,\'border-bottom\':titleBorderBottom,textAlign:titleAlign}" class="vue-popup-title" v-show="title!=\'\'">{{title}}' +
        '</div><div class="close-button" v-show="closeButton" @click="close()"><svg version="1.1" id="vue-popup-title-close" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="12px" height="12px" viewBox="0 0 512 512" enable-background="new 0 0 512 512" xml:space="preserve"><path d="M507.331,411.33c-0.002-0.002-0.004-0.004-0.006-0.005L352.003,256l155.322-155.325c0.002-0.002,0.004-0.003,0.006-0.005c1.672-1.673,2.881-3.627,3.656-5.708c2.123-5.688,0.912-12.341-3.662-16.915L433.952,4.674c-4.574-4.573-11.226-5.783-16.914-3.66c-2.08,0.775-4.035,1.984-5.709,3.655c0,0.002-0.002,0.003-0.004,0.005L256.001,160L100.677,4.675c-0.002-0.002-0.003-0.003-0.005-0.005c-1.673-1.671-3.627-2.88-5.707-3.655c-5.69-2.124-12.341-0.913-16.915,3.66L4.676,78.049c-4.574,4.574-5.784,11.226-3.661,16.914c0.776,2.08,1.985,4.036,3.656,5.708c0.002,0.001,0.003,0.003,0.005,0.005L160.001,256L4.676,411.326c-0.001,0.002-0.003,0.003-0.004,0.005c-1.671,1.673-2.88,3.627-3.657,5.707c-2.124,5.688-0.913,12.341,3.661,16.915l73.374,73.373c4.575,4.574,11.226,5.784,16.915,3.661c2.08-0.776,4.035-1.985,5.708-3.656c0.001-0.002,0.003-0.003,0.005-0.005l155.324-155.325l155.324,155.325c0.002,0.001,0.004,0.003,0.006,0.004c1.674,1.672,3.627,2.881,5.707,3.657c5.689,2.123,12.342,0.913,16.914-3.661l73.373-73.374c4.574-4.574,5.785-11.228,3.662-16.915C510.212,414.957,509.003,413.003,507.331,411.33z" fill="{{closeColor}}"/> </svg>' +
        '</div><div class="content"><slot>{{{content}}}</slot></div><div class="vue-popup-footer" v-show="footer">' +
        '<div :style="{color:buttonColor,background:buttonBackground,border:buttonBorder}" class="vue-popup-btn" v-show="cancelButton!=\'\'" @click="cancel()">{{cancelButton}}</div>' +
        '<div :style="{color:buttonColor,background:buttonBackground,border:buttonBorder}" class="vue-popup-btn" v-show="confirmButton!=\'\'" @click="confirm()">{{confirmButton}}</div></div> </div></div></div>',
        methods: {
            shakeEffect: function () {
                this.popup.shaking = true;
            },
            maskClick: function () {
                var me = this;
                if (!me.mask_click) {
                    if (me.maskClose) {
                        me.close()
                    } else {
                        me.shakeEffect()
                    }
                }
                me.mask_click = false;
            },
            panelClick: function () {
                this.mask_click = true;
            },
            close: function () {
                if (_.isFunction(this.popup.close)) {
                    this.popup.close.call(this.popup,this.popup)
                }
                this.popup.show = false;
                this.popup.shaking = false;
                this.$dispatch('popup-close', this.popup);

            },
            confirm: function () {
                if (_.isFunction(this.popup.confirm)) {
                    this.popup.confirm.call(this.popup,this.popup)
                }
                this.$dispatch('popup-confirm', this.popup);
            },
            cancel: function () {

                if (_.isFunction(this.popup.cancel)) {
                    this.popup.cancel.call(this.popup,this.popup)
                }
                this.$dispatch('popup-cancel', this.popup);
                this.close();
            }
        },
        computed: {
            footer: function () {
                return this.confirmButton != '' || this.cancelButton != ''

            }
        },
        created: function () {
            var initCss = stringToObj(this.transitionObject);
            this.popup.shaking = false;
            initCss['transition']['transform-origin'] = '50% 50%';

            var trans = this.panel_transition;
            var ext = initCss.ext || 'px';
            delete initCss.ext;
            _.each(initCss, function (obj, key) {

                CssBuilder.createCssObject('.' + trans + '-' + key, obj, ext);
            });
            trans = this.mask_transition;
            var maskCss = {
                transition: {opacity: 1, transition: 'all .4s ease', 'transition-delay': '.0s'},
                leave: {opacity: 0, 'transition-delay': '.3s'},
                enter: {opacity: 0, 'transition-delay': '.0s'}
            };

            _.each(maskCss, function (obj, key) {
                CssBuilder.createCssObject('.' + trans + '-' + key, obj, ext);
            });
            Vue.transition(trans, {
                afterLeave: function (el) {
                    this.pop = false;
                },
                beforeEnter: function (el) {
                    this.pop = true;
                }
            });


        },
        watch: {
            'popup.shaking': function (val, oldVal) {
                var me = this;
                if (val == true) {
                    me.shaking_iv = setTimeout(function () {
                        me.popup.shaking = false
                    }, 820)
                }
            },
            'popup.show': function (val, oldVal) {
                if (val == true) {
                    var popSize = {
                        height: this.$el.querySelector('.vue-popup-panel').clientHeight,
                        width: this.$el.querySelector('.vue-popup-panel').clientWidth
                    };
                    var windowSize = {
                        height: this.$el.querySelector('.vue-popup-mask').clientHeight,
                        width: this.$el.querySelector('.vue-popup-mask').clientWidth
                    };
                    popSize.width = parseInt(popSize.width);

                    var css = {'margin-top': 0, 'overflow-x': 'hidden'};
                    css['width'] = popSize.width;
                    if (popSize.height < windowSize.height - 60) {
                        css['margin-top'] = (windowSize.height - popSize.height) / 2;
                        css['margin-bottom'] = 30
                    } else {
                        css['margin-top'] = 30;
                        css['margin-bottom'] = 30
                    }
                    this.$el.querySelector('.vue-popup-scroll').scrollTop = 0;
                    CssBuilder.cssSmartObject(this.$el.querySelector('.vue-popup-panel'), css, 'px');
                } else {

                }


            }
        }

    })

})();
