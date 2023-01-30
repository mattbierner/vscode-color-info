import * as tinycolor from 'tinycolor2';
import * as vscode from 'vscode';

/**
 * A found color value in some text
 */
export interface ColorMatch {
    value: string;
    color: tinycolor.Instance;
    span: vscode.Range;
}

export type ColorValueExtractorType = 'hex' | 'hex+alpha' | 'rgb' | 'hsl' | 'css-color-names';

/**
 * Extracts colors from lines of text.
 */
interface ColorValueExtractor {
    type: ColorValueExtractorType;
    getColors(input: string, position: vscode.Position): ColorMatch[];
}

/**
 * Extract all matches for a given regular expression on a line
 */
const getRegExForLine = (re: RegExp, line: string, lineNumber: number): ColorMatch[] => {
    const matches: ColorMatch[] = [];
    let match: RegExpExecArray | null;
    while ((match = re.exec(line))) {
        const color = tinycolor(match[1]);
        if (color && color.isValid()) {
            const span = new vscode.Range(
                new vscode.Position(lineNumber, match.index),
                new vscode.Position(lineNumber, match.index + match[0].length));

            matches.push({
                value: match[0],
                color,
                span,
            });
        }
    }
    return matches;
};

/**
 * Get all `rgb(...)` colors in a line of text.
 */
const rgbExtractor: ColorValueExtractor = {
    type: 'rgb',
    getColors(line: string, position: vscode.Position) {
        return getRegExForLine(/(?:\b|^)(rgba?\(.+?\))/g, line, position.line);
    },
};

/**
 * Get all `hsl(...)` colors in a line of text.
 */
const hslExtractor: ColorValueExtractor = {
    type: 'hsl',
    getColors(line: string, position: vscode.Position) {
        return getRegExForLine(/(?:\b|^)(hsla?\(.+?\))/g, line, position.line);
    },
};

/**
 * Get all hex colors in a line of text.
 */
const hexExtractor: ColorValueExtractor = {
    type: 'hex',
    getColors(line: string, position: vscode.Position) {
        return getRegExForLine(/(?:^|\s|\W)(#(?:[0-9a-fA-F]{3}){1,2})(\b|$)/g, line, position.line);
    },
};

/**
 * Get all hex colors with alpha in a line of text.
 */
const hexaExtractor: ColorValueExtractor = {
    type: 'hex+alpha',
    getColors(line: string, position: vscode.Position) {
        return getRegExForLine(/(?:^|\s|\W)(#(?:[0-9a-fA-F]{4}){1,2})(\b|$)/g, line, position.line);
    },
};

/**
 * Get all numeric hex colors in a line of text.
 */
const numHexExtractor: ColorValueExtractor = {
    type: 'numhex',
    getColors(line: string, position: vscode.Position) {
        return getRegExForLine(/(?:^|\s|\W)(0x(?:[0-9a-fA-F]{3}){1,2})(\b|$)/g, line, position.line);
    },
};

/**
 * Get all numeric hex colors with alpha in a line of text.
 */
const numHexaExtractor: ColorValueExtractor = {
    type: 'numhex+alpha',
    getColors(line: string, position: vscode.Position) {
        return getRegExForLine(/(?:^|\s|\W)(0x(?:[0-9a-fA-F]{4}){1,2})(\b|$)/g, line, position.line);
    },
};

/**
 * Extracts named css colors
 */
const cssNameExtractor: ColorValueExtractor = {
    type: 'css-color-names',
    getColors(line: string, position: vscode.Position) {
        const colorNameCharacter = /[a-z]/i;
        let right = '';
        for (let i = position.character; i < line.length; ++i) {
            const char = line[i];
            if (!char.match(colorNameCharacter)) {
                break;
            }
            right += char;
        }

        let left = '';
        let leftHead = position.character - 1;
        for (; leftHead >= 0; --leftHead) {
            const char = line[leftHead];
            if (!char.match(colorNameCharacter)) {
                break;
            }
            left = char + left;
        }

        // Make sure not to grab potential hex strings
        if (leftHead > 0 && line[leftHead] === '#') {
            return [];
        }

        leftHead = Math.max(leftHead, 0);

        const word = left + right;
        const color = tinycolor(word);
        if (color && color.isValid()) {
            const span = new vscode.Range(
                new vscode.Position(position.line, leftHead),
                new vscode.Position(position.line, leftHead + word.length));

            return [{
                value: word,
                color,
                span,
            }];
        }
        return [];
    },
};

interface ExtractorRegistry {
    [kind: string]: ColorValueExtractor;
}

const valueExtractorRegistry = [
    rgbExtractor,
    hslExtractor,
    hexExtractor,
    hexaExtractor,
    cssNameExtractor,
    numHexExtractor,
    numHexaExtractor
].reduce((registry, extractor) => {
    registry[extractor.type] = extractor;
    return registry;
}, {} as ExtractorRegistry);

/**
 * Extracts color values from text
 */
export class ColorExtractor {
    private _valueExtractors: Set<ColorValueExtractor>;

    constructor(valueExtractorTypes: Set<ColorValueExtractorType>) {
        this._valueExtractors = new Set();
        for (const t of valueExtractorTypes) {
            const extractor = valueExtractorRegistry[t];
            if (extractor) {
                this._valueExtractors.add(extractor);
            }
        }
    }

    public getColorAtPosition(line: string, position: vscode.Position): ColorMatch | undefined {
        const allColors = this.getColorsForLine(position, line)
            .filter((x) => x.span.contains(position));
        return allColors[0];
    }

    /**
     * Get all color values in a line of text.
     */
    private getColorsForLine(position: vscode.Position, line: string): ColorMatch[] {
        const matches: ColorMatch[] = [];
        for (const valueExtractor of this._valueExtractors) {
            matches.push(...valueExtractor.getColors(line, position));
        }
        return matches;
    }
}
