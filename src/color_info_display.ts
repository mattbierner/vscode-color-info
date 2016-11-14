import {ColorMatch} from './color_extractor'

/**
 * 
 */
export interface ColorInfoDisplay {
    name: string,

    display: (ColorMatch) => string
}