import storage from '@/store/storage'
// eslint-disable-next-line camelcase
const TOkEN_KEY = 'TouTiao-Token'

export const getToken = () => storage.get(TOkEN_KEY)

export const setToken = (token) => storage.set(TOkEN_KEY, token)

export const remove = () => storage.remove(TOkEN_KEY)
