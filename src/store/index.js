import Vue from 'vue';
import Vuex from 'vuex';
import goodStore from './modules/goodStore'
Vue.use(Vuex);
const Store = new Vuex.Store({
    modules:{
        good:goodStore
    }
})
export default Store;