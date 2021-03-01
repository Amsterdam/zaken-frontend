export const capitalizeString = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)

export const appendTimeToDate = (date: string) => `${ date }T00:00:01.001+0200`
