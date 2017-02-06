export const intersperse = (list, separator) => {
  if (list.length === 0) {
    return []
  }

  return list.slice(1).reduce((items, item, i) => {
    return items.concat([separator, item])
  }, [list[0]])
}

// From react-redux
// https://github.com/reactjs/react-redux/blob/dab9c85b4b6480f9962688c3ba9ec426508d2879/src/utils/shallowEqual.js

const hasOwn = Object.prototype.hasOwnProperty
export function shallowEqual (a, b) {
  if (a === b) return true

  let countA = 0
  let countB = 0

  for (let key in a) {
    if (hasOwn.call(a, key) && a[key] !== b[key]) return false
    countA++
  }

  for (let key in b) {
    if (hasOwn.call(b, key)) countB++
  }

  return countA === countB
}
