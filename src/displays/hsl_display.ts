import { ColorMatch } from '../color_extractor';
import { ColorValueDisplay } from '../color_info_display';
import { decimalPercent, deg, func } from './display_helper';

/**
 * Displays the HSL value of a color.
 */
export default new class HslDisplay implements ColorValueDisplay {
    public name = 'hsl';

    public display(match: ColorMatch) {
        const { h, s, l } = match.color.toHsl();
        return func('hsl', deg(h, 5), decimalPercent(s, 5), decimalPercent(l, 5));
    }
}();
