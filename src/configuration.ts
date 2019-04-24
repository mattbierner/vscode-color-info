import * as vscode from 'vscode';

import { ColorValueExtractorType } from './color_extractor';

interface UserLanguageConfiguration {
    selector: string | {};
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
                    types.add(t);
                    break;
            }
        }
        return new LanguageConfiguration(user.selector, types);
    }

    public selector: string | {};
    public colorExtractors: Set<ColorValueExtractorType>;

    private constructor(selector: string | {}, colorExtractors: Set<ColorValueExtractorType>) {
        this.selector = selector;
        this.colorExtractors = colorExtractors;
    }
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
