import Vue from 'vue'
import VuePopUp from './VuePopUp.vue'
import FastClick from 'fastclick'

FastClick.attach(document.body)
new Vue({
    el: 'body',
    components: {VuePopUp},
    data: {
        popup:{show:false,shake:false},popup2:{show:false,shake:false},
        close: function () {

        }, cancel: function () {
        }, confirm: function (show) {
            this.popup2.shake=true;
        }
    }
})
