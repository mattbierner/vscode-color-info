import {ColorInfoDisplay} from '../color_info_display'
import {ColorMatch} from '../color_helper'
import {decimalPercent, func} from './display_helper'



/**
 * 
 */
export default new class RgbDisplay implements ColorInfoDisplay {
    name = 'alpha';

    display(match: ColorMatch) {
        const {a} = match.color.toRgb()
        return func('alpha', decimalPercent(a, 0))
    }
}