import Vue from 'nativescript-vue';
import Menu from './components/Menu.vue';

import { installPlugin } from '@nativescript-community/template-snippet/vue/install';
installPlugin();

new Vue({
    render: (h) => h('frame', [h(Menu)])
}).$start();
