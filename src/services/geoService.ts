import { fetchClientIp, fetchLocationByIp } from '@/api/geoApi'

export async function resolveCityByIp(): Promise<string | null> {
  const ipData = await fetchClientIp()

  if (!ipData?.ip) {
    return null
  }

  const locationData = await fetchLocationByIp(ipData.ip)

  return locationData?.location?.city ?? null
}
