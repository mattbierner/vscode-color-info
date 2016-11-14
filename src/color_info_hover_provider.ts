import * as vscode from 'vscode';

import {getColorAtPosition} from './color_extractor'

import {ColorInfoDisplay} from './color_info_display'
import RgbDisplay from './displays/rgb_display'
import HslDisplay from './displays/hsl_display'
import HsvDisplay from './displays/hsv_display'
import CmykDisplay from './displays/cmyk_display'
import LabDisplay from './displays/lab_display'
import AlphaDisplay from './displays/alpha_display'
import HexDisplay from './displays/hex_display'

const allFields = [
    RgbDisplay,
    HslDisplay,
    HsvDisplay,
    CmykDisplay,
    LabDisplay,
    AlphaDisplay,
    HexDisplay
].reduce((p, display) => {
    p[display.name] = display;
    return p
}, {});

const defaultFields = [
    RgbDisplay.name,
    HslDisplay.name,
    CmykDisplay.name,
    HexDisplay.name,
    AlphaDisplay.name
]

/**
 * Normalize the name of a color field
 */
const normalizeFieldName = name =>
    ('' + name).toLowerCase()

/**
 * 
 */
const getDisplays = (): ColorInfoDisplay[] => {
    let fields = (vscode.workspace.getConfiguration('colorInfo').get<Array<string>>('fields') || defaultFields).map(normalizeFieldName)
    const excluded = (vscode.workspace.getConfiguration('colorInfo').get<Array<string>>('excludedFields') || []).map(normalizeFieldName)

    fields = fields.filter(name => excluded.indexOf(name) === -1)

    return fields
        .map(x => allFields[x])
        .filter(x => x)
}
 
const getDisplay = (match): string =>
    getDisplays().map(x => x.display(match))
        .filter(x => x && x.length > 0)
        .join('\n\n')

/**
 * Color info hover provider
 */
export default {
    provideHover(document, position, token) {
        const line = document.lineAt(position.line)
        const match = getColorAtPosition(position, line.text)
        if (match) {
            const display = getDisplay(match)
            if (display && display.length)
                return new vscode.Hover(display)
        }
        return null
    }
}
