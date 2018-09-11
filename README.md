colorstops
==========
Mix colors against multiple color stops.

Installation
------------

### ES6 Module

```js
import ColorStops from 'colorstops';
```

### Browserify

```sh
$ browserify colorstops.js --standalone ColorStops -o colorstops-browser.js
```

Usage
-----

### Constructor

```js
let colorStops = new ColorStops([
   { color: '#FF0000', value: 20 },
   { color: '#00FF00', value: 40 },
   { color: '#0000FF', value: 80 }
]);
```

### hex

Get a mixed hex color string for an input value against the defined color stops.

```js
colorStops.hex(-200); // '#FF0000'
colorStops.hex(20);   // '#FF0000'
colorStops.hex(30);   // '#808000'
colorStops.hex(40);   // '#00FF00'
colorStops.hex(41);   // '#00F906'
colorStops.hex(79);   // '#0006F9'
colorStops.hex(200);  // '#0000FF'
```

License
-------
This software is released under the terms of the **MIT license**. See `LICENSE`.
