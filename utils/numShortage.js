export const getShortagedNumber = (num) => {
    if (num < 1000) {
        return `${num}`
    } else if (num < 1000000) {
        return `${Math.ceil(num / 1000)}k`
    } else if (num < 1000000000) {
        return `${Math.ceil(num / 1000000)}k`
    }
}

export const getDuration = (num) => {
  const seconds = num % 60
  num = (num - (num % 60)) / 60
  const minutes = num % 60
  num = (num - (num % 60)) / 60
  const hours = num % 60
  let result
  if (seconds < 10) {
    result = `0${seconds}`
  } else {
    result = `${seconds}`
  }
  if (minutes === 0) {
    result = '00:' + result 
  } else if (minutes < 10) {
    result = `0${minutes}:` + result
  } else if (minutes > 9) {
    result = `${minutes}:` + result
  }
  if (hours === 0) { 
    return result
  } else if (hours < 10) {
    return `0${hours}:` + result
  } else if (hours > 9) {
    return `${hours}:` + result
  }
}
