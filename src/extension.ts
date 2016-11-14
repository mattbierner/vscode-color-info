// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as colorHelper from './color_helper'

import RgbDisplay from './displays/rgb_display'
import HslDisplay from './displays/hsl_display'


const displays = [
    RgbDisplay,
    HslDisplay
];


const getDisplay = (displays, match): string =>
    displays.map(x => x.display(match))
        .filter(x => x)
        .join('\n\n')


// this method is called when vs code is activated
export function activate(context: vscode.ExtensionContext) {

    const hoverSubscription = vscode.languages.registerHoverProvider('css', {
        provideHover(document, position, token) {
            const line = document.lineAt(position.line)
            const match = colorHelper.getColorAtPosition(position, line.text)
            if (match) {
                const display = getDisplay(displays, match);
                return new vscode.Hover({
                    language: 'markdown',
                    value: display
                });
            }
            console.log('noop')
            return null;
        }
    })

    context.subscriptions.push(hoverSubscription)
}
