export const clamp = (val: number, min: number, max: number): number =>
    Math.min(max, Math.max(min, val));

export const pad = (val: string, count: number): string =>
    ('' + val).padStart(count, '\u00A0');

export const number = (val: string, padding: number) =>
    '`\u200B' + pad(val, padding + 2) + '`';

export const unit = (unit: string, val: number, padding: number): string =>
    number(val + unit, padding);

export const percent = (val: number, padding: number): string =>
    unit('%', +(val).toFixed(2), padding);

export const decimalPercent = (val: number, padding: number): string =>
    percent(val * 100, padding);

export const deg = (val: number, padding: number): string =>
    unit('\u00B0', +(val).toFixed(2), padding);

export const func = (name: string, ...keys: string[]): string =>
    `**${name}(**${keys.join(', ')}**)**`;
