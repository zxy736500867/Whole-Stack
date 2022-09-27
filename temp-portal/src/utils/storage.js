import config from "../config/index.js";


export default {
    getStroage() {
        return window.localStorage.getItem(config.namespace) || '{}'
    },

    getItem(key) {
        return JSON.parse(this.getStroage())[key]
    },

    setItem(key, value) {
        let storage = JSON.parse(this.getStroage())
        storage[key] = value
        window.localStorage.setItem(config.namespace, JSON.stringify(storage))
    },

    clearItem(key) {
        let storage = JSON.parse(this.getStroage())
        delete storage[key]
        window.localStorage.setItem(config.namespace, JSON.stringify(storage))
    },

    clearAll() {
        window.localStorage.clear()
    }

}
