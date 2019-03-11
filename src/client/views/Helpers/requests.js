
export function getCoordinatesFromName(title, next) {
    fetch('https://nominatim.openstreetmap.org/search/' + title + '?format=json&limit=1')
        .then(res => res.json())
        .then(data => {

            data.length > 0 ? getWeather(data[0].lat, data[0].lon, next) : next("Error")
        })
        .catch((error) => {
            next(error)
        });
}
export function getGeoloc(next) {
    fetch('https://ipapi.co/json')
        .then(res => res.json())
        .then(data => {
            next(data)
        })
        .catch((error) => {
            next(error)
        });
}
export function getWeather(latitude, longitude, next) {
    fetch(`/api/weather?coordinates=${latitude},${longitude}`)
        .then(res => res.json())
        .then(data => {
            next(data)
        })
        .catch((error) => {
            next(error)
        });
}
export function getWeatherByDate(weatherData, title, next) {
    fetch(`/api/weather?coordinates=${weatherData.latitude},${weatherData.longitude},${title}T12:00:00`)
        .then(res => res.json())
        .then(data => {
            next(data)
        })
        .catch((error) => {
            next(error)
        });
}