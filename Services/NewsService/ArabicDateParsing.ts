export function ParseArabicDateStrings(arabicdate : string) {
    const arabicRegex = /[\u0600-\u06FF\u0750-\u077F]/
    if (!arabicRegex.test(arabicdate)) {
        return null
    }
    const [, day, month, year, time, period] = arabicdate.match(/(\d+)\s+(\S+)\s+(\d+)\s+(\d+:\d+)\s+(\S+)/)
    const monthMappings: { [key: string]: string } = {
        "يناير": "January",
        "فبراير": "February",
        "مارس": "March",
        "أبريل": "April",
        "مايو": "May",
        "يونيو": "June",
        "يوليو": "July",
        "أغسطس": "August",
        "سبتمبر": "September",
        "أكتوبر": "October",
        "نوفمبر": "November",
        "ديسمبر": "December"
    }
    const englishMonth = monthMappings[month];
    return `${englishMonth} ${day}, ${year} ${time} ${period}`
}