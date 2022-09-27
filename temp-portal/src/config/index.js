/**
 * 环境配置封装
 */
const env = import.meta.env.MODE || 'prod';
const EnvConfig = {
    dev: {
        baseUrl: '/api',
        mockUrl: 'https://www.fastmock.site/mock/0a7957ae2cb0f3927f4724479444a2b0/api',
    },
    test: {
        baseUrl: '/api',
        mockUrl: 'https://www.fastmock.site/mock/0c9e8b1b5b3b3e3e8e8e8b1b5b3b3e3e/api',
    },
    prod: {
        baseUrl: '/api',
        mockUrl: 'https://www.fastmock.site/mock/0c9e8b1b5b3b3e3e8e8e8b1b5b3b3e3e/api',
    }
}

export default {
    env,
    namespace: 'manager',
    mock:true,
    ...EnvConfig[env]
}
