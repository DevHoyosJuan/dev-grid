import dataMarkdown from '../../data.md?raw'
import exercisesMarkdown from '../../exercises.md?raw'
import { parseExercises, parseKnowledge } from './parseContent'

export const knowledgeEntries = parseKnowledge(dataMarkdown)
export const exercises = parseExercises(exercisesMarkdown)
export const knowledgeCategories = [...new Set(knowledgeEntries.map(entry => entry.category))]
export const algorithmEntries = knowledgeEntries.filter(entry => entry.category === 'Algoritmos y técnicas' || entry.id === 'DATA-107')

/** Resolves a canonical educational unit by its stable DATA identifier. */
export function findKnowledge(id: string) {
  return knowledgeEntries.find(entry => entry.id === id)
}
