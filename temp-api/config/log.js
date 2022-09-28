const log4j = require('log4js')

log4j.configure({
    appenders: {
        // 控制台输出
        logConsole: {
            type: 'stdout',
            layout: {
                type: 'pattern',
                pattern: '%[[%d{yyyy/MM/dd hh:mm:ss}] [%p] [%f{2}:%l]%] %m',
            },
        },
        // 日志文件输出
        logFile: {
            type: 'dateFile',
            filename: 'logs/log',
            pattern: '.yyyy-MM-dd.log',
            alwaysIncludePattern: true,
            layout: {
                type: 'pattern',
                pattern: '[%d{yyyy/MM/dd hh:mm:ss}] [%p] [%f{2}:%l] %m%n',
            },
        },
        // 限制日志文件输出级别
        logFilter: {
            type: 'logLevelFilter',
            appender: 'logFile',
            level: 'error',
        },
    },
    categories: {
        default: {
            appenders: logLevel === 0 ? ['logConsole'] : ['logConsole', 'logFilter'],
            level: 'all',
            enableCallStack: true,
        },
    },
})

const logger = log4j.getLogger()

module.exports = {
    logger: logger,
    use: app => {
        app.use(
            log4j.connectLogger(logger, {
                level: log4j.levels.INFO,
                format: ':method :url',
            }),
        )
    },
}