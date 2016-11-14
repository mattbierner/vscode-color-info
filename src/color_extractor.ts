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
 * Get all hex colors in a line of text.
 */
const getHexColorsForLine = (lineNumber: number, line: string) =>
    getRegExForLine(/#(?:[0-9a-fA-F]{3}){1,2}/g, lineNumber, line)

/**
 * 
 */
const getNamedColorAtPosition = (position: vscode.Position, line: string): ColorMatch[] => {
    let right = ''
    for (let i = position.character; i < line.length; ++i) {
        const char = line[i]
        if (!char.match(/\w/))
            break
        right += char
    }

    let left = ''
    let leftHead = position.character - 1;
    for (; leftHead >= 0; --leftHead) {
        const char = line[leftHead]
        if (!char.match(/\w/))
            break
        left = char + left
    }
    leftHead = Math.max(leftHead, 0)

    const word = left + right;
    const color = tinycolor(word)
    if (color && color.isValid()) {
        const span = new vscode.Range(
            new vscode.Position(position.line, leftHead),
            new vscode.Position(position.line, leftHead + word.length))

        return [{
            value: word,
            color: color,
            span: span
        }]
    }
    return []
}

/**
 * Get all color values in a line of text.
 */
const getColorsForLine = (position: vscode.Position, line: string): ColorMatch[] =>
    [].concat(
        getRgbColorForLine(position.line, line),
        getHslColorsForLine(position.line, line),
        getHexColorsForLine(position.line, line),
        getNamedColorAtPosition(position, line)
    )

/**
 * Get the color at `position` in a line of text
 */
export const getColorAtPosition = (position: vscode.Position, line: string): ColorMatch => {
    const allColors = getColorsForLine(position, line)
        .filter(x => x.span.contains(position))
    return allColors[0]
}