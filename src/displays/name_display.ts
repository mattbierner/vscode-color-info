import { ColorValueDisplay } from '../color_info_display'
import { ColorMatch } from '../color_extractor'

/**
 * Displays the name of a color.
 */
export default new class NameDisplay implements ColorValueDisplay {
    name = 'css-color-name';

    display(match: ColorMatch) {
        const name = match.color.toName()
        return name ? name : null;
    }
}