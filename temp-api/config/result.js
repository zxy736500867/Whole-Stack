/**
 * <p>code: 服务器响应状态码</p>
 * <p>data: 返回数据</p>
 * <p>message: 错误信息</p>
 * <p>status: 请求状态</p>
 */
class Result {
    /**
     * init Result
     * @param code
     * @param data
     * @param message
     * @param status
     */
    constructor(code, data, message, status) {
        this.code = code
        this.data = data
        this.message = message
        this.status = status
    }

    /**
     * 执行成功，返回结果数据
     * @param data: 要返回的数据
     */
    static success(data) {
        this.code = 200
        this.data = data
        this.message = ''
        this.status = 'success'
        return this.toString()
    }
    /**
     * 执行失败，返回错误信息
     * @param message: 错误信息
     */
    static failure(message) {
        this.code = 500
        this.data = null
        this.message = message
        this.status = 'failure'
        return this.toString()
    }

    /**
     * override toString
     * @returns { { code, data, message, status } }
     */
    static toString() {
        const { code, data, message, status } = this
        return { code, data, message, status }
    }
}

module.exports = Result
