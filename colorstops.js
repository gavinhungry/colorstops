/*
 * colorstops - Mix colors against multiple color stops
 * https://github.com/gavinhungry/colorstops
 */

const tinycolor = require('tinycolor2');

class ColorStops {
  /**
   * Create a ColorStops instance
   *
   * @example
   *
   *   new ColorStops([
   *     { color: '#FF0000', value: 20 },
   *     { color: '#00FF00', value: 40 },
   *     { color: '#0000FF', value: 80 }
   *   ]);
   *
   * @param {Array.<Object>} stops
   * @return {AutoWorker}
   */
  constructor(stops) {
    this._stops = stops.sort((a, b) => a.value - b.value);
  }

  /**
   * Get a mixed tinycolor2 object for an input value against stops
   *
   * @private
   *
   * @param {Number} value
   * @return {tinycolor}
   */
  _getColor(value) {
    let first = this._stops.find((stop, i, stops) => {
      let next = stops[i + 1];
      return stop.value <= value && next ? value < next.value : true;
    });

    if (!first) {
      first = this._stops[0];
    }

    let i = this._stops.indexOf(first);
    let last = this._stops[i + 1];

    if (!last) {
      last = this._stops[this._stops.length - 1];
    }

    let ratio = first === last ? 1 :
      (value - first.value) / (last.value - first.value);

    return tinycolor.mix(first.color, last.color, ratio * 100);
  }

  /**
   * Get a mixed hex color string for an input value against stops
   *
   * @example
   *
   *   colorStops.hex(41);
   *
   * @returns
   *
   *   '#00F906'
   *
   * @param {Number} value
   * @return {String}
   */
  hex(value) {
    return this._getColor(value).toHexString().toUpperCase();
  }
}

module.exports = ColorStops;
