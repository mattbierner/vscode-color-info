import {ColorMatch} from './color_helper'

/**
 * 
 */
export interface ColorInfoDisplay {
    name: string,

    display: (ColorMatch) => string
}