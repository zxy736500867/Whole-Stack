import {executeSQL} from "../config/db-config";
import commonUtil from "./common-util";

/**
 * 分页
 * @param {String} sqlStr: sql语句
 * @param {Array} params: 参数列表
 * @param pageNo: 页码
 * @param pageSize: 每页数量
 * @param index: 参数索引
 * @return {string}: limit语句
 */
const paginationUtil = async (sqlStr, params = null, pageNo = '1', pageSize = '10', index = 1) => {
    const count = await executeSQL(`SELECT count(1) from (${sqlStr}) count`, params)
    console.log('---count', count)
    if (commonUtil.isNotNumberObject(pageNo)) {
        if (commonUtil.isNumber(pageNo)) {
        pageNo = Number.parseInt(pageNo)
        params.push(pageNo)
        } else {
        throw new Error('页码参数错误')
        }
    }
    if (commonUtil.isNotNumberObject(pageSize)) {
        if (commonUtil.isNumber(pageSize)) {
        pageSize = Number.parseInt(pageSize)
        params.push(pageSize)
        } else {
        throw new Error('页码参数错误')
        }
    }
    if (pageNo <= 0 || pageSize <= 0) {
        return executeSQL(sqlStr, params)
    }
    const content = await executeSQL(`${sqlStr} LIMIT $${index + 1} OFFSET ($${index} - 1) * $${index + 1}`, params)
    return {
        content: [...content],
        page: Number.parseInt(pageNo),
        pages: Math.ceil(Number(count[0].count) / pageSize),
        size: Number.parseInt(pageSize),
        total: Number(count[0].count),
    }
}

module.exports = paginationUtil