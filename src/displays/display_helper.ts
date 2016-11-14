const padImpl = require('pad')


/**
 * 
 */
export const clamp = (val: number, min: number, max: number): number =>
    Math.min(max, Math.max(min, val))

/**
 * 
 */
export const pad = (val: number, count: number): string =>
    padImpl(count, '' + val, '\u00A0')

/**
 * 
 */
export const number = (val, padding: number)  => 
    '`\u200B' + pad(val, padding + 2) + '`' 

/**
 * 
 */
export const unit = (unit: string, val: number, padding: number): string =>
    number(val + unit, padding)

/**
 * 
 */
export const percent = (val: number, padding: number): string =>
    unit('%', +(val).toFixed(2), padding)

/**
 * 
 */
export const decimalPercent = (val: number, padding: number): string =>
    percent(val * 100, padding)

/**
 * 
 */
export const deg = (val: number, padding: number): string =>
    unit('\u00B0', +(val).toFixed(2), padding)

/**
 * 
 */
export const func = (name: string, ...keys: Array<string>): string => 
    `**${name}(**${keys.join(', ')}**)**`
