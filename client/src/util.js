/**
 * **inspect** logs the value to stdout and
 * returns it. It is useful to see the values
 * returned in promise chains, for example.
 *
 * @param {T} value The value to inspect
 * @returns {T} The given value
 * @template T
 */
export const inspect = value => {
  console.log(value)
  return value
}

/**
 * **inspectErr** logs to stderr the given value
 * and then throws it.
 *
 * @param {any} value The value to inspect
 * @returns {never} The function throws the value
 */
export const inspectErr = value => {
  console.error(value)
  throw value
}

/**
 * **delay** returns a promise that resolves after *time* milliseconds
 *
 * @param {number} time Milliseconds taken to resolve the promise
 * @returns {Promise<void>}
 */
export const delay = time => new Promise(resolve => setTimeout(resolve, time))

/**
 * **err** creates a promise that is resolved or rejected after a random
 * duration in interval [minTime, maxTime), with a rejection chance
 * as specified in the parameters.
 *
 * @param {number} minTime The least amount of time taken to resolve or reject the promise
 * @param {number} maxTime The most amount of time
 * @param {number} chance The chance to reject the promise ((0, 1])
 * @returns {Promise<void>}
 */
export const err = (minTime, maxTime, chance) =>
  new Promise((resolve, reject) =>
    setTimeout(() => {
      if (Math.random() < chance) {
        reject()
      } else {
        resolve()
      }
    }, minTime + Math.random() * (maxTime - minTime))
  )
