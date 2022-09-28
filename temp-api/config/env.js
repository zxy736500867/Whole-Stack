const { DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWD } = process.env

//设置默认值，无论dev还是qa都会走这个
const DEFAULT_CONFIG = {

    // logLevel: 日志级别 { 0: 仅控制台输出, 1: 控制台、日志输出 }
    logLevel: 0,
    dbConfig: {
        host: DB_HOST,
        port: DB_PORT,
        database: DB_NAME,
        user: DB_USER,
        password: DB_PASSWD,
    },
    // 其他默认配置...
}

const config = {
    local: {
        ...DEFAULT_CONFIG,
        dbConfig: {
            host: DB_HOST || '',
            port: DB_PORT || '',
            database: DB_NAME || '',
            username: DB_USER || '',
            password: DB_PASSWD || '',
        }
    },
    dev: {
        ...DEFAULT_CONFIG,
    },
    qa: {
        ...DEFAULT_CONFIG,
    },
    prod: {
        ...DEFAULT_CONFIG,
        logLevel: 1,
    }
}

const getConfig = async () => config[process.env.RUN_ENV ] || config.local

module.exports = {
    getConfig,
}