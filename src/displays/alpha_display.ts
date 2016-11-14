import {ColorInfoDisplay} from '../color_info_display'
import {ColorMatch} from '../color_extractor'
import {decimalPercent, func} from './display_helper'

/**
 * Displays the alpha value
 */
export default new class AlphaDisplay implements ColorInfoDisplay {
    name = 'alpha';

    display(match: ColorMatch) {
        const {a} = match.color.toRgb()
        return func('alpha', decimalPercent(a, 0))
    }
}