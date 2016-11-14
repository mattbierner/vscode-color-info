/**
 * 
 */
export const percent = (val: number): string =>
    +(val * 100).toFixed(2) + '%'

/**
 * 
 */
export const table = (...keys: Array<Array<string>>): string => 
    keys.map(pair => pair[0] + ':' + pair[1])
        .join(' ')