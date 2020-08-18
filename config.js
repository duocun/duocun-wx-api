import dotenv from 'dotenv'

dotenv.config();

const env = process.env;

export const cfg = {
    DB_CONN: `mongodb://${env.DB_USERNAME}:${env.DB_PASSWORD}@${env.DB_HOST}:${env.DB_PORT}/${env.DB_NAME}?authSource=${env.AUTH_DB_NAME}`,
    DB_HOST: env.DB_HOST,
    DB_PORT: env.DB_PORT,
    
    SVC_PORT: env.SVC_PORT,
    SVC_PATH: env.SVC_PATH,

    WECHAT_TOKEN: env.WECHAT_TOKEN,
    WECHAT_APP_ID: env.WECHAT_APP_ID,
    WECHAT_APP_SECRET: env.WECHAT_APP_SECRET,

    ACCOUNT_SVC_HOST: env.ACCOUNT_SVC_HOST,
    ACCOUNT_SVC_PATH: env.ACCOUNT_SVC_PATH,

    LOG_SVC_HOST: env.LOG_SVC_HOST,
    LOG_SVC_PATH: env.LOG_SVC_PATH,
}