const key = "zaken-authtoken"

export const getToken = () => localStorage.getItem(key)
export const hasToken = () => localStorage.getItem(key) !== null
export const setToken = (token: string) => localStorage.setItem(key, token)
export const clearToken = () => localStorage.removeItem(key)

