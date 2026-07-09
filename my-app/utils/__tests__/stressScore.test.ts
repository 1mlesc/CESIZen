import { describe, test, expect } from 'vitest'
import { calculateStressScore, getStressLevel, StressEvent } from '../stressScore'

describe('calculateStressScore', () => {
  test('retourne 0 pour tableau vide', () => {
    expect(calculateStressScore([])).toBe(0)
  })
  test('calcule la somme correctement', () => {
    expect(calculateStressScore([{points: 50}, {points: 100}])).toBe(150)
  })
  test('gère un seul événement', () => {
    expect(calculateStressScore([{points: 50}])).toBe(50)
  })
  test('ignore les événements avec points négatifs', () => {
    expect(calculateStressScore([{points: 50}, {points: -10}])).toBe(50)
  })
  test('arrondit au point entier', () => {
    expect(calculateStressScore([{points: 50.4}, {points: 100.1}])).toBe(151)
  })
})

describe('getStressLevel', () => {
  test('retourne Pas de stress pour score 0', () => {
    expect(getStressLevel(0)).toBe('Pas de stress')
  })
  test('retourne Faible risque pour score < 150', () => {
    expect(getStressLevel(149)).toBe('Faible risque')
  })
  test('retourne Risque modéré pour 150 <= score < 300', () => {
    expect(getStressLevel(200)).toBe('Risque modéré')
  })
  test('retourne Risque élevé pour score >= 300', () => {
    expect(getStressLevel(300)).toBe('Risque élevé')
  })
  test('borne inférieure 150 — exactement Risque modéré', () => {
    expect(getStressLevel(150)).toBe('Risque modéré')
  })
  test('borne supérieure 299 — encore Risque modéré', () => {
    expect(getStressLevel(299)).toBe('Risque modéré')
  })
})
