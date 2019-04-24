import { ColorMatch } from '../color_extractor';
import { ColorValueDisplay } from '../color_info_display';
import { decimalPercent, deg, func } from './display_helper';

/**
 * Displays the HSV value of a color.
 */
export default new class HsvDisplay implements ColorValueDisplay {
    public name = 'hsv';

    public display(match: ColorMatch) {
        const { h, s, v } = match.color.toHsv();
        return func('hsv', deg(h, 5), decimalPercent(s, 5), decimalPercent(v, 5));
    }
}();
