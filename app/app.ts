import Vue from 'nativescript-vue'
import Menu from './components/Menu.vue'

import { installPlugin } from '../../demo-snippets/vue/install';
installPlugin();

new Vue({
  render: (h) => h('frame', [h(Menu)]),
}).$start()
