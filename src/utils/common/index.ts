export const compareDate = (dateA:(string | undefined), dateB:(string | undefined)) => {
    if (dateA && dateB) {
        const dateTimeA = new Date(dateA).getTime()
        const dateTimeB = new Date(dateB).getTime()
        return dateTimeA - dateTimeB
    }
    return 0
}