import type { GeoIpifyResponse, IpifyResponse } from '@/types/api'
import { httpGet } from './httpClient'
import { GEO_API_KEY } from '@/config/constants'

const IPIFY_URL = 'https://api.ipify.org?format=json'

export async function fetchClientIp() {
  return httpGet<IpifyResponse>(IPIFY_URL)
}

export async function fetchLocationByIp(ip: string) {
  try {
    const url = `https://geo.ipify.org/api/v2/country,city?apiKey=${GEO_API_KEY}&ipAddress=${ip}`

    return httpGet<GeoIpifyResponse>(url)
  } catch (e) {
    console.log(e)
  }
}
