import * as vscode from 'vscode';
const tinycolor = require("tinycolor2");

/**
 * A found color value in some text
 */
export interface ColorMatch {
    value: string,
    color: any,
    span: vscode.Range
}

/**
 * Extract all matches for a given regular expression on a line
 */
const getRegExForLine = (re: RegExp, lineNumber: number, line: string): ColorMatch[] => {
    const matches: ColorMatch[] = []
    let match: RegExpExecArray;
    while ((match = re.exec(line))) {
        const color = tinycolor(match[0])
        if (color && color.isValid()) {
            const span = new vscode.Range(
                new vscode.Position(lineNumber, match.index),
                new vscode.Position(lineNumber, match.index + match[0].length))

            matches.push({
                value: match[0],
                color: color,
                span: span
            })
        }
    }
    return matches
}

/**
 * Get all `rgb(...)` colors in a line of text.
 */
const getRgbColorForLine = (lineNumber: number, line: string) =>
    getRegExForLine(/rgba?\(.+?\)/g, lineNumber, line)

/**
 * Get all `hsl(...)` colors in a line of text.
 */
const getHslColorsForLine = (lineNumber: number, line: string) =>
    getRegExForLine(/hsla?\(.+?\)/g, lineNumber, line)

/**
 * Get all color values in a line of text.
 */
const getColorsForLine = (position: vscode.Position, line: string): ColorMatch[] =>
    [].concat(
        getRgbColorForLine(position.line, line),
        getHslColorsForLine(position.line, line)
    )

/**
 * Get the color at `position` in a line of text
 */
export const getColorAtPosition = (position: vscode.Position, line: string): ColorMatch => {
    const allColors = getColorsForLine(position, line)
        .filter(x => x.span.contains(position))
    return allColors[0]
}