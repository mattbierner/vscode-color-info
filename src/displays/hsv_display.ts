import {ColorValueDisplay} from '../color_info_display'
import {ColorMatch} from '../color_extractor'
import {deg, decimalPercent, func} from './display_helper'

/**
 * Displays the HSV value of a color.
 */
export default new class HsvDisplay implements ColorValueDisplay {
    name = 'hsv';

    display(match: ColorMatch) {
        const {h, s, v, a} = match.color.toHsv()
        return func('hsv', deg(h, 5), decimalPercent(s, 5), decimalPercent(v, 5))
    }
}