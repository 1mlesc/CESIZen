import { describe, test, expect } from 'vitest'
import { getStreakDays } from '../streak'

describe('getStreakDays', () => {
  test('returns 0 for empty logs', () => {
    expect(getStreakDays([])).toBe(0)
  })

  test('calculates 1 day streak for today', () => {
    const today = new Date().toISOString()
    expect(getStreakDays([{ date: today }])).toBe(1)
  })

  test('calculates multiple days streak', () => {
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)
    
    expect(getStreakDays([
      { date: today.toISOString() },
      { date: yesterday.toISOString() }
    ])).toBe(2)
  })

  test('ignores duplicate entries on same day', () => {
    const today = new Date().toISOString()
    expect(getStreakDays([
      { date: today },
      { date: today }
    ])).toBe(1)
  })
})
