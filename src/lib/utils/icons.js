'use strict'

import T from '@/lib/utils/tBranding'

const icons = {
  compliant: [
    { value: true, icon: 'bed', pack: 'fas' },
    { value: false, icon: 'bolt', pack: 'fas' }
  ],
  led: (value, old) => ({
    pack: value === 'off' ? 'fas' : 'fa',
    icon: value === 'off' ? 'minus' : 'sun',
    type: value === 'off' ? 'is-white' : `is-${value}`
  }),
  temperature: (value, old) => {
    const t = T(value)
    return { ...t.icon, type: `is-${t.color}` }
  }
}

export default icons
