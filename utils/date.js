const getShortMonth = (date) => {
    const monthNumber = date.getMonth();
    switch(monthNumber) {
        case 0:
            return 'Jan'
        case 1:
            return 'Feb'
        case 2:
            return 'Mar'
        case 3:
            return 'Apr'
        case 4:
            return 'May'
        case 5:
            return 'June'
        case 6:
            return 'Jule'
        case 7:
            return 'Aug'
        case 8:
            return 'Sep'
        case 9:
            return 'Oct'
        case 10:
            return 'Nov'
        case 11:
            return 'Dec' 
    }
}

const getMonthByNumber = (num) => {
  switch(num) {
    case 1:
      return 'January'
    case 2:
      return 'February'
    case 3:
      return 'March'
    case 4:
      return 'April'
    case 5:
      return 'May'
    case 6:
      return 'June'
    case 7:
      return 'Jule'
    case 8:
      return 'August'
    case 9:
      return 'September'
    case 10:
      return 'October'
    case 11:
      return 'November'
    case 12:
      return 'December' 
    }
}

const getFullMonth = (date) => {
    const monthNumber = date.getMonth();
    switch(monthNumber) {
        case 0:
            return 'January'
        case 1:
            return 'February'
        case 2:
            return 'March'
        case 3:
            return 'April'
        case 4:
            return 'May'
        case 5:
            return 'June'
        case 6:
            return 'Jule'
        case 7:
            return 'August'
        case 8:
            return 'September'
        case 9:
            return 'October'
        case 10:
            return 'November'
        case 11:
            return 'December' 
    }
}

const getMinutes = (date) => {
    const minutes = date.getMinutes();
    if (minutes < 10) {
        return '0' + minutes;
    } else {
        return minutes
    }
}
//TODO: make 'posted 3 hours ago' etc.
export const getTimeDate = (unixTime) => {
    const date = new Date(unixTime * 1000);
    const todayDate = new Date();
    if (date.getFullYear() === todayDate.getFullYear() && date.getMonth() === todayDate.getMonth() && date.getDate() === todayDate.getDate()) {
        return `today at ${date.getHours()}:${getMinutes(date)}`
    } else if (date.getFullYear() === todayDate.getFullYear()) {
        if (date.getMonth() === todayDate.getMonth() && date.getDate() === todayDate.getDate() - 1) {
            return `yesterday at ${date.getHours()}:${getMinutes(date)}`
        } else {
            return `${date.getDate()} ${getFullMonth(date)} at ${date.getHours()}:${getMinutes(date)}`
        }
    } else {
        return `${date.getDate()} ${getShortMonth(date)} ${date.getFullYear()} at ${date.getHours()}:${getMinutes(date)}`
    }
}

const stringifyAge = (age) => {
  if (age === 1) {
    return `${age} year old`
  } else {
    return `${age} years old`
  }
}

export const getUserAge = (str) => {
  const pattern = /\d*\.\d*\.\d*/
  if (pattern.test(str)) {
  const year = Number(str.split('.')[2])
  const month = Number(str.split('.')[1])
  const day = Number(str.split('.')[0])
  const date = new Date()
  const currentYear = date.getFullYear()
  const currentMonth = date.getMonth() + 1
  const currentDay = date.getDate()

  if (currentMonth > month) {
    return stringifyAge(currentYear - year)
  } else if (month === currentMonth) {
    if (currentDay >= day) {
      return stringifyAge(currentYear - year)
    } else {
      return stringifyAge(currentYear - year - 1)
    }
  } else {
    return stringifyAge(currentYear - year - 1)
  }
  } else {
    return null
  }
}

//Number return undefined
export const getUserBdate = (str) => {
//   console.log(Number(str.split('.')[1]) - 1)
  const pattern = /d*\.d*/g
  if (pattern.test(str)) {
    const month = getMonthByNumber(Number(str.split('.')[1]))
    return `${str.split('.')[0]} ${month}`
  } else {
    const month = getMonthByNumber(Number(str.split('.')[1]))
    return `${str.split('.')[0]} ${month} ${str.split('.')[2]}`
  }
}