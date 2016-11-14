import {ColorInfoDisplay} from '../color_info_display'
import {ColorMatch} from '../color_helper'
import {percent, table} from './display_helper'

/**
 * 
 */
export default new class RgbDisplay implements ColorInfoDisplay {
    name = 'hsl';

    display(match: ColorMatch) {
        const {h, s, l, a} = match.color.toHsl()
        return table(
            ['H', h],
            ['S', percent(s)],
            ['L', percent(l)]
        )
    }
}