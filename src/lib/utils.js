'use strict'

const P = require('poppy-robot-core')

const execute = async (
  poppy,
  command,
  motors,
  ...values
) => {
  const script = P.createScript(...motors)
  script[command](...values)
  return poppy.exec(script)
}

const query = async (
  poppy,
  motors = 'all',
  registers = ['present_position']
) => poppy.query(motors, registers)

export { query, execute }
