const apiKey = 'at_D4AdiIzzxzXatn25OFJtA4IkwtaPz'

const getIpUrl = 'https://api.ipify.org?format=json'

export async function fetchClientIp() {
  const res = await fetch(getIpUrl)

  const data = await res.json()

  return data
}

export async function getClientLocation(ip: string) {
  const getLocationUrl = `https://geo.ipify.org/api/v2/country,city?apiKey=${apiKey}&ipAddress=${ip}`

  const res = await fetch(getLocationUrl)

  const data = await res.json()

  return data
}
