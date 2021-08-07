// Functions found on the web
export const withCommas = number =>
  number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")

export const cumulativeSum = arr => arr.map((sum => value => sum += value)(0))



// Functions I created
export const keysToCamelCase = data => {
  let result = {}

  Object.keys(data).map(key => {
    const arrayValues = key.split('_')
    const upperValues = arrayValues.splice(1).map(
      word => word[0].toUpperCase() + word.substr(1)
    )

    const newKey = [arrayValues[0], ...upperValues].join('')
    const value = data[key]

    if (typeof value === 'object') {
      result[newKey] = keysToCamelCase(value)
    } else {
      result[newKey] = value
    }
  })

  return result
}

export const getYears = (start, end, result = []) => {
  if (start == end) {
    return result.concat(end)
  }

  return getYears(start + 1, end, result.concat(start))
}

export const toPctChange = arr =>
  arr.map((val, idx) => {
    if (idx === 0) {
      return 0
    }
    return ((val / arr[idx-1]) - 1) * 100
  })


export const sortBy = (value, arr, direction = 'asc') =>
  arr.sort((a, b) => 
    direction === 'desc'
      ? a[value] > b[value] ? 1 : -1
      : a[value] > b[value] ? -1 : 1
  )

export const toSlug = str =>
  str.split(' ').map(val => val.toLowerCase()).join('-')

export const getUrlParams = () => 
  Object.fromEntries(
    new URLSearchParams(window.location.search).entries()
  )

export const pluralize = (num, str) =>
  num === 1 ? `${num} ${str}` : `${num} ${str}s`

export const getUserName = (position, obj) => 
  obj[`${position}Name (from userId)`];

export const isEmpty = item => {
  return !item
    ? true 
    : {
      object: Object.keys(item).length === 0,
      array: item.length < 1,
      string: item.length < 1,
    }[typeof item]
}

export const cipher = salt => {
  const textToChars = text => text.split('').map(c => c.charCodeAt(0));
  const byteHex = n => ("0" + Number(n).toString(16)).substr(-2);
  const applySaltToChar = code => textToChars(salt).reduce((a,b) => a ^ b, code);

  return text => text.split('')
      .map(textToChars)
      .map(applySaltToChar)
      .map(byteHex)
      .join('');
}

export const decipher = salt => {
  const textToChars = text => text.split('').map(c => c.charCodeAt(0));
  const applySaltToChar = code => textToChars(salt).reduce((a,b) => a ^ b, code);
  return encoded => encoded.match(/.{1,2}/g)
      .map(hex => parseInt(hex, 16))
      .map(applySaltToChar)
      .map(charCode => String.fromCharCode(charCode))
      .join('');
}