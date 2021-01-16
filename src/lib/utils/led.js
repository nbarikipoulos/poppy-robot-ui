'use strict'

const DEFAULT_ICON = { pack: 'fa', icon: 'lightbulb' }

export const LEDs = {
  OFF: { literal: 'off', icon: { pack: 'fas', icon: 'minus' }, type: 'off' },
  RED: { literal: 'red', icon: DEFAULT_ICON, type: 'is-red' },
  GREEN: { literal: 'green', icon: DEFAULT_ICON, type: 'is-green' },
  BLUE: { literal: 'blue', icon: DEFAULT_ICON, type: 'is-blue' },
  YELLOW: { literal: 'yellow', icon: DEFAULT_ICON, type: 'is-yellow' },
  CYAN: { literal: 'cyan', icon: DEFAULT_ICON, type: 'is-cyan' },
  PINK: { literal: 'pink', icon: DEFAULT_ICON, type: 'is-pink' },
  WHITE: { literal: 'white', icon: DEFAULT_ICON, type: 'is-white' }
}

export default LEDs
