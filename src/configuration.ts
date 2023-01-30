import * as vscode from 'vscode';

import { ColorValueExtractorType } from './color_extractor';

interface UserLanguageConfiguration {
    selector: string | Record<string, unknown>;
    colors: string | string[];
}

class LanguageConfiguration {
    public static fromUser(user: UserLanguageConfiguration): LanguageConfiguration {
        const types: Set<ColorValueExtractorType> = new Set();
        const userColors = Array.isArray(user.colors) ? user.colors : [user.colors];
        for (const t of userColors.map((x) => ('' + x).toLowerCase())) {
            switch (t) {
                case 'css':
                    types.add('rgb');
                    types.add('hsl');
                    types.add('hex');
                    types.add('hex+alpha');
                    types.add('css-color-names');
                    break;
                case 'rgb':
                case 'hsl':
                case 'hex':
                case 'hex+alpha':
                case 'css-color-names':
                case 'numhex':
                case 'numhex+alpha':
                    types.add(t);
                    break;
            }
        }
        const selector: vscode.DocumentSelector = typeof user.selector === 'string'
            ? [{ language: user.selector }]
            : user.selector;
        return new LanguageConfiguration(selector, types);
    }

    private constructor(
        public readonly selector: vscode.DocumentSelector,
        public readonly colorExtractors: Set<ColorValueExtractorType>,
    ) { }
}

/**
 * Configures
 */
export class LanguagesConfiguration {
    public static load(config: vscode.WorkspaceConfiguration): LanguagesConfiguration {
        const user = config.get<UserLanguageConfiguration[]>('languages') || [];
        const lang = new LanguagesConfiguration(
            user.map((x) => LanguageConfiguration.fromUser(x)).filter((x) => x !== null));
        return lang;
    }

    public languages: LanguageConfiguration[];

    private constructor(languages: LanguageConfiguration[]) {
        this.languages = languages;
    }
}
