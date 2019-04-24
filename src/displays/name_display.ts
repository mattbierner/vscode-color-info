import { ColorMatch } from '../color_extractor';
import { ColorValueDisplay } from '../color_info_display';

/**
 * Displays the name of a color.
 */
export default new class NameDisplay implements ColorValueDisplay {
    public name = 'css-color-name';

    public display(match: ColorMatch) {
        const name = match.color.toName();
        return name ? name : null;
    }
}();
