/*
 * colorstops - Mix colors against multiple color stops
 * https://github.com/gavinhungry/colorstops
 */

const ColorStops = require('../colorstops');
const test = require('tape');

test('constructor', t => {
  let colorStops = new ColorStops([
    { color: 'blue', value: 50 },
    { color: 'red', value: 20 },
    { color: 'green', value: 35 }
  ]);

  t.equals(colorStops instanceof ColorStops, true, 'constructor returns instance of class');
  t.deepEqual(colorStops._stops.map(stop => stop.color), ['red', 'green', 'blue'], 'stops are sorted by value');

  t.end();
});

test('hex with integer stop values', t => {
  let colorStops = new ColorStops([
    { color: '#FF0000', value: 20 },
    { color: '#00FF00', value: 40 },
    { color: '#0000FF', value: 80 }
  ]);

  t.equals(colorStops.hex(-200), '#FF0000', 'value below first stop returns first color');
  t.equals(colorStops.hex(20), '#FF0000', 'value equal to stop returns exact color');
  t.equals(colorStops.hex(33), '#59A600', 'value between two stops returns mixed color');
  t.equals(colorStops.hex(300), '#0000FF', 'value above first stop returns last color');

  t.end();
});

test('hex with decimal/ratio stop values', t => {
  let colorStops = new ColorStops([
    { color: '#000002', value: 0.1 },
    { color: '#030004', value: 0.35 },
    { color: '#006006', value: 0.5 },
    { color: '#000908', value: 0.9 },
    { color: '#0000CA', value: 2.2 }
  ]);

  t.equals(colorStops.hex(-20), '#000002', 'value below first stop returns first color');
  t.equals(colorStops.hex(0.35), '#030004', 'value equal to stop returns exact color');
  t.equals(colorStops.hex(0.75), '#002A07', 'value between two stops returns mixed color');
  t.equals(colorStops.hex(30), '#0000CA', 'value above first stop returns last color');

  t.end();
});

test('hex with mixed sign stop values', t => {
  let colorStops = new ColorStops([
    { color: '#0A0B0C', value: -5 },
    { color: '#0C0B0A', value: -2 },
    { color: '#123000', value: 3 },
    { color: '#00089A', value: 9 }
  ]);

  t.equals(colorStops.hex(-10), '#0A0B0C', 'value below first stop returns first color');
  t.equals(colorStops.hex(-2), '#0C0B0A', 'value equal to stop returns exact color');
  t.equals(colorStops.hex(-3), '#0B0B0B', 'value between two negative stop values returns mixed color');
  t.equals(colorStops.hex(1), '#102104', 'value between two mixed stop values returns mixed color');
  t.equals(colorStops.hex(15), '#00089A', 'value above first stop returns last color');

  t.end();
});
