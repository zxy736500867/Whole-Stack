class CommonUtil {
    /**
     * 判断字符串是否为数字
     * @param {String} obj
     * @returns {boolean}
     */
    static isNumber(obj) {
        const regex = /^[0-9]+$/
        return regex.test(obj)
    }

    /**
     * 判断字符串是否不为数字
     * @param {String} obj
     * @returns {boolean}
     */
    static isNotNumber(obj) {
        return !this.isNumber(obj)
    }

    /**
     * 判断对象是否为String类型
     * @param {Object} obj
     * @returns {boolean}
     */
    static isStringObject(obj) {
        return typeof obj === 'string'
    }

    /**
     * 判断对象是否不为String类型
     * @param {Object} obj
     * @returns {boolean}
     */
    static isNotStringObject(obj) {
        return !this.isStringObject(obj)
    }

    /**
     * 判断对象是否为Number类型
     * @param {Object} obj
     * @returns {boolean}
     */
    static isNumberObject(obj) {
        return typeof obj === 'number'
    }

    /**
     * 判断对象是否不为Number类型
     * @param {Object} obj
     * @returns {boolean}
     */
    static isNotNumberObject(obj) {
        return !this.isNumberObject(obj)
    }

    /**
     * 判断字符串是否为小数
     * @param {String} obj
     * @returns {boolean}
     */
    static isDecimal(obj) {
        const regex = /^[0-9]+\.[0-9]+$/
        return regex.test(obj)
    }

    /**
     * 判断字符串是否不为小数
     * @param {String} obj
     * @returns {boolean}
     */
    static isNotDecimal(obj) {
        return !this.isDecimal(obj)
    }

    /**
     * 判断对象是否不存在
     * @param {Object} obj
     * @returns {boolean}
     */
    static isNull(obj) {
        return obj === null || obj === undefined
    }

    /**
     * 判断对象是否存在
     * @param {Object} obj
     * @returns {boolean}
     */
    static isNotNull(obj) {
        return obj !== null && obj !== undefined
    }

    /**
     * 判断对象是否为空
     * @param {Object} obj
     * @returns {boolean}
     */
    static isEmpty(obj) {
        return obj === null || obj === undefined || obj === '' || obj === 0
    }

    /**
     * 判断对象是否不为空
     * @param {Object} obj
     * @returns {boolean}
     */
    static isNotEmpty(obj) {
        return obj !== null && obj !== undefined && obj !== '' && obj !== 0
    }
}

module.exports = CommonUtil
