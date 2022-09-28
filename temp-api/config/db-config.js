const pg = require('pg')
const { logger } = require('./log')
const { getConfig } = require('./env')

// config db
let pool
// 连接失败次数
let FAILURE_COUNT = 0

// 初始化数据库连接池
const initDbPool = async () => {
    const config = await getConfig()
    // config db
    pool = new pg.Pool({
        ...config.dbConfig,
        poolSize: 5,
        poolIdleTimeout: 30000,
        reapIntervalMillis: 10000,
    })
}

/**
 * 连接pg数据库
 */
const connectDB = async () => {
    try {
        if (!pool) {
            logger.info('初始化数据库连接池')
            await initDbPool()
        }
        const client = await pool.connect()
        if (client) {
            FAILURE_COUNT = 0
            return client
        } else {
            throw new Error('数据库连接错误')
        }
    } catch (error) {
        if (FAILURE_COUNT < 3) {
            FAILURE_COUNT++
            await initDbPool()
            return connectDB()
        } else {
            FAILURE_COUNT = 0
            throw new Error(`数据库连接错误, ${error}`)
        }
    }
}

/**
 * execute sql
 * @param {String} sqlStr - sql语句
 * @returns - {code, data, message}
 */
const exeSQL = async sqlStr => {
    const client = await connectDB()
    try {
        await client.query('BEGIN;')
        const data = await client.query(sqlStr)
        await client.query('COMMIt;')
        return { status: 'true', result: data }
    } catch ({ message }) {
        await client.query('ROLLBACK;')
        throw new Error(message)
    } finally {
        logger.info(`--- Sql --- [ ${sqlStr.split(/\s{2,}/).join(' ')} ]`)
        client.release()
    }
}

/**
 * execute sql
 * @param {String} sqlStr - sql语句
 * @param {Array} params - sql语句 过滤参数
 * @returns - {code, data, message}
 */
const exeSQLP = async (sqlStr, params) => {
    const client = await connectDB()
    try {
        await client.query('BEGIN;')
        const data = await client.query(sqlStr, params)
        const { rows } = data
        await client.query('COMMIt;')
        return rows
    } catch ({ message }) {
        await client.query('ROLLBACK;')
        throw new Error(message)
    } finally {
        logger.info(`--- Sql --- [ ${sqlStr.split(/\s{2,}/).join(' ')} ]`)
        logger.info(`--- Sql Params --- [ ${params.join(', ')} ]`)
        client.release()
    }
}

/**
 * execute multiple sql statements once
 * e.g. exeSQLMultipleP(['select * from table', 'select * from'], [[], []])
 * @param {*[]} statements - sql语句
 * @param {Array} params - sql语句
 * @returns - {code, data, message}
 */
const exeSQLMultipleP = async (statements, params) => {
    const client = await connectDB()
    const result = []
    try {
        await client.query('BEGIN;')
        for (let i = 0; i < statements.length; i++) {
            const sqlStr = statements[i]
            const param = params[i]
            const data = await client.query(sqlStr, param)
            result.push(data)
        }
        await client.query('COMMIT;')
        return result
    } catch ({ message }) {
        await client.query('ROLLBACK;')
        throw new Error(message)
    } finally {
        client.release()
    }
}

const executeSQL= async (sqlStr, params=null) => {

    try {
        let result = null
        if (params===null) {
            result = await exeSQL(sqlStr)
        }else if (Array.isArray(params) && params.length>0 && Array.isArray(sqlStr) && sqlStr.length>0)  {
            result = await exeSQLMultipleP(sqlStr, params)
        }else {
            result = await exeSQLP(sqlStr, params)
        }
        return result
    } catch ({ message }) {
        throw new Error(message)
    }
}

module.exports = {
    executeSQL
}