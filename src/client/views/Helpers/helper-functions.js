export function convertIconName(icon) {
    return icon.toUpperCase().replace(/-/g, "_");
}
export function getTime(time) {
    var date = new Date(time * 1000)
    var dateTime = date.toTimeString()
    return dateTime.substring(0, dateTime.lastIndexOf(":"));
}

