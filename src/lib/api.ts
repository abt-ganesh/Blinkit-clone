export const API_BASE = 'https://dummyjson.com'


export async function fetcher<T>(path: string) {
const res = await fetch(`${API_BASE}${path}`)
if (!res.ok) throw new Error('Network error')
return (await res.json()) as T
}

