const rootUrl = 'https://api.openweathermap.org'

const key = 'b95ed1de51ed7ac64103217165bd7bd4'

export async function fetchWeather(city: string) {
  const url = `${rootUrl}/data/2.5/weather?q=${city}&appid=${key}&units=metric`

  try {
    const res = await fetch(url)

    const data = await res.json()

    const iconSrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`

    const currentDate = new Date()

    const dateOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }

    const date = currentDate.toLocaleDateString('en-US', dateOptions)

    const weatherData = {
      id: data.id,
      date,
      temperature: `${Math.round(data.main.temp)} °C`,
      feelsLike: `${Math.round(data.main.feels_like)} °C`,
      info: data.weather[0].main,
      humidity: data.main.humidity,
      wind: `${(data.wind.speed * 3.6).toFixed(2)} Km/h`,
      location: `${data.name}, ${data.sys.country}`,
      icon: iconSrc,
      isFavourite: false
    }

    return weatherData
  } catch (e) {
    console.error(e)
  }
}

export async function fetchForecasts(city: string) {
  const url = `${rootUrl}/data/2.5/forecast?q=${city}&appid=${key}&units=metric`

  try {
    const res = await fetch(url)

    const data = await res.json()

    console.log(data)
  } catch (e) {
    console.error(e)
  }
}
