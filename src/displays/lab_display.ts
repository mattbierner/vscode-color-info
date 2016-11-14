const convert = require('color-convert');

import {ColorInfoDisplay} from '../color_info_display'
import {ColorMatch} from '../color_extractor'
import {number, func} from './display_helper'

/**
 * Displays the LAB value of a color.
 */
export default new class LabDisplay implements ColorInfoDisplay {
    name = 'lab';

    display(match: ColorMatch) {
        const {h, s, l, a} = match.color.toHsl()
        const lab = convert.hsl.lab(h, s * 100, l * 100)
        return func('lab', number(lab[0], 5), number(lab[1], 5), number(lab[2], 5))
    }
}