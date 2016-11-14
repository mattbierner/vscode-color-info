import {ColorInfoDisplay} from '../color_info_display'
import {ColorMatch} from '../color_extractor'
import {number} from './display_helper'

/**
 * Displays the hex value of the color.
 */
export default new class HexDisplay implements ColorInfoDisplay {
    name = 'hex';

    display(match: ColorMatch) {
        const hex = match.color.toHexString()
        return number(hex, 0)
    }
}