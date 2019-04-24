import * as vscode from 'vscode';

import { ColorExtractor } from './color_extractor'
import { ColorDisplay } from './color_info_display'

/**
 * Color info hover provider
 */
export default class ColorInfoHoverProvider implements vscode.HoverProvider {
    private _extractor: ColorExtractor
    private _display: ColorDisplay

    constructor(extractor: ColorExtractor, display: ColorDisplay) {
        this._extractor = extractor
        this._display = display
    }

    provideHover(document: vscode.TextDocument, position: vscode.Position, _token: vscode.CancellationToken): vscode.Hover | null {
        const line = document.lineAt(position.line)
        const match = this._extractor.getColorAtPosition(line.text, position)
        if (match) {
            const display = this._display.display(match)
            if (display)
                return new vscode.Hover(display)
        }
        return null
    }
}
