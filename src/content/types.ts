export type KnowledgeEntry = {
  id: string
  title: string
  category: string
  summary: string
  body: string
}

export type ExerciseLevel = 'bajo' | 'medio' | 'alto' | 'experto'

export type Exercise = {
  id: string
  title: string
  level: ExerciseLevel
  category: string
  prerequisites: string[]
  description: string
  conditions: string
  expected: string
}
