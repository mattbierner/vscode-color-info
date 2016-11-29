# VSCode Color Info

[Visual Studio Code](https://code.visualstudio.com) extension that provides quick information about css colors.

![fields](media/starter-example.png)


## About
*Color Info* adds additional information when you hover over a css color, including:

* `rgb` – RGB color values. Enabled by default
* `hsl` – HSL color values. Enabled by default
* `hsv` – HSV color values
* `lab` – LAB color values
* `cmyk` – CMYK color values. Enabled by default
* `hex` – Hex value. Enabled by default
* `alpha` – Alpha value. Enabled by default
* `preview` – Preview of the color. Displays color with alpha in lower left coner and color without alpha in upper right corner. Enabled by default
* `preview-xl` – Larger preview of the color
* `preview-square-xl` – Square preview of the color
* `preview-square-xl` – Larger square preview of the color

You can customize which of these fields are displayed and the order they are displayed in using the settings described below.

The extension works with any css, sass, or less document and recognizes all basic css color formats, including named colors.


## Configuration

#### `colorInfo.fields`
Ordered array of color fields to display.

![fields](media/fields.png)


#### `colorInfo.excludedFields`
Array of fields not to display. Overrides `colorInfo.fields`. If you only need to exclude one or two of the default fields, using `colorInfo.excludedFields` is the preferred approach.

![excluded fields](media/excluded.png)
