// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import colorInfoHoverProvider from './color_info_hover_provider'

/**
 * Languages that support the color info hover provider
 */
const supportedLanguages = ['css', 'scss', 'sass', 'less']

/**
 * Main extension activation.
 */
export function activate(context: vscode.ExtensionContext) {
    supportedLanguages.forEach(lang =>
        context.subscriptions.push(vscode.languages.registerHoverProvider(lang, colorInfoHoverProvider)))
}
