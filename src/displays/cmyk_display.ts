const convert = require('color-convert');

import { ColorMatch } from '../color_extractor';
import { ColorValueDisplay } from '../color_info_display';
import { func, percent } from './display_helper';

/**
 * Displays the CMYK value of a color.
 */
export default new class CmykDisplay implements ColorValueDisplay {
    public name = 'cmyk';

    public display(match: ColorMatch) {
        const { h, s, l } = match.color.toHsl();
        const [c, m, y, k] = convert.hsl.cmyk(h, s * 100, l * 100);
        return func('cmyk', percent(c, 5), percent(m, 5), percent(y, 5), percent(k, 5));
    }
}();
