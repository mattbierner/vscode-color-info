import * as vscode from 'vscode';

import { ColorExtractor } from './color_extractor';
import { ColorDisplay } from './color_info_display';
import { LanguagesConfiguration } from './configuration';
import ColorInfoHoverProvider from './hover_provider';

/**
 * Main extension activation.
 */
export function activate(context: vscode.ExtensionContext) {
    function reload() {
        for (const existing of providerRegistrations) {
            existing.dispose();
        }

        providerRegistrations = [];
        const workspaceConfig = vscode.workspace.getConfiguration('colorInfo');
        const display = new ColorDisplay(workspaceConfig);

        const languageConfig = LanguagesConfiguration.load(workspaceConfig);
        for (const lang of languageConfig.languages) {
            const hoverProvider = new ColorInfoHoverProvider(new ColorExtractor(lang.colorExtractors), display);
            const registration = vscode.languages.registerHoverProvider(lang.selector, hoverProvider);
            providerRegistrations.push(registration);
        }
    }

    let providerRegistrations: vscode.Disposable[] = [];
    context.subscriptions.push(new vscode.Disposable(() => {
        vscode.Disposable.from(...providerRegistrations).dispose();
        providerRegistrations = [];
    }));

    vscode.workspace.onDidChangeConfiguration(() => {
        reload();
    });
    reload();
}
