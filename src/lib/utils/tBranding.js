'use strict'

const factory = (value) => new T(value)

class T {
  constructor (value) {
    this._literal = this._getLiteral(value)

    this._data = T_DATA._DATA.find(d => d.literal === this._literal)
  }

  get level () { return this._literal }

  get color () { return this._data.color }

  get icon () { return this._data.icon }

  _getLiteral (value) {
    let result
    if (value < 50) {
      result = T_DATA.OK
    } else if (value < 55) {
      result = T_DATA.HOT
    } else {
      result = T_DATA.ARDENT
    }
    return result
  }
}

const T_DATA = {
  OK: 'ok',
  HOT: 'hot',
  ARDENT: 'ardent',
  _DATA: [{
    literal: 'ok',
    color: 'success',
    icon: { pack: 'fas', icon: 'thermometer-quarter' }
  }, {
    literal: 'hot',
    color: 'warning',
    icon: { pack: 'fas', icon: 'thermometer-three-quarters' }
  }, {
    literal: 'ardent',
    color: 'danger',
    icon: { pack: 'fas', icon: 'thermometer-full' }
  }]
}

export default factory
