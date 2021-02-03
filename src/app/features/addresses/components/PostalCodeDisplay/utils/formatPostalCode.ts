export default (s: string): string | undefined => {
  const s1 = s.replace(/[\s-_]/g, "").toUpperCase()
  if (/^\d{4}[A-Z]{2}$/.test(s1) === false) return undefined
  return `${ s1.substr(0, 4) } ${ s1.substr(4, 6) }`
}
