export const getShortagedNumber = (num) => {
    if (num < 1000) {
        return `${num}`
    } else if (num < 1000000) {
        return `${Math.ceil(num / 1000)}k`
    } else if (num < 1000000000) {
        return `${Math.ceil(num / 1000000)}k`
    }
}
