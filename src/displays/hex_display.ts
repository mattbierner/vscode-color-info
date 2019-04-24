import {ColorMatch} from '../color_extractor';
import {ColorValueDisplay} from '../color_info_display';
import {number} from './display_helper';

/**
 * Displays the hex value of the color.
 */
export default new class HexDisplay implements ColorValueDisplay {
    public name = 'hex';

    public display(match: ColorMatch) {
        const hex = match.color.toHexString();
        return number(hex, 0);
    }
}();
