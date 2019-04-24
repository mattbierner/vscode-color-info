import { ColorMatch } from '../color_extractor';
import { ColorValueDisplay } from '../color_info_display';
import { decimalPercent, func } from './display_helper';

/**
 * Displays the alpha value
 */
export default new class AlphaDisplay implements ColorValueDisplay {
    public name = 'alpha';

    public display(match: ColorMatch) {
        const { a } = match.color.toRgb();
        return func('alpha', decimalPercent(a, 0));
    }
}();
