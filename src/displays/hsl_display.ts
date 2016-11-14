import {ColorInfoDisplay} from '../color_info_display'
import {ColorMatch} from '../color_helper'
import {deg, decimalPercent, func} from './display_helper'

/**
 * Color display provider for HSL color
 */
export default new class HslDisplay implements ColorInfoDisplay {
    name = 'hsl';

    display(match: ColorMatch) {
        const {h, s, l, a} = match.color.toHsl()
        return func('hsl', deg(h, 5), decimalPercent(s, 5), decimalPercent(l, 5))
    }
}