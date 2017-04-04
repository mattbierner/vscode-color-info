const convert = require('color-convert');

import { ColorValueDisplay } from '../color_info_display'
import { ColorMatch } from '../color_extractor'
import { deg, percent, func } from './display_helper'

/**
 * Displays the CMYK value of a color.
 */
export default new class CmykDisplay implements ColorValueDisplay {
    name = 'cmyk';

    display(match: ColorMatch) {
        const { h, s, l, a } = match.color.toHsl()
        const [c, m, y, k] = convert.hsl.cmyk(h, s * 100, l * 100)
        return func('cmyk', percent(c, 5), percent(m, 5), percent(y, 5), percent(k, 5))
    }
}  