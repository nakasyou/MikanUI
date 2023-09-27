export const camelToKabab = (str: string) => str.replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`)
export const kebabToCamel = (str: string) => str.replace(/-./g, x => x[1].toUpperCase())
