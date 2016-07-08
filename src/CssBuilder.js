/*!
 * css-builder v0.0.1 (http://johnnygoo.github.io/css-builder/)
 * Author: johnny chen
 * Website: www.2smart.cn
 * Contact: johnny.chen@goddreamer.com
 *
 * Copyright 2016-2016 css-builder
 * Licensed under MIT (https://github.com/johnnyGoo/css-builder/blob/master/LICENSE)
 */
import _ from 'underscore'

(function () {
    var root = this;
    var CssBuilder = {};

    CssBuilder.style = function () {
        if (!CssBuilder.styleDom) {
            var style = document.createElement('style');
            style.rel = 'stylesheet';
            style.type = 'text/css';
            document.getElementsByTagName('head')[0].appendChild(style);
            CssBuilder.styleDom = style;
        }
        return CssBuilder.styleDom;
    };
    // Utility

    function findKeyframeRules(styles, func) {
        var rules = styles.cssRules || styles.rules || [];

        for (var i = 0; i < rules.length; i++) {
            var rule = rules[i];

            if (rule.type == CSSRule.IMPORT_RULE) {
                findKeyframeRules(rule.styleSheet, func);
            }
            else if (rule.type === CSSRule.KEYFRAMES_RULE ||
                rule.type === CSSRule.MOZ_KEYFRAMES_RULE ||
                rule.type === CSSRule.WEBKIT_KEYFRAMES_RULE) {
                func(rule, styles, i);
            }
        }
    }

    // Classes

    function KeyframeRule(r) {
        this.original = r;
        this.keyText = r.keyText;
        this.css = {};

        // Extract the CSS as an object
        var rules = r.style.cssText.split(';');

        for (var i = 0; i < rules.length; i++) {
            var parts = rules[i].split(':');

            if (parts.length == 2) {
                var key = parts[0].replace(/^\s+|\s+$/g, '');
                var value = parts[1].replace(/^\s+|\s+$/g, '');

                this.css[key] = value;
            }
        }
    };

    function KeyframeAnimation(kf) {
        this.original = kf;
        this.name = kf.name;
        this.keyframes = [];
        this.keytexts = [];
        this.keyframeHash = {};

        this.initKeyframes();
    };

    KeyframeAnimation.prototype.initKeyframes = function () {
        this.keyframes = [];
        this.keytexts = [];
        this.keyframeHash = {};

        var rules = this.original;

        for (var i = 0; i < rules.cssRules.length; i++) {
            var rule = new KeyframeRule(rules.cssRules[i]);
            this.keyframes.push(rule);
            this.keytexts.push(rule.keyText);
            this.keyframeHash[rule.keyText] = rule;
        }
    };

    KeyframeAnimation.prototype.getKeyframeTexts = function () {
        return this.keytexts;
    };

    KeyframeAnimation.prototype.getKeyframe = function (text) {
        return this.keyframeHash[text];
    };

    KeyframeAnimation.prototype.setKeyframe = function (text, css) {
        var cssRule = text + " {";
        for (var k in css) {
            cssRule += k + ':' + css[k] + ';';
        }
        cssRule += "}";

        // The latest spec says that it should be appendRule, not insertRule.
        // Browsers also vary in the semantics of this, whether or not the new
        // rules are merged in with previous ones at the same keyframe or if they
        // are simply replaced. Need to look into that more.
        //
        // https://github.com/jlongster/css-animations.js/issues/4
        if ('appendRule' in this.original) {
            this.original.appendRule(cssRule);
        }
        else {
            this.original.insertRule(cssRule);
        }

        this.initKeyframes();

        // allow for chaining for ease of creation.
        return this;
    };

    KeyframeAnimation.prototype.setKeyframes = function (obj) {
        for (var k in obj) {
            this.setKeyframe(k, obj[k]);
        }
    };

    KeyframeAnimation.prototype.clear = function () {
        for (var i = 0; i < this.keyframes.length; i++) {
            this.original.deleteRule(this.keyframes[i].keyText);
        }
    };

    function Animations() {
        this.animations = {};

        var styles = document.styleSheets;
        var anims = this.animations;

        for (var i = 0; i < styles.length; i++) {
            try {
                findKeyframeRules(styles[i], function (rule) {
                    anims[rule.name] = new KeyframeAnimation(rule);
                });
            }
            catch (e) {
                // Trying to interrogate a stylesheet from another
                // domain will throw a security error
            }
        }
    }

    Animations.prototype.get = function (name) {
        return this.animations[name];
    };

    Animations.prototype.getDynamicSheet = function () {
        if(!this.dynamicSheet) {
            var style = document.createElement('style');
            style.rel = 'stylesheet';
            style.type = 'text/css';
            document.getElementsByTagName('head')[0].appendChild(style);
            this.dynamicSheet = style.sheet;

        }

        return this.dynamicSheet;
    };

    Animations.prototype.create = function (name, frames) {
        var styles = this.getDynamicSheet();


        // frames can also be passed as the first parameter
        if (typeof name === 'object') {
            frames = name;
            name = null;
        }

        if (!name) {
            name = 'anim' + Math.floor(Math.random() * 100000);
        }

        // Append a empty animation to the end of the stylesheet
        try {
            var idx = styles.insertRule('@keyframes ' + name + '{}',
                styles.cssRules.length);
        }
        catch (e) {
            if (e.name == 'SYNTAX_ERR' || e.name == 'SyntaxError') {
                idx = styles.insertRule('@-webkit-keyframes ' + name + '{}',
                    styles.cssRules.length);
            }
            else {
                throw e;
            }
        }


        var anim = new KeyframeAnimation(styles.cssRules[idx]);
        this.animations[name] = anim;

        if (frames) {
            anim.setKeyframes(frames);
        }

        return anim;
    };

    Animations.prototype.remove = function (name) {
        var styles = this.getDynamicSheet();
        name = name instanceof KeyframeAnimation ? name.name : name;

        this.animations[name] = null;

        try {
            findKeyframeRules(styles, function (rule, styles, i) {
                if (rule.name == name) {
                    styles.deleteRule(i);
                }
            });
        }
        catch (e) {
            // Trying to interrogate a stylesheet from another
            // domain will throw a security error
        }
    };

    // Baseline setup
    // --------------

    // Establish the root object, `window` in the browser, or `exports` on the server.
    CssBuilder.Animations = new Animations();

    // Export the CssBuilder object for **Node.js**, with
    // backwards-compatibility for the old `require()` API. If we're in
    // the browser, add `_` as a global object.
    if (typeof exports !== 'undefined') {
        if (typeof module !== 'undefined' && module.exports) {
            exports = module.exports = CssBuilder;
        }
        exports.CssBuilder = CssBuilder;
    } else {
        root.CssBuilder = CssBuilder;
    }

    /*
     * 删除对象属性
     * */
    function clearKey(obj, key) {
        if (_.has(obj, key)) {
            delete obj[key];
        }
    }

    /*
     * 删除多个对象属性
     * */
    function clearKeys(obj, key) {

        if (isString(key)) {
            clearKey(obj, key);
        } else if (isArray(key)) {
            _.each(key, function (v) {
                clearKey(obj, v);
            })
        } else if (isObject(key)) {
            _.each(key, function (v, k) {
                clearKey(obj, k);
            })
        }
    }

//是否数组
    function isObject(arg) {
        return Object.prototype.toString.call(arg) === '[object Object]';
    }

//是否数组
//    function isNumber(arg) {
//        return Object.prototype.toString.call(arg) === '[object Number]';
//    }

//是否数组
    function isArray(arg) {
        return Object.prototype.toString.call(arg) === '[object Array]';
    }

    function isString(arg) {
        return Object.prototype.toString.call(arg) === '[object String]';
    }

    function match(str, matchs) {
        var regStr = '';
        if (isArray(matchs)) {
            _.each(matchs, function (v) {
                regStr = regStr + v + '|';
            });
            regStr = regStr.substr(0, regStr.length - 1);
        } else {
            regStr = matchs;
        }
        var reg = new RegExp(regStr);
        return reg.test(str);
    }

    function fixValue(value, ext) {
        if (isString(value)) {
            if (match(value, 'px$|%$|cm$|em$|rem$|pt$|ms$|s$')) {
                return value;
            }
        }
        if (!ext) {
            ext = 'px';
        }
        value = parseFloat(value);
        return value + ext;
    }

    function withExt(key, value, ext) {

        if (match(key, 'width|height|top|left|right|bottom|margin|padding|size')) {
            return fixValue(value, ext);
        } else {
            return value;
        }

    }

    /*
     * 为css加入浏览器前缀
     * */
    function fixCss(name, attr) {
        var cssObj = {};
        if (!attr || attr == '') {
            return cssObj;
        }

        cssObj[name] = attr;
        cssObj['-webkit-' + name] = attr;
        cssObj['-moz-' + name] = attr;
        cssObj['-ms-' + name] = attr;
        cssObj['-o-' + name] = attr;
        return cssObj;
    }


    function formatScaleInObject(obj) {
        var scale = {scaleX: 1, scaleY: 1};
        if (_.has(obj, 'scale')) {
            scale.scaleX = obj.scale;
            scale.scaleY = obj.scale;
            delete obj.scale;
        }
        if (_.has(obj, 'scaleX')) {
            scale.scaleX = obj.scaleX;
            delete obj.scaleX;
        }
        if (_.has(obj, 'scaleY')) {
            scale.scaleY = obj.scaleY;
            delete obj.scaleY;
        }

        if (scale.scaleX != 1 && scale.scaleY != 1) {
            obj.scaleString = 'scale(' + scale.scaleX + ',' + scale.scaleY + ') ';
        }
    }

    function transformString(obj, ext) {

        if (_.has(obj, 'transform')) {
            return obj.transform;
        }

        var string = '';
        obj = _.clone(obj);
        formatScaleInObject(obj);
        _.each(obj, function (value, key) {
            switch (key) {
                case 'x':
                    string += 'translateX(' + fixValue(value, ext) + ') ';
                    break;
                case 'y':
                    string += 'translateY(' + fixValue(value, ext) + ') ';
                    break;
                case 'scaleString':
                    string += value;
                    break;
                case 'rotate':
                    string += 'rotate(' + fixValue(value, 'deg') + ') ';
                    break;
                case 'rotateX':
                    string += 'rotateX(' + fixValue(value, 'deg') + ') ';
                    break;
                case 'rotateY':
                    string += 'rotateY(' + fixValue(value, 'deg') + ') ';
                    break;
                case 'rotateZ':
                    string += 'rotateZ(' + fixValue(value, 'deg') + ') ';
                    break;
            }
        });
        return string;
    }

    function transformObject(obj, ext) {
        return fixCss('transform', transformString(obj, ext))
    }

    CssBuilder.smartObject = function (obj, ext) {
        obj = _.clone(obj);
        var transform = transformObject(obj, ext);
        clearKeys(obj, ['x', 'y', 'scale', 'scaleX', 'scaleY', 'rotate', 'rotateX', 'rotateY']);
        var cssObj = {};
        _.each(obj, function (value, key) {
            // cssObj[key] = withExt(key, value, ext);
            if (match(key, '^animation|^transform-|^perspective|^backface-visibility')) {
                _.extend(cssObj, fixCss(key, withExt(key, value, ext)))
            } else {
                cssObj[key] = withExt(key, value, ext);
            }
        });
        return _.extend(transform, cssObj);
    };

    /**
     * 添加css样式到文档
     */
    CssBuilder.createCssString = function (cssString) {
        var style = this.style();

       // style.insertRule(cssString, 0);

        if (style.styleSheet) {// IE
            style.styleSheet.cssText = cssString;
        } else {// w3c
            var doc = document;
            var cssText = doc.createTextNode(cssString);
            style.appendChild(cssText);
        }
    };
    /**
     * 添加css样式到文档
     */
    CssBuilder.createCssObject = function (mark, obj, ext) {
        var me = this;
        var str = '';
        var cssObj = me.smartObject(obj, ext);
        _.each(cssObj, function (v, k) {
            str += k + ':' + v + ';';
        });
        var cssString = mark + '{' + str + '}';
        //  console.log(cssString)
        me.createCssString(cssString);
    };

    /**
     * 添加css样式到dom
     */
    CssBuilder.css = function (el, obj) {
        _.each(obj, function (v, k) {
            if (v) {
                el.style[k] = v;
            } else {
                el.style[k] = '';
            }

        });
    };
    /**
     * 添加smartObject css样式到dom
     */
    CssBuilder.cssSmartObject = function (el, obj, ext) {
        this.css(el, this.smartObject(obj, ext));
    }


}.call(this));