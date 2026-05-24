import { env } from '@/config/env'
import type { GeoIpifyResponse, IpifyResponse } from '@/types/api'
import { httpGet } from './httpClient'

const IPIFY_URL = 'https://api.ipify.org?format=json'

export async function fetchClientIp() {
  return httpGet<IpifyResponse>(IPIFY_URL)
}

export async function fetchLocationByIp(ip: string) {
  if (!env.geoApiKey) {
    console.error('[geoApi] VITE_GEO_API_KEY is not set')

    return null
  }

  const url = `https://geo.ipify.org/api/v2/country,city?apiKey=${env.geoApiKey}&ipAddress=${ip}`

  return httpGet<GeoIpifyResponse>(url)
}
