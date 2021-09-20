export const apiBaseUrl = process.env.AUDIE_API
export const newsApi = process.env.NEWS_API
export const apiAiresUrl = process.env.AIRES_STUDIO_URL
export const centralHost = process.env.CENTRAL_LOGIN_URL
export const userTokenStorageKey = "APP_USER_TOKEN"
export const userStorageKey = "APP_USER"
export const userTimeZoneIdStorageKey = "APP_USER_TIMEZONE"
export const utcTimeZoneIdStorageKey = "Etc/GMT"
export const isDevEnviroment = process.env.NODE_ENV === 'development'