import { describe, test, expect } from 'vitest'
import { GET } from '../health/route'

describe('/api/health', () => {
  test('returns 200 OK with correct payload structure', async () => {
    const response = await GET()
    const data = await response.json()
    
    expect(response.status).toBe(200)
    expect(data.status).toBe('ok')
    expect(data).toHaveProperty('version')
    expect(data).toHaveProperty('uptime')
    expect(data).toHaveProperty('timestamp')
  })
})
