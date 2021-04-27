
import { hsl } from 'color-convert';
import { ColorMatch } from '../color_extractor';
import { ColorValueDisplay } from '../color_info_display';
import { func, number } from './display_helper';

/**
 * Displays the LAB value of a color.
 */
export default new class LabDisplay implements ColorValueDisplay {
    public name = 'lab';

    public display(match: ColorMatch) {
        const { h, s, l } = match.color.toHsl();
        const lab = hsl.lab.raw([h, s * 100, l * 100]);
        return func('lab', number(lab[0].toFixed(2), 5), number(lab[1].toFixed(2), 5), number(lab[2].toFixed(2), 5));
    }
}();
