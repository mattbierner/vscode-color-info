import {ColorInfoDisplay} from '../color_info_display'
import {ColorMatch} from '../color_helper'
import {table} from './display_helper'

/**
 * 
 */
export default new class RgbDisplay implements ColorInfoDisplay {
    name = 'rgb';

    display(match: ColorMatch) {
        const {r, g, b} = match.color.toRgb()
        return table(
            ['R', r],
            ['G', g],
            ['B', b]
        )
    }
}