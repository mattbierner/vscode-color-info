import { ColorValueDisplay } from '../color_info_display'
import { ColorMatch } from '../color_extractor'
import { deg, decimalPercent, func } from './display_helper'

/**
 * Displays the HSL value of a color.
 */
export default new class HslDisplay implements ColorValueDisplay {
    name = 'hsl';

    display(match: ColorMatch) {
        const { h, s, l } = match.color.toHsl()
        return func('hsl', deg(h, 5), decimalPercent(s, 5), decimalPercent(l, 5))
    }
}