import { hsl } from 'color-convert';
import { ColorMatch } from '../color_extractor';
import { ColorValueDisplay } from '../color_info_display';
import { func, number, deg} from './display_helper';

/**
 * Displays the LCHab value of a color.
 */
export default new class LchDisplay implements ColorValueDisplay {
    public name = 'lch';

    public display(match: ColorMatch) {
        const { h, s, l } = match.color.toHsl();
        const lch = hsl.lch.raw([h, s * 100, l * 100]);
        return func('lch', number(lch[0].toFixed(2), 5), number(lch[1].toFixed(2), 5), deg(lch[2], 5));
    }
}();
