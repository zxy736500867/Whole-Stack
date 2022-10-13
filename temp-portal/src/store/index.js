import storage from "../utils/storage.js";
import {createStore} from "vuex";
import mutations from "./model/mutations.js";


const state={
    userInfo:{}||storage.getItem('userInfo'),
}

export default createStore({
    state,
    mutations
})
