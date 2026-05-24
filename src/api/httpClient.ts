export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status?: number
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

export async function httpGet<T>(url: string): Promise<T | null> {
  try {
    const response = await fetch(url)

    if (!response.ok) {
      throw new ApiError(`HTTP ${response.status}`, response.status)
    }

    return (await response.json()) as T
  } catch (error) {
    console.error('[httpGet]', url, error)

    return null
  }
}
