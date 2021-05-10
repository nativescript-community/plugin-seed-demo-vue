import Vue from 'nativescript-vue'
import Menu from './components/Menu.vue'

import { install } from '../../demo-snippets/vue/install';
install();

new Vue({
  render: (h) => h('frame', [h(Menu)]),
}).$start()
